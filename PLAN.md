# PLAN.md — Plano Executivo de Desenvolvimento

> Plano mestre de execução do projeto **Sistema de Simulação de Energia em Protoboard**.
> Este documento deve ser atualizado continuamente com status real de progresso.

## 1. Regras de Governança do Plano
- [ ] O plano deve permanecer estável em escopo e ordem macro (sem inserção de novas fases sem revisão de planejamento formal).
- [ ] Cada passo só pode iniciar quando o passo anterior estiver com checklist concluída.
- [ ] Toda tarefa executada deve referenciar explicitamente o passo correspondente.
- [ ] Qualquer bloqueio, dívida técnica ou risco deve ser registrado em `AGENT_LOG/`.
- [ ] O status de cada item deve ser atualizado com evidência objetiva (arquivo alterado, teste executado, validação realizada).

## 2. Estados de Progresso
- `[ ]` Não iniciado
- `[-]` Em andamento
- `[x]` Concluído
- `[!]` Bloqueado

## 3. Plano por Passos com Checkpoints

---

## Passo 1 — Fundação de Arquitetura e Base de Edição
**Objetivo:** estabelecer a base técnica mínima do produto e fluxo inicial de montagem visual.

**Checklist de desenvolvimento detalhada**
- [ ] Inicializar projeto TypeScript + React + Vite com estrutura modular clara.
- [ ] Criar organização de pastas por domínio (`core`, `simulation`, `editor`, `rendering`, `ui`, `session`).
- [ ] Definir modelos iniciais de domínio (protoboard, nó, trilha, componente, pino, fio, fonte).
- [ ] Implementar protoboard com grade e mapeamento interno de trilhas.
- [ ] Implementar drag and drop básico da biblioteca para a placa.
- [ ] Implementar snapping em furos/trilhas válidas.
- [ ] Criar camada visual inicial (board + componentes básicos).
- [ ] Garantir renderização fluida em cenário simples.

**Expectativas de qualidade para concluir o passo**
- [ ] Código com tipagem forte e sem `any` não justificado.
- [ ] Separação entre estado de edição e estado de simulação definida em contrato.
- [ ] Base executável local sem dependências externas.
- [ ] Testes unitários mínimos cobrindo geometria da board e snapping.
- [ ] Documentação técnica de estrutura inicial atualizada.

**Status do passo:** `[ ] Não iniciado`

---

## Passo 2 — Motor de Simulação DC Inicial
**Objetivo:** calcular grandezas elétricas fundamentais com consistência.

**Checklist de desenvolvimento detalhada**
- [ ] Construir grafo elétrico em tempo real a partir das conexões da edição.
- [ ] Implementar solver nodal DC inicial.
- [ ] Implementar cálculos de V, I, R por ramo/nó.
- [ ] Implementar queda de tensão por componente e fio.
- [ ] Implementar resistência equivalente em série/paralelo.
- [ ] Criar pipeline de simulação incremental para mudanças locais.
- [ ] Exibir feedback visual mínimo de tensão na interface.

**Expectativas de qualidade para concluir o passo**
- [ ] Resultados coerentes com tolerância definida em testes.
- [ ] Determinismo de simulação para entradas idênticas.
- [ ] Testes unitários de fórmulas elétricas e validação do solver.
- [ ] Testes de integração entre edição e simulação.
- [ ] Sem regressão perceptível de desempenho na edição.

**Status do passo:** `[ ] Não iniciado`

---

## Passo 3 — Interatividade Avançada de Edição
**Objetivo:** elevar produtividade de montagem e manipulação de circuitos.

**Checklist de desenvolvimento detalhada**
- [ ] Implementar menu de contexto por tipo de elemento.
- [ ] Implementar seleção por caixa estilo Windows Explorer.
- [ ] Implementar ações em lote (mover, copiar, excluir).
- [ ] Implementar clipboard interno em RAM para estruturas.
- [ ] Implementar tooltips ricos na biblioteca de componentes.
- [ ] Adicionar rotação e bloqueio de posição de componentes.

**Expectativas de qualidade para concluir o passo**
- [ ] UX consistente com atalhos e padrões definidos.
- [ ] Interações sem perda de seleção ou estado.
- [ ] Testes E2E cobrindo fluxos principais de edição avançada.
- [ ] Acessibilidade mínima (foco, teclado, contraste base).
- [ ] Erros de interação comunicados com mensagens claras.

