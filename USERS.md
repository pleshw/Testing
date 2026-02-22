# USERS.md — Normas de Prompt, Intenção e Uso de Agentes

Este documento orienta **usuários do projeto** sobre como escrever prompts e como invocar corretamente os agentes de **planejamento**, **execução** e **avaliação**.

> Objetivo: garantir que toda solicitação esteja alinhada ao protocolo operacional de `AGENTS.md` e ao fluxo do `PLAN.md`.

## 1) Princípios Obrigatórios para Usuários
1. Sempre informe o **resultado esperado** e o **escopo** da solicitação.
2. Sempre explicite o **passo do plano** (quando aplicável) para evitar execução fora da etapa ativa.
3. Não peça para pular fases de planejamento, validação ou registro em log.
4. Prefira prompts com uma única intenção principal por vez (`planeje`, `execute` ou `avalie`).
5. Exija evidências objetivas (arquivos alterados, comandos, resultados de validação).

## 2) Prefixos Padronizados de Intenção
Use os prefixos abaixo no início do prompt.

### 2.1 `planeje`
Use quando quiser validar ou criar planejamento antes da implementação.

**Regra mandatória:** ao começar com `planeje`, o agente deve verificar se o próximo passo já está planejado; se não estiver, deve elaborar o plano/sub-plano necessário antes de qualquer execução.

**Exemplo:**
- `planeje: valide o passo ativo no PLAN.md e prepare o sub-plano detalhado para atualizar a documentação de governança.`

### 2.2 `execute`
Use quando o planejamento já existe e você deseja implementação/edição.

**Regra mandatória:** ao começar com `execute`, o agente deve executar somente o item em andamento do plano ativo, validar o resultado e registrar evidências.

**Exemplo:**
- `execute: implemente a atualização do AGENTS.md conforme o sub-plano do passo ativo e rode as validações cabíveis.`

### 2.3 `avalie`
Use para revisão de qualidade, conformidade, riscos e aderência ao plano.

**Regra mandatória:** ao começar com `avalie`, o agente não deve implementar mudanças estruturais sem retornar diagnóstico e recomendações primeiro.

**Exemplo:**
- `avalie: verifique se USERS.md e AGENTS.md estão sincronizados e aponte lacunas de conformidade.`

## 3) Papéis de Agente e Responsabilidades Inquebráveis

### 3.1 Agente de Planejamento
- Define/atualiza planos e sub-planos conforme `PLAN.md` e `AGENT_LOG`.
- Não deve executar desenvolvimento fora do escopo de planejamento.
- Deve explicitar critérios de qualidade, riscos e critérios de conclusão.

### 3.2 Agente de Execução
- Implementa apenas o que está autorizado no plano/sub-plano ativo.
- Deve validar resultado, registrar evidências e atualizar status real.
- Não deve alterar a ordem macro do `PLAN.md`.

### 3.3 Agente de Avaliação
- Audita conformidade entre solicitado, planejado e entregue.
- Deve verificar checklist, pendências críticas e qualidade das evidências.
- Não deve aprovar avanço se critérios mínimos não forem atendidos.

## 4) Mapa de Decisão Rápida para Usuários
- Se a tarefa ainda está indefinida: use `planeje`.
- Se já existe sub-plano pronto e aprovado: use `execute`.
- Se precisa auditoria, validação de qualidade ou aceite: use `avalie`.



## 4.1) Matriz Rápida — Tipo de Demanda → Prefixo Recomendado
| Tipo de demanda | Prefixo recomendado | Objetivo esperado |
| --- | --- | --- |
| Nova funcionalidade ainda sem escopo fechado | `planeje` | Definir escopo, riscos, critérios e sub-plano antes da execução |
| Correção de bug já reproduzido e com escopo definido | `execute` | Implementar correção e validar com evidências |
| Refatoração técnica com impacto incerto | `planeje` | Estruturar abordagem incremental e critérios de segurança |
| Refatoração já planejada no passo ativo | `execute` | Executar apenas itens autorizados no sub-plano |
| Auditoria de qualidade/conformidade | `avalie` | Diagnosticar aderência e recomendar ações corretivas |
| Revisão de documentação de governança | `avalie` | Verificar consistência entre `USERS.md`, `AGENTS.md` e logs |
| Preparação de checklist de release | `planeje` | Organizar plano de validação final e critérios de aceite |
| Verificação final para aprovar avanço | `avalie` | Emitir decisão com justificativa e pendências remanescentes |

## 5) Boas Práticas ao Iniciar Desenvolvimento no Projeto
1. Leia `README.md`, `PLAN.md` e as regras de `AGENTS.md`.
2. Confirme qual passo está `[-] Em andamento`.
3. Solicite planejamento (`planeje`) quando houver dúvida de escopo.
4. Solicite execução (`execute`) apenas com critério de aceitação definido.
5. Solicite avaliação (`avalie`) antes de encerrar a entrega.

