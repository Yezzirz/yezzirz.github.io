# Identidade visual — QA HUD

Sistema original de interface tecnológica e MMORPG aplicado ao conteúdo profissional existente. Não utiliza personagens, artes, logos ou interfaces de obras de entretenimento.

## Tokens

| Papel | Escuro (padrão) | Claro (opcional) |
| --- | --- | --- |
| Fundo | `#070c19` | `#edf2fa` |
| Painel | `#101b30` | `#fcfdff` |
| Texto principal | `#edf5ff` | `#142841` |
| Texto de apoio | `#9bafca` | `#4c6380` |
| Destaque ciano | `#69e7ff` | `#00677e` |
| Detalhe violeta | `#b6a1ff` | `#6242a4` |
| Detalhe magenta | `#ed9ddd` | `#993b86` |

Inter local para leitura; Bahnschrift/Segoe UI com fallback Inter para títulos; fonte monoespaçada do sistema para rótulos e dados. Sem fontes externas. Não há escalas ou percentuais de habilidade.

## Componentes

- Espaçamento em múltiplos próximos de 4/8 px; seções de 100 px no desktop e 62 px no celular.
- Bordas de 1 px, cantos de 2–5 px e pequenas marcações de HUD. Destaques laterais identificam módulos sem substituir rótulos textuais.
- Transparência discreta nos painéis; desfoque limitado ao cabeçalho. Fundo sólido de fallback.
- Perfil inicial dentro de um painel com cantos técnicos, identificação profissional e módulo de evidência.
- Cards de projetos e investigações com identificadores, badges, rastro de evidência e links originais.
- Competências em módulos conectados, sem indicadores fictícios de nível.
- Experiência em timeline com nós geométricos; formação em painel; contato como terminal de comunicação.
- Páginas de case com índice lateral, etapas numeradas e módulos de comparação/código.
- Botões ciano com texto escuro, foco explícito e links legíveis. Tema claro disponível pela mesma interação anterior.

## Movimento, acesso e desempenho

Hover curto (180–200 ms) em bordas, links e cards; entrada do perfil de 500 ms executada uma vez. Nenhum loop, partícula, vídeo, canvas ou dependência adicional. `prefers-reduced-motion` desativa animações, transições e rolagem suave.

No celular os painéis passam para uma coluna e a decoração de fundo diminui. Conteúdo, ordem de leitura, links, mecanismos de filtro, menu, gráfico histórico e currículo são preservados. O tema inicia escuro e respeita a preferência salva explicitamente pelo visitante.

O CSS de impressão usa cores claras e elimina a decoração. SVG e PNG de compartilhamento seguem a mesma paleta.
