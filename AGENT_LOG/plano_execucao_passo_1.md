# Sub-plano de Execução — Passo 1

## Cabeçalho
- Passo: 1
- Data: 2026-02-22
- Responsável: GPT-5.2-Codex

## Contexto
- Objetivo: Atualizar o arquivo `AGENTS.md` com dois novos imperativos solicitados pelo usuário, mantendo consistência com o protocolo operacional.
- Escopo: Alterações textuais em `AGENTS.md`, atualização de status no `PLAN.md` e registro completo de evidências nos artefatos de `AGENT_LOG`.
- Não-escopo: Alterações de código-fonte da aplicação, criação de novos passos no plano macro, mudanças estruturais de arquitetura.

## Inventário de Ferramentas Reutilizáveis
- Comando/script: `cat PLAN.md`
  - Finalidade: Ler integralmente o plano macro antes de qualquer modificação.
  - Status de validação: validado
- Comando/script: `cat AGENTS.md`
  - Finalidade: Inspecionar conteúdo atual e pontos corretos de inserção dos novos imperativos.
  - Status de validação: validado
- Comando/script: `python - <<'PY' ... PY`
  - Finalidade: Atualização textual rastreável em `AGENTS.md` e `PLAN.md` sem alterar escopo funcional.
  - Status de validação: validado
- Comando/script: `git diff -- AGENTS.md PLAN.md AGENT_LOG/*`
  - Finalidade: Validar escopo final das mudanças.
  - Status de validação: validado

## Checklist Detalhada da Tarefa Atual
- [x] Mapear estado atual dos artefatos de planejamento e identificar passo ativo.
  - Expectativas de qualidade: Identificação explícita e justificável do passo utilizado para registro.
  - Evidências esperadas: Saída de leitura de `PLAN.md` e atualização do bloco de progresso.
- [x] Inserir os 2 novos imperativos em `AGENTS.md` de forma clara e normativa.
  - Expectativas de qualidade: Texto inequívoco, sem ambiguidade semântica, alinhado ao estilo imperativo já existente.
  - Evidências esperadas: Diff mostrando os novos itens inseridos.
- [x] Atualizar status real de progresso em `PLAN.md` e registrar execução.
  - Expectativas de qualidade: Status coerente com tarefa documental executada no escopo do passo atual.
  - Evidências esperadas: Diff no `PLAN.md`.
- [x] Validar alterações e registrar evidências finais no log.
  - Expectativas de qualidade: Checklist 100% concluída, comandos e resultados documentados, sem bloqueios críticos.
  - Evidências esperadas: `git diff`, `git status`, atualização final deste sub-plano.

## Progresso
- Status geral: concluído
- Última atualização: 2026-02-22

## Riscos e Mitigações
- Risco: Conflito entre instruções do usuário e governança atual do plano.
  - Mitigação: Restringir alterações ao escopo pedido e registrar justificativa no log.
- Risco: Falta de rastreabilidade de execução.
  - Mitigação: Registrar comandos exatos e atualizar todos os arquivos de log obrigatórios.

## Critérios de Conclusão
- [x] Dois novos imperativos adicionados ao `AGENTS.md`.
- [x] Artefatos de `AGENT_LOG` para o passo atual presentes e atualizados.
- [x] `PLAN.md` com status de progresso refletindo a execução atual.
- [x] Alterações validadas e prontas para commit.

## Evidências de Execução
- `cat PLAN.md` executado com leitura integral concluída.
- `cat AGENTS.md` executado para inspeção do conteúdo anterior.
- Atualização documental aplicada em `AGENTS.md` e `PLAN.md`.
- `git diff -- AGENTS.md PLAN.md AGENT_LOG/*` executado para validação de escopo.

## Próximo estado recomendado
- Realizar commit com mensagem descritiva e publicar PR da atualização documental.

## Bloqueios e decisão tomada
- Bloqueios: nenhum.
- Decisão: tarefa concluída com conformidade de checklist e sem pendências críticas.
