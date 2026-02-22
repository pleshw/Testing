# AGENTS.md — Protocolo Operacional do Repositório

Este arquivo define instruções obrigatórias para agentes que atuarem neste repositório.
Escopo: todo o diretório raiz e subpastas.

## 1) Mandamentos Operacionais (Imperativos)
1. **Leia integralmente `PLAN.md` antes de qualquer modificação de código, documento ou configuração.**
2. **Não execute tarefas fora do passo ativo do plano.**
3. **Crie ou atualize um sub-plano da tarefa atual em `./AGENT_LOG/plano_execucao_passo_x.md` antes de implementar.**
4. **Use checklist descritiva e altamente detalhada no sub-plano; inclua critérios objetivos de qualidade por item.**
5. **Somente avance para o próximo passo quando a checklist do plano mais recente estiver 100% concluída.**
6. **Nunca crie passos adicionais no plano mais recente.** O plano macro só pode ser criado/alterado pelo agente responsável por planejamento.
7. **Registre evidências de execução** (arquivos alterados, comandos, resultados de teste, validações) no log do passo.
8. **Atualize status real de progresso** em todos os artefatos de planejamento usados (`PLAN.md` + sub-plano em `AGENT_LOG`).

## 2) Sequência Obrigatória de Execução
1. Ler `PLAN.md`.
2. Identificar passo ativo e tarefa exata.
3. Verificar existência de `AGENT_LOG/plano_execucao_passo_x.md`.
4. Se não existir, criar o arquivo com:
   - objetivo da tarefa;
   - escopo e não-escopo;
   - checklist detalhada;
   - expectativas de qualidade por item;
   - riscos iniciais e mitigação;
   - critérios de conclusão.
5. Se existir, atualizar progresso antes de qualquer novo trabalho.
6. Executar implementação somente do item em andamento.
7. Rodar validações/testes cabíveis.
8. Registrar evidências e atualizar checklist.
9. Confirmar conclusão total do sub-plano atual antes de encerrar ou avançar.

## 3) Estrutura Obrigatória de `AGENT_LOG/`
Quando atuar em um passo, use os arquivos abaixo:

- `AGENT_LOG/plano_execucao_passo_x.md`  
  Sub-plano operacional do passo atual.

- `AGENT_LOG/dividas_tecnicas_passo_x.md`  
  Registro de débitos técnicos identificados no passo atual.

- `AGENT_LOG/expectativas_pendentes_passo_x.md`  
  Registro de expectativas de qualidade ainda não cumpridas.

> Regra: se não houver dívida/pendência, manter arquivo com status “sem pendências” e data da última verificação.

## 4) Padrão Mínimo dos Logs
Cada arquivo de log deve conter:
- cabeçalho com passo, data e responsável;
- contexto da tarefa;
- checklist com status (`[ ]`, `[-]`, `[x]`, `[!]`);
- evidências rastreáveis;
- próximo estado recomendado;
- bloqueios e decisão tomada.

## 5) Política de Ferramentas e Reutilização (Modo Agente)
1. **Mapeie ferramentas úteis antes de iniciar implementação** (build, testes, lint, scripts, utilitários).
2. **Armazene um inventário reutilizável de ferramentas/comandos** no sub-plano do passo atual.
3. **Reutilize scripts e comandos já validados** antes de criar novos fluxos.
4. **Evite duplicação operacional:** prefira funções/scripts internos do repositório.
5. **Registre falhas recorrentes e workarounds** para reduzir retrabalho entre execuções.

## 6) Política de Qualidade por Etapa
- Nenhuma etapa é considerada concluída sem:
  - checklist 100% completa;
  - critérios de qualidade atendidos;
  - evidências registradas;
  - ausência de pendências críticas em `dividas_tecnicas` e `expectativas_pendentes`.
- Caso exista pendência não crítica, registrar justificativa explícita e plano de quitação.

## 7) Regras de Integridade do Planejamento
- Não alterar a ordem macro de passos de `PLAN.md` durante execução técnica.
- Não inserir novas fases, checkpoints ou macroentregas no plano mais recente.
- Mudanças estruturais de planejamento exigem tarefa específica de planejamento.

## 8) Critério de Bloqueio de Avanço
Um agente **deve interromper avanço** se qualquer condição abaixo ocorrer:
- checklist do sub-plano atual incompleta;
- expectativa de qualidade crítica não atendida;
- ausência de evidência mínima de validação;
- dívida técnica com risco alto sem mitigação definida.

## 9) Template de Sub-plano Obrigatório
Arquivo: `AGENT_LOG/plano_execucao_passo_x.md`

```md
# Sub-plano de Execução — Passo X

## Contexto
- Objetivo:
- Escopo:
- Não-escopo:

## Inventário de Ferramentas Reutilizáveis
- Comando/script:
- Finalidade:
- Status de validação:

## Checklist Detalhada da Tarefa Atual
- [ ] Item 1
  - Expectativas de qualidade:
  - Evidências esperadas:
- [ ] Item 2
  - Expectativas de qualidade:
  - Evidências esperadas:

## Progresso
- Status geral:
- Última atualização:

## Riscos e Mitigações
- Risco:
- Mitigação:

## Critérios de Conclusão
- [ ] Critério 1
- [ ] Critério 2
```

## 10) Template de Dívida Técnica
Arquivo: `AGENT_LOG/dividas_tecnicas_passo_x.md`

```md
# Dívidas Técnicas — Passo X
- Status: sem pendências | com pendências

## Itens
- [ ] Dívida:
  - Impacto:
  - Severidade:
  - Plano de quitação:
  - Prazo sugerido:
```

## 11) Template de Expectativas Pendentes
Arquivo: `AGENT_LOG/expectativas_pendentes_passo_x.md`

```md
# Expectativas Pendentes — Passo X
- Status: sem pendências | com pendências

## Itens
- [ ] Expectativa não cumprida:
  - Impacto:
  - Evidência faltante:
  - Ação corretiva:
  - Critério de aceite para fechamento:
```

## 12) Regra Final de Conduta
**Planejar, executar, validar, registrar e só então avançar.**
Sem cumprimento dessa sequência, a execução deve ser considerada incompleta.
