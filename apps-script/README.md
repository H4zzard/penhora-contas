# Integração com as abas `IMOVEL` e `bloqueio_conta`

1. Abra a planilha que receberá os leads.
2. Confirme que existe a aba `IMOVEL`. A aba `bloqueio_conta` é criada automaticamente no primeiro envio válido da landing page correspondente.
3. Na planilha, acesse **Extensões → Apps Script**.
4. Substitua o conteúdo de `Code.gs` pelo arquivo deste diretório e salve.
5. Clique em **Implantar → Nova implantação**.
6. Selecione **Aplicativo da Web**.
7. Em **Executar como**, escolha **Eu**.
8. Em **Quem pode acessar**, escolha a opção que permita acesso anônimo/qualquer pessoa, pois os visitantes do site não estarão autenticados na sua conta Google.
9. Autorize o script e conclua a implantação. Se já houver uma implantação, use **Implantar → Gerenciar implantações → Editar**, selecione uma nova versão e implante novamente.
10. Copie a URL pública terminada em `/exec` e envie-a nesta conversa. Não envie a URL de teste terminada em `/dev`.

Depois que a URL for configurada como `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`, cada envio registra o lead por uma requisição curta com `keepalive` e redireciona ao WhatsApp assim que a entrega é iniciada, com limite de espera de 1,5 segundo.

As colunas são criadas na primeira linha e cada valor é salvo em uma célula separada. A página de bloqueio de conta não solicita valor, dados bancários, CPF ou número de processo; por isso, a coluna de valor do imóvel permanece vazia nessa aba. O código aplica trava contra gravações simultâneas, valida campos obrigatórios e neutraliza valores que poderiam ser interpretados como fórmulas pela planilha.
