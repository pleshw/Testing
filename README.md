# Sistema de Simulação de Energia em Protoboard

## Visão geral
Este projeto tem como objetivo entregar uma aplicação desktop/web altamente interativa para montagem e simulação de circuitos em protoboard, com análise elétrica em tempo real e foco em experiência de uso avançada.

A proposta combina:
- montagem visual por drag and drop de componentes, fios e jumpers;
- simulação elétrica DC incremental (tensão, corrente, resistência e potência);
- diagnóstico automático de falhas de alimentação e conectividade;
- múltiplos modos de visualização técnica;
- operação 100% local em memória RAM (sem banco de dados e sem API externa).

## Objetivos principais
- Permitir que usuários montem e validem circuitos de forma intuitiva.
- Explicar o comportamento elétrico por nó, pino e componente.
- Ajudar na detecção e correção de erros comuns em protoboard.
- Oferecer ferramentas de apoio ao aprendizado e ao projeto eletrônico (calculadora integrada e instrumentação virtual).

## Escopo funcional obrigatório
1. Protoboard interativa com grade e trilhas modeladas.
2. Inserção, remoção e movimentação de componentes por drag and drop.
3. Inserção de jumpers e fios com roteamento visual claro.
4. Biblioteca ampla de componentes eletrônicos simulados.
5. Simulação elétrica em tempo real com cálculos de V, I e R.
6. Diagnóstico de falhas por fio, trilha, pino e componente.
7. Mapas de visualização técnica (tensão, corrente, resistência, continuidade e diagnóstico).
8. Tooltips ricos na biblioteca de componentes.
9. Menu de contexto com operações avançadas.
10. Seleção múltipla por caixa e ações em lote.
11. Calculadora eletrônica integrada com aplicação no circuito.
12. Execução totalmente local (offline-first).

## Arquitetura proposta
- **Linguagem:** TypeScript.
- **Frontend:** React + Canvas 2D (WebGL opcional para otimização avançada).
- **Engine de simulação:** módulo TypeScript isolado da camada visual.
- **Tooling:** Vite + Vitest + Playwright.
- **Paradigma:** DDD leve + ECS simplificado + fluxo reativo por eventos.

### Módulos centrais
- **Core Domain:** entidades e regras do domínio elétrico.
- **Simulation Engine:** solver nodal DC e diagnósticos.
- **Editor Engine:** edição visual (snap, seleção, clipboard).
- **Rendering Layer:** camadas gráficas e overlays técnicos.
- **UI/UX Layer:** biblioteca, painel de propriedades, menus e calculadora.
- **Session Memory Manager:** snapshots e estado global em RAM.

## Requisitos de qualidade
- Atualização visual alvo de até 16 ms em cenários médios (60 FPS).
- Simulações reprodutíveis e consistentes.
- Escalabilidade para centenas de nós e conexões.
- Acessibilidade com atalhos de teclado e contraste configurável.
- Mensagens de diagnóstico orientativas para correção rápida.

## Kit mínimo de componentes
- Fontes: bateria e fonte DC regulável.
- Passivos: resistor, potenciômetro, capacitor, indutor.
- Semicondutores: diodo, LED, transistor BJT e MOSFET básico.
- CI/Lógica: op-amp genérico, 555, portas lógicas.
- Sensores/atuadores: LDR, botão, buzzer e relé simplificado.
- Instrumentação: multímetro virtual e sondas de tensão/corrente.

## Roadmap resumido
- **Fase 1:** fundação arquitetural, protoboard e drag and drop básico.
- **Fase 2:** grafo elétrico + solver DC inicial + feedback de tensão.
- **Fase 3:** interatividade avançada (context menu, seleção múltipla, clipboard, tooltips).
- **Fase 4:** diagnósticos avançados e mapas técnicos.
- **Fase 5:** calculadora integrada e refinamento visual.
- **Fase 6:** estabilização, testes completos e preparação para release.

## Diretrizes operacionais do repositório
- O plano executivo detalhado está em `PLAN.md`.
- As regras de atuação de agentes e governança de execução estão em `AGENTS.md`.
- O plano de referência original do sistema está em `plano-sistema-simulador-protoboard.md`.

## Estrutura inicial
- `src/core`: modelos de domínio e lógica de base (grid, protoboard, tipos).
- `src/editor`: estado de edição e contratos.
- `src/simulation`: contratos de simulação.
- `src/rendering`: camada visual e overlays (em evolução).
- `src/ui`: componentes visuais e configuração de layout.
- `src/session`: controle de sessão em memória (em evolução).

## Como executar
1. `npm install`
2. `npm run dev`
3. `npm run test`

## Resultado esperado
Ao final do desenvolvimento, a aplicação deve permitir montagem de circuitos complexos com feedback elétrico confiável, visualizações técnicas claras e diagnósticos úteis para aprendizado e tomada de decisão em projetos eletrônicos.
