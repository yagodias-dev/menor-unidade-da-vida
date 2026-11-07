/* =========================================================
   core.js — base do site
   - utilidades e detecção de aparelho fraco / movimento reduzido
   - tema claro/escuro e botão de animações
   - menu (gerado a partir das seções com data-nav), indicador da seção atual
   - barra de leitura em forma de célula se dividindo (mitose)
   - revelações ao rolar, cursor de molécula
   - rótulos das ilustrações, legenda, painel de informações e lupa
   ========================================================= */
(function () {
  'use strict';

  var C = window.Celula = window.Celula || {};
  var raiz = document.documentElement;
  var NS = 'http://www.w3.org/2000/svg';

  /* ---------------- Utilidades ---------------- */
  C.qs = function (s, r) { return (r || document).querySelector(s); };
  C.qsa = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  C.limitar = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  C.suave = function (a, b, x) { var t = C.limitar((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  C.pixelRatio = function () { return Math.min(window.devicePixelRatio || 1, C.aparelhoFraco ? 1 : 1.5); };
  C.armazenar = {
    ler: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    gravar: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* modo privado */ } }
  };
  C.svg = function (tag, attrs) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) el.setAttribute(k, attrs[k]);
    return el;
  };
  C.cor = function (nome) { return getComputedStyle(raiz).getPropertyValue('--' + nome).trim(); };

  var mqReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
  C.movimentoReduzido = function () { return mqReduzido.matches || raiz.classList.contains('sem-efeitos'); };

  /* Aparelho fraco: poucos núcleos ou pouca memória → menos partículas e efeitos */
  var nucleos = navigator.hardwareConcurrency || 8;
  var memoria = navigator.deviceMemory || 8;
  C.aparelhoFraco = nucleos <= 4 || memoria <= 4;
  if (C.aparelhoFraco) raiz.classList.add('efeitos-leves');

  /* Avisos entre os módulos (ex.: tema mudou, animações ligadas/desligadas) */
  C.avisos = document.createElement('span');
  C.avisar = function (nome, dados) { C.avisos.dispatchEvent(new CustomEvent(nome, { detail: dados })); };
  C.ouvir = function (nome, fn) { C.avisos.addEventListener(nome, fn); };

  /* Executa uma animação só enquanto o elemento está visível (economiza bateria) */
  C.quandoVisivel = function (el, fn, margem) {
    if (!('IntersectionObserver' in window)) { fn(true); return null; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { fn(e.isIntersecting, e); }); }, { rootMargin: margem || '80px' });
    io.observe(el);
    return io;
  };

  function atualizarEstatico() {
    raiz.classList.toggle('estatico', C.movimentoReduzido());
  }
  atualizarEstatico();

  /* ---------------- Tema ---------------- */
  var btnTema = C.qs('#btn-tema');
  function aplicarTema(t) {
    raiz.setAttribute('data-tema', t);
    btnTema.setAttribute('aria-pressed', t === 'claro' ? 'true' : 'false');
    var meta = C.qs('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'claro' ? '#f1f7f4' : '#03161b');
    C.avisar('tema', t);
  }
  aplicarTema(raiz.getAttribute('data-tema') || 'escuro');
  btnTema.addEventListener('click', function () {
    var novo = raiz.getAttribute('data-tema') === 'claro' ? 'escuro' : 'claro';
    C.armazenar.gravar('tema', novo);
    aplicarTema(novo);
  });

  /* ---------------- Botão de animações ---------------- */
  var btnEfeitos = C.qs('#btn-efeitos');
  function aplicarEfeitos(ligado) {
    raiz.classList.toggle('sem-efeitos', !ligado);
    btnEfeitos.setAttribute('aria-pressed', ligado ? 'true' : 'false');
    btnEfeitos.title = ligado ? 'Desligar animações pesadas' : 'Ligar animações';
    atualizarEstatico();
    C.avisar('efeitos', ligado);
  }
  aplicarEfeitos(!raiz.classList.contains('sem-efeitos'));
  btnEfeitos.addEventListener('click', function () {
    var ligar = raiz.classList.contains('sem-efeitos');
    C.armazenar.gravar('efeitos', ligar ? 'on' : 'off');
    aplicarEfeitos(ligar);
  });
  if (mqReduzido.addEventListener) mqReduzido.addEventListener('change', function () { atualizarEstatico(); C.avisar('efeitos', !C.movimentoReduzido()); });

  /* ---------------- Menu ---------------- */
  var menu = C.qs('#menu');
  var lista = C.qs('#menu-lista');
  var indicador = C.qs('.menu-indicador');
  var botaoMenu = C.qs('#menu-botao');
  var atualTexto = C.qs('#menu-atual');
  var secoes = C.qsa('main section[data-nav]');
  var links = [];

  /* O menu é montado a partir das seções: novas etapas só precisam de data-nav */
  secoes.forEach(function (s, i) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + s.id;
    var num = s.querySelector('.secao-num');
    a.innerHTML = (num ? '<span class="menu-num">' + num.textContent + '</span>' : '') + '<span>' + s.getAttribute('data-nav') + '</span>';
    li.appendChild(a);
    lista.appendChild(li);
    links.push(a);
  });

  function moverIndicador(a) {
    if (!a || getComputedStyle(indicador).display === 'none') return;
    var r = a.getBoundingClientRect();
    var rm = lista.getBoundingClientRect();
    indicador.style.width = r.width + 'px';
    indicador.style.transform = 'translateX(' + (r.left - rm.left) + 'px)';
    indicador.style.opacity = '1';
  }

  var secaoAtual = null;
  function marcarAtual(id) {
    if (secaoAtual === id) return;
    secaoAtual = id;
    links.forEach(function (a) {
      var ativo = a.getAttribute('href') === '#' + id;
      if (ativo) { a.setAttribute('aria-current', 'true'); moverIndicador(a); atualTexto.textContent = a.textContent.replace(/^\d+/, '').trim(); }
      else a.removeAttribute('aria-current');
    });
    secoes.forEach(function (s) { s.classList.toggle('atual', s.id === id); });
  }
  if ('IntersectionObserver' in window) {
    var ioMenu = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) marcarAtual(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secoes.forEach(function (s) { ioMenu.observe(s); });
  }
  window.addEventListener('resize', function () { moverIndicador(C.qs('a[aria-current="true"]', lista)); });

  function abrirMenu(abrir) {
    menu.classList.toggle('aberto', abrir);
    botaoMenu.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    if (abrir) { var a = C.qs('a', lista); if (a) a.focus(); }
  }
  botaoMenu.addEventListener('click', function () { abrirMenu(!menu.classList.contains('aberto')); });
  lista.addEventListener('click', function (e) { if (e.target.closest('a')) abrirMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('aberto')) { abrirMenu(false); botaoMenu.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('aberto') && !e.target.closest('#menu') && !e.target.closest('#menu-botao')) abrirMenu(false);
  });
  /* Teclado: se o foco sair do menu aberto (Tab depois do último link), ele fecha */
  menu.addEventListener('focusout', function (e) {
    var para = e.relatedTarget;
    if (menu.classList.contains('aberto') && para && !menu.contains(para) && para !== botaoMenu) abrirMenu(false);
  });

  /* ---------------- Leitura: barra + mitose ---------------- */
  var leitura = C.qs('#leitura');
  var lc = {
    a: C.qs('.lc-a'), b: C.qs('.lc-b'), nucleo: C.qs('.lc-nucleo'),
    c: [C.qs('.lc-c1'), C.qs('.lc-c2'), C.qs('.lc-c3'), C.qs('.lc-c4')]
  };
  var ultimoY = 0, ultimoValor = -1;
  var topo = C.qs('#topo');
  var medidas = { total: 0, largura: 0 };
  function medirLeitura() {
    medidas.total = document.documentElement.scrollHeight - window.innerHeight;
    medidas.largura = leitura.clientWidth;
  }
  medirLeitura();
  window.addEventListener('resize', medirLeitura);
  window.addEventListener('load', medirLeitura);
  /* A altura da página muda quando as fontes carregam ou uma seção cresce */
  if ('ResizeObserver' in window) new ResizeObserver(function () { medirLeitura(); }).observe(document.body);
  function atualizarLeitura() {
    var total = medidas.total;
    var p = total > 0 ? C.limitar(window.scrollY / total, 0, 1) : 0;
    leitura.style.setProperty('--p', p.toFixed(4));
    leitura.style.setProperty('--lx', (p * (medidas.largura - 46)).toFixed(1) + 'px');
    var valor = Math.round(p * 100);
    if (valor !== ultimoValor) { ultimoValor = valor; leitura.setAttribute('aria-valuenow', valor); }
    /* Fases simplificadas: intérfase → prófase/metáfase → anáfase → telófase e citocinese */
    var sep = C.suave(0.5, 0.97, p) * 14;          // separação das células-filhas
    lc.a.setAttribute('cx', 30 - sep);
    lc.b.setAttribute('cx', 30 + sep);
    var r = 9 - C.suave(0.5, 0.97, p) * 1.6;
    lc.a.setAttribute('r', r); lc.b.setAttribute('r', r);
    var nucleoVis = 1 - C.suave(0.18, 0.3, p) + C.suave(0.9, 1, p);
    lc.nucleo.setAttribute('opacity', Math.min(1, nucleoVis));
    lc.nucleo.setAttribute('cx', 30);
    var cromo = C.suave(0.2, 0.32, p) * (1 - C.suave(0.88, 0.96, p));
    var meta = C.suave(0.3, 0.45, p);                 // alinhamento no meio (metáfase)
    var ana = C.suave(0.5, 0.85, p) * 11;              // cromátides indo aos polos
    lc.c.forEach(function (el, i) {
      var lado = i < 2 ? -1 : 1;
      var dx = lado * ((1 - meta) * 3 + ana);
      el.setAttribute('opacity', cromo);
      el.setAttribute('transform', 'translate(' + dx.toFixed(2) + ' 0)');
    });
    /* Esconde o cabeçalho ao descer rápido e mostra ao subir */
    var y = window.scrollY;
    var focoNoTopo = topo.contains(document.activeElement);
    if (!menu.classList.contains('aberto') && !focoNoTopo) topo.classList.toggle('escondido', y > ultimoY + 4 && y > 600);
    if (y < ultimoY - 4 || y < 600) topo.classList.remove('escondido');
    ultimoY = y;
  }
  /* Foco do teclado dentro do cabeçalho: ele sempre aparece */
  topo.addEventListener('focusin', function () { topo.classList.remove('escondido'); });
  var pedidoLeitura = false;
  window.addEventListener('scroll', function () {
    if (pedidoLeitura) return;
    pedidoLeitura = true;
    requestAnimationFrame(function () { pedidoLeitura = false; atualizarLeitura(); });
  }, { passive: true });
  atualizarLeitura();

  /* ---------------- Revelações ao rolar ---------------- */
  var revelaveis = C.qsa('[data-revelar], .figura-interativa, .visor');
  if ('IntersectionObserver' in window) {
    /* O Chrome considera o clip-path do próprio elemento: um elemento com máscara
       fechada "não aparece" para o observador. Por isso, observamos um "sentinela"
       (o pai) e revelamos o elemento quando o pai entra na tela. */
    var alvoDe = new Map();
    var ioRev = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        (alvoDe.get(e.target) || []).forEach(function (el) { el.classList.add('visivel'); });
        ioRev.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    revelaveis.forEach(function (el) {
      var sentinela = el.getAttribute('data-revelar') === 'mascara' ? el.parentElement : el;
      if (!alvoDe.has(sentinela)) alvoDe.set(sentinela, []);
      alvoDe.get(sentinela).push(el);
      ioRev.observe(sentinela);
    });
  } else {
    revelaveis.forEach(function (el) { el.classList.add('visivel'); });
  }

  /* Botões: o brilho nasce do ponto tocado */
  document.addEventListener('pointerover', function (e) {
    var b = e.target.closest && e.target.closest('.botao');
    if (!b) return;
    var r = b.getBoundingClientRect();
    b.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    b.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });

  /* ---------------- Cursor em forma de molécula ---------------- */
  (function cursor() {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    var el = document.createElement('div');
    el.className = 'cursor-mol oculto';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<svg width="0" height="0"><line class="l1"/><line class="l2"/></svg><span class="atomo a2"></span><span class="atomo a1"></span><span class="atomo a0"></span>';
    document.body.appendChild(el);
    var a0 = C.qs('.a0', el), a1 = C.qs('.a1', el), a2 = C.qs('.a2', el);
    var l1 = C.qs('.l1', el), l2 = C.qs('.l2', el);
    var alvo = { x: -100, y: -100 }, p1 = { x: -100, y: -100 }, p2 = { x: -100, y: -100 };
    var rodando = false, ativo = false;

    function ligar() {
      ativo = !C.movimentoReduzido();
      raiz.classList.toggle('cursor-molecula', ativo);
      el.style.display = ativo ? '' : 'none';
    }
    ligar();
    C.ouvir('efeitos', ligar);

    function passo() {
      p1.x += (alvo.x - p1.x) * 0.28; p1.y += (alvo.y - p1.y) * 0.28;
      p2.x += (p1.x - p2.x) * 0.22; p2.y += (p1.y - p2.y) * 0.22;
      a0.style.left = alvo.x + 'px'; a0.style.top = alvo.y + 'px';
      a1.style.left = p1.x + 'px'; a1.style.top = p1.y + 'px';
      a2.style.left = p2.x + 'px'; a2.style.top = p2.y + 'px';
      l1.setAttribute('x1', alvo.x); l1.setAttribute('y1', alvo.y); l1.setAttribute('x2', p1.x); l1.setAttribute('y2', p1.y);
      l2.setAttribute('x1', p1.x); l2.setAttribute('y1', p1.y); l2.setAttribute('x2', p2.x); l2.setAttribute('y2', p2.y);
      var parado = Math.abs(alvo.x - p2.x) + Math.abs(alvo.y - p2.y) < 0.5;
      if (parado) { rodando = false; return; }
      requestAnimationFrame(passo);
    }
    window.addEventListener('pointermove', function (e) {
      if (!ativo || e.pointerType !== 'mouse') return;
      alvo.x = e.clientX; alvo.y = e.clientY;
      el.classList.remove('oculto');
      var interativo = e.target.closest && e.target.closest('a, button, input, label, [data-parte], .rotulo, canvas, [role="tab"]');
      el.classList.toggle('sobre', !!interativo);
      if (!rodando) { rodando = true; requestAnimationFrame(passo); }
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () { el.classList.add('oculto'); });
  })();

  /* ---------------- Bicamada gerada (figura da membrana) ---------------- */
  C.montarBicamada = function (g, cfg) {
    cfg = cfg || {};
    var x0 = cfg.x0 || 180, x1 = cfg.x1 || 576, passo = cfg.passo || 18;
    var yCima = cfg.yCima || 190, yBaixo = cfg.yBaixo || 290;
    var pular = cfg.pular || [[248, 322], [424, 496]];
    var colCima = cfg.colCima || [198, 360], colBaixo = cfg.colBaixo || [522];
    function livre(x) { return !pular.some(function (f) { return x >= f[0] && x <= f[1]; }); }
    function colesterol(x, cima) {
      var s = cima ? 1 : -1, base = cima ? yCima : yBaixo;
      var grupo = C.svg('g', { 'class': 'f-colesterol', 'data-parte': 'colesterol' });
      grupo.appendChild(C.svg('circle', { cx: x, cy: base + s * 6, r: 4 }));
      grupo.appendChild(C.svg('rect', { x: x - 5, y: cima ? base + 11 : base - 31, width: 10, height: 20, rx: 3 }));
      grupo.appendChild(C.svg('path', { d: 'M' + x + ',' + (base + s * 31) + ' L' + (x + 2) + ',' + (base + s * 42) }));
      g.appendChild(grupo);
    }
    for (var x = x0; x <= x1; x += passo) {
      if (!livre(x)) continue;
      if (colCima.indexOf(x) >= 0) colesterol(x, true);
      else g.appendChild(C.svg('use', { href: '#fosfo', transform: 'translate(' + x + ' ' + yCima + ')', 'data-parte': 'fosfolipidio' }));
      if (colBaixo.indexOf(x) >= 0) colesterol(x, false);
      else g.appendChild(C.svg('use', { href: '#fosfo', transform: 'translate(' + x + ' ' + yBaixo + ') scale(1 -1)', 'data-parte': 'fosfolipidio' }));
    }
  };

  /* ---------------- Rótulos com linhas de chamada ---------------- */
  var mqCelular = window.matchMedia('(max-width: 640px)');

  C.rotular = function (svg, cfg) {
    var g = C.svg('g', { 'class': 'rotulos' });
    var lados = { e: [], d: [] };
    cfg.rotulos.forEach(function (r) { lados[r[4]].push({ parte: r[0], texto: r[1], ax: r[2], ay: r[3] }); });
    var n = 0, todos = [];
    ['e', 'd'].forEach(function (lado) {
      var itens = lados[lado].sort(function (a, b) { return a.ay - b.ay; });
      var passo = itens.length > 1 ? (cfg.base - cfg.topo) / (itens.length - 1) : 0;
      itens.forEach(function (it, k) {
        n += 1; it.n = n;
        var ly = itens.length > 1 ? cfg.topo + passo * k : (cfg.topo + cfg.base) / 2;
        var lx = lado === 'e' ? cfg.esq : cfg.dir;
        var x1 = lado === 'e' ? lx + 8 : lx - 8;
        var x2 = lado === 'e' ? x1 + 14 : x1 - 14;
        var grupo = C.svg('g', { 'class': 'rotulo', 'data-parte': it.parte, style: '--n:' + n });
        grupo.appendChild(C.svg('path', { 'class': 'rot-linha', d: 'M' + x1 + ',' + ly + ' L' + x2 + ',' + ly + ' L' + it.ax + ',' + it.ay }));
        grupo.appendChild(C.svg('circle', { 'class': 'rot-ponto', cx: it.ax, cy: it.ay, r: 4 }));
        var linhas = it.texto.split('\n');
        var t = C.svg('text', { 'class': 'rot-texto', x: lx, y: ly, 'text-anchor': lado === 'e' ? 'end' : 'start' });
        linhas.forEach(function (txt, i) {
          var ts = C.svg('tspan', { x: lx, dy: i === 0 ? (linhas.length > 1 ? '-0.2em' : '0.35em') : '1.25em' });
          if (i > 0) ts.setAttribute('class', 'rot-sub');
          ts.textContent = txt;
          t.appendChild(ts);
        });
        grupo.appendChild(t);
        /* Marcador numerado (usado no celular) */
        var marca = C.svg('g', { 'class': 'rot-marca' });
        marca.appendChild(C.svg('circle', { cx: it.ax, cy: it.ay, r: 13 }));
        var tn = C.svg('text', { x: it.ax, y: it.ay, 'text-anchor': 'middle', dy: '0.36em' });
        tn.textContent = n;
        marca.appendChild(tn);
        grupo.appendChild(marca);
        g.appendChild(grupo);
        todos.push(it);
      });
    });
    svg.appendChild(g);
    return todos.sort(function (a, b) { return a.n - b.n; });
  };

  /* ---------------- Painel de informações ---------------- */
  var painel = C.qs('#painel');
  var painelOrigem = null, figuraAtiva = null;
  C.abrirPainel = function (chave, origem, evento) {
    var d = window.DADOS && window.DADOS.partes[chave];
    if (!d) return;
    C.qs('#painel-tag').textContent = d.grupo || '';
    C.qs('#painel-titulo').textContent = d.nome;
    C.qs('#painel-funcao').textContent = d.funcao;
    C.qs('#painel-curiosidade').textContent = d.curiosidade;
    painel.style.setProperty('--cor', 'var(--' + (d.cor || 'ciano') + ')');
    painel.hidden = false;
    /* O painel "brota" do ponto tocado (ou do botão da legenda, no teclado) */
    var px = null, py = null;
    if (evento && (evento.clientX || evento.clientY)) { px = evento.clientX; py = evento.clientY; }
    else if (origem && origem.getBoundingClientRect) {
      var ro = origem.getBoundingClientRect();
      px = ro.left + ro.width / 2; py = ro.top + ro.height / 2;
    }
    if (px !== null) {
      var rp = painel.getBoundingClientRect();
      painel.style.setProperty('--ox', Math.round(px - rp.left) + 'px');
      painel.style.setProperty('--oy', Math.round(py - rp.top) + 'px');
    }
    painel.classList.remove('abrindo'); void painel.offsetWidth; painel.classList.add('abrindo');
    painelOrigem = origem || null;
    C.qs('#painel-titulo').focus({ preventScroll: true });
  };
  C.fecharPainel = function () {
    if (painel.hidden) return;
    painel.hidden = true;
    if (figuraAtiva) destacar(figuraAtiva, null);
    if (painelOrigem && painelOrigem.focus && document.contains(painelOrigem)) painelOrigem.focus({ preventScroll: true });
    painelOrigem = null;
  };
  C.qs('.painel-fechar', painel).addEventListener('click', C.fecharPainel);
  /* Tocar fora do painel e fora das ilustrações também fecha (no celular ele cobre muito da tela) */
  document.addEventListener('click', function (e) {
    if (painel.hidden || !e.target.closest) return;
    if (e.target.closest('#painel') || e.target.closest('.figura-interativa')) return;
    C.fecharPainel();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') C.fecharPainel(); });

  function destacar(fig, chave) {
    var svg = C.qs('svg.ilustracao', fig);
    C.qsa('.ativa', fig).forEach(function (el) { el.classList.remove('ativa'); });
    if (!chave) { svg.classList.remove('focando'); figuraAtiva = null; return; }
    svg.classList.add('focando');
    C.qsa('[data-parte="' + chave + '"]', svg).forEach(function (el) { el.classList.add('ativa'); });
    C.qsa('.legenda button[data-parte="' + chave + '"]', fig).forEach(function (b) { b.classList.add('ativa'); });
    figuraAtiva = fig;
  }

  /* ---------------- Figuras interativas ---------------- */
  function prepararFigura(fig) {
    var nome = fig.getAttribute('data-figura');
    var cfg = window.DADOS.figuras[nome];
    var svg = C.qs('svg.ilustracao', fig);
    if (!cfg || !svg) return;

    var bic = C.qs('[data-gerar="bicamada"]', svg);
    if (bic) C.montarBicamada(bic);

    var itens = C.rotular(svg, cfg);

    /* Partes exclusivas: o rótulo herda a marcação do desenho
       (senão ele seria apagado junto com as partes comuns no modo "destacar") */
    function exclusiva(parte) { return !!C.qs('[data-parte="' + parte + '"][data-exclusiva]:not(.rotulo)', svg); }
    C.qsa('.rotulo', svg).forEach(function (g) {
      if (exclusiva(g.getAttribute('data-parte'))) g.setAttribute('data-exclusiva', '');
    });

    /* Legenda numerada e clicável (também é o caminho pelo teclado) */
    var leg = C.qs('.legenda', fig);
    itens.forEach(function (it) {
      var d = window.DADOS.partes[it.parte] || {};
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-parte', it.parte);
      if (exclusiva(it.parte)) b.setAttribute('data-exclusiva', '');
      b.style.setProperty('--cor', 'var(--' + (d.cor || 'ciano') + ')');
      b.innerHTML = '<span class="leg-n" aria-hidden="true">' + it.n + '</span>' + it.texto.replace('\n', ' ') +
        /* Etiqueta que só aparece (e só é lida) no modo "Destacar o que é exclusivo" */
        (exclusiva(it.parte) ? '<span class="leg-excl"><span class="sr">, </span>exclusiva</span>' : '');
      li.appendChild(b);
      leg.appendChild(li);
    });

    /* Celular: recorta só a célula e troca nomes por números */
    function ajustarModo() {
      var cel = mqCelular.matches;
      svg.classList.toggle('modo-numeros', cel);
      svg.setAttribute('viewBox', cel ? cfg.recorte : cfg.vb);
      C.avisar('figura-mudou', fig);
    }
    ajustarModo();
    if (mqCelular.addEventListener) mqCelular.addEventListener('change', ajustarModo);

    fig.addEventListener('click', function (e) {
      var alvo = e.target.closest('[data-parte]');
      if (!alvo || !fig.contains(alvo)) return;
      var chave = alvo.getAttribute('data-parte');
      destacar(fig, chave);
      C.abrirPainel(chave, alvo.tagName === 'BUTTON' ? alvo : C.qs('.legenda button[data-parte="' + chave + '"]', fig), e);
    });

    iniciarLupa(fig);
  }

  /* ---------------- Lupa de microscópio ---------------- */
  function iniciarLupa(fig) {
    var palco = C.qs('.figura-palco', fig);
    var svg = C.qs('svg.ilustracao', palco);
    var botao = C.qs('[data-acao="lupa"]', fig.closest('.visor') || fig);
    var lente = document.createElement('div');
    lente.className = 'lente';
    lente.setAttribute('aria-hidden', 'true');
    palco.appendChild(lente);
    /* Dica para o toque: com a lupa ligada, a figura não rola a página */
    var dica = document.createElement('p');
    dica.className = 'lupa-dica';
    dica.textContent = 'Lupa ligada: arraste o dedo sobre a figura. Para rolar a página, use a legenda ou desligue a lupa.';
    palco.parentNode.insertBefore(dica, palco.nextSibling);
    var clone = null, Z = 2.4;

    function ligada() { return !botao || botao.getAttribute('aria-pressed') === 'true'; }
    function invalidar() { if (clone) { clone.remove(); clone = null; } }
    C.ouvir('figura-mudou', function (e) { if (e.detail === fig) invalidar(); });

    function garantirClone() {
      if (clone) return;
      clone = svg.cloneNode(true);
      clone.classList.add('clone-lupa');
      clone.classList.remove('focando', 'modo-numeros');
      clone.removeAttribute('aria-labelledby');
      clone.setAttribute('aria-hidden', 'true');
      C.qsa('[id]', clone).forEach(function (n) { n.removeAttribute('id'); });
      C.qsa('title, desc', clone).forEach(function (n) { n.remove(); });
      C.qsa('.ativa', clone).forEach(function (n) { n.classList.remove('ativa'); });
      lente.appendChild(clone);
    }
    var pedido = null, ultimoEv = null;
    function esconder() {
      if (pedido) { cancelAnimationFrame(pedido); pedido = null; }
      lente.classList.remove('ativa');
    }
    function mover(e) {
      /* no máximo uma atualização por quadro */
      ultimoEv = { clientX: e.clientX, clientY: e.clientY, pointerType: e.pointerType };
      if (pedido) return;
      pedido = requestAnimationFrame(function () { pedido = null; moverAgora(ultimoEv); });
    }
    function moverAgora(e) {
      var r = svg.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) { lente.classList.remove('ativa'); return; }
      garantirClone();
      var L = lente.offsetWidth;
      clone.style.width = (r.width * Z) + 'px';
      clone.style.height = (r.height * Z) + 'px';
      clone.style.transform = 'translate(' + (L / 2 - x * Z) + 'px,' + (L / 2 - y * Z) + 'px)';
      var rp = palco.getBoundingClientRect();
      var toque = e.pointerType !== 'mouse';
      var lx = e.clientX - rp.left - L / 2;
      var ly = e.clientY - rp.top - L / 2 - (toque ? L * 0.7 : 0);
      lente.style.transform = 'translate(' + lx + 'px,' + ly + 'px) scale(1)';
      lente.classList.add('ativa');
    }
    palco.addEventListener('pointermove', function (e) {
      if (!ligada()) return;
      if (e.pointerType === 'mouse' || palco.classList.contains('toque-lupa')) mover(e);
    });
    palco.addEventListener('pointerdown', function (e) {
      if (!ligada() || e.pointerType === 'mouse') return;
      palco.classList.add('toque-lupa');
      mover(e);
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) {
      palco.addEventListener(ev, function (e) { if (e.pointerType !== 'mouse') palco.classList.remove('toque-lupa'); esconder(); });
    });
    if (botao && !botao._lupaPronta) {
      botao._lupaPronta = true;
      /* No celular a lupa começa desligada para não atrapalhar a rolagem */
      if (window.matchMedia('(pointer: coarse)').matches) botao.setAttribute('aria-pressed', 'false');
      botao.addEventListener('click', function () {
        var nova = botao.getAttribute('aria-pressed') !== 'true';
        botao.setAttribute('aria-pressed', nova ? 'true' : 'false');
        (fig.closest('.visor') ? C.qsa('.figura-interativa', fig.closest('.visor')) : [fig]).forEach(function (f) { f.classList.toggle('lupa-ligada', nova); });
      });
    }
    fig.classList.toggle('lupa-ligada', ligada());
  }

  /* ---------------- Visor com abas (animal / vegetal / bactéria) ---------------- */
  function prepararVisor(visor) {
    var abas = C.qsa('[role="tab"]', visor);
    function escolher(aba, focar) {
      abas.forEach(function (a) {
        var sel = a === aba;
        a.setAttribute('aria-selected', sel ? 'true' : 'false');
        a.tabIndex = sel ? 0 : -1;
        var p = document.getElementById(a.getAttribute('aria-controls'));
        p.hidden = !sel;
        if (sel) { p.classList.remove('entrando'); void p.offsetWidth; p.classList.add('entrando'); }
      });
      C.fecharPainel();
      if (focar) aba.focus();
    }
    abas.forEach(function (a, i) {
      a.addEventListener('click', function () { escolher(a); });
      a.addEventListener('keydown', function (e) {
        var j = null;
        if (e.key === 'ArrowRight') j = (i + 1) % abas.length;
        if (e.key === 'ArrowLeft') j = (i - 1 + abas.length) % abas.length;
        if (e.key === 'Home') j = 0;
        if (e.key === 'End') j = abas.length - 1;
        if (j !== null) { e.preventDefault(); escolher(abas[j], true); }
      });
    });
    var bExcl = C.qs('[data-acao="exclusivas"]', visor);
    if (bExcl) bExcl.addEventListener('click', function () {
      var on = bExcl.getAttribute('aria-pressed') !== 'true';
      bExcl.setAttribute('aria-pressed', on ? 'true' : 'false');
      visor.classList.toggle('destacar', on);
    });
  }

  function iniciar() {
    C.qsa('.figura-interativa').forEach(prepararFigura);
    C.qsa('.visor').forEach(prepararVisor);
    C.avisar('pronto');
  }
  if (window.DADOS) iniciar();
  else window.addEventListener('DOMContentLoaded', iniciar);
})();
