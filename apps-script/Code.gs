const FORM_CONFIGS = {
  imovel_site_v1: {
    sheetName: 'IMOVEL',
    situations: ['Imóvel penhorado', 'Risco de penhora', 'Leilão agendado', 'Outra situação'],
    requiresPropertyValue: true,
  },
  bloqueio_conta_site_v1: {
    sheetName: 'bloqueio_conta',
    situations: [
      'Conta bloqueada judicialmente',
      'Bloqueio de salário ou benefício',
      'Bloqueio de conta empresarial',
      'Possível excesso de bloqueio',
      'Outra situação',
    ],
    requiresPropertyValue: false,
  },
};

const SPREADSHEET_ID = '1KZhKyMe1jm5pV1rdkEunjVF-fqsyv_UAROjK6TJTQHE';

const HEADERS = [
  'Recebido em',
  'ID do lead',
  'Nome',
  'WhatsApp',
  'Situação',
  'Valor do imóvel',
  'Cidade/UF',
  'Consentimento',
  'Origem',
  'Página',
  'Local do formulário',
  'Enviado pelo navegador em',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'UTM Content',
  'UTM Term',
  'GCLID',
  'GBRAID',
  'WBRAID',
];

function doGet() {
  return jsonResponse_({
    ok: true,
    service: 'leads_site_samuel_santos',
    sheets: Object.keys(FORM_CONFIGS).map(function (key) { return FORM_CONFIGS[key].sheetName; }),
  });
}

function doPost(e) {
  let lock;

  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Corpo da requisição ausente.');
    }

    const data = JSON.parse(e.postData.contents);
    const formConfig = validateLead_(data);

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    lock = LockService.getScriptLock();
    lock.waitLock(10000);

    let sheet = spreadsheet.getSheetByName(formConfig.sheetName);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(formConfig.sheetName);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#0B0B0B')
        .setFontColor('#FFFFFF');
    }

    const attribution = data.attribution || {};
    sheet.appendRow([
      new Date(),
      safeCell_(data.leadId),
      safeCell_(data.name),
      safeCell_(data.whatsapp),
      safeCell_(data.situation),
      safeCell_(data.propertyValue),
      safeCell_(data.city),
      data.privacyAccepted === true ? 'Sim' : 'Não',
      safeCell_(data.pageService),
      safeCell_(data.pageUrl),
      safeCell_(data.formLocation),
      safeCell_(data.submittedAt),
      safeCell_(attribution.utm_source),
      safeCell_(attribution.utm_medium),
      safeCell_(attribution.utm_campaign),
      safeCell_(attribution.utm_content),
      safeCell_(attribution.utm_term),
      safeCell_(attribution.gclid),
      safeCell_(attribution.gbraid),
      safeCell_(attribution.wbraid),
    ]);

    SpreadsheetApp.flush();
    return jsonResponse_({ ok: true, leadId: data.leadId });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: String(error.message || error) });
  } finally {
    if (lock && lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function validateLead_(data) {
  const config = FORM_CONFIGS[data.formKey];
  if (!config) {
    throw new Error('Identificação do formulário inválida.');
  }

  const required = ['leadId', 'name', 'whatsapp', 'situation', 'city'];
  if (config.requiresPropertyValue) required.push('propertyValue');
  required.forEach(function (field) {
    if (!String(data[field] || '').trim()) {
      throw new Error('Campo obrigatório ausente: ' + field);
    }
  });

  const phoneDigits = String(data.whatsapp).replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    throw new Error('WhatsApp inválido.');
  }

  const propertyValues = ['Até R$ 500 mil', 'De R$ 500 mil a R$ 1 milhão', 'Acima de R$ 1 milhão'];

  if (config.situations.indexOf(data.situation) === -1) {
    throw new Error('Situação inválida.');
  }
  if (config.requiresPropertyValue && propertyValues.indexOf(data.propertyValue) === -1) {
    throw new Error('Faixa de valor inválida.');
  }
  if (data.privacyAccepted !== true) {
    throw new Error('Consentimento de privacidade ausente.');
  }

  return config;
}

function safeCell_(value) {
  const text = String(value == null ? '' : value).trim().slice(0, 1000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
