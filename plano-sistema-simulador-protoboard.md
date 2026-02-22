# Plano Completo de Desenvolvimento — Sistema de Simulação de Energia em Protoboard

## 1) Visão do Produto

Desenvolver um sistema desktop/web altamente interativo para montagem e simulação de circuitos em protoboard, com foco em:
- montagem visual por **drag and drop** de componentes, jumpers e fios;
- análise elétrica em tempo real (tensão, corrente e resistência);
- identificação automática de falhas (falta de alimentação, conexões inválidas, trilhas abertas);
- múltiplos modos de visualização técnica;
- usabilidade avançada (menu de contexto, seleção múltipla tipo Windows Explorer, tooltips ricos);
- execução totalmente em memória RAM, sem uso de banco de dados e sem APIs externas.

---

## 2) Escolha Tecnológica e Paradigma

### Linguagem e stack escolhidos
- **TypeScript** como linguagem principal.
- **Frontend:** React + Canvas 2D (ou WebGL opcional para performance avançada).
- **Engine de simulação:** módulo em TypeScript puro, isolado da camada visual.
- **Build/tooling:** Vite + Vitest + Playwright (testes E2E locais).

### Paradigma arquitetural
- **Arquitetura orientada a domínio (DDD leve) + ECS simplificado (Entity-Component-System)** para modelar peças e conexões.
- **Programação reativa baseada em eventos** para sincronizar UI e motor de simulação.
- **Separação clara entre:**
  1. Modelo elétrico (simulação)
  2. Estado de edição (seleção, drag, clipboard)
  3. Renderização

### Justificativa
- TypeScript oferece alta produtividade e segurança de tipos para um domínio com regras complexas.
- React facilita UX rica e estado previsível.
- Engine separada permite testar cálculos sem depender da interface.
- ECS simplifica extensibilidade para kit completo de componentes.

---

## 3) Objetivos Funcionais (escopo obrigatório)

1. Protoboard interativa com grade e trilhas elétricas modeladas.
2. Inserção/remoção/movimentação de componentes via drag and drop.
3. Inserção de jumpers e fios com roteamento visual claro.
4. Kit amplo de componentes eletrônicos simulados.
5. Simulação elétrica com cálculos de resistência, tensão e corrente.
6. Diagnóstico de falhas por fio, trilha, pino e componente.
7. Múltiplos mapas de visualização técnica.
8. Tooltip rico ao passar o mouse na lista de componentes (título/descrição/metadados).
9. Menu de contexto (botão direito) com operações avançadas.
10. Seleção por arraste (retângulo de seleção) com ações em lote.
11. Calculadora integrada com fórmulas úteis de eletrônica.
12. Execução 100% local em RAM (sem banco e sem API externa).

---

## 4) Requisitos Não Funcionais

- **Performance:** atualização visual em até 16 ms em cenários médios (60 FPS alvo na edição).
- **Escalabilidade local:** suportar projetos com centenas de nós/conexões sem travar.
- **Confiabilidade:** resultados de simulação reprodutíveis.
- **Usabilidade:** fluxo intuitivo para iniciante e produtividade para usuário avançado.
- **Acessibilidade:** atalhos de teclado e contraste configurável.
- **Offline-first:** funcionamento completo sem internet.

---

## 5) Arquitetura do Sistema

## 5.1 Módulos principais
1. **Core Domain**
   - Entidades: Protoboard, Trilhas, Nó elétrico, Componente, Pino, Fio, Fonte.
   - Regras elétricas e validações estruturais.

2. **Simulation Engine**
   - Solver DC para análise nodal.
   - Cálculos de corrente, tensão, resistência equivalente e queda de tensão.
   - Diagnóstico de falhas e inconsistências.

3. **Editor Engine**
   - Drag and drop, snapping em furos/trilhas, rotação, espelhamento.
   - Seleção múltipla por caixa.
   - Clipboard interno em RAM (copiar/colar componentes e estruturas).

4. **Rendering Layer**
   - Camadas visuais separadas: base da protoboard, fios, componentes, overlays técnicos.
   - Mapa de calor de tensão/corrente.

5. **UI/UX Layer**
   - Paleta de componentes.
   - Painel de propriedades e inspeção.
   - Calculadora eletrônica integrada.
   - Menu de contexto rico.

