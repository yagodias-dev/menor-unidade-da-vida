/* =========================================================
   dados.js — conteúdo do site em objetos
   Etapa 1: partes da célula, da bactéria e da membrana,
   e as posições dos rótulos de cada ilustração.
   Nas próximas etapas, novos blocos serão ACRESCENTADOS aqui.
   ========================================================= */
window.DADOS = window.DADOS || {};

/* ---------- Partes (usadas no painel de informações) ---------- */
window.DADOS.partes = {
  /* ---- Célula eucarionte ---- */
  membrana: {
    nome: 'Membrana plasmática', cor: 'ciano', grupo: 'Envoltório',
    funcao: 'Envolve a célula e controla o que entra e o que sai. Funciona como a portaria de um prédio.',
    curiosidade: 'É tão fina que seus detalhes só aparecem no microscópio eletrônico.'
  },
  citoplasma: {
    nome: 'Citoplasma', cor: 'lima', grupo: 'Interior',
    funcao: 'Região entre a membrana e o núcleo. É preenchida pelo citosol (um líquido rico em água, sais e proteínas), onde ficam as organelas.',
    curiosidade: 'Muitas reações acontecem no citosol, como a primeira etapa da quebra da glicose (glicólise).'
  },
  nucleo: {
    nome: 'Núcleo', cor: 'violeta', grupo: 'Organela',
    funcao: 'Guarda o DNA (o material genético) e controla as atividades da célula. É envolvido por uma membrana dupla cheia de poros, a carioteca.',
    curiosidade: 'As hemácias maduras dos mamíferos perdem o núcleo. Assim sobra mais espaço para a hemoglobina, que transporta oxigênio.'
  },
  nucleolo: {
    nome: 'Nucléolo', cor: 'violeta', grupo: 'Dentro do núcleo',
    funcao: 'Região do núcleo que produz o RNA ribossômico e começa a montar os ribossomos.',
    curiosidade: 'O nucléolo não tem membrana. Ele é só uma região mais densa dentro do núcleo.'
  },
  mitocondria: {
    nome: 'Mitocôndria', cor: 'coral', grupo: 'Organela',
    funcao: 'Faz a respiração celular: usa oxigênio para tirar energia dos alimentos e guardá-la como ATP (a “moeda de energia” da célula). As dobras internas, chamadas cristas, aumentam a área de trabalho.',
    curiosidade: 'Tem DNA próprio e membrana dupla, parecidos com os de bactérias. Isso apoia a ideia de que ela já foi uma bactéria que passou a viver dentro de outra célula (endossimbiose).'
  },
  rer: {
    nome: 'Retículo endoplasmático rugoso', cor: 'violeta', grupo: 'Organela',
    funcao: 'Rede de membranas com ribossomos grudados (por isso “rugoso”). Produz proteínas que vão para fora da célula ou para as membranas.',
    curiosidade: 'É muito desenvolvido em células que fabricam muitas proteínas para exportar, como as do pâncreas que produzem enzimas digestivas.'
  },
  rel: {
    nome: 'Retículo endoplasmático liso', cor: 'ciano', grupo: 'Organela',
    funcao: 'Rede de tubos sem ribossomos. Produz lipídios (gorduras), ajuda a desintoxicar substâncias e guarda cálcio.',
    curiosidade: 'No fígado, ajuda a inativar remédios e álcool. Na célula muscular, recebe o nome de retículo sarcoplasmático e libera cálcio para a contração.'
  },
  ribossomo: {
    nome: 'Ribossomos', cor: 'lima', grupo: 'Estrutura sem membrana',
    funcao: 'Fabricam proteínas, lendo as instruções do RNA mensageiro. Podem ficar soltos no citosol ou presos ao retículo rugoso.',
    curiosidade: 'Não têm membrana. Por isso existem tanto em procariontes quanto em eucariontes.'
  },
  golgi: {
    nome: 'Complexo de Golgi', cor: 'ambar', grupo: 'Organela',
    funcao: 'Recebe proteínas e lipídios do retículo, modifica, empacota em vesículas (bolsinhas) e envia ao destino certo. É como os Correios da célula.',
    curiosidade: 'No espermatozoide, o Golgi forma o acrossomo, uma “capa” com enzimas que ajudam a atravessar as camadas que envolvem o óvulo.'
  },
  lisossomo: {
    nome: 'Lisossomo', cor: 'rosa', grupo: 'Organela',
    funcao: 'Bolsa com enzimas digestivas. Digere partículas que entram na célula e organelas velhas (autofagia).',
    curiosidade: 'Suas enzimas funcionam melhor em ambiente ácido, como o de dentro do lisossomo. Se uma delas escapa para o citosol, que é quase neutro, trabalha mal — uma proteção para a célula.'
  },
  peroxissomo: {
    nome: 'Peroxissomo', cor: 'lima', grupo: 'Organela',
    funcao: 'Bolsa com enzimas que quebram ácidos graxos e substâncias tóxicas. Uma delas, a catalase, decompõe a água oxigenada (peróxido de hidrogênio).',
    curiosidade: 'A espuma que aparece quando colocamos água oxigenada num machucado é gás oxigênio liberado pela catalase.'
  },
  citoesqueleto: {
    nome: 'Citoesqueleto', cor: 'ciano', grupo: 'Estrutura',
    funcao: 'Rede de filamentos de proteína (microtúbulos, filamentos de actina e filamentos intermediários). Dá forma à célula, move organelas e participa da divisão celular.',
    curiosidade: 'Os microtúbulos funcionam como trilhos: proteínas motoras “caminham” sobre eles carregando vesículas.'
  },
  centriolo: {
    nome: 'Centríolos', cor: 'ambar', grupo: 'Estrutura sem membrana',
    funcao: 'Par de pequenos cilindros feitos de microtúbulos, perto do núcleo. Fazem parte do centrossomo e dão origem a cílios e flagelos.',
    curiosidade: 'A maioria das plantas, como as que dão flores, não tem centríolos — e mesmo assim suas células se dividem normalmente.'
  },

  /* ---- Exclusivas da célula vegetal ---- */
  parede: {
    nome: 'Parede celular', cor: 'lima', grupo: 'Envoltório (vegetal)',
    funcao: 'Camada rígida por fora da membrana, feita principalmente de celulose. Dá forma, sustentação e proteção.',
    curiosidade: 'Quando a célula vegetal absorve muita água, a parede segura a pressão e impede que ela estoure.'
  },
  cloroplasto: {
    nome: 'Cloroplasto', cor: 'verde', grupo: 'Organela (vegetal)',
    funcao: 'Faz a fotossíntese: usa a energia da luz para produzir açúcar a partir de gás carbônico e água, liberando oxigênio.',
    curiosidade: 'Como a mitocôndria, tem DNA próprio e membrana dupla — mais uma pista da endossimbiose.'
  },
  vacuolo: {
    nome: 'Vacúolo central', cor: 'ciano', grupo: 'Organela (vegetal)',
    funcao: 'Grande bolsa cheia de água, sais e outras substâncias. Mantém a célula firme (turgor, a “pressão” da água) e armazena substâncias.',
    curiosidade: 'Em muitas células vegetais adultas, ele ocupa a maior parte do volume da célula e empurra o núcleo para o canto.'
  },
  plasmodesmo: {
    nome: 'Plasmodesmos', cor: 'ambar', grupo: 'Comunicação (vegetal)',
    funcao: 'Pequenos canais que atravessam a parede e ligam o citoplasma de células vegetais vizinhas.',
    curiosidade: 'Por eles passam água, íons e até algumas moléculas maiores, como certos RNAs.'
  },

  /* ---- Bactéria (procarionte) ---- */
  capsula: {
    nome: 'Cápsula', cor: 'lima', grupo: 'Envoltório (algumas bactérias)',
    funcao: 'Camada externa, geralmente feita de açúcares. Ajuda a bactéria a grudar em superfícies e a escapar das defesas do corpo.',
    curiosidade: 'Bactérias com cápsula costumam ser mais difíceis de serem “engolidas” pelos glóbulos brancos.'
  },
  parede_bact: {
    nome: 'Parede celular bacteriana', cor: 'lima', grupo: 'Envoltório',
    funcao: 'Feita de peptidoglicano (uma rede de açúcares e aminoácidos). Protege a bactéria e mantém sua forma.',
    curiosidade: 'A penicilina atrapalha a construção dessa parede. Como nossas células não têm peptidoglicano, o remédio age sobre a bactéria.'
  },
  membrana_bact: {
    nome: 'Membrana plasmática', cor: 'ciano', grupo: 'Envoltório',
    funcao: 'Também existe nas bactérias e controla a entrada e a saída de substâncias, como em qualquer célula.',
    curiosidade: 'Nas bactérias, muitas reações de obtenção de energia acontecem na própria membrana, já que elas não têm mitocôndrias.'
  },
  nucleoide: {
    nome: 'Nucleoide', cor: 'violeta', grupo: 'Material genético',
    funcao: 'Região onde fica o DNA da bactéria, geralmente uma molécula circular. Não há membrana em volta.',
    curiosidade: '“Nucleoide” quer dizer “parecido com núcleo” — parece, mas não é um núcleo de verdade.'
  },
  plasmideo: {
    nome: 'Plasmídeo', cor: 'rosa', grupo: 'Material genético extra',
    funcao: 'Pequeno círculo de DNA separado do DNA principal.',
    curiosidade: 'Plasmídeos podem carregar genes de resistência a antibióticos e passar de uma bactéria para outra.'
  },
  ribossomo70: {
    nome: 'Ribossomos bacterianos', cor: 'lima', grupo: 'Estrutura sem membrana',
    funcao: 'Fabricam proteínas, como os nossos, mas são menores (chamados de 70S, contra 80S nos eucariontes).',
    curiosidade: 'Alguns antibióticos atacam justamente os ribossomos das bactérias, aproveitando essa diferença.'
  },
  citoplasma_bact: {
    nome: 'Citoplasma', cor: 'lima', grupo: 'Interior',
    funcao: 'Todo o interior da bactéria. Ali ficam o DNA, os ribossomos e as substâncias que ela usa.',
    curiosidade: 'Sem organelas com membrana, quase tudo acontece nesse mesmo “cômodo”.'
  },
  flagelo: {
    nome: 'Flagelo bacteriano', cor: 'coral', grupo: 'Movimento',
    funcao: 'Filamento longo que gira como uma hélice e empurra a bactéria.',
    curiosidade: 'Tem um “motor” giratório na base. É bem diferente do flagelo das células eucariontes, que se dobra em vez de girar.'
  },
  fimbria: {
    nome: 'Fímbrias (pili)', cor: 'ambar', grupo: 'Adesão',
    funcao: 'Filamentos curtos na superfície que ajudam a bactéria a grudar em superfícies e em células.',
    curiosidade: 'Um tipo especial, o pilus sexual, liga duas bactérias para a troca de DNA (conjugação).'
  },

  /* ---- Membrana plasmática (modelo do mosaico fluido) ---- */
  fosfolipidio: {
    nome: 'Fosfolipídio', cor: 'ciano', grupo: 'Lipídio da membrana',
    funcao: 'Peça básica da membrana. Tem uma cabeça que gosta de água (hidrofílica) e duas caudas que fogem dela (hidrofóbicas).',
    curiosidade: 'Colocados na água, os fosfolipídios se organizam sozinhos em camadas duplas, escondendo as caudas no meio.'
  },
  cabeca: {
    nome: 'Cabeça hidrofílica', cor: 'ciano', grupo: 'Parte do fosfolipídio',
    funcao: 'Parte que gosta de água. Contém um grupo fosfato e fica voltada para a água de fora e de dentro da célula.',
    curiosidade: 'Tem carga elétrica, e por isso atrai as moléculas de água.'
  },
  caudas: {
    nome: 'Caudas hidrofóbicas', cor: 'ambar', grupo: 'Parte do fosfolipídio',
    funcao: 'Duas cadeias de ácidos graxos que fogem da água. Ficam escondidas no meio da membrana.',
    curiosidade: 'Caudas com “dobras” (insaturadas) deixam os fosfolipídios mais afastados, e a membrana fica mais fluida.'
  },
  colesterol: {
    nome: 'Colesterol', cor: 'coral', grupo: 'Lipídio da membrana',
    funcao: 'Fica encaixado entre os fosfolipídios nas células animais e regula a fluidez da membrana.',
    curiosidade: 'Funciona como um tampão: no calor, segura os fosfolipídios; no frio, impede que eles se juntem demais e a membrana endureça. Plantas usam outros esteróis parecidos.'
  },
  prot_integral: {
    nome: 'Proteína integral', cor: 'violeta', grupo: 'Proteína da membrana',
    funcao: 'Fica mergulhada na bicamada; muitas a atravessam de um lado ao outro (transmembrana). Transportam substâncias, recebem sinais e ligam células.',
    curiosidade: 'Para retirá-las da membrana em laboratório, é preciso usar detergentes que desmontam a bicamada.'
  },
  canal: {
    nome: 'Proteína de canal', cor: 'violeta', grupo: 'Proteína de transporte',
    funcao: 'Forma um túnel por onde passam íons ou água, a favor da concentração e sem gasto de energia.',
    curiosidade: 'As aquaporinas são canais de água. Sua descoberta rendeu a Peter Agre o Prêmio Nobel de Química de 2003.'
  },
  prot_periferica: {
    nome: 'Proteína periférica', cor: 'ambar', grupo: 'Proteína da membrana',
    funcao: 'Fica presa à superfície da membrana, sem atravessá-la. Ajuda a ancorar o citoesqueleto e participa de sinais.',
    curiosidade: 'Sai da membrana com mais facilidade que a integral, porque está só “encostada”.'
  },
  glicoproteina: {
    nome: 'Glicoproteína', cor: 'lima', grupo: 'Glicocálice',
    funcao: 'Proteína com cadeias de açúcar presas a ela, voltadas para fora da célula.',
    curiosidade: 'Muitas funcionam como “crachás” que o sistema imune usa para reconhecer as células do próprio corpo.'
  },
  glicolipidio: {
    nome: 'Glicolipídio', cor: 'lima', grupo: 'Glicocálice',
    funcao: 'Lipídio com uma cadeia de açúcar presa a ele, na camada externa da membrana.',
    curiosidade: 'Os grupos sanguíneos A, B e O são definidos por açúcares na superfície das hemácias, presos a lipídios e proteínas.'
  },
  glicocalice: {
    nome: 'Glicocálice', cor: 'lima', grupo: 'Face externa',
    funcao: 'Camada de açúcares na face externa da membrana, presos a proteínas e lipídios. Protege a célula e permite que as células se reconheçam.',
    curiosidade: 'É como um crachá: ajuda o corpo a diferenciar as próprias células das invasoras.'
  }
};

