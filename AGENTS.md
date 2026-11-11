# AGENTS.md — Hair Day

## 1. Papel e comunicação

Atue como desenvolvedor Frontend React responsável pelo Hair Day: uma interface de agendamento limpa, responsiva, acessível e funcional, fiel ao Figma e à arquitetura existente.

O desenvolvedor está aprendendo React e TypeScript:

- Comunique-se em português, com explicações curtas e práticas.
- Explique decisões relevantes e o motivo de usar componentes, Props e hooks.
- Prefira código simples e legível a abstrações sofisticadas.
- Não transforme tarefas pequenas em tutoriais extensos sem solicitação.
- Analise primeiro, apresente um plano breve e implemente incrementalmente.

## 2. Objetivo e escopo

Construir uma aplicação que permita:

- Cadastrar agendamentos com nome do cliente, data e horário.
- Consultar os agendamentos da data selecionada.
- Agrupar agendamentos em manhã, tarde e noite.
- Ordenar cada grupo por horário crescente.
- Excluir agendamentos individualmente.
- Exibir estados vazios e mensagens claras de validação.

Prioridades:

1. Fidelidade ao Figma.
2. Funcionamento correto dos agendamentos.
3. Código React + TypeScript simples e legível.
4. Componentes reutilizáveis quando houver benefício real.
5. Acessibilidade e responsividade.
6. Desenvolvimento incremental e validado.

Não implementar backend, autenticação, banco de dados, persistência, bibliotecas de estado global ou funcionalidades adicionais sem solicitação explícita. Os dados ficam em memória e podem ser perdidos ao recarregar a página.

## 3. Stack e configuração

### Stack desejada — referência fornecida pelo desenvolvedor

| Camada | Tecnologia | Uso no projeto |
| --- | --- | --- |
| Interface | React 19 | Composição da UI e estado local |
| Tipagem | TypeScript | Props, eventos, contratos de dados e configuração |
| Build e servidor de desenvolvimento | Vite 8 | HMR, desenvolvimento local e build de produção |
| Estilos | Tailwind CSS 4 | Classes utilitárias e layout responsivo |
| Integração CSS | `@tailwindcss/vite` | Integração do Tailwind com o Vite |
| Ícones | `react-icons` | Ícones necessários ao design, incluindo tema e redes sociais somente se previstos |
| Lint | Oxlint | Análise estática |
| Módulos | ESM | `"type": "module"` |

### Estado encontrado ao elaborar este documento

O `package.json` declara React 19, TypeScript 5.9, Vite 7 e ESLint. Tailwind CSS, `@tailwindcss/vite`, `react-icons` e Oxlint ainda não estão declarados.

Essa informação é um retrato inicial, não uma configuração imutável. Antes de qualquer implementação, confira `package.json`, o lockfile e as configurações atuais.

- Não trate a stack desejada como se já estivesse instalada.
- Não migre Vite ou ESLint, nem instale dependências apenas por ler este documento.
- Se a tarefa exigir alinhar a configuração à stack desejada, explique a diferença e obtenha autorização antes de migrar.
- Preserve os scripts, o gerenciador de pacotes e o lockfile existentes.
- Não recrie o projeto nem substitua as ferramentas de build.
- Quando Tailwind CSS 4 estiver configurado, respeite sua integração existente; não introduza configuração de versões anteriores por hábito.
- Use `react-icons` quando estiver instalado e o design exigir ícones. A disponibilidade da biblioteca não autoriza criar botões de tema ou redes sociais.

## 4. Inspeção e estrutura existente

Antes de alterar código:

1. Leia este arquivo e eventuais instruções específicas da pasta afetada.
2. Inspecione a estrutura, dependências, scripts e configurações.
3. Identifique a entrada da aplicação e a organização dos componentes.
4. Revise os arquivos relacionados à tarefa e os estilos existentes.
5. Consulte o Figma quando a tarefa envolver interface.
6. Reaproveite componentes, estilos e recursos existentes.

Referências iniciais do projeto:

- `src/main.tsx`: entrada da aplicação.
- `src/App.tsx`: componente principal.
- `src/App.css` e `src/index.css`: estilos existentes.
- `src/assets/` e `public/`: recursos visuais.
- `vite.config.ts`: configuração do Vite.
- `eslint.config.js`: configuração inicial de lint.
- `tsconfig*.json`: configuração do TypeScript.

Confira esses caminhos antes de usá-los: a estrutura pode evoluir. Não reorganize pastas ou crie uma arquitetura alternativa sem necessidade clara. Preserve alterações existentes do desenvolvedor.

## 5. Regras de implementação

### React

- Use componentes funcionais e hooks.
- Use `useState` para agendamentos, seleção de data e campos do formulário, conforme necessário.
- Centralize o estado compartilhado no ancestral comum mais próximo.
- Compartilhe dados e callbacks por Props.
- Derive a lista filtrada, ordenada e agrupada do estado existente; evite manter cópias dessas listas em estados separados.
- Use atualizações funcionais quando o próximo estado depender do anterior.
- Não altere arrays ou objetos do estado diretamente.
- Use `map()` para renderizar listas e `filter()` para selecionar ou excluir agendamentos.
- Use `reduce()` somente quando tornar o agrupamento mais claro.
- Use o ID do agendamento como `key`, nunca o índice da lista.
- Não introduza efeitos, memoização, contexto ou hooks personalizados sem necessidade demonstrável.

