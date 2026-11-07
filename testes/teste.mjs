// Testes do site: conferência dos dados + navegação no Chrome headless.
// Uso (na pasta do projeto): node testes/teste.mjs [pasta-das-fotos]
import { abrir, sleep } from './cdp.mjs';
import { join } from 'node:path';
import { mkdirSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';

const RAIZ = join(import.meta.dirname, '..');
const URL = pathToFileURL(join(RAIZ, 'index.html')).href;
const FOTOS = process.argv[2] || join(import.meta.dirname, 'fotos');
mkdirSync(FOTOS, { recursive: true });
const resultados = [];
const checar = (nome, ok, info = '') => { resultados.push({ nome, ok, info }); console.log((ok ? 'OK   ' : 'FALHA') + ' ' + nome + (info ? '  -> ' + info : '')); };
const quadros = (n = 3) => `new Promise(r => { let k = ${n}; (function f(){ if (--k <= 0) r(); else requestAnimationFrame(f); })(); })`;

// ---------- Conferência dos dados (sem navegador) ----------
function conferirDados() {
  console.log('\n=== Dados (js/dados.js e index.html) ===');
  const ctx = { window: {} };
  vm.runInNewContext(readFileSync(join(RAIZ, 'js', 'dados.js'), 'utf8'), ctx);
  const partes = ctx.window.DADOS.partes;
  const chaves = Object.keys(partes);
  const campos = ['nome', 'simples', 'tecnico', 'lembrar', 'curiosidade'];
  const faltando = chaves.flatMap(k => campos.filter(c => typeof partes[k][c] !== 'string' || !partes[k][c].trim()).map(c => k + '.' + c));
  checar('toda parte tem nome, simples, tecnico, lembrar e curiosidade', faltando.length === 0, faltando.join(', '));
  const comFuncao = chaves.filter(k => 'funcao' in partes[k]);
  checar('nenhuma parte usa mais o campo antigo "funcao"', comFuncao.length === 0, comFuncao.join(', '));
  const longas = chaves.filter(k => partes[k].simples.trim().split(/\s+/).length > 15);
  checar('"Em poucas palavras" com até 15 palavras', longas.length === 0, longas.join(', '));
  const repetidas = chaves.filter(k => new Set(['simples', 'tecnico', 'lembrar', 'curiosidade'].map(c => partes[k][c].trim())).size < 4);
  checar('nenhum campo repete outro na mesma parte', repetidas.length === 0, repetidas.join(', '));
  const html = readFileSync(join(RAIZ, 'index.html'), 'utf8');
  const usadas = new Set([...html.matchAll(/data-parte="([^"]+)"/g)].map(m => m[1]));
  Object.values(ctx.window.DADOS.figuras).forEach(f => f.rotulos.forEach(r => usadas.add(r[0])));
  const semDados = [...usadas].filter(k => !partes[k]);
  checar('toda parte usada no HTML e nos rótulos existe nos dados', semDados.length === 0, semDados.join(', '));
  const core = readFileSync(join(RAIZ, 'js', 'core.js'), 'utf8');
  checar('core.js não lê mais d.funcao', !/d\.funcao/.test(core));
}
conferirDados();

async function rolarPara(b, expr) { await b.avaliar(`window.scrollTo({ top: ${expr}, behavior: "instant" }); ${quadros(4)}`); await sleep(150); }

async function cenario(nome, tela) {
  console.log(`\n=== ${nome} (${tela.w}x${tela.h}) ===`);
  const b = await abrir({ porta: 9333 + Math.floor(Math.random() * 500) });
  try {
    await b.tela(tela);
    await b.ir(URL);
    await sleep(3200);
    await b.foto(join(FOTOS, `${nome}-1-hero.png`));

    checar('sem erros de JS no carregamento', b.erros.length === 0, b.erros.join(' | '));
    checar('Celula carregou', await b.avaliar('!!window.Celula'));

    // Tecido: existe exatamente uma célula em foco, centrada no alvo
    checar('tecido: uma célula .foco', await b.avaliar(`document.querySelectorAll('[data-gerar="tecido"] .vj-cel.foco').length`) === 1);

    // Hero no meio do mergulho
    await rolarPara(b, `document.querySelector('#inicio').offsetHeight * 0.35`);
    await sleep(400);
    await b.foto(join(FOTOS, `${nome}-2-mergulho.png`));

    // Viagem em 3 pontos
    for (const [k, frac] of [[1, 0.1], [2, 0.3], [3, 0.5], [4, 0.95]]) {
      await rolarPara(b, `(() => { const s = document.querySelector('#viagem'); return s.offsetTop + (s.offsetHeight - innerHeight) * ${frac}; })()`);
      await sleep(600);
      await b.foto(join(FOTOS, `${nome}-3-viagem-${k}.png`));
    }
    // Legendas não vazam
    const leg = await b.avaliar(`(() => { const ol = document.querySelector('#viagem-legendas'); const m = Math.max(...[...ol.children].map(li => li.scrollHeight)); return { ol: ol.clientHeight, max: m }; })()`);
    checar('legendas da viagem cabem na caixa', leg.ol >= leg.max, JSON.stringify(leg));

    // Bug 1: desligar animações no meio da viagem → todas as figuras visíveis
    await rolarPara(b, `(() => { const s = document.querySelector('#viagem'); return s.offsetTop + (s.offsetHeight - innerHeight) * 0.3; })()`);
    await b.avaliar(`document.querySelector('#btn-efeitos').click(); ${quadros(4)}`);
    await sleep(300);
    const vis = await b.avaliar(`[...document.querySelectorAll('.escala')].map(e => getComputedStyle(e).visibility + '/' + getComputedStyle(e).opacity)`);
    checar('animações desligadas: 5 figuras da viagem visíveis', vis.every(v => v === 'visible/1'), vis.join(', '));
    await rolarPara(b, `document.querySelector('#viagem').offsetTop`);
    await b.foto(join(FOTOS, `${nome}-4-viagem-estatica.png`));
    await b.avaliar(`document.querySelector('#btn-efeitos').click(); ${quadros(4)}`);
    await sleep(300);
    const vis2 = await b.avaliar(`[...document.querySelectorAll('.escala')].filter(e => getComputedStyle(e).visibility === 'visible').length`);
    checar('animações religadas: viagem volta a funcionar', vis2 >= 1 && vis2 <= 2, 'visíveis=' + vis2);

    // Visor de células
    await rolarPara(b, `document.querySelector('#visor-celulas').getBoundingClientRect().top + scrollY - 80`);
    await sleep(1500);
    await b.foto(join(FOTOS, `${nome}-5-visor.png`));
    await b.avaliar(`document.querySelector('[data-acao="exclusivas"]').click(); ${quadros(3)}`);
    await sleep(500);
    const op = await b.avaliar(`(() => { const svg = document.querySelector('#painel-animal svg.ilustracao');
      const o = (s) => getComputedStyle(svg.querySelector(s)).opacity;
      return { rotLiso: o('.rotulo[data-parte="lisossomo"]'), rotNucleo: o('.rotulo[data-parte="nucleo"]') }; })()`);
    checar('exclusivas: rótulo do lisossomo não se apaga', op.rotLiso === '1', JSON.stringify(op));
    checar('exclusivas: rótulo do núcleo se apaga', parseFloat(op.rotNucleo) < 0.5, JSON.stringify(op));
    await b.foto(join(FOTOS, `${nome}-6-exclusivas.png`));
    await b.avaliar(`document.querySelector('[data-acao="exclusivas"]').click()`);

    // Bactéria: plasmídeo sem marca; flagelo renomeado
    await b.avaliar(`document.querySelector('#aba-bacteria').click(); ${quadros(3)}`);
    await sleep(800);
    checar('plasmídeo sem data-exclusiva', await b.avaliar(`!document.querySelector('#painel-bacteria [data-parte="plasmideo"][data-exclusiva]')`));
    checar('legenda: "Flagelo bacteriano"', await b.avaliar(`document.querySelector('#painel-bacteria .legenda button[data-parte="flagelo"]').textContent.includes('Flagelo bacteriano')`));
    await b.foto(join(FOTOS, `${nome}-7-bacteria.png`));

    // Painel abre pelo teclado (botão da legenda) e brota do botão
    await b.avaliar(`document.querySelector('#painel-bacteria .legenda button[data-parte="flagelo"]').click(); ${quadros(3)}`);
    await sleep(700);
    const pn = await b.avaliar(`(() => { const p = document.querySelector('#painel'); return { aberto: !p.hidden, titulo: document.querySelector('#painel-titulo').textContent, ox: p.style.getPropertyValue('--ox'), foco: document.activeElement.id }; })()`);
    checar('painel abre com o título certo e foco no título', pn.aberto && pn.titulo === 'Flagelo bacteriano' && pn.foco === 'painel-titulo', JSON.stringify(pn));
    checar('painel: origem da animação calculada', /px$/.test(pn.ox), pn.ox);
    // Painel novo: 4 blocos na ordem certa, com o texto dos dados
    const pv = await b.avaliar(`(() => {
      const p = document.querySelector('#painel'), d = DADOS.partes.flagelo;
      const tx = (id) => document.querySelector(id).textContent;
      const titulos = [...p.querySelectorAll('.painel-bloco h4')].map(h => h.textContent.trim());
      const simples = document.querySelector('#painel-simples');
      return {
        titulos,
        textos: tx('#painel-simples') === d.simples && tx('#painel-tecnico') === d.tecnico && tx('#painel-lembrar') === d.lembrar && tx('#painel-curiosidade') === d.curiosidade,
        descrito: p.getAttribute('aria-describedby') === 'painel-simples',
        iconeEscondido: p.querySelector('.painel-lembrar svg').getAttribute('aria-hidden') === 'true',
        simplesMaior: parseFloat(getComputedStyle(simples).fontSize) > parseFloat(getComputedStyle(document.querySelector('#painel-tecnico')).fontSize),
        semFuncao: !document.querySelector('#painel-funcao')
      }; })()`);
    checar('painel: blocos na ordem Em poucas palavras / Explicação técnica / Para lembrar / Curiosidade',
      JSON.stringify(pv.titulos) === JSON.stringify(['Em poucas palavras', 'Explicação técnica', 'Para lembrar', 'Curiosidade']), pv.titulos.join(' | '));
    checar('painel: textos vêm dos campos novos', pv.textos && pv.semFuncao, JSON.stringify(pv));
    checar('painel: leitor de tela lê a frase simples (aria-describedby) e ignora o ícone', pv.descrito && pv.iconeEscondido, JSON.stringify(pv));
    checar('painel: "Em poucas palavras" com letra maior', pv.simplesMaior);
    // Tab a partir do título chega no botão de fechar
    await b.enviar('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await b.enviar('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    checar('painel: Tab leva ao botão de fechar', await b.avaliar(`document.activeElement.classList.contains('painel-fechar')`));
    await b.foto(join(FOTOS, `${nome}-8-painel.png`));
    await b.avaliar(`document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))`);
    checar('Esc fecha o painel', await b.avaliar(`document.querySelector('#painel').hidden`));
    checar('Esc devolve o foco ao botão da legenda', await b.avaliar(`document.activeElement.matches('.legenda button[data-parte="flagelo"]')`));

    // Membrana viva
    await rolarPara(b, `document.querySelector('#canvas-membrana').getBoundingClientRect().top + scrollY - 120`);
    await sleep(1200);
    await b.foto(join(FOTOS, `${nome}-9-membrana.png`));

    // Barra de leitura no fim
    await rolarPara(b, `document.documentElement.scrollHeight`);
    await sleep(300);
    const lx = await b.avaliar(`(() => { const c = document.querySelector('.leitura-celula').getBoundingClientRect(); return { direita: c.right, largura: document.documentElement.clientWidth }; })()`);
    checar('célula da barra de leitura não passa da borda', lx.direita <= lx.largura + 0.5, JSON.stringify(lx));

    // ---- Acessibilidade ----
    const a11y = await b.avaliar(`(() => {
      const h1 = document.querySelector('#titulo-hero');
      return {
        h1sr: h1.querySelector('.sr')?.textContent,
        h1semLabel: !h1.hasAttribute('aria-label'),
        letrasEscondidas: h1.querySelector('[aria-hidden="true"] .letra') !== null,
        valuetext: document.querySelector('#mv-temp').getAttribute('aria-valuetext'),
        cutucar: !!document.querySelector('#mv-cutucar'),
        canvasRole: document.querySelector('#canvas-membrana').getAttribute('role'),
        temaNome: document.querySelector('#btn-tema .sr').textContent
      }; })()`);
    checar('h1: texto inteiro para leitor de tela, letras escondidas', a11y.h1sr === 'Dentro da menor unidade da vida' && a11y.h1semLabel && a11y.letrasEscondidas, JSON.stringify(a11y));
    checar('slider com aria-valuetext', a11y.valuetext === 'morna', a11y.valuetext);
    checar('botão Cutucar e canvas com role=img', a11y.cutucar && a11y.canvasRole === 'img');
    await b.avaliar(`(() => { const r = document.querySelector('#mv-temp'); r.value = 10; r.dispatchEvent(new Event('input')); })()`);
    checar('slider frio -> valuetext "fria"', await b.avaliar(`document.querySelector('#mv-temp').getAttribute('aria-valuetext')`) === 'fria');
    await b.avaliar(`(() => { const r = document.querySelector('#mv-temp'); r.value = 55; r.dispatchEvent(new Event('input')); document.querySelector('#mv-cutucar').click(); })()`);

    // Etiqueta "exclusiva" na legenda só no modo destacar
    await b.avaliar(`document.querySelector('#aba-animal').click()`);
    const exAntes = await b.avaliar(`getComputedStyle(document.querySelector('#painel-animal .leg-excl')).display`);
    await b.avaliar(`document.querySelector('[data-acao="exclusivas"]').click()`);
    const exDepois = await b.avaliar(`getComputedStyle(document.querySelector('#painel-animal .leg-excl')).display`);
    await b.avaliar(`document.querySelector('[data-acao="exclusivas"]').click()`);
    checar('etiqueta "exclusiva" aparece só no modo destacar', exAntes === 'none' && exDepois !== 'none', exAntes + ' -> ' + exDepois);

    // Painel fecha ao clicar fora
    await b.avaliar(`document.querySelector('#painel-animal .legenda button').click()`);
    await sleep(200);
    await b.avaliar(`document.querySelector('.caixa-lembrar').click()`);
    checar('clique fora fecha o painel', await b.avaliar(`document.querySelector('#painel').hidden`));

    // Menu do celular: foco saindo fecha
    if (tela.celular) {
      await b.avaliar(`document.querySelector('#menu-botao').click()`);
      await sleep(100);
      const aberto = await b.avaliar(`document.querySelector('#menu').classList.contains('aberto')`);
      await b.avaliar(`document.querySelector('#btn-tema').focus()`);
      const fechou = await b.avaliar(`!document.querySelector('#menu').classList.contains('aberto')`);
      checar('menu do celular fecha quando o foco sai', aberto && fechou);
    }

    // ---- Animações novas ----
    // Viagem: mira trava antes do mergulho (u ≈ 0.3 dentro do passo 1)
    await rolarPara(b, `(() => { const s = document.querySelector('#viagem'); return s.offsetTop + (s.offsetHeight - innerHeight) * (1.3 / 5); })()`);
    await sleep(300);
    const trava = await b.avaliar(`({ secao: document.querySelector('#viagem').classList.contains('travando'), camada: document.querySelector('.escala.travando')?.dataset.i, vj: document.querySelector('.viagem-lente').style.getPropertyValue('--vj') })`);
    checar('viagem: mira trava na camada certa e lente recebe --vj', trava.secao && trava.camada === '1' && parseFloat(trava.vj) === 1, JSON.stringify(trava));
    await b.foto(join(FOTOS, `${nome}-11-trava.png`));

    // Linha do tempo
    await rolarPara(b, `document.querySelector('.linha-tempo').getBoundingClientRect().top + scrollY - 150`);
    await sleep(900);
    await b.foto(join(FOTOS, `${nome}-12-linha-tempo.png`));

    // Experimento de Frye e Edidin
    await rolarPara(b, `document.querySelector('.experimento').getBoundingClientRect().top + scrollY - 200`);
    await sleep(3800);
    checar('experimento: mistura termina', /misturadas/.test(await b.avaliar(`document.querySelector('#ex-status').textContent`)));
    await b.foto(join(FOTOS, `${nome}-13-experimento.png`));
    await b.avaliar(`document.querySelector('#ex-frio').click()`);
    await sleep(1500);
    const frio = await b.avaliar(`({ p: document.querySelector('#ex-frio').getAttribute('aria-pressed'), s: document.querySelector('#ex-status').textContent })`);
    checar('experimento: "No frio" liga e anima devagar', frio.p === 'true' && /devagar/.test(frio.s), JSON.stringify(frio));
    await b.foto(join(FOTOS, `${nome}-14-experimento-frio.png`));
    await b.avaliar(`document.querySelector('#ex-frio').click()`);

    // Membrana viva com fosfolipídios marcados (depois de alguns segundos o rastro aparece)
    await rolarPara(b, `document.querySelector('#canvas-membrana').getBoundingClientRect().top + scrollY - 120`);
    await b.avaliar(`(() => { const r = document.querySelector('#mv-temp'); r.value = 95; r.dispatchEvent(new Event('input')); })()`);
    await sleep(3000);
    await b.foto(join(FOTOS, `${nome}-15-membrana-marcados.png`));

    // Hero: toque na célula não gera erro
    await rolarPara(b, '0');
    await sleep(300);
    await b.avaliar(`(() => { const c = document.querySelector('#canvas-abertura').getBoundingClientRect();
      const x = innerWidth > 760 ? c.width * 0.68 : c.width * 0.5, y = innerWidth > 760 ? c.height * 0.52 : c.height * 0.2;
      document.querySelector('.hero-conteudo').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: x, clientY: y, pointerType: 'mouse' })); })()`);
    await sleep(500);
    await b.foto(join(FOTOS, `${nome}-16-hero-onda.png`));

    // Tema claro: foto para conferir contraste
    await b.avaliar(`document.querySelector('#btn-tema').click()`);
    await rolarPara(b, `document.querySelector('#celula').offsetTop`);
    await sleep(1200);
    await b.foto(join(FOTOS, `${nome}-10-claro.png`));
    await b.avaliar(`document.querySelector('#btn-tema').click()`);

    checar('sem erros de JS no fim', b.erros.length === 0, b.erros.join(' | '));
  } finally { b.fechar(); }
}

await cenario('desktop', { w: 1280, h: 800, dpr: 1 });
await cenario('celular', { w: 390, h: 844, dpr: 3, celular: true });
const falhas = resultados.filter(r => !r.ok).length;
console.log(`\n${resultados.length - falhas}/${resultados.length} verificações OK. Fotos em ${FOTOS}`);
process.exit(falhas ? 1 : 0);
