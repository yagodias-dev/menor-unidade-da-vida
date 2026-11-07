/* =========================================================
   dados.js — conteúdo do site em objetos
   Etapa 1: partes da célula, da bactéria e da membrana,
   e as posições dos rótulos de cada ilustração.
   Nas próximas etapas, novos blocos serão ACRESCENTADOS aqui.
   ========================================================= */
window.DADOS = window.DADOS || {};

/* ---------- Partes (usadas no painel de informações) ----------
   simples:     frase curta com comparação do dia a dia (até 15 palavras)
   tecnico:     explicação com os termos corretos, cada um explicado entre parênteses
   lembrar:     dica de memória (origem da palavra conferida, associação ou comparação)
   curiosidade: um fato extra */
window.DADOS.partes = {
  /* ---- Célula eucarionte ---- */
  membrana: {
    nome: 'Membrana plasmática', cor: 'ciano', grupo: 'Envoltório',
    simples: 'A portaria da célula: decide o que entra e o que sai.',
    tecnico: 'Envoltório de lipídios e proteínas que separa a célula do meio externo. Tem permeabilidade seletiva (deixa passar algumas substâncias e barra outras).',
    lembrar: 'Pense na portaria de um prédio: não é um muro que fecha tudo, é um controle de quem entra e quem sai.',
    curiosidade: 'É tão fina que seus detalhes só aparecem no microscópio eletrônico.'
  },
  citoplasma: {
    nome: 'Citoplasma', cor: 'lima', grupo: 'Interior',
    simples: 'Todo o recheio da célula, entre a membrana e o núcleo.',
    tecnico: 'É formado pelo citosol (um líquido rico em água, sais e proteínas) e pelas organelas mergulhadas nele.',
    lembrar: 'Pense numa gelatina com pedaços de fruta: a gelatina é o citosol, as frutas são as organelas. Tudo junto é o citoplasma.',
    curiosidade: 'Muitas reações acontecem no citosol, como a primeira etapa da quebra da glicose (glicólise).'
  },
  nucleo: {
    nome: 'Núcleo', cor: 'violeta', grupo: 'Organela',
    simples: 'A central de comando da célula, onde fica guardado o DNA.',
    tecnico: 'Guarda o DNA (o material genético) e controla a célula ao escolher quais genes são usados para fazer proteínas (expressão gênica). É envolvido pela carioteca (membrana dupla cheia de poros).',
    lembrar: 'Kárion, em grego, quer dizer “noz” ou “caroço”: o núcleo é o caroço da célula. Carioteca é a “caixa do caroço”, e eucarionte é quem tem “núcleo verdadeiro”.',
    curiosidade: 'As hemácias maduras dos mamíferos perdem o núcleo. Assim sobra mais espaço para a hemoglobina, que transporta oxigênio.'
  },
  nucleolo: {
    nome: 'Nucléolo', cor: 'violeta', grupo: 'Dentro do núcleo',
    simples: 'A fábrica de peças dos ribossomos, dentro do núcleo.',
    tecnico: 'Região mais densa do núcleo, sem membrana, que produz o RNA ribossômico (RNAr, o RNA que forma os ribossomos) e começa a montagem dos ribossomos.',
    lembrar: '“Nucléolo” quer dizer “pequeno núcleo”, mas não é um núcleo: é a parte do núcleo que prepara as peças dos ribossomos.',
    curiosidade: 'Células que fabricam muitas proteínas costumam ter nucléolos grandes e bem visíveis.'
  },
  mitocondria: {
    nome: 'Mitocôndria', cor: 'coral', grupo: 'Organela',
    simples: 'A usina de energia da célula.',
    tecnico: 'Faz a respiração celular aeróbica: usa oxigênio para quebrar a glicose e produzir ATP (a molécula que guarda energia). As cristas (dobras da membrana interna) aumentam a área de trabalho.',
    lembrar: 'Precisa de energia? A mitocôndria fornece o ATP. Por isso células musculares têm muitas delas.',
    curiosidade: 'Tem DNA próprio e membrana dupla, parecidos com os de bactérias. Isso apoia a ideia de que ela já foi uma bactéria que passou a viver dentro de outra célula (endossimbiose).'
  },
  rer: {
    nome: 'Retículo endoplasmático rugoso', cor: 'violeta', grupo: 'Organela',
    simples: 'Uma rede de fábricas de proteínas, coberta de ribossomos.',
    tecnico: 'Rede de membranas com ribossomos aderidos (por isso “rugoso”). Produz proteínas que serão secretadas (enviadas para fora da célula) ou que vão para as membranas e os lisossomos.',
    lembrar: '“Retículo” vem do latim e quer dizer “pequena rede”. Rugoso = cheio de grãozinhos, e os grãozinhos são os ribossomos.',
    curiosidade: 'É muito desenvolvido em células que fabricam muitas proteínas para exportar, como as do pâncreas que produzem enzimas digestivas.'
  },
  rel: {
    nome: 'Retículo endoplasmático liso', cor: 'ciano', grupo: 'Organela',
    simples: 'A rede que fabrica gorduras e ajuda a limpar substâncias tóxicas.',
    tecnico: 'Rede de tubos sem ribossomos. Produz lipídios (como fosfolipídios e hormônios esteroides), faz a desintoxicação (inativa substâncias tóxicas) e armazena cálcio.',
    lembrar: 'Liso = sem ribossomos, então não faz proteína. Guarde os dois “L”: retículo Liso faz Lipídios.',
    curiosidade: 'No fígado, ajuda a inativar remédios e álcool. Na célula muscular, recebe o nome de retículo sarcoplasmático e libera cálcio para a contração.'
  },
  ribossomo: {
    nome: 'Ribossomos', cor: 'lima', grupo: 'Estrutura sem membrana',
    simples: 'A fábrica de proteínas da célula.',
    tecnico: 'Lê o RNA mensageiro e une aminoácidos para formar proteínas (tradução). Pode ficar solto no citosol ou preso ao retículo rugoso.',
    lembrar: 'Ribossomo monta proteínas como quem segue uma receita: o RNA é a receita.',
    curiosidade: 'Não têm membrana. Por isso existem tanto em procariontes quanto em eucariontes.'
  },
  golgi: {
    nome: 'Complexo de Golgi', cor: 'ambar', grupo: 'Organela',
    simples: 'Os Correios da célula: recebe, embala e despacha.',
    tecnico: 'Recebe proteínas e lipídios do retículo endoplasmático e os modifica, por exemplo acrescentando açúcares (glicosilação). Depois empacota tudo em vesículas (bolsinhas de membrana) para secreção ou para outras partes da célula, e também forma os lisossomos.',
    lembrar: 'O retículo fabrica, o Golgi embala e a vesícula entrega.',
    curiosidade: 'No espermatozoide, o Golgi forma o acrossomo, uma “capa” com enzimas que ajudam a atravessar as camadas que envolvem o óvulo.'
  },
  lisossomo: {
    nome: 'Lisossomo', cor: 'rosa', grupo: 'Organela',
    simples: 'O estômago da célula.',
    tecnico: 'Vesícula com enzimas digestivas que funcionam em pH ácido; faz a digestão intracelular (dentro da célula) e a autofagia (reciclagem de organelas velhas).',
    lembrar: '“Lise” vem do grego e quer dizer quebrar: o lisossomo quebra coisas.',
    curiosidade: 'Suas enzimas funcionam melhor em ambiente ácido, como o de dentro do lisossomo. Se uma delas escapa para o citosol, que é quase neutro, trabalha mal — uma proteção para a célula.'
  },
  peroxissomo: {
    nome: 'Peroxissomo', cor: 'lima', grupo: 'Organela',
    simples: 'A equipe de limpeza que neutraliza substâncias tóxicas.',
    tecnico: 'Vesícula com enzimas que quebram ácidos graxos (partes das gorduras) e substâncias tóxicas. Uma delas, a catalase, decompõe o peróxido de hidrogênio (água oxigenada) em água e oxigênio.',
    lembrar: 'O nome vem de “peróxido”: é a organela que lida com o peróxido de hidrogênio, a água oxigenada.',
    curiosidade: 'A espuma que aparece quando colocamos água oxigenada num machucado é gás oxigênio liberado pela catalase.'
  },
  citoesqueleto: {
    nome: 'Citoesqueleto', cor: 'ciano', grupo: 'Estrutura',
    simples: 'O esqueleto e os trilhos internos da célula.',
    tecnico: 'Rede de filamentos de proteína: microtúbulos, filamentos de actina (microfilamentos) e filamentos intermediários. Dá forma à célula, move organelas e participa da divisão celular.',
    lembrar: 'Ao contrário do nosso esqueleto, ele não é fixo: os filamentos se montam e se desmontam o tempo todo, conforme a célula precisa.',
    curiosidade: 'Os microtúbulos funcionam como trilhos: proteínas motoras “caminham” sobre eles carregando vesículas.'
  },
  centriolo: {
    nome: 'Centríolos', cor: 'ambar', grupo: 'Estrutura sem membrana',
    simples: 'Dois pequenos tubos que dão origem a cílios e flagelos.',
    tecnico: 'Par de cilindros formados por microtúbulos (9 grupos de 3), perto do núcleo. Fazem parte do centrossomo (o centro que organiza os microtúbulos) e originam os corpúsculos basais de cílios e flagelos.',
    lembrar: 'Pense em dois feixes de canudinhos colocados em “L”, um em ângulo reto com o outro.',
    curiosidade: 'A maioria das plantas, como as que dão flores, não tem centríolos — e mesmo assim suas células se dividem normalmente.'
  },

  /* ---- Exclusivas da célula vegetal ---- */
  parede: {
    nome: 'Parede celular', cor: 'lima', grupo: 'Envoltório (vegetal)',
    simples: 'Um muro firme em volta da célula vegetal.',
    tecnico: 'Envoltório rígido por fora da membrana, feito principalmente de celulose (um polissacarídeo, ou seja, uma longa cadeia de glicoses). Dá forma, sustentação e proteção.',
    lembrar: 'Papel e algodão são feitos principalmente de celulose: a mesma substância da parede das células vegetais.',
    curiosidade: 'Quando a célula vegetal absorve muita água, a parede segura a pressão e impede que ela estoure.'
  },
  cloroplasto: {
    nome: 'Cloroplasto', cor: 'verde', grupo: 'Organela (vegetal)',
    simples: 'O painel solar da planta: capta luz e fabrica açúcar.',
    tecnico: 'Faz a fotossíntese: usa a energia da luz, captada pela clorofila (pigmento verde), para produzir glicose a partir de gás carbônico e água, liberando oxigênio.',
    lembrar: '“Cloro” vem do grego e quer dizer “verde”, como em clorofila. Cloroplasto é a organela verde.',
    curiosidade: 'Como a mitocôndria, tem DNA próprio e membrana dupla — mais uma pista da endossimbiose.'
  },
  vacuolo: {
    nome: 'Vacúolo central', cor: 'ciano', grupo: 'Organela (vegetal)',
    simples: 'A caixa-d’água da célula vegetal.',
    tecnico: 'Grande bolsa envolvida por uma membrana (o tonoplasto) e cheia de suco vacuolar (água, sais e outras substâncias). Mantém o turgor (a pressão da água que deixa a célula firme) e armazena substâncias.',
    lembrar: '“Vacúolo” vem do latim e lembra “vazio”, mas ele vive cheio de água. Planta murcha é planta cujos vacúolos perderam água.',
    curiosidade: 'Em muitas células vegetais adultas, ele ocupa a maior parte do volume da célula e empurra o núcleo para o canto.'
  },
  plasmodesmo: {
    nome: 'Plasmodesmos', cor: 'ambar', grupo: 'Comunicação (vegetal)',
    simples: 'Pontes que ligam uma célula vegetal à vizinha.',
    tecnico: 'Canais que atravessam a parede celular e ligam o citoplasma de células vegetais vizinhas, permitindo a troca de substâncias.',
    lembrar: '“Desmo” vem do grego e quer dizer “ligação”, como em desmossomo. O plasmodesmo liga o citoplasma de duas células.',
    curiosidade: 'Por eles passam água, íons e até algumas moléculas maiores, como certos RNAs.'
  },

  /* ---- Bactéria (procarionte) ---- */
  capsula: {
    nome: 'Cápsula', cor: 'lima', grupo: 'Envoltório (algumas bactérias)',
    simples: 'Uma capa grudenta por fora da bactéria.',
    tecnico: 'Camada por fora da parede, geralmente feita de polissacarídeos (açúcares de cadeia longa). Ajuda na adesão a superfícies e protege contra a fagocitose (quando um glóbulo branco “engole” a bactéria).',
    lembrar: 'Cápsula = capa extra. Nem toda bactéria tem, mas as que têm costumam ser mais difíceis de serem destruídas pelas defesas do corpo.',
    curiosidade: 'Camadas de açúcar como essa ajudam bactérias a grudar umas nas outras e formar biofilmes, como a placa bacteriana dos dentes.'
  },
  parede_bact: {
    nome: 'Parede celular bacteriana', cor: 'lima', grupo: 'Envoltório',
    simples: 'Uma armadura que mantém a forma da bactéria.',
    tecnico: 'Feita de peptidoglicano (uma rede de açúcares ligados por pequenas cadeias de aminoácidos). Protege a bactéria e impede que ela estoure ao absorver água.',
    lembrar: 'Peptido (aminoácidos) + glicano (açúcares) = peptidoglicano. O nome já diz do que ele é feito.',
    curiosidade: 'A penicilina atrapalha a construção dessa parede. Como nossas células não têm peptidoglicano, o remédio age sobre a bactéria.'
  },
  membrana_bact: {
    nome: 'Membrana plasmática', cor: 'ciano', grupo: 'Envoltório',
    simples: 'A mesma portaria de sempre: toda célula tem uma.',
    tecnico: 'Bicamada de fosfolipídios com proteínas, como a das outras células. Controla a entrada e a saída de substâncias (permeabilidade seletiva).',
    lembrar: 'Membrana, citoplasma, ribossomos e DNA: o “kit básico” que quase toda célula tem, da bactéria ao neurônio.',
    curiosidade: 'Nas bactérias, muitas reações de obtenção de energia acontecem na própria membrana, já que elas não têm mitocôndrias.'
  },
  nucleoide: {
    nome: 'Nucleoide', cor: 'violeta', grupo: 'Material genético',
    simples: 'O cantinho do DNA da bactéria, sem membrana em volta.',
    tecnico: 'Região do citoplasma onde fica o cromossomo bacteriano, geralmente uma molécula de DNA circular. Não há carioteca (membrana nuclear) em volta.',
    lembrar: 'O final “-oide” quer dizer “parecido com”, como em humanoide. Nucleoide parece um núcleo, mas não é.',
    curiosidade: 'Mesmo sem núcleo, o DNA não fica bagunçado: proteínas ajudam a dobrá-lo e compactá-lo para caber na bactéria.'
  },
  plasmideo: {
    nome: 'Plasmídeo', cor: 'rosa', grupo: 'Material genético extra',
    simples: 'Um pen drive de DNA extra da bactéria.',
    tecnico: 'Pequena molécula circular de DNA, separada do cromossomo bacteriano, que se replica (faz cópias de si) por conta própria. Costuma carregar genes úteis, mas não essenciais.',
    lembrar: 'Como um pen drive, o plasmídeo guarda informação extra e pode ser passado para outra bactéria.',
    curiosidade: 'Plasmídeos podem carregar genes de resistência a antibióticos e passar de uma bactéria para outra.'
  },
  ribossomo70: {
    nome: 'Ribossomos bacterianos', cor: 'lima', grupo: 'Estrutura sem membrana',
    simples: 'A fábrica de proteínas da bactéria, menor que a nossa.',
    tecnico: 'Fazem a tradução (montagem de proteínas a partir do RNA mensageiro), como os nossos, mas são menores: 70S, contra 80S nos eucariontes.',
    lembrar: 'Número menor, ribossomo menor: bactéria 70S, nós 80S.',
    curiosidade: 'Alguns antibióticos atacam justamente os ribossomos das bactérias, aproveitando essa diferença.'
  },
  citoplasma_bact: {
    nome: 'Citoplasma', cor: 'lima', grupo: 'Interior',
    simples: 'Um cômodo só, onde tudo acontece.',
    tecnico: 'Todo o interior da bactéria, formado pelo citosol (líquido rico em água, sais e proteínas). Ali ficam o nucleoide, os ribossomos e os plasmídeos.',
    lembrar: 'Lembre da quitinete: na bactéria não há paredes internas, porque não existem organelas com membrana.',
    curiosidade: 'Sem um núcleo separando as etapas, a bactéria pode começar a fabricar uma proteína antes mesmo de terminar de copiar o DNA em RNA (transcrição e tradução acontecem juntas).'
  },
  flagelo: {
    nome: 'Flagelo bacteriano', cor: 'coral', grupo: 'Movimento',
    simples: 'A hélice que empurra a bactéria.',
    tecnico: 'Filamento longo de proteína que gira como uma hélice, movido por um “motor” na base. É responsável pela locomoção da bactéria.',
    lembrar: '“Flagelo” vem do latim e quer dizer “chicote”. Mas o bacteriano não chicoteia: ele gira.',
    curiosidade: 'O flagelo das células eucariontes, como o do espermatozoide, é bem diferente: é feito de microtúbulos e se dobra em vez de girar.'
  },
  fimbria: {
    nome: 'Fímbrias (pili)', cor: 'ambar', grupo: 'Adesão',
    simples: 'Pelinhos que funcionam como velcro para grudar.',
    tecnico: 'Filamentos curtos de proteína na superfície da bactéria. Fazem a adesão (o ato de grudar) a superfícies e a células do hospedeiro.',
    lembrar: '“Fímbria” vem do latim “franja” e “pilus” quer dizer “pelo”: pense numa franja de pelinhos que grudam.',
    curiosidade: 'Um tipo especial, o pilus sexual, liga duas bactérias para a troca de DNA (conjugação).'
  },

  /* ---- Membrana plasmática (modelo do mosaico fluido) ---- */
  fosfolipidio: {
    nome: 'Fosfolipídio', cor: 'ciano', grupo: 'Lipídio da membrana',
    simples: 'O tijolo da membrana, com uma cabeça e duas caudas.',
    tecnico: 'Lipídio anfipático (com uma parte que atrai a água e outra que é repelida por ela): tem uma cabeça hidrofílica com fosfato e duas caudas hidrofóbicas de ácidos graxos.',
    lembrar: '“Anfi” quer dizer “dos dois lados”, como em anfíbio (vive na água e na terra). O fosfolipídio é amigo e inimigo da água ao mesmo tempo.',
    curiosidade: 'Colocados na água, os fosfolipídios se organizam sozinhos em camadas duplas, escondendo as caudas no meio.'
  },
  cabeca: {
    nome: 'Cabeça hidrofílica', cor: 'ciano', grupo: 'Parte do fosfolipídio',
    simples: 'A parte que gosta de água.',
    tecnico: 'Região polar (com carga elétrica) do fosfolipídio, com o grupo fosfato, voltada para o meio aquoso.',
    lembrar: 'Hidro = água, filo = amigo. Hidrofílico é amigo da água; hidrofóbico tem “medo” dela.',
    curiosidade: 'Sabão e detergente também têm uma parte que gosta de água e outra que gosta de gordura. É assim que eles tiram a gordura da louça.'
  },
  caudas: {
    nome: 'Caudas hidrofóbicas', cor: 'ambar', grupo: 'Parte do fosfolipídio',
    simples: 'A parte que foge da água e fica no meio.',
    tecnico: 'Duas cadeias de ácidos graxos, apolares (sem carga elétrica), escondidas no interior da bicamada.',
    lembrar: '“Fobia” quer dizer medo. A cauda hidrofóbica tem “medo” da água e se esconde no meio da membrana, como o recheio de um sanduíche.',
    curiosidade: 'Caudas com “dobras” (insaturadas) deixam os fosfolipídios mais afastados, e a membrana fica mais fluida.'
  },
  colesterol: {
    nome: 'Colesterol', cor: 'coral', grupo: 'Lipídio da membrana',
    simples: 'O regulador que deixa a membrana nem mole demais, nem dura demais.',
    tecnico: 'Esteroide (lipídio formado por anéis de carbono) encaixado entre os fosfolipídios das células animais. Funciona como tampão de fluidez: diminui a fluidez no calor e evita que a membrana endureça no frio.',
    lembrar: 'Colesterol é o “meio-termo”. No calor, ele segura os fosfolipídios; no frio, os mantém afastados. Assim a membrana fica na medida certa.',
    curiosidade: 'Nas plantas, esse papel é feito principalmente por outros esteróis parecidos, os fitoesteróis.'
  },
  prot_integral: {
    nome: 'Proteína integral', cor: 'violeta', grupo: 'Proteína da membrana',
    simples: 'Proteínas que atravessam a membrana, como portas e antenas.',
    tecnico: 'Fica mergulhada na bicamada; muitas a atravessam de um lado ao outro (transmembrana). Atuam no transporte, como receptores (que recebem sinais) e na ligação entre células.',
    lembrar: 'Integral = integrada, mergulhada na membrana. Periférica = na periferia, só encostada.',
    curiosidade: 'Para retirá-las da membrana em laboratório, é preciso usar detergentes que desmontam a bicamada.'
  },
  canal: {
    nome: 'Proteína de canal', cor: 'violeta', grupo: 'Proteína de transporte',
    simples: 'Um túnel por onde passam íons ou água.',
    tecnico: 'Proteína transmembrana que forma um poro para íons ou água passarem a favor do gradiente de concentração (de onde há mais para onde há menos). É transporte passivo (sem gasto de energia).',
    lembrar: 'Passar pelo canal é como descer uma ladeira: vai do mais cheio para o mais vazio, sem gastar energia.',
    curiosidade: 'As aquaporinas são canais de água. Sua descoberta rendeu a Peter Agre o Prêmio Nobel de Química de 2003.'
  },
  prot_periferica: {
    nome: 'Proteína periférica', cor: 'ambar', grupo: 'Proteína da membrana',
    simples: 'Proteínas só encostadas na superfície da membrana.',
    tecnico: 'Fica presa à superfície da membrana, sem atravessá-la, ligada a proteínas integrais ou às cabeças dos fosfolipídios. Ajuda a ancorar o citoesqueleto e participa da sinalização celular.',
    lembrar: 'Periférica = na periferia, na borda. Ela fica na beirada da bicamada, e não dentro dela.',
    curiosidade: 'Sai da membrana com mais facilidade que a integral, porque está só “encostada”.'
  },
  glicoproteina: {
    nome: 'Glicoproteína', cor: 'lima', grupo: 'Glicocálice',
    simples: 'Uma proteína com uma “etiqueta” de açúcar.',
    tecnico: 'Proteína com cadeias de carboidratos (açúcares) ligadas a ela, voltadas para o meio externo. Faz parte do glicocálice.',
    lembrar: '“Glico” vem do grego “doce” e aparece em nomes ligados a açúcar, como glicose. Glicoproteína = açúcar + proteína.',
    curiosidade: 'Muitas funcionam como “crachás” que o sistema imune usa para reconhecer as células do próprio corpo.'
  },
  glicolipidio: {
    nome: 'Glicolipídio', cor: 'lima', grupo: 'Glicocálice',
    simples: 'Um lipídio com uma “etiqueta” de açúcar.',
    tecnico: 'Lipídio com uma cadeia de carboidrato ligada a ele, na camada externa da bicamada. Também faz parte do glicocálice.',
    lembrar: 'Mesma lógica: glico (açúcar) + lipídio (gordura). O nome conta do que ele é feito.',
    curiosidade: 'Os grupos sanguíneos A, B e O são definidos por açúcares na superfície das hemácias, presos a lipídios e proteínas.'
  },
  glicocalice: {
    nome: 'Glicocálice', cor: 'lima', grupo: 'Face externa',
    simples: 'Uma capa de açúcar que funciona como crachá da célula.',
    tecnico: 'Camada de carboidratos ligados a proteínas e lipídios na face externa da membrana. Protege a célula e permite o reconhecimento celular (uma célula identificar a outra).',
    lembrar: 'Pense num crachá: o glicocálice ajuda o corpo a saber quem é “de casa” e quem é invasor.',
    curiosidade: 'Nas células que revestem o intestino, o glicocálice protege a superfície e segura enzimas que participam da digestão.'
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