**Status do passo:** `[ ] Não iniciado`

---

## Passo 4 — Diagnóstico e Mapas Técnicos
**Objetivo:** tornar o entendimento do circuito claro e acionável.

**Checklist de desenvolvimento detalhada**
- [ ] Implementar diagnóstico de falta de alimentação.
- [ ] Implementar diagnóstico de curto e trilha aberta.
- [ ] Implementar diagnóstico de polaridade invertida e sobrecarga.
- [ ] Implementar mapa de tensão.
- [ ] Implementar mapa de corrente.
- [ ] Implementar mapa de resistência.
- [ ] Implementar mapa de continuidade.
- [ ] Implementar mapa de diagnóstico com severidade e recomendação.
- [ ] Criar painel lateral com leitura por pino/componente (V, I, R, P).

**Expectativas de qualidade para concluir o passo**
- [ ] Diagnósticos com explicação em linguagem simples.
- [ ] Coerência visual entre valores do solver e overlays.
- [ ] Testes de cenários de falhas comuns com saídas esperadas.
- [ ] Sem conflitos de camada visual entre mapas.
- [ ] Performance aceitável com múltiplos overlays ativos.

**Status do passo:** `[ ] Não iniciado`

---

## Passo 5 — Calculadora Integrada e Refinamento de UX
**Objetivo:** oferecer assistência prática ao projeto eletrônico.

**Checklist de desenvolvimento detalhada**
- [ ] Implementar cálculo de resistor para LED.
- [ ] Implementar divisor de tensão.
- [ ] Implementar potência em resistor.
- [ ] Implementar associação série/paralelo de resistores.
- [ ] Implementar estimativa de autonomia de bateria em carga DC.
- [ ] Implementar botão “aplicar no projeto”.
- [ ] Validar atualização automática da simulação após aplicação.
- [ ] Refinar UI/UX de fluxos críticos com feedback contextual.

**Expectativas de qualidade para concluir o passo**
- [ ] Fórmulas com validação de entradas e tratamento de bordas.
- [ ] Fluxo de aplicação sem inconsistência de estado.
- [ ] Testes unitários das calculadoras.
- [ ] Testes E2E de aplicação de valor calculado no circuito.
- [ ] Mensagens orientativas para entradas inválidas.

**Status do passo:** `[ ] Não iniciado`

---

## Passo 6 — Estabilização, Qualidade e Release
**Objetivo:** garantir prontidão para uso consistente.

**Checklist de desenvolvimento detalhada**
- [ ] Executar suíte completa de testes unitários, integração e E2E.
- [ ] Executar testes de desempenho com cenários representativos.
- [ ] Corrigir regressões funcionais e visuais.
- [ ] Revisar acessibilidade e ergonomia de interação.
- [ ] Consolidar documentação técnica e guia de uso.
- [ ] Validar operação offline-first e execução em RAM.
- [ ] Preparar checklist de release e pacote final.

**Expectativas de qualidade para concluir o passo**
- [ ] Critérios de aceite atendidos para todas as funcionalidades obrigatórias.
- [ ] Cobertura de testes adequada para áreas críticas.
- [ ] Sem bloqueadores abertos em `AGENT_LOG` para release.
- [ ] Build reprodutível localmente.
- [ ] Definição de pronto (DoD) integralmente satisfeita.

**Status do passo:** `[ ] Não iniciado`

---

## 4. Definição de Pronto (DoD) Global
- [ ] Funcionalidade implementada e validada por testes relevantes.
- [ ] Comportamento elétrico consistente com cenários de referência.
- [ ] UX alinhada aos padrões definidos no projeto.
- [ ] Sem dependência de banco de dados ou APIs externas.
- [ ] Documentação atualizada (README, plano, logs técnicos).

## 5. Controle de Bloqueios, Dívidas Técnicas e Riscos
Sempre que necessário, registrar itens em `AGENT_LOG/` com:
- contexto do passo;
- descrição objetiva da dívida/bloqueio;
- impacto técnico e funcional;
- plano de mitigação;
- critério de encerramento.

## 6. Instrução de Atualização Contínua
Ao concluir qualquer tarefa:
1. Atualizar checklist do passo correspondente.
2. Atualizar status do passo (`[ ]`, `[-]`, `[x]`, `[!]`).
3. Registrar evidências no log do agente.
4. Confirmar se há pendência de qualidade antes de avançar.
