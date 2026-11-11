# Evidências de utilização do Playwright

## Execução real

Os testes foram executados com **Playwright Test 1.65.0 pela CLI**, usando o Chrome instalado, em Windows. Não foi utilizado Playwright MCP nesta execução.

**Resultado validado: 14 testes aprovados, sem falhas, sem testes ignorados e sem retries.** O registro de data, duração e resultado individual está em [`playwright-results.json`](./playwright-results.json), gerado automaticamente a partir do reporter JSON do Playwright.

Configuração: [`tests/playwright.config.ts`](../../tests/playwright.config.ts).

Suíte: [`tests/e2e/appointments.spec.ts`](../../tests/e2e/appointments.spec.ts).

| Projeto | Viewport | Ambiente |
| --- | --- | --- |
| Desktop | 1440 × 1000 px | Chromium/Chrome, sem emulação de toque |
| Mobile | 390 × 844 px | Chromium/Chrome, emulação mobile com toque |

O teste de responsividade também verifica as larguras 320, 375, 390, 768, 1024, 1440 e 1920 px com nomes longos e erros de validação.

## Cenários executados nos dois projetos

1. Três períodos vazios, campos obrigatórios e nome com apenas espaços.
2. Criação, ordenação e agrupamento nos limites de cada período.
3. Filtro por data e exclusão individual, preservando outros clientes e outras datas.
4. Alternância de tema preservando formulário e agendamentos.
5. Operação dos horários e do switch pelo teclado.
6. Layout sem rolagem horizontal com nome longo e mensagens de erro.
7. Capturas completas nos temas claro e escuro, com dados fictícios cadastrados pela interface.

## Capturas geradas pelo Playwright

- [Desktop — tema escuro](../screenshots/desktop-dark.png).
- [Desktop — tema claro](../screenshots/desktop-light.png).
- [Mobile — tema escuro](../screenshots/mobile-dark.png).
- [Mobile — tema claro](../screenshots/mobile-light.png).

As imagens também são anexadas ao relatório HTML pelo próprio teste. Foram conferidas visualmente após a geração. Não são montagens nem imagens exportadas do Figma.

## Reproduzir

Use uma versão compatível do Node, preferencialmente Node 24:

```sh
npm ci
npx playwright install chromium
npm run test:e2e
npm run test:evidence
npm run test:report
```

Alternativa no Windows com Chrome já instalado:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'chrome'
npm.cmd run test:e2e
npm.cmd run test:evidence
```

O comando de testes faz o build de produção e inicia um servidor exclusivo em `http://127.0.0.1:4180`. Não reutiliza um servidor de outra pasta. Cada teste recebe um contexto novo, sem depender dos dados de outro teste.

O script `tests/save-evidence.mjs` transforma o relatório bruto em um resumo sem os caminhos absolutos da máquina. Ele não inventa resultados: lê os status e durações reais do reporter.

## Artefatos locais

- `test-results/results.json`: relatório bruto da execução.
- `playwright-report/index.html`: relatório HTML interativo, aberto com `npm run test:report`.
- `docs/evidence/playwright-results.json`: resumo versionável da execução.
- `docs/screenshots/*.png`: capturas versionáveis da aplicação.

Os relatórios completos são ignorados pelo Git; as evidências selecionadas em `docs/` devem acompanhar o commit.

## Limitações e transparência

- O mobile foi emulado; não houve teste em aparelho físico, Safari ou Firefox.
- Não foi executada comparação automatizada de pixels contra o Figma.
- O build concluiu com um aviso de Node 22.11 abaixo do mínimo suportado pelo Vite instalado. O workflow usa Node 24.
- Por falta de espaço no disco, esta execução reutilizou dependências locais por junções temporárias e um runner Playwright em diretório temporário. Não houve instalação de um novo navegador. A reprodução normal usa os comandos acima.
- O workflow de GitHub Pages foi criado, mas sua execução remota depende de commit, push e habilitação de **GitHub Actions** em **Settings → Pages**. Um build local bem-sucedido não comprova que o deploy remoto já ocorreu.
