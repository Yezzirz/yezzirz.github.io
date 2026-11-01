# Diagnóstico de quadros — síntese pública

## Origem e participação
Síntese de registros de 30/09/2026 de um projeto independente de MMORPG em navegador, desenvolvido e investigado por Otavio Alves com apoio de agentes de IA. O código de origem e os artefatos completos permanecem privados. Esta síntese é uma transcrição editorial de resultados e limitações, não uma nova medição.

## Método
17 capturas: controle sem mapa, cenários A–F nos renderers legacy e cached, verificações adicionais de coletor/cena e repetição de B. Windows e Chrome, viewport 1920×1080, DPR 1, cinco segundos de aquecimento e quinze segundos de captura. Estado temporário, sem autenticação ou progresso persistido. Foco e visibilidade registrados por quadro. Não houve gravação de DevTools durante a sequência A–F.

FPS é 1000 dividido pela média dos intervalos rAF. Render JS é duração síncrona de preparação/envio de desenhos; não isola GPU, rasterização ou composição. p95 usa posto mais próximo. Uma linha corresponde a uma captura, sem inferência estatística de várias rodadas.

## Resultados históricos
| Cenário | Renderer | FPS rAF | p95 (ms) | Maior intervalo (ms) |
| --- | --- | ---: | ---: | ---: |
| A: parado, cache frio | legacy | 6,36 | 529,8 | 1030,1 |
| A | cached | 89,60 | 10,1 | 70,0 |
| B: parado, aquecido | legacy | 7,25 | 359,9 | 540,2 |
| B | cached | 100,00 | 10,1 | 10,2 |
| C: caminhada cacheada | legacy | 8,79 | 300,1 | 1020,0 |
| C | cached | 100,00 | 10,1 | 10,2 |
| D: regiões novas | legacy | 14,03 | 80,1 | 150,1 |
| D | cached | 87,19 | 20,0 | 30,1 |
| E: auto-hunt | legacy | 13,86 | 80,1 | 120,0 |
| E | cached | 96,26 | 10,2 | 20,2 |
| F: auto-hunt + efeitos | legacy | 14,04 | 80,1 | 100,0 |
| F | cached | 95,86 | 10,2 | 20,2 |

## Descobertas e limites
No intervalo de 1030,1 ms em A legacy, ocorreram 20 callbacks de timer e 10 ticks de lógica. Portanto, não houve uma interrupção contínua de toda a execução JavaScript pelo intervalo completo.

Em D cached, a construção de cache consumiu no máximo 1,70 ms por quadro; 181 intervalos superaram 16,67 ms. Reconstruções, descartes e retorno ao desenho individual tiveram associação com mais trabalho nas bordas, sem isolamento causal de cada componente.

As pausas históricas do renderer cached não foram reproduzidas. A causa interna das pausas legacy, assim como a queda histórica a 25–30 FPS, não foi determinada. GPU, GC, composição, driver e agendamento não podem ser apontados como causa comprovada. A investigação ampliou instrumentação e ensaios e não alterou a política do cache.

As medições não garantem FPS em outras máquinas, em rede fria, com interface completa, em sessões longas ou em todos os cenários. Não há afirmação de redução geral de CPU ou memória.