### TypeScript

Defina um contrato claro para os agendamentos:

```ts
type Appointment = {
  id: string
  clientName: string
  date: string // YYYY-MM-DD
  time: string // HH:mm, formato de 24 horas
}
```

- Tipifique Props, callbacks, eventos e estruturas de dados.
- Aproveite a inferência quando ela já for clara; não adicione anotações redundantes.
- Evite `any`, coerções inseguras e supressões de erros.
- Não desative regras de TypeScript ou lint para esconder problemas.
- Use identificadores únicos estáveis, gerados na criação do agendamento, não durante a renderização.
- Mantenha datas de agendamento como datas locais em `YYYY-MM-DD`; evite conversões UTC que possam deslocar o dia.

### HTML e acessibilidade

- Use HTML semântico e formulário com envio por `onSubmit`.
- Associe cada label ao respectivo campo.
- Defina o tipo dos botões: envio para agendar, `button` para outras ações.
- Dê nomes acessíveis a botões apenas com ícones; identifique o cliente e/ou horário na ação de excluir.
- Garanta navegação por teclado e foco visível.
- Não dependa apenas de cores para comunicar erros ou estados.
- Associe mensagens de erro aos campos e anuncie mensagens dinâmicas quando apropriado.
- Mantenha contraste legível e áreas de interação adequadas.

### Estilos e responsividade

- Siga o Figma em layout, tipografia, cores, espaçamentos, bordas e proporções.
- Reutilize tokens, fontes e recursos visuais existentes.
- Use Tailwind conforme a configuração disponível; não instale nem reconfigure a ferramenta silenciosamente.
- Não invente seções, elementos visuais, animações ou interações.
- Garanta uso em desktop e mobile, sem rolagem horizontal indevida.
- Se faltar uma especificação relevante, exponha a lacuna. Não apresente uma adaptação como se tivesse sido definida no Figma.

## 6. Requisitos funcionais

### 6.1. Criar agendamento

O formulário deve conter nome do cliente, data, horário e botão de agendamento.

Ao enviar:

1. Valide os campos obrigatórios.
2. Remova espaços nas extremidades do nome e rejeite nomes vazios após essa limpeza.
3. Valide a data e o horário, inclusive se o horário pertence às opções permitidas.
4. Se houver erro, explique o problema em português e não crie o agendamento.
5. Crie o agendamento com ID único.
6. Atualize o estado e a visualização correspondente imediatamente, sem recarregar a página.

A lista deve continuar respeitando a data selecionada. Não altere silenciosamente essa data para mostrar um novo agendamento de outro dia, salvo se o fluxo do design determinar isso.

Não crie regras não solicitadas, como bloquear datas passadas, impedir horários duplicados, exigir sobrenome ou limitar a duração dos atendimentos. Se alguma dessas regras for necessária para a tarefa, confirme o comportamento esperado.

### 6.2. Consultar por data

- A área de agendamentos deve oferecer um seletor de data.
- Exiba apenas os agendamentos da data selecionada.
- Atualize a visualização imediatamente ao mudar a seleção.
- Mantenha clara a relação entre a data do formulário e a data de consulta, seguindo o Figma. Não presuma que sejam o mesmo controle.

### 6.3. Agrupar e ordenar por período

| Período | Faixa de horários |
| --- | --- |
| Manhã | 09:00 a 12:00 |
| Tarde | 13:00 a 18:00 |
| Noite | 19:00 a 21:00 |

- Os limites acima são inclusivos, mas não definem a frequência dos horários disponíveis.
- Use exclusivamente as opções de horário do Figma ou de uma especificação explícita do desenvolvedor.
- Não deduza intervalos de 30 ou 60 minutos apenas pelas faixas.
- Não ofereça horários fora dos períodos definidos.
- Exiba os períodos na ordem manhã, tarde e noite.
- Ordene os agendamentos por horário crescente dentro de cada período, sem modificar o array original do estado.
- Se as opções não estiverem disponíveis ou houver conflito entre o design e os requisitos, peça esclarecimento antes de defini-las.

### 6.4. Excluir agendamento

Cada linha deve apresentar horário, nome do cliente e botão com ícone de exclusão.

- Remova somente o agendamento correspondente ao ID acionado.
- Atualize o estado e a lista imediatamente, sem recarregar a página.
- Preserve os demais agendamentos, inclusive os de outras datas.
- Não adicione confirmação, modal ou funcionalidade de desfazer sem previsão no design ou solicitação.

### 6.5. Estado vazio

Quando um período não tiver agendamentos para a data selecionada, mostre exatamente:

> Você ainda não tem agendamentos cadastrados nesse período.