## 6) Regras de Integridade entre Usuário e Agente
- Um pedido do usuário **não deve** forçar quebra de governança do plano.
- Caso um prompt conflite com `AGENTS.md`, o agente deve priorizar conformidade do protocolo e informar limitação.
- Toda entrega deve terminar com rastreabilidade mínima: o que mudou, como foi validado e qual o próximo estado recomendado.
- **Gatilho de sincronização reversa:** se houver mudança de papel/regra em `AGENTS.md`, revisar e sincronizar este `USERS.md` na mesma iteração.



## 6.1) Anti-padrões de Prompt (o que evitar)
- Misturar intenções no mesmo pedido (ex.: planejar + executar + avaliar em um único prompt).
- Solicitar execução sem referência do passo ativo e sem sub-plano.
- Pedir para pular validações, evidências ou atualização de logs.
- Usar objetivos vagos sem escopo e sem critérios de qualidade.

**Exemplo ruim (não usar):**
```txt
execute e avalie e planeje tudo de uma vez: mude qualquer coisa que precisar no projeto e me diga se ficou bom.
```

**Exemplo bom (separado por intenção):**
```txt
planeje: estruture o sub-plano para corrigir a documentação X no passo ativo.
execute: aplique apenas o item 1 do sub-plano e valide com comandos objetivos.
avalie: audite a aderência da entrega aos critérios de qualidade definidos.
```

## 7) Checklist de Prompt de Alta Qualidade (para usuários)
- [ ] Declarei intenção com `planeje`, `execute` ou `avalie`.
- [ ] Informei contexto e objetivo em linguagem objetiva.
- [ ] Defini limites de escopo (o que entra e o que não entra).
- [ ] Solicitei evidências verificáveis.
- [ ] Indiquei expectativa de resultado final (artefato, validação e status).


## 8) Templates Base por Tipo de Prompt
Copie e preencha os modelos abaixo para reduzir ambiguidade e acelerar o trabalho do agente.

### 8.1 Template `planeje`
```txt
planeje: [resumo objetivo da demanda]

Contexto:
- Situação atual:
- Problema a resolver:

Escopo:
- Incluir:
- Não incluir:

Critérios de qualidade esperados:
- [critério 1 mensurável]
- [critério 2 mensurável]

Evidências esperadas:
- [arquivo(s) de plano/log atualizados]
- [status e checklist atualizados]
```

### 8.2 Template `execute`
```txt
execute: [ação principal a implementar]

Referência de planejamento:
- Passo ativo no PLAN.md:
- Sub-plano em AGENT_LOG:

Prioridade e impacto:
- Prioridade: baixa | média | alta | crítica
- Impacto esperado: local | moderado | amplo

Escopo de execução:
- Incluir:
- Não incluir:

Validações exigidas:
- [comando/check 1]
- [comando/check 2]

Entregáveis esperados:
- [arquivos alterados]
- [resumo do que foi implementado]
```

### 8.3 Template `avalie`
```txt
avalie: [objeto da auditoria]

Contexto da avaliação:
- O que será verificado:
- Critério de aceite:

Escopo:
- Incluir:
- Não incluir:

Saída esperada:
- Conformidades encontradas:
- Não conformidades encontradas:
- Recomendações priorizadas:
- Decisão de avanço: aprovado | reprovado

Saída mínima obrigatória:
- Decisão final:
- Justificativa objetiva:
- Ações corretivas recomendadas:
  - Ação:
  - Responsável:
  - Prazo sugerido:
```


## 9) Padrão de Solicitação em Linguagem Natural Mínima (`solicite:`)
Use `solicite:` quando você quiser que o agente **gere um template preenchido da próxima ação**, com o mínimo de texto possível no seu prompt.

**Regra de uso:** `solicite:` é um atalho de facilitação para usuários. O agente deve interpretar a demanda, propor o template mais adequado (`planeje`, `execute` ou `avalie`) e devolver uma versão preenchida pronta para uso.

### 9.1 Template base de entrada do usuário
```txt
solicite: [pedido em linguagem natural]
saída esperada: [formato e nível de detalhe]
```

### 9.2 Exemplo prático (mínimo texto)
```txt
solicite: avaliação completa do plano para facilitar meu entendimento do que foi concluído.
saída esperada: resumo detalhado e recomendações.
```

### 9.3 Resposta esperada do agente
- Informar qual intenção foi selecionada (`planeje`, `execute` ou `avalie`) e por quê.
- Entregar um template preenchido pronto para execução da próxima ação.
- Manter aderência às regras de governança em `AGENTS.md`.