/* ---------- Rótulos das ilustrações ----------
   Cada rótulo: [parte, texto, x da ponta, y da ponta, lado ('e' ou 'd')]
   O texto pode ter "\n" para uma segunda linha menor.
   'recorte' é o viewBox usado no celular (só a ilustração, com números). */
window.DADOS.figuras = {
  animal: {
    vb: '0 0 760 440', recorte: '172 44 412 362', esq: 165, dir: 595, topo: 45, base: 395,
    rotulos: [
      ['peroxissomo', 'Peroxissomo', 315, 92, 'e'],
      ['nucleolo', 'Nucléolo', 348, 205, 'e'],
      ['rer', 'RE rugoso', 265, 155, 'e'],
      ['membrana', 'Membrana', 188, 245, 'e'],
      ['nucleo', 'Núcleo', 310, 258, 'e'],
      ['citoplasma', 'Citoplasma', 240, 290, 'e'],
      ['rel', 'RE liso', 300, 345, 'e'],
      ['ribossomo', 'Ribossomos', 455, 170, 'd'],
      ['golgi', 'Golgi', 465, 222, 'd'],
      ['centriolo', 'Centríolos', 530, 235, 'd'],
      ['lisossomo', 'Lisossomo', 515, 290, 'd'],
      ['citoesqueleto', 'Citoesqueleto', 482, 319, 'd'],
      ['mitocondria', 'Mitocôndria', 440, 335, 'd']
    ]
  },
  vegetal: {
    vb: '0 0 760 440', recorte: '178 40 404 370', esq: 165, dir: 595, topo: 45, base: 395,
    rotulos: [
      ['nucleolo', 'Nucléolo', 242, 108, 'e'],
      ['nucleo', 'Núcleo', 220, 125, 'e'],
      ['rer', 'RE rugoso', 245, 171, 'e'],
      ['plasmodesmo', 'Plasmodesmo', 190, 240, 'e'],
      ['citoplasma', 'Citoplasma', 270, 285, 'e'],
      ['cloroplasto', 'Cloroplasto', 235, 335, 'e'],
      ['mitocondria', 'Mitocôndria', 290, 365, 'e'],
      ['golgi', 'Golgi', 515, 135, 'd'],
      ['parede', 'Parede celular', 570, 150, 'd'],
      ['vacuolo', 'Vacúolo', 480, 240, 'd'],
      ['membrana', 'Membrana', 560, 290, 'd']
    ]
  },
  bacteria: {
    vb: '0 0 760 440', recorte: '160 110 460 220', esq: 165, dir: 618, topo: 45, base: 395,
    rotulos: [
      ['ribossomo70', 'Ribossomos', 230, 190, 'e'],
      ['capsula', 'Cápsula', 172, 200, 'e'],
      ['citoplasma_bact', 'Citoplasma', 225, 215, 'e'],
      ['plasmideo', 'Plasmídeo', 250, 250, 'e'],
      ['parede_bact', 'Parede celular', 217, 280, 'e'],
      ['fimbria', 'Fímbrias', 416, 129, 'd'],
      ['flagelo', 'Flagelo\nbacteriano', 575, 220, 'd'],
      ['nucleoide', 'Nucleoide', 382, 235, 'd'],
      ['membrana_bact', 'Membrana', 461, 260, 'd']
    ]
  },
  membrana: {
    vb: '0 0 760 460', recorte: '168 96 424 250', esq: 165, dir: 600, topo: 45, base: 415,
    rotulos: [
      ['glicoproteina', 'Glicoproteína', 283, 122, 'e'],
      ['glicocalice', 'Glicocálice', 195, 150, 'e'],
      ['colesterol', 'Colesterol', 198, 212, 'e'],
      ['prot_integral', 'Proteína\nintegral', 254, 240, 'e'],
      ['fosfolipidio', 'Fosfolipídio', 180, 290, 'e'],
      ['prot_periferica', 'Proteína\nperiférica', 340, 322, 'e'],
      ['glicolipidio', 'Glicolipídio', 504, 155, 'd'],
      ['caudas', 'Caudas\n(fogem da água)', 576, 215, 'd'],
      ['canal', 'Proteína\nde canal', 494, 240, 'd'],
      ['cabeca', 'Cabeça\n(gosta de água)', 576, 298, 'd']
    ]
  }
};

/* ---------- Viagem de escala (rolagem) ---------- */
window.DADOS.viagem = [
  { titulo: 'Corpo humano', texto: 'Visível a olho nu. O corpo é formado por órgãos, e os órgãos, por tecidos.', instrumento: 'Olho nu' },
  { titulo: 'Tecido', texto: 'Um grupo de células parecidas que trabalham juntas. Para ver, é preciso um microscópio óptico.', instrumento: 'Microscópio óptico' },
  { titulo: 'Célula', texto: 'A menor unidade da vida. Com raras exceções, toda célula tem membrana, citoplasma e material genético.', instrumento: 'Microscópio óptico' },
  { titulo: 'Membrana plasmática', texto: 'Uma película finíssima de lipídios e proteínas. Seus detalhes só aparecem no microscópio eletrônico.', instrumento: 'Microscópio eletrônico' },
  { titulo: 'Molécula: o fosfolipídio', texto: 'A peça básica da membrana. Moléculas assim são estudadas com modelos e técnicas especiais.', instrumento: 'Modelos moleculares' }
];