6. **Session Memory Manager**
   - Estado global da sessão em RAM.
   - Autosave em memória (snapshots) sem persistência externa.

## 5.2 Fluxo de dados
- Evento de edição → atualização do grafo elétrico → simulação incremental → atualização de overlays e alertas.
- Operações de alto custo (recompute completo) apenas quando necessário.

---

## 6) Modelagem de Domínio

## 6.1 Entidades base
- **BoardModel**: geometria da protoboard, trilhas conectadas internamente.
- **ComponentModel**: metadados e comportamento elétrico.
- **PinModel**: entradas/saídas, polaridade, limites.
- **WireModel/JumperModel**: conexão entre nós.
- **PowerSourceModel**: fonte DC ajustável, limites e proteção.

## 6.2 Kit completo de peças simuladas (mínimo)
- Fontes: bateria, fonte DC regulável.
- Passivos: resistor, potenciômetro, capacitor, indutor.
- Semicondutores: diodo, LED, transistor BJT, MOSFET básico.
- CI e lógica: op-amp genérico, 555, portas lógicas básicas.
- Sensores/atuadores: LDR, botão, buzzer, relé simplificado.
- Instrumentação: multímetro virtual, sonda de tensão/corrente.

Cada peça deve incluir:
- identificação e categoria;
- descrição funcional;
- parâmetros elétricos (faixa de operação, limites máximos);
- metadados para tooltip (título, descrição curta, tags, aplicações).

---

## 7) Motor de Simulação Elétrica

## 7.1 Estratégia
- Construção de um **grafo elétrico** em tempo real.
- Conversão para sistema nodal DC.
- Solver incremental para recalcular apenas regiões impactadas por mudanças.

## 7.2 Cálculos essenciais
- Lei de Ohm (V = R·I).
- Corrente em ramos.
- Queda de tensão por componente e fio.
- Resistência equivalente em redes série/paralelo.
- Verificação de potência dissipada vs limite do componente.

## 7.3 Diagnósticos automáticos
- fio sem continuidade;
- componente sem alimentação;
- pino flutuante crítico;
- sobrecorrente/sobretensão;
- LED sem resistor de proteção;
- diferença entre corrente exigida e fornecida.

## 7.4 Modelo de resultado por componente/pino
Para cada item simulado:
- tensão de entrada/saída;
- corrente de entrada/saída;
- resistência efetiva aplicada no contexto;
- estado (normal, alerta, erro);
- explicação em linguagem simples.

---

## 8) Interação e UX Avançada

## 8.1 Drag and drop
- Arraste da paleta para a placa com snap inteligente.
- Reposicionamento fluido de componentes já inseridos.
- Fios com pontos de controle e reconexão dinâmica.

## 8.2 Seleção múltipla tipo “Windows Explorer”
- Clique e arraste em área vazia cria caixa de seleção.
- Interseção seleciona múltiplos elementos.
- Ações em lote: mover, copiar, excluir, agrupar logicamente.

## 8.3 Menu de contexto (clique direito)
Por componente/fio/jumper:
- copiar;
- colar (quando aplicável);
- duplicar;
- excluir;
- rotacionar;
- bloquear posição;
- abrir propriedades avançadas;
- destacar conexões elétricas relacionadas.

## 8.4 Tooltip rico na lista de componentes
Ao hover em item da biblioteca:
- título;
- descrição prática;
- metadados (faixa de tensão, corrente máxima, encapsulamento, usos comuns);
- ícones de complexidade e risco de uso incorreto.

---

## 9) Mapas e Modos de Visualização

1. **Modo Montagem (padrão):** foco visual limpo para montagem.
2. **Mapa de Tensão:** cores por potencial elétrico em nós, fios e pinos.
3. **Mapa de Corrente:** intensidade por espessura/cor do fluxo.
4. **Mapa de Resistência:** resistência equivalente e quedas dominantes.
5. **Mapa de Continuidade:** destaca circuitos abertos/fechados.
6. **Mapa de Diagnóstico:** exibe alertas, severidade e recomendação.

Ao selecionar um componente/fio:
- painel lateral mostra entrada/saída de energia por pino;
- valores instantâneos (V, I, R, P);
- histórico curto em memória (janela temporal recente).

