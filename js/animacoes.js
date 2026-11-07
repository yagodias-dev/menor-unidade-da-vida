/* =========================================================
   animacoes.js — animações grandes da Etapa 1
   1. Título que se revela letra por letra
   2. Abertura: partículas (Canvas) que se reúnem numa célula
      e "mergulho" para dentro dela ao rolar
   3. Viagem de escala: corpo → tecido → célula → membrana → molécula
   4. Membrana viva: bicamada que ondula e reage ao mouse/toque
   ========================================================= */
(function () {
  'use strict';
  var C = window.Celula;
  if (!C) return;

  /* ============ 1. Título letra por letra ============ */
  (function titulo() {
    var h1 = C.qs('[data-letras]');
    if (!h1) return;
    var texto = h1.textContent.trim();
    /* Leitores de tela leem o texto inteiro (escondido visualmente);
       as letras soltas ficam só para os olhos. aria-label em <h1> é lido de
       forma irregular por alguns leitores, por isso o texto real fica no DOM. */
    var leitura = document.createElement('span');
    leitura.className = 'sr';
    leitura.textContent = texto;
    var interno = document.createElement('span');
    interno.setAttribute('aria-hidden', 'true');
    var i = 0;
    texto.split(' ').forEach(function (palavra, k, arr) {
      var w = document.createElement('span');
      w.className = 'palavra' + (k === arr.length - 1 ? ' destaque' : '');
      palavra.split('').forEach(function (ch) {
        var l = document.createElement('span');
        l.className = 'letra';
        l.textContent = ch;
        l.style.setProperty('--i', i++);
        l.style.setProperty('--r', ((Math.random() - 0.5) * 30).toFixed(1) + 'deg');
        w.appendChild(l);
      });
      interno.appendChild(w);
      if (k < arr.length - 1) interno.appendChild(document.createTextNode(' '));
    });
    h1.textContent = '';
    h1.appendChild(leitura);
    h1.appendChild(interno);
  })();

  /* ============ 2. Abertura com partículas ============ */
  (function abertura() {
    var canvas = C.qs('#canvas-abertura');
    var hero = C.qs('#inicio');
    if (!canvas || !hero) return;
    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, dpr = 1, R = 100, cx = 0, cy = 0;
    var parts = [], cores = {}, fundo = '#03161b', escuro = true;
    var mouse = { x: -9999, y: -9999 };
    var inicio = performance.now();
    var visivel = true, rodando = false, mergulho = 0;
    var toqueOnda = { t: -99 };   // momento (s) do último toque na célula
    var NUCLEO = { x: -0.12, y: -0.04 };

    function lerCores() {
      cores = {
        membrana: [C.cor('ciano'), C.cor('lima')],
        nucleo: [C.cor('violeta')],
        nucleolo: [C.cor('rosa')],
        mito: [C.cor('coral')],
        re: [C.cor('violeta'), C.cor('rosa')],
        golgi: [C.cor('ambar')],
        cito: [C.cor('lima'), C.cor('ciano')]
      };
      fundo = C.cor('fundo') || '#03161b';
      escuro = document.documentElement.getAttribute('data-tema') !== 'claro';
      parts.forEach(function (p) { var lista = cores[p.g]; p.cor = lista[p.k % lista.length]; });
      montarLotes();
    }

    /* Alvos em coordenadas da célula (raio = 1); depois escalados para a tela */
    function gerarAlvos(total) {
      var alvos = [];
      function add(x, y, g) { alvos.push({ ox: x, oy: y, g: g }); }
      function rnd(a, b) { return a + Math.random() * (b - a); }
      var nMemb = Math.round(total * 0.34), nNuc = Math.round(total * 0.2), nMito = Math.round(total * 0.13);
      var nRe = Math.round(total * 0.12), nGolgi = Math.round(total * 0.06);
      var nCito = total - nMemb - nNuc - nMito - nRe - nGolgi;
      var i, a, r;
      for (i = 0; i < nMemb; i++) {                       // membrana: duas linhas (bicamada)
        a = Math.random() * Math.PI * 2;
        r = (1 + 0.05 * Math.sin(3 * a + 0.5) + 0.035 * Math.sin(5 * a + 1.3)) * (Math.random() < 0.5 ? 1 : 0.95) + rnd(-0.006, 0.006);
        add(Math.cos(a) * r * 1.12, Math.sin(a) * r * 0.9, 'membrana');
      }
      for (i = 0; i < nNuc; i++) {                        // núcleo: contorno + interior + nucléolo
        a = Math.random() * Math.PI * 2;
        var tipo = Math.random();
        if (tipo < 0.42) { r = 0.32 + rnd(-0.008, 0.008); add(NUCLEO.x + Math.cos(a) * r, NUCLEO.y + Math.sin(a) * r, 'nucleo'); }
        else if (tipo < 0.82) { r = Math.sqrt(Math.random()) * 0.29; add(NUCLEO.x + Math.cos(a) * r, NUCLEO.y + Math.sin(a) * r, 'nucleo'); }
        else { r = Math.sqrt(Math.random()) * 0.085; add(NUCLEO.x - 0.05 + Math.cos(a) * r, NUCLEO.y - 0.04 + Math.sin(a) * r, 'nucleolo'); }
      }
      var mitos = [[0.15, 0.6, 0.2], [0.25, -0.6, -0.35], [0.68, -0.06, 1.4], [-0.5, 0.58, 0.6]];
      for (i = 0; i < nMito; i++) {                       // mitocôndrias com cristas
        var m = mitos[i % mitos.length], px, py;
        if (Math.random() < 0.6) { a = Math.random() * Math.PI * 2; px = Math.cos(a) * 0.15; py = Math.sin(a) * 0.065; }
        else { px = rnd(-0.11, 0.11); py = (Math.floor((px + 0.11) / 0.03) % 2 ? 1 : -1) * rnd(0, 0.045); }
        var cs = Math.cos(m[2]), sn = Math.sin(m[2]);
        add(m[0] + px * cs - py * sn, m[1] + px * sn + py * cs, 'mito');
      }
      for (i = 0; i < nRe; i++) {                         // retículo: arcos em volta do núcleo
        var raio = [0.4, 0.46, 0.52][i % 3];
        a = rnd(100, 230) * Math.PI / 180;
        add(NUCLEO.x + Math.cos(a) * raio, NUCLEO.y + Math.sin(a) * raio, 're');
      }
      for (i = 0; i < nGolgi; i++) {                      // Golgi: arcos empilhados
        var nivel = i % 4, larg = 0.2 - nivel * 0.03;
        var u = rnd(-1, 1);
        add(0.32 + u * larg, 0.16 + nivel * 0.045 - (1 - u * u) * 0.05, 'golgi');
      }
      for (i = 0; i < nCito; i++) {                       // citosol: pontinhos soltos
        do { a = Math.random() * Math.PI * 2; r = Math.sqrt(Math.random()) * 0.82; }
        while (Math.hypot(Math.cos(a) * r - NUCLEO.x, Math.sin(a) * r - NUCLEO.y) < 0.36);
        add(Math.cos(a) * r * 1.1, Math.sin(a) * r * 0.88, 'cito');
      }
      return alvos;
    }

    function criar() {
      var largo = window.innerWidth;
      var total = C.aparelhoFraco ? 800 : (largo < 700 ? 1000 : 1700);
      var alvos = gerarAlvos(total);
      var ordem = { membrana: 0, nucleo: 0.25, nucleolo: 0.35, re: 0.45, mito: 0.55, golgi: 0.6, cito: 0.7 };
      parts = alvos.map(function (a, k) {
        return {
          ox: a.ox, oy: a.oy, g: a.g, k: k,
          x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0,
          atraso: ordem[a.g] + Math.random() * 0.75,
          tam: a.g === 'cito' ? 1.6 : (a.g === 'membrana' ? 2.6 : 2.2),
          fase: Math.random() * Math.PI * 2,
          ang3: Math.atan2(a.oy, a.ox) * 3,              // pré-calculado (antes era feito a cada quadro)
          dist: Math.hypot(a.ox, a.oy),
          nuc: a.g === 'nucleo' || a.g === 'nucleolo'
        };
      });
      lerCores();
    }

    /* Devolve false se nada mudou (no celular, a barra de endereço dispara
       "resize" sem mudar o canvas: redimensionar à toa apagaria a imagem) */
    function medir() {
      var nd = C.pixelRatio(), nw = canvas.clientWidth, nh = canvas.clientHeight;
      if (nw === W && nh === H && nd === dpr) return false;
      dpr = nd; W = nw; H = nh;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      if (W > 760) { cx = W * 0.68; cy = H * 0.52; R = Math.min(H * 0.34, W * 0.24); }
      else { cx = W * 0.5; cy = H * 0.2; R = Math.min(W * 0.31, H * 0.125); }
      hero.style.setProperty('--rx', Math.round(cx / W * 100) + '%');
      return true;
    }

    /* Desempenho: as partículas são agrupadas por cor/transparência ("lotes").
       Assim a cor do pincel muda ~10 vezes por quadro, e não 1.700 vezes. */
    var lotes = [];
    function montarLotes() {
      var mapa = {};
      lotes = [];
      parts.forEach(function (p) {
        var chave = p.cor + '|' + (p.g === 'cito' ? 1 : 0);
        if (!mapa[chave]) { mapa[chave] = { cor: p.cor, alfa: p.g === 'cito' ? 0.55 : 0.95, itens: [] }; lotes.push(mapa[chave]); }
        mapa[chave].itens.push(p);
      });
    }

    function quadro(agora) {
      var t = (agora - inicio) / 1000;
      var estatico = C.movimentoReduzido();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = estatico ? 1 : (escuro ? 0.32 : 0.4);
      ctx.fillStyle = fundo;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;

      /* Mergulho: zoom em direção ao núcleo, que vai para o centro da tela */
      var m = mergulho;
      var z = 1 + m * m * 16;
      var fx = cx + NUCLEO.x * R, fy = cy + NUCLEO.y * R;
      var sx = fx + (W / 2 - fx) * Math.min(1, m * 1.6), sy = fy + (H / 2 - fy) * Math.min(1, m * 1.6);
      var raioMouse = 90, rm2 = raioMouse * raioMouse;
      /* a célula "respira": a membrana ondula devagar e o núcleo pulsa de leve */
      var respNuc = 1 + 0.008 * Math.sin(t * 0.9), t13 = t * 1.3;
      /* onda criada por um toque/clique na célula (anel que se espalha) */
      var ondaIdade = t - toqueOnda.t, ondaViva = !estatico && ondaIdade >= 0 && ondaIdade < 1.6;
      var ondaR = ondaIdade * 1.6, ondaForca = 0.06 * (1 - ondaIdade / 1.6);

      for (var b = 0; b < lotes.length; b++) {
        var lote = lotes[b], itens = lote.itens;
        ctx.fillStyle = lote.cor;
        ctx.globalAlpha = lote.alfa * (1 - m * 0.5);
        for (var i = 0; i < itens.length; i++) {
          var p = itens[i];
          var resp = p.g === 'membrana' ? 1 + 0.012 * Math.sin(t13 + p.ang3) : (p.nuc ? respNuc : 1);
          if (ondaViva) {
            var dr = p.dist - ondaR;
            if (dr > -0.25 && dr < 0.25) resp += ondaForca * Math.cos(dr * 6.28);
          }
          var ax = cx + p.ox * R * resp, ay = cy + p.oy * R * resp;
          if (estatico) { p.x = ax; p.y = ay; }
          else if (t > p.atraso) {
            p.vx += (ax - p.x) * 0.045; p.vy += (ay - p.y) * 0.045;
            var mx = p.x - mouse.x, my = p.y - mouse.y, d2 = mx * mx + my * my;
            if (d2 < rm2) {                                   // o mouse empurra as partículas
              var d = Math.sqrt(d2) || 1, f = (1 - d / raioMouse) * 2.6;
              p.vx += mx / d * f; p.vy += my / d * f;
            }
            p.vx *= 0.82; p.vy *= 0.82;
            p.x += p.vx; p.y += p.vy;
          } else {
            p.x += Math.sin(t * 2 + p.fase) * 0.4;
            p.y += Math.cos(t * 1.7 + p.fase) * 0.4;
          }
          var X = sx + (p.x - fx) * z, Y = sy + (p.y - fy) * z;
          if (X < -10 || Y < -10 || X > W + 10 || Y > H + 10) continue;
          var s = p.tam * (1 + m * 4);
          ctx.fillRect(X - s / 2, Y - s / 2, s, s);
        }
      }
      ctx.globalAlpha = 1;
    }

    /* Se o aparelho não aguentar (muitos quadros lentos), corta as partículas pela metade */
    var amostra = { n: 0, lentos: 0, ultimo: 0, cortes: 0 };
    function vigiarDesempenho(agora) {
      var dt = agora - amostra.ultimo; amostra.ultimo = agora;
      if (amostra.cortes >= 2 || dt <= 0 || dt > 120) return;   // >120 ms: aba trocada, não conta
      amostra.n++; if (dt > 24) amostra.lentos++;
      if (amostra.n < 90) return;
      if (amostra.lentos > amostra.n * 0.5) {
        parts = parts.filter(function (p, k) { return k % 2 === 0; });
        montarLotes();
        amostra.cortes++;
      }
      amostra.n = 0; amostra.lentos = 0;
    }

    function laco(agora) {
      if (!rodando) return;
      /* Quando o "portal" já cobre a tela inteira, não há o que desenhar */
      if (mergulho < 0.97) { quadro(agora); vigiarDesempenho(agora); }
      else amostra.ultimo = agora;
      requestAnimationFrame(laco);
    }
    function ligar() {
      var deve = visivel && !C.movimentoReduzido();
      if (deve && !rodando) { rodando = true; requestAnimationFrame(laco); }
      if (!deve) { rodando = false; quadro(performance.now()); }
    }

    function aoRolar() {
      if (C.movimentoReduzido()) { mergulho = 0; hero.style.setProperty('--mergulho', 0); hero.style.setProperty('--portal', 0); return; }
      var curso = hero.offsetHeight - window.innerHeight;
      mergulho = curso > 0 ? C.limitar(window.scrollY / curso, 0, 1) : 0;
      hero.style.setProperty('--mergulho', mergulho.toFixed(3));
      hero.style.setProperty('--portal', (C.suave(0.55, 1, mergulho) * 1.05).toFixed(3));
    }

    medir(); criar(); aoRolar();
    window.addEventListener('resize', function () {
      var antes = W;
      if (!medir()) return;
      if (Math.abs(antes - W) > 120) criar();
      if (!rodando) quadro(performance.now());
    });
    var pedidoRolar = false;
    window.addEventListener('scroll', function () {
      if (pedidoRolar) return;
      pedidoRolar = true;
      requestAnimationFrame(function () { pedidoRolar = false; aoRolar(); });
    }, { passive: true });
    hero.addEventListener('pointermove', function (e) { var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    hero.addEventListener('pointerleave', function () { mouse.x = mouse.y = -9999; });
    C.quandoVisivel(hero, function (v) { visivel = v; ligar(); });
    C.ouvir('tema', function () { lerCores(); if (!rodando) quadro(performance.now()); });
    C.ouvir('efeitos', function () { aoRolar(); ligar(); });
    ligar();
  })();

  /* ============ 3. Viagem de escala ============ */
  (function viagem() {
    var secao = C.qs('#viagem');
    if (!secao) return;
    var camadas = C.qsa('.escala', secao);
    var legendas = C.qs('#viagem-legendas');
    var regua = C.qs('#viagem-regua');
    var dados = window.DADOS.viagem;

    /* Tecido: mosaico de células hexagonais com núcleo.
       A grade é ancorada para que uma célula fique exatamente no centro (200,200):
       é nela que o zoom entra. */
    var tecido = C.qs('[data-gerar="tecido"]', secao);
    if (tecido) {
      var r = 42, w = Math.sqrt(3) * r;
      for (var lin = -4; lin <= 4; lin++) {
        for (var col = -4; col <= 4; col++) {
          var x = 200 + col * w + (Math.abs(lin) % 2 ? w / 2 : 0), y = 200 + lin * r * 1.5;
          var pts = [];
          for (var k = 0; k < 6; k++) { var a = Math.PI / 180 * (60 * k - 30); pts.push((x + (r - 2) * Math.cos(a)).toFixed(1) + ',' + (y + (r - 2) * Math.sin(a)).toFixed(1)); }
          var foco = Math.abs(x - 200) < 5 && Math.abs(y - 200) < 30;
          tecido.appendChild(C.svg('polygon', { 'class': 'vj-cel' + (foco ? ' foco' : ''), points: pts.join(' ') }));
          tecido.appendChild(C.svg('circle', { 'class': 'vj-nuc', cx: x + (Math.random() - 0.5) * 8, cy: y + (Math.random() - 0.5) * 8, r: 11 }));
        }
      }
      tecido.appendChild(C.svg('circle', { 'class': 'vj-alvo', cx: 200, cy: 200, r: 9 }));
    }
    /* Trecho de membrana */
    var bic = C.qs('[data-gerar="bicamada-viagem"]', secao);
    if (bic) {
      bic.appendChild(C.svg('circle', { 'class': 'mol-halo', cx: 200, cy: 200, r: 190 }));
      var g = C.svg('g', { transform: 'translate(0 -30) scale(1.2) translate(-33 -10)' });
      C.montarBicamada(g, { x0: 20, x1: 380, passo: 18, yCima: 170, yBaixo: 270, pular: [[100, 150], [262, 300]], colCima: [182], colBaixo: [74] });
      g.appendChild(C.svg('path', { 'class': 'vj-prot', d: 'M104,160 C112,148 142,148 148,160 C156,190 152,250 148,280 C140,292 112,292 104,280 C98,250 98,190 104,160 Z' }));
      g.appendChild(C.svg('path', { 'class': 'vj-prot', d: 'M266,160 C272,150 292,150 298,160 C302,190 302,250 298,280 C292,290 272,290 266,280 C262,250 262,190 266,160 Z' }));
      bic.appendChild(g);
      bic.appendChild(C.svg('circle', { 'class': 'vj-alvo', cx: 200, cy: 162, r: 12 }));  // sobre a cabeça do fosfolipídio x=200
    }

    dados.forEach(function (d, i) {
      var li = document.createElement('li');
      li.innerHTML = '<em>' + d.instrumento + '</em><strong>' + d.titulo + '</strong><span>' + d.texto + '</span>';
      legendas.appendChild(li);
      regua.appendChild(document.createElement('li'));
    });
    var itensLeg = C.qsa('li', legendas), itensReg = C.qsa('li', regua);
    var focos = camadas.map(function (c) { return c.getAttribute('data-foco').split(' ').map(Number); });

    var ultimoAtivo = -1, visivel = false, ultimoProg = -1;
    /* Medidas guardadas: ler offsetTop a cada quadro forçava o navegador a recalcular o layout */
    var med = { inicio: 0, curso: 1 };
    function medirViagem() {
      med.inicio = secao.offsetTop;
      med.curso = Math.max(1, secao.offsetHeight - window.innerHeight);
      ultimoProg = -1;
    }
    medirViagem();
    window.addEventListener('resize', function () { medirViagem(); pedir(); });
    window.addEventListener('load', function () { medirViagem(); pedir(); });
    if ('ResizeObserver' in window) new ResizeObserver(function () { medirViagem(); pedir(); }).observe(document.body);

    function atualizar() {
      if (C.movimentoReduzido()) {
        /* Versão estática: limpa tudo o que a rolagem escreveu (inclusive visibility) */
        camadas.forEach(function (c) { c.style.transform = ''; c.style.opacity = ''; c.style.visibility = ''; c.style.transformOrigin = ''; });
        itensLeg.forEach(function (li) { li.classList.remove('ativa'); });
        ultimoAtivo = -1;
        return;
      }
      var prog = C.limitar((window.scrollY - med.inicio) / med.curso, 0, 1);
      if (prog === ultimoProg) return;      // nada mudou desde o último quadro
      ultimoProg = prog;
      var rr = prog * 5, i = Math.min(4, Math.floor(rr)), u = rr - i;
      var t = i < 4 ? i + C.suave(0.35, 1, u) : 4;
      camadas.forEach(function (c, n) {
        var d = t - n;
        if (d < -1 || d > 0.8) { c.style.opacity = 0; c.style.visibility = 'hidden'; return; }
        c.style.visibility = 'visible';
        var s = Math.pow(7, d);
        var op = d < 0 ? C.suave(-1, -0.5, d) : 1 - C.suave(0.2, 0.75, d);
        var f = focos[n], tx = 0, ty = 0;
        if (d > 0) {                       // camada que está sendo "atravessada": o foco vai para o centro
          var e = Math.min(d, 1);
          tx = (50 - f[0]) * e; ty = (50 - f[1]) * e;
          c.style.transformOrigin = f[0] + '% ' + f[1] + '%';
        } else if (n > 0) {                // camada que surge: nasce no ponto de foco da anterior
          var fp = focos[n - 1], ep = C.limitar(d + 1, 0, 1);
          tx = (fp[0] - 50) * (1 - ep); ty = (fp[1] - 50) * (1 - ep);
          c.style.transformOrigin = '50% 50%';
        }
        c.style.transform = 'translate(' + tx.toFixed(2) + '%,' + ty.toFixed(2) + '%) scale(' + s.toFixed(4) + ')';
        c.style.opacity = op.toFixed(3);
      });
      var ativo = Math.round(t);
      if (ativo !== ultimoAtivo) {
        ultimoAtivo = ativo;
        itensLeg.forEach(function (li, k) { li.classList.toggle('ativa', k === ativo); });
        itensReg.forEach(function (li, k) { li.classList.toggle('ativa', k === ativo); });
      }
    }
    /* Só recalcula quando a página rola (antes rodava a cada quadro, mesmo parada) */
    var pedido = false;
    function pedir() {
      if (pedido || !visivel) return;
      pedido = true;
      requestAnimationFrame(function () { pedido = false; atualizar(); });
    }
    window.addEventListener('scroll', pedir, { passive: true });
    C.quandoVisivel(secao, function (v) { visivel = v; pedir(); }, '50px');
    C.ouvir('efeitos', function () { ultimoProg = -1; atualizar(); });
    atualizar();
  })();

  /* ============ 4. Membrana viva ============ */
  (function membranaViva() {
    var canvas = C.qs('#canvas-membrana');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var temp = C.qs('#mv-temp'), col = C.qs('#mv-colesterol'), leitura = C.qs('#mv-fluidez');
    var W = 0, H = 0, dpr = 1, lipidios = [], proteinas = [], ondas = [];
    var ponteiro = { x: -9999, y: -9999, dentro: false };
    var cores = {}, t = 0, ultimo = performance.now(), rodando = false, visivel = false, textoAnterior = '';

    function lerCores() {
      cores = { cabeca: C.cor('ciano'), cauda: C.cor('ambar'), prot: C.cor('violeta'), col: C.cor('coral'), fundo: C.cor('fundo-2'), acucar: C.cor('lima') };
    }
    function medir() {
      var nd = C.pixelRatio(), nw = canvas.clientWidth, nh = canvas.clientHeight;
      if (nw === W && nh === H && nd === dpr) return false;   // nada mudou: não apaga o canvas
      dpr = nd; W = nw; H = nh;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      var passo = C.limitar(W / 64, 9, 15);
      lipidios = [];
      for (var x = passo / 2; x < W; x += passo) {
        lipidios.push({ bx: x, dx: 0, fase: Math.random() * 6.28, cima: true });
        lipidios.push({ bx: x + passo / 2, dx: 0, fase: Math.random() * 6.28, cima: false });
      }
      proteinas = [
        { x: W * 0.22, w: Math.max(34, W * 0.05), v: 9, canal: false },
        { x: W * 0.58, w: Math.max(40, W * 0.06), v: -6, canal: true },
        { x: W * 0.86, w: Math.max(30, W * 0.045), v: 12, canal: false }
      ];
      lipidios.passo = passo;
      return true;
    }
    function fluidez() {
      var T = temp.value / 100;
      return col.checked ? 0.42 + (T - 0.5) * 0.36 : T;
    }
    function atualizarTexto() {
      var f = fluidez();
      var nivel = f < 0.34 ? 'baixa' : (f < 0.67 ? 'média' : 'alta');
      var txt = 'Fluidez: ' + nivel + (col.checked ? ' — o colesterol amortece a mudança' : '');
      if (txt !== textoAnterior) { leitura.textContent = txt; textoAnterior = txt; }
      /* Leitor de tela ouve "fria / morna / quente" em vez de um número solto */
      var v = Number(temp.value);
      temp.setAttribute('aria-valuetext', v < 34 ? 'fria' : (v < 67 ? 'morna' : 'quente'));
    }

    function onda(x, f) {
      var A = 4 + f * 9;
      var y = A * Math.sin(x * 0.012 + t * (0.6 + f)) + A * 0.45 * Math.sin(x * 0.027 - t * (0.9 + f));
      for (var i = 0; i < ondas.length; i++) {          // ondas criadas por toque/clique
        var o = ondas[i], idade = t - o.t, dist = Math.abs(x - o.x);
        y += 16 * Math.exp(-idade * 1.1) * Math.sin(dist * 0.05 - idade * 7) * Math.exp(-dist / 260) * (idade * 7 > dist * 0.05 ? 1 : 0);
      }
      if (ponteiro.dentro) {                             // o ponteiro "afunda" a membrana
        var dx = x - ponteiro.x, perto = Math.exp(-Math.abs(ponteiro.y - H / 2) / 90);
        y += (ponteiro.y < H / 2 ? 1 : -1) * 22 * perto * Math.exp(-(dx * dx) / (2 * 55 * 55));
      }
      return y;
    }

    function desenhar() {
      var f = fluidez();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = cores.fundo; ctx.fillRect(0, 0, W, H);
      var meio = H / 2, T = C.limitar(H * 0.17, 26, 50), rCab = C.limitar(lipidios.passo * 0.36, 3.2, 5.6);

      /* rótulos dos meios */
      ctx.font = '700 12px "JetBrains Mono", monospace';
      ctx.fillStyle = cores.acucar; ctx.globalAlpha = 0.75;
      ctx.fillText('FORA DA CÉLULA', 14, 22);
      ctx.fillText('CITOPLASMA', 14, H - 12);
      ctx.globalAlpha = 1;

      function sobProteina(x) {
        for (var i = 0; i < proteinas.length; i++) if (Math.abs(x - proteinas[i].x) < proteinas[i].w / 2 + 3) return true;
        return false;
      }
      /* Desempenho: todas as caudas viram UM caminho, todas as cabeças outro e
         todo o colesterol um terceiro (antes eram ~300 desenhos separados por quadro) */
      var caudas = new Path2D(), cabecas = new Path2D(), colest = new Path2D();
      var mov = !C.movimentoReduzido(), comCol = col.checked;
      for (var i = 0; i < lipidios.length; i++) {
        var l = lipidios[i];
        if (mov) { l.dx += (Math.random() - 0.5) * f * 1.1; l.dx *= 0.95; }
        var x = l.bx + l.dx;
        l.vis = false;
        if (sobProteina(x)) continue;
        var w = onda(x, f);
        var s = l.cima ? -1 : 1;
        var hy = meio + w + s * T, fimY = meio + w + s * 3, my = (hy + fimY) / 2;
        var mexe = Math.sin(t * (2 + f * 5) + l.fase) * (1 + f * 4);
        caudas.moveTo(x - 2, hy); caudas.quadraticCurveTo(x - 2 + mexe, my, x - 2 + mexe * 0.3, fimY);
        caudas.moveTo(x + 2, hy); caudas.quadraticCurveTo(x + 2 - mexe * 0.7, my, x + 2 + mexe * 0.6, fimY);
        cabecas.moveTo(x + rCab, hy); cabecas.arc(x, hy, rCab, 0, 6.2832);
        l.vis = true; l.x = x; l.hy = hy;              // usados pelos fosfolipídios marcados
        if (comCol && i % 7 === 3) {                    // colesterol encaixado
          var cy0 = meio + w + s * (T - rCab - 2);
          colest.rect(x + lipidios.passo / 4 - 2.5, Math.min(cy0, cy0 - s * T * 0.55), 5, T * 0.55);
        }
      }
      ctx.lineCap = 'round';
      ctx.strokeStyle = cores.cauda; ctx.lineWidth = 1.6; ctx.globalAlpha = 0.85;
      ctx.stroke(caudas);
      ctx.globalAlpha = 1;
      ctx.fillStyle = cores.cabeca; ctx.fill(cabecas);
      if (comCol) { ctx.fillStyle = cores.col; ctx.fill(colest); }
      /* proteínas que deslizam para os lados (o "mosaico") */
      for (var j = 0; j < proteinas.length; j++) {
        var p = proteinas[j];
        if (!C.movimentoReduzido()) {
          p.x += p.v * f * 0.03;
          if (p.x > W + p.w) p.x = -p.w; if (p.x < -p.w) p.x = W + p.w;
        }
        var wp = onda(p.x, f), alto = T + 14;
        ctx.fillStyle = cores.prot; ctx.globalAlpha = 0.85;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(p.x - p.w / 2, meio + wp - alto, p.w, alto * 2, p.w / 2.4);
        else ctx.rect(p.x - p.w / 2, meio + wp - alto, p.w, alto * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        if (p.canal) {                                     // túnel do canal
          ctx.fillStyle = cores.fundo; ctx.fillRect(p.x - 3, meio + wp - alto + 4, 6, alto * 2 - 8);
          ctx.fillStyle = cores.cabeca;
          var yi = ((t * 40) % (alto * 2 - 10));
          ctx.beginPath(); ctx.arc(p.x, meio + wp - alto + 5 + yi, 3, 0, 6.28); ctx.fill();
        } else {                                           // cadeia de açúcar (glicocálice)
          ctx.strokeStyle = cores.acucar; ctx.fillStyle = cores.acucar; ctx.lineWidth = 1.5;
          var bx = p.x, by = meio + wp - alto;
          ctx.beginPath(); ctx.moveTo(bx, by);
          for (var q = 1; q <= 3; q++) ctx.lineTo(bx + (q % 2 ? 5 : -4), by - q * 9);
          ctx.stroke();
          for (q = 1; q <= 3; q++) { ctx.beginPath(); ctx.arc(bx + (q % 2 ? 5 : -4), by - q * 9, 3, 0, 6.28); ctx.fill(); }
        }
      }
      ondas = ondas.filter(function (o) { return t - o.t < 4; });
    }

    function laco(agora) {
      if (!rodando) return;
      var dt = Math.min(0.05, (agora - ultimo) / 1000); ultimo = agora;
      t += dt;
      desenhar();
      requestAnimationFrame(laco);
    }
    function ligar() {
      var deve = visivel && !C.movimentoReduzido();
      if (deve && !rodando) { rodando = true; ultimo = performance.now(); requestAnimationFrame(laco); }
      if (!deve) { rodando = false; desenhar(); }
    }

    canvas.addEventListener('pointermove', function (e) {
      var r = canvas.getBoundingClientRect();
      ponteiro.x = e.clientX - r.left; ponteiro.y = e.clientY - r.top;
      ponteiro.dentro = e.pointerType === 'mouse';
    });
    canvas.addEventListener('pointerleave', function () { ponteiro.dentro = false; });
    canvas.addEventListener('pointerdown', function (e) {
      var r = canvas.getBoundingClientRect();
      ondas.push({ x: e.clientX - r.left, t: t });
      if (!rodando) { t += 0.5; desenhar(); }
    });
    [temp, col].forEach(function (el) { el.addEventListener('input', function () { atualizarTexto(); if (!rodando) desenhar(); }); });
    /* Alternativa pelo teclado (e para quem não usa mouse/toque): cria uma onda */
    var cutucar = C.qs('#mv-cutucar');
    if (cutucar) cutucar.addEventListener('click', function () {
      ondas.push({ x: W * (0.25 + Math.random() * 0.5), t: t });
      if (!rodando) { t += 0.5; desenhar(); }
    });

    lerCores(); medir(); atualizarTexto(); desenhar();
    window.addEventListener('resize', function () { if (medir() && !rodando) desenhar(); });
    C.quandoVisivel(canvas, function (v) { visivel = v; ligar(); });
    C.ouvir('tema', function () { lerCores(); if (!rodando) desenhar(); });
    C.ouvir('efeitos', ligar);
  })();
})();
