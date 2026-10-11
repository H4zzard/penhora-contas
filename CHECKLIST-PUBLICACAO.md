# Checklist de publicação

## Validação institucional

- [ ] Confirmar nome profissional, OAB, razão social, CNPJ e formação.
- [ ] Confirmar que a fotografia é atual e possui autorização de uso.
- [ ] Revisar todo o conteúdo jurídico pelo advogado responsável.
- [ ] Validar as políticas de privacidade e cookies com o responsável pelo tratamento.
- [ ] Preencher e validar e-mail, endereço (se desejado) e número oficial do WhatsApp.

## Integrações

- [ ] Confirmar que o WhatsApp configurado, `(11) 93624-9503`, é o número definitivo para esta campanha.
- [ ] Testar o preenchimento e o redirecionamento do formulário para o WhatsApp em dispositivo real.
- [x] Web App da aba `IMOVEL` preservado em `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`.
- [ ] Republicar `apps-script/Code.gs` para habilitar a aba `bloqueio_conta` e configurar `NEXT_PUBLIC_ACCOUNT_GOOGLE_APPS_SCRIPT_URL`.
- [ ] Revisar juridicamente o conteúdo de `/bloqueio-judicial-de-conta` antes da publicação.
- [ ] Configurar GTM apenas se houver contêiner real e revisar o consentimento.
- [ ] Configurar no atendimento o evento `lead_qualification_confirmed` somente após confirmação real, sem dados jurídicos sensíveis.
- [ ] Verificar que não existe outra tag GTM/GA4/Ads duplicada no domínio.

## SEO e domínio

- [ ] Definir `ALLOW_INDEXING=true` somente na produção revisada.
- [ ] Confirmar canonical, sitemap, robots e OG image no domínio final.
- [ ] Vincular Search Console e validar a propriedade do domínio.
- [ ] Conferir redirecionamentos HTTPS e variações com/sem `www`.

## Qualidade final

- [ ] Testar formulário e WhatsApp em dispositivo real.
- [ ] Revisar navegação por teclado, leitor de tela e contraste.
- [ ] Verificar layout em celulares, tablets e desktops reais.
- [ ] Executar Lighthouse em produção e revisar LCP, CLS e INP.
- [ ] Fazer teste final das páginas de privacidade, cookies e 404.