---

## 10) Calculadora de Fórmulas Eletrônicas

## 10.1 Funções obrigatórias
- cálculo de resistor para LED (dados: Vfonte, Vled, I alvo);
- divisor de tensão;
- potência em resistor;
- associação de resistores (série/paralelo);
- estimativa de autonomia simples para bateria em carga DC.

## 10.2 Integração com o circuito
- botão “aplicar no projeto” para inserir valor calculado em componente selecionado;
- validação imediata no motor de simulação após aplicação.

---

## 11) Estado em RAM (sem banco/API)

- Todos os dados ficam em estruturas de memória locais.
- Biblioteca de componentes embarcada no bundle da aplicação.
- Sessão temporária com snapshots em memória.
- Exportação/importação opcional via arquivo local (JSON), sem backend.

---

## 12) Segurança de Simulação e Integridade

- Guardrails para impedir estados inválidos (ex.: pino conectado a si mesmo de forma inconsistente).
- Sistema de validação antes de executar simulação completa.
- Mensagens orientativas para correção rápida (não apenas erro técnico).

---

## 13) Qualidade e Testes

## 13.1 Testes por camada
- **Unitários:** fórmulas elétricas, regras de conectividade, diagnóstico.
- **Integração:** edição + simulação + overlays.
- **E2E:** fluxos de usuário (montar circuito, detectar erro, corrigir).
- **Teste de performance:** cenários com grande volume de componentes.

## 13.2 Critérios de aceite
- valores calculados coerentes com tolerância definida;
- interface responsiva durante drag and drop;
- diagnóstico correto para falhas comuns;
- mapas de visualização consistentes com o solver.

---

## 14) Roadmap de Implementação

## Fase 1 — Fundação (Semanas 1-2)
- setup do projeto, design system base e arquitetura modular;
- modelagem inicial da protoboard e conexão por nós;
- drag and drop básico com snap.

## Fase 2 — Simulação inicial (Semanas 3-4)
- grafo elétrico e solver DC básico;
- cálculos fundamentais (V, I, R);
- feedback visual mínimo de tensão.

## Fase 3 — Interatividade avançada (Semanas 5-6)
- menu de contexto rico;
- seleção múltipla por caixa;
- clipboard de estruturas;
- tooltips ricos na biblioteca.

## Fase 4 — Diagnóstico e mapas técnicos (Semanas 7-8)
- detecção de falhas automática;
- mapas de corrente, resistência e continuidade;
- painel detalhado por pino/componente.

## Fase 5 — Calculadora e refinamento visual (Semanas 9-10)
- calculadora eletrônica integrada;
- aplicação direta de resultados no circuito;
- refinamento UI/UX para alta intuitividade.

## Fase 6 — Estabilização (Semanas 11-12)
- testes completos, otimizações e polimento;
- validação com cenários reais de uso;
- preparação para release.

---

## 15) Backlog Inicial Priorizado

## Prioridade Alta
- modelagem da protoboard;
- drag and drop de componentes e fios;
- solver elétrico DC básico;
- diagnóstico de falta de tensão/corrente;
- mapa de tensão;
- menu de contexto com copiar/excluir.

## Prioridade Média
- seleção por caixa com ações em lote;
- mapas extras (corrente, resistência, continuidade);
- calculadora integrada e aplicação de valores.

## Prioridade Baixa
- recursos visuais avançados (animações opcionais);
- presets de projetos prontos;
- personalização avançada de temas.

---

## 16) Definição de Pronto (Definition of Done)

Um incremento será considerado pronto quando:
- funcionalidade implementada com cobertura de testes adequada;
- comportamento elétrico validado em cenários de referência;
- UX consistente com os padrões de interação definidos;
- sem dependência de banco de dados ou API externa;
- documentação de uso atualizada.

---

## 17) Resultado Esperado

Ao final, o sistema permitirá que o usuário:
- monte circuitos complexos de forma intuitiva;
- visualize como a energia percorre a protoboard em diferentes mapas;
- entenda, em detalhes, tensão/corrente/resistência por ponto do circuito;
- diagnostique rapidamente problemas de alimentação e conexão;
- use uma calculadora integrada para decisões de projeto eletrônico.
