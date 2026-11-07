# Dentro da menor unidade da vida

Site educativo e interativo sobre **membrana plasmática, tipos de célula e tecidos**, em português do Brasil, para estudantes do ensino médio e dos primeiros períodos da faculdade.

Feito só com **HTML, CSS e JavaScript puros** — sem framework e sem etapa de build. Basta abrir o `index.html`.

> Aviso: site educativo. Não substitui livros didáticos, aulas nem orientação de profissionais de saúde.

---

## Estrutura dos arquivos

```
index.html            página única, com todas as seções
css/base.css          cores, tipografia, layout, componentes e estilos das ilustrações
css/animacoes.css     keyframes, revelações ao rolar, cursor, movimento reduzido
js/dados.js           conteúdo em objetos (partes da célula, rótulos, textos da viagem)
js/core.js            tema, menu, barra de leitura, revelações, rótulos, painel, lupa
js/animacoes.js       abertura com partículas, viagem de escala, membrana viva
README.md             este arquivo
```

Arquivos que chegam nas próximas etapas: `js/celula3d.js`, `js/membrana.js`, `js/simuladores.js`, `js/histologia.js`, `js/quiz.js`, `js/jogo.js`.

### Como adicionar uma seção nova
1. Crie uma `<section id="..." class="secao" data-nav="Nome no menu">` dentro de `<main>`.
2. O menu é montado sozinho a partir do atributo `data-nav`.
3. Para animar a entrada de um elemento, use `data-revelar="foco"`, `"brotar"`, `"onda"` ou `"mascara"`.

### Como adicionar uma ilustração clicável
1. Desenhe o SVG com `class="ilustracao"` dentro de `<div class="figura-interativa" data-figura="nome">`.
2. Marque cada parte com `data-parte="chave"` (a chave precisa existir em `DADOS.partes`, no `js/dados.js`).
3. Cadastre os rótulos em `DADOS.figuras.nome` (posição da ponta da seta e lado). No celular, a figura troca os nomes por números automaticamente.

---

## Como testar no computador

Abrir o `index.html` direto no navegador funciona. Para testar como no GitHub Pages, rode um servidor simples na pasta do projeto:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

---

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (por exemplo, `menor-unidade-da-vida`).
2. Envie todos os arquivos **mantendo as pastas** (`css/` e `js/`), com o `index.html` na raiz:
   ```bash
   git init
   git add .
   git commit -m "Etapa 1 do site"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/menor-unidade-da-vida.git
   git push -u origin main
   ```
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
5. Em **Branch**, escolha **main** e a pasta **/ (root)**. Clique em **Save**.
6. Espere de 1 a 2 minutos e recarregue a página de Settings → Pages: o endereço do site aparece no topo (algo como `https://SEU-USUARIO.github.io/menor-unidade-da-vida/`).

Todos os caminhos do site são relativos (`css/...`, `js/...`), então ele funciona dentro da subpasta do GitHub Pages sem nenhuma configuração extra.

---

## Acessibilidade e desempenho

- Botão de **animações** no topo: desliga partículas, cursor personalizado e efeitos pesados (a escolha fica salva).
- `prefers-reduced-motion` é respeitado: o site mostra versões estáticas da abertura e da viagem de escala.
- Modo **claro/escuro** (a escolha fica salva).
- Ilustrações com `title`/`desc`, legenda clicável por teclado e painel de informações que devolve o foco ao fechar (tecla Esc).
- Canvas com pixel ratio máximo de 1,5 e animações pausadas fora da tela; menos partículas em aparelhos fracos.

## Paleta de cores

Fundo verde-petróleo profundo, como o campo escuro de um microscópio, com acentos luminosos que **identificam estruturas em todo o site**:
ciano = membrana · violeta = núcleo e proteínas · coral = mitocôndria e colesterol · lima = ribossomos, glicocálice e destaques · âmbar = Golgi e caudas dos fosfolipídios · verde = cloroplasto.
No modo claro, as mesmas cores ficam mais escuras para manter o contraste.

## Fontes de referência

- JUNQUEIRA, L. C.; CARNEIRO, J. *Histologia Básica*. Guanabara Koogan.
- ALBERTS, B. et al. *Biologia Molecular da Célula*. Artmed.
- HALL, J. E.; GUYTON, A. C. *Tratado de Fisiologia Médica*. Elsevier.

Tipografia: Bricolage Grotesque (títulos), Atkinson Hyperlegible (texto, pensada para leitura fácil) e JetBrains Mono (rótulos), via Google Fonts.