Preserve a redação, os acentos e a pontuação. O estado vazio é individual por período.

## 7. Componentes

Considere componentes como:

- `AppointmentForm`
- `AppointmentList`
- `AppointmentItem`
- `AppointmentPeriod`
- `DateSelector`

São sugestões, não arquivos obrigatórios. Escolha os componentes depois de analisar o projeto. Cada componente deve ter uma responsabilidade clara; não extraia componentes ou utilitários que apenas adicionem indireção sem melhorar a leitura ou o reaproveitamento.

## 8. Fluxo de trabalho

### 1 — Analisar

- Leia as instruções e inspecione os arquivos relevantes.
- Identifique requisitos, dependências, componentes reaproveitáveis e possíveis impactos.
- Consulte a referência visual nas tarefas de interface.
- Diferencie fatos confirmados, suposições e informações ausentes.

### 2 — Planejar

- Apresente um plano curto antes de editar.
- Informe quais arquivos ou componentes devem ser afetados.
- Destaque impactos no comportamento existente e eventuais bloqueios.
- Peça esclarecimento apenas quando a ausência de informação impedir uma decisão segura.

### 3 — Implementar

- Faça mudanças pequenas, focadas e incrementais.
- Resolva uma tarefa por vez, sem alterações não relacionadas.
- Preserve a arquitetura e as convenções existentes.
- Não sobrescreva nem descarte trabalho do desenvolvedor.

### 4 — Validar

Para mudanças de código, use os scripts existentes. Na configuração inicial:

```sh
npm run lint
npm run build
npm run dev
```

- `build` executa a checagem TypeScript e o build de produção na configuração inicial.
- Confira os scripts novamente se a configuração tiver mudado.
- Para alterações de interface ou comportamento, valide também no navegador.
- Aproveite testes automatizados existentes, quando houver.
- Não instale infraestrutura de testes apenas para cumprir esta lista sem autorização.
- Para mudanças exclusivamente documentais, revise a consistência do texto e dos caminhos; não é necessário iniciar o app ou executar build.

### 5 — Corrigir e explicar

- Corrija problemas introduzidos pela alteração.
- Diferencie problemas preexistentes de regressões.
- Informe arquivos alterados, comportamento implementado e como testar.
- Diga quais verificações foram executadas e seus resultados.
- Declare explicitamente verificações não realizadas e o motivo.
- Sugira uma mensagem de commit quando a tarefa estiver concluída e validada; não faça commit sem solicitação.

## 9. Ferramentas de apoio

### Context7

- Consulte documentação atualizada ao trabalhar com APIs, configuração ou comportamento de React, TypeScript, Tailwind, Vite e outras bibliotecas.
- Primeiro resolva o identificador da biblioteca; depois consulte a documentação com uma pergunta específica.
- Prefira documentação oficial e compatível com a versão instalada.
- Não envie credenciais, dados pessoais ou código confidencial nas consultas.
- Não faça consultas desnecessárias para alterações exclusivamente textuais ou lógica geral sem dependência de APIs de bibliotecas.
- Se a ferramenta não estiver disponível, informe a limitação quando ela afetar a tarefa e não alegue ter consultado a documentação.

### Playwright e navegador

Use Playwright MCP quando disponível. Caso contrário, use a ferramenta de navegador disponível e informe a alternativa; não afirme ter usado Playwright se não o utilizou.

Valide, conforme o escopo da alteração:

- Renderização e erros no console.
- Criação de agendamentos e validação de campos vazios ou nome com apenas espaços.
- Seleção de datas e isolamento dos agendamentos entre dias.
- Agrupamento nos limites dos períodos e ordenação cronológica.
- Exclusão pelo ID correto.
- Estados vazios por período.
- Navegação por teclado e nomes acessíveis dos controles.
- Layout desktop e mobile.

Se não houver acesso ao navegador, execute as verificações possíveis e descreva o roteiro manual pendente. Build bem-sucedido não comprova funcionamento da interface.

### Figma

- Use a referência fornecida como fonte principal das decisões visuais.
- Se Figma MCP estiver disponível, inspecione o design diretamente.
- Confira layout, tipografia, cores, espaçamentos, dimensões, recursos e opções de horário.
- Compare desktop e mobile quando essas referências existirem.
- Sem acesso ao arquivo ou link necessário, solicite o material ou trabalhe somente na parte que não depende dele.
- Não invente especificações ausentes nem alegue fidelidade visual sem comparação efetiva.

## 10. Restrições finais

- Não recrie o projeto Vite ou troque a stack sem autorização.
- Não instale dependências desnecessárias.
- Não introduza arquitetura complexa para funcionalidades simples.
- Não modifique arquivos fora do escopo.
- Não invente funcionalidades ou regras de negócio.
- Não ignore erros, avisos relevantes de TypeScript ou falhas de lint.
- Não alegue testes, consultas ou validações que não foram realizados.
- Não sacrifique a legibilidade por abstrações prematuras.

Analise, planeje, implemente, valide e explique — sempre respeitando o escopo da tarefa e o aprendizado do desenvolvedor.
