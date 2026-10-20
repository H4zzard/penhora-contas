# Landing page — Bloqueio judicial de conta

Aplicação independente do Dr. Samuel Santos para `/bloqueio-judicial-de-conta`, construída com Next.js App Router, TypeScript estrito e Tailwind CSS.

## Executar localmente

```bash
npm install
copy .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000/bloqueio-judicial-de-conta`.

## Configuração

Preencha `.env.local` sem versionar dados reais:

- `NEXT_PUBLIC_SITE_URL`: origem canônica, sem barra final.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número com DDI e DDD, apenas dígitos. O projeto usa como referência o número institucional verificado, mas a titularidade e atualidade devem ser confirmadas antes da publicação.
- `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`: endpoint informado para a integração já existente com a aba `IMOVEL`.
- `NEXT_PUBLIC_ACCOUNT_GOOGLE_APPS_SCRIPT_URL`: URL do Web App que grava os leads qualificados na aba `CONTAS`. O endpoint informado está configurado no exemplo e no ambiente local.
- `NEXT_PUBLIC_CONTACT_EMAIL` e `NEXT_PUBLIC_OFFICE_ADDRESS`: dados institucionais opcionais.
- `ALLOW_INDEXING`: use `true` somente após revisão e publicação no domínio final.
- `NEXT_PUBLIC_GTM_ID`: permite substituir o contêiner GTM padrão (`GTM-5KHN42MZ`). Não mantenha outra instalação duplicada.

## Formulário

O formulário aparece em modal e na seção final. A validação com Zod ocorre a cada alteração e pergunta apenas se o bloqueio supera R$ 50 mil, sem solicitar o valor exato, CPF, conta, senha ou detalhes do processo. A resposta “Não” bloqueia o envio e informa que não é possível continuar por esse formulário. Leads qualificados são enviados à aba `CONTAS` e, em seguida, direcionados ao WhatsApp.

O código e as instruções para a planilha estão em `apps-script/Code.gs` e `apps-script/README.md`.

Todas as seções informativas terminam com um CTA que abre o modal. Os botões possuem microinterações em CSS com suporte a `prefers-reduced-motion`, mantendo as animações discretas e acessíveis.

## Mensuração e consentimento

O GTM é carregado somente após consentimento. A camada de dados usa:

- `page_service = bloqueio_conta`
- `page_view`
- `cta_whatsapp_click`
- `contact_form_submit` disparado imediatamente antes do redirecionamento ao WhatsApp, sem incluir dados pessoais no evento
- `lead_qualification_confirmed` reservado para confirmação real no fluxo de atendimento; a página não o dispara automaticamente.

Os parâmetros `gclid`, `gbraid`, `wbraid` e UTMs são guardados somente após consentimento. Nenhum evento `generate_lead` é disparado em clique ou abertura do WhatsApp.

## Verificações

```bash
npm run lint
npm run typecheck
npm run build
```

## Deploy

O projeto pode ser publicado em ambiente compatível com Next.js (por exemplo, Vercel) ou em infraestrutura Node. Configure as variáveis no provedor e direcione apenas a rota `/bloqueio-judicial-de-conta` para esta aplicação, preservando a hospedagem da landing page de imóveis. Defina `ALLOW_INDEXING=true` somente no ambiente final revisado.

A fotografia em `public/images/samuel-santos-upscale.jpeg` utiliza a versão em alta resolução fornecida para o projeto. Confirme autorização, atualidade e preferência de enquadramento antes da publicação.

## Conteúdo e referências

O conteúdo educativo foi redigido com base geral no Código de Processo Civil e nas informações institucionais do CNJ sobre o SISBAJUD. A comunicação foi mantida informativa e sóbria, seguindo a orientação do Provimento CFOAB nº 205/2021. O material não substitui análise jurídica e deve ser revisado pelo advogado responsável antes de ir ao ar.

Consulte `CHECKLIST-PUBLICACAO.md` para as pendências externas.
