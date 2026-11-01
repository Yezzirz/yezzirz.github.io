# Otavio Alves — QA & Software Testing

Portfólio profissional estático com projetos, quatro estudos de caso, competências contextualizadas, experiência prática, formação e contato.

**Site:** https://yezzirz.github.io/  
**Perfil:** https://github.com/Yezzirz

Identidade visual original de HUD/MMORPG futurista, com tema escuro padrão e alternativa clara. Tokens, componentes e regras de movimento estão em [docs/design-system.md](docs/design-system.md).

## Executar localmente

Não há dependências para instalar nem etapa de build. Use Node.js 22 ou mais recente:

```sh
node tools/serve.mjs
```

Abra `http://127.0.0.1:8793`. Para outra porta: `node tools/serve.mjs 8794`. O servidor atende somente em loopback. Encerre com Ctrl+C.

Alternativa: `python -m http.server 8793 --bind 127.0.0.1` na raiz do repositório. O site também funciona sem JavaScript; o script adiciona tema, menu móvel, filtros e comparação de medições históricas.

## Editar

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Apresentação, projetos, competências, experiência, formação e contato |
| `cases/*.html` | Estudos de caso com fontes e distinção entre observação e hipótese |
| `assets/style.css` | Estilos, temas claro/escuro, responsividade e impressão |
| `assets/app.js` | Menu, filtros, tema e comparação de p95 |
| `downloads/Otavio_Alves_Curriculo_QA.pdf` | Currículo disponibilizado no site |
| `docs/estudo-de-quadros.md` | Síntese pública de medições históricas do projeto independente |
| `docs/fontes.md` | Rastreabilidade do conteúdo e limites das alegações |
| `privacidade.html` | Informações de privacidade do site |
| `profile/README.md` | Cópia do README profissional destinado ao perfil GitHub |

Ao trocar o currículo, preserve o nome ou atualize todos os links. Ao adicionar uma página, inclua-a no sitemap. Revise datas e estados dos bugs antes de alterar suas conclusões. Não inclua novas tecnologias apenas porque aparecem como dependência transitiva.

## Verificar

```sh
node --check assets/app.js
node tools/check.mjs
```

O verificador confere links locais, âncoras, estrutura de títulos, metadados, referências do currículo e padrões de conteúdo que não devem ser publicados. Não executa testes nos sistemas descritos nos cases. A CI repete essas verificações em pushes e pull requests.

Antes de publicar, conferir no navegador em desktop e celular: navegação por teclado, menu, todos os filtros, tema e persistência, links dos cases, download do currículo e seletor do gráfico. Respeita `prefers-reduced-motion`.

## Publicar no GitHub Pages

1. Use o repositório público `Yezzirz/yezzirz.github.io`.
2. Em **Settings → Pages → Build and deployment**, escolha **Deploy from a branch**.
3. Selecione a branch **main**, pasta **/(root)** e salve.
4. Envie alterações com `git push origin main`.
5. Aguarde a execução de Pages em Actions e confira **Visit site** nas configurações.

O arquivo `.nojekyll` mantém a publicação estática. O domínio é `https://yezzirz.github.io/`. Em fork ou outro repositório, ajuste canonical, Open Graph, sitemap e URL do site nos READMEs. Não há domínio próprio, backend, formulário ou chave de API para configurar.

## Conteúdo e privacidade

- Voluntariado, estudo, desafio técnico e projetos pessoais estão identificados pela natureza real.
- Hipóteses de causa não são apresentadas como causa raiz comprovada.
- Resultados de testes e desempenho referem-se às execuções históricas documentadas; não são métricas atuais nem garantias.
- O case de desempenho sintetiza trabalho assistido por IA. Os arquivos privados completos não são republicados.
- YezCoins permanece com código privado; o site aponta apenas para sua demonstração pública.
- Sem analytics, rastreadores, formulários ou fontes remotas. O tema usa localStorage opcional.
- Não publicar relatórios de candidaturas, CPF, endereço residencial, contas, logs pessoais, bancos de dados ou segredos.
- O currículo público contém contatos profissionais confirmados. Para trocar contatos, revisar também o PDF.

## Fonte tipográfica

Inter, hospedada localmente. Licença em `assets/FONT-LICENSE.txt`.

## Perfil GitHub

O perfil é um repositório separado, `Yezzirz/Yezzirz`. O arquivo `profile/README.md` desta pasta é uma cópia de manutenção. Alterá-lo aqui não atualiza o perfil automaticamente; copie o conteúdo para o `README.md` do repositório do perfil.
