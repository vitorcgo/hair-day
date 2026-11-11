# Evidências de utilização do Context7

Este é um registro textual das consultas MCP realmente realizadas durante a preparação do projeto e da entrega. Não é um log automático exportado do servidor. As perguntas, identificadores e trechos abaixo permitem verificar as fontes e reproduzir as consultas.

## 1. Playwright: resolução da biblioteca

Ferramenta: `context7.resolve-library-id`.

```json
{
  "libraryName": "Playwright",
  "query": "Playwright Test configure webServer Vite chromium projects desktop mobile viewport screenshots HTML reporter traces"
}
```

Resultado selecionado: **`/microsoft/playwright`**, repositório oficial da Microsoft, classificado como fonte de reputação alta.

## 2. Playwright: servidor e configuração dos testes

Ferramenta: `context7.query-docs`.

```json
{
  "libraryId": "/microsoft/playwright",
  "query": "Configure Playwright Test webServer Vite command port reuseExistingServer desktop mobile projects HTML json reporters",
  "language": "TypeScript"
}
```

Trecho retornado:

> Launch a development web server (or multiple) during the tests.

O retorno documentou `webServer.command`, `cwd`, `url`, `reuseExistingServer` e `timeout`.

- Fonte retornada: [TestConfig.webServer](https://github.com/microsoft/playwright/blob/main/docs/src/test-api/class-testconfig.md).
- Aplicação: [`tests/playwright.config.ts`](../../tests/playwright.config.ts), com um servidor próprio, build antes dos testes e projetos desktop/mobile. O servidor existente não é reutilizado, evitando capturar outra pasta ou um build antigo.

## 3. Playwright: screenshots e anexos

Ferramenta: `context7.query-docs`.

```json
{
  "libraryId": "/microsoft/playwright",
  "query": "Playwright Test page screenshot fullPage path attach testInfo screenshot assertions getByRole getByLabel check radio",
  "language": "TypeScript"
}
```

Trecho de exemplo retornado:

```js
const screenshot = await page.screenshot();
await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
```

- Fontes retornadas: [TestInfo.attach](https://github.com/microsoft/playwright/blob/main/docs/src/test-api/class-testinfo.md) e [fullPage](https://github.com/microsoft/playwright/blob/main/docs/src/api/params.md).
- Aplicação: [`appointments.spec.ts`](../../tests/e2e/appointments.spec.ts), que salva capturas completas da página e as anexa ao relatório real da execução.

## 4. Tailwind: formato e blur do controle de tema

A biblioteca foi resolvida anteriormente com `resolve-library-id`, selecionando **`/tailwindlabs/tailwindcss.com`**.

Ferramenta: `context7.query-docs`.

```json
{
  "libraryId": "/tailwindlabs/tailwindcss.com",
  "query": "Tailwind CSS backdrop-blur arbitrary 2px and rounded-full utilities for a pill switch with fixed width height",
  "language": "CSS"
}
```

Trecho retornado:

> Use the rounded-full utility to create rounded pill buttons.

O retorno também incluiu o exemplo de valor personalizado de `backdrop-blur` com `2px`.

- Fontes: [border-radius](https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/border-radius.mdx) e [backdrop-filter-blur](https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/backdrop-filter-blur.mdx).
- Aplicação: [`ThemeToggle.tsx`](../../src/components/ThemeToggle.tsx), com `rounded-full` e `backdrop-blur-[2px]`.

## 5. Vite: publicação no GitHub Pages

Biblioteca resolvida com `resolve-library-id`: **`/vitejs/vite`**.

Perguntas enviadas a `query-docs`:

```text
Deploying static site GitHub Pages GitHub Actions workflow configure-pages base_path build --base upload-pages-artifact deploy-pages

Vite base relative path ./ deployment generated asset URLs relative index html
```

O retorno explicou que `base: './'` gera URLs relativas e forneceu o workflow oficial com checkout, Node, build, configuração do Pages, upload e deploy.

- Fontes: [deploy estático](https://github.com/vitejs/vite/blob/main/docs/guide/static-deploy.md) e [base relativa](https://github.com/vitejs/vite/blob/main/docs/guide/build.md).
- Aplicação: [`vite.config.ts`](../../vite.config.ts) e [workflow de deploy](../../.github/workflows/deploy.yml).

## 6. Playwright: saída JSON pela CLI

Ferramenta: `context7.query-docs`, biblioteca **`/microsoft/playwright`**.

```text
Playwright JSON reporter PLAYWRIGHT_JSON_OUTPUT_FILE outputFile environment variable command line --reporter=json
```

O retorno confirmou que `PLAYWRIGHT_JSON_OUTPUT_FILE` define o caminho completo de saída do reporter JSON, inclusive quando os reporters são selecionados pela CLI. Essa alternativa foi usada na conferência local com `--reporter=list,json`.

- Fonte retornada: [JSON reporter](https://github.com/microsoft/playwright/blob/main/docs/src/test-reporters-js.md).
- Aplicação: gravação do relatório real consumido por `tests/save-evidence.mjs`.
