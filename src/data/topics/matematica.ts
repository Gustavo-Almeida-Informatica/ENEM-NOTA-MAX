import { Subject } from '../../types';

export const MATEMATICA_TOPICS: Subject[] = [
  {
    slug: 'razao-proporcao-regra-de-tres',
    title: 'Razão, Proporção e Regra de Três',
    area: 'matematica',
    subtopic: 'Aritmética Básica',
    shortDescription: 'O conteúdo mais frequente do ENEM: grandezas direta e inversamente proporcionais, densidade e velocidade média.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Identificar grandezas inversamente proporcionais (ex: velocidade e tempo; operários e prazo).',
      'Problemas de dosagem, misturas químicas e consumo de combustível por quilômetro.',
      'Divisão em partes diretamente e inversamente proporcionais.'
    ],
    keyPoints: [
      'Razão é a divisão entre duas grandezas (a/b).',
      'Proporção é a igualdade de duas razões: a/b = c/d (multiplicação cruzada: a*d = b*c).',
      'Diretamente proporcional: se uma dobra, a outra dobra.',
      'Inversamente proporcional: se uma dobra, a outra cai pela metade (o produto é constante).'
    ],
    fullSummary: [
      'Razão e proporção responde por cerca de 20% a 25% de toda a prova de Matemática do ENEM. É conteúdo obrigatório para elevar sua nota TRI.',
      'São consideradas questões de nível fácil a médio, essenciais para não derrubar a coerência pedagógica da sua nota.',
      'Cuidado com a regra de três composta: monte setas apontando na direção do crescimento das grandezas antes de multiplicar.'
    ],
    practicalApplication: 'Em problemas de economia de combustível ou rendimento de tintas, confira as unidades (metros para centímetros) antes de cruzar os dados.',
    relatedVideo: {
      youtubeId: '9oVb2TqM5pI',
      title: 'Razão e Proporção no ENEM: Teoria e Exercícios',
      channel: 'Professor Ferretto',
      durationMinutes: 18
    },
    frequentlyTestedYears: 'Líder absoluto de questões em todas as edições desde 2009.'
  },
  {
    slug: 'porcentagem-e-matematica-financeira',
    title: 'Porcentagem e Matemática Financeira',
    area: 'matematica',
    subtopic: 'Matemática Comercial',
    shortDescription: 'Cálculo de descontos sucessivos, aumentos, juros simples e compostos aplicados a compras reais.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Aumentos e descontos sucessivos (não se somam porcentagens: fator de multiplicação!).',
      'Comparar opções de pagamento (à vista com desconto vs parcelado no cartão).',
      'Inflação, poder de compra e cálculo de lucro sobre o preço de custo.'
    ],
    keyPoints: [
      'Fator de aumento: multiplicar por (1 + i). Ex: aumento de 15% -> multiplicar por 1,15.',
      'Fator de desconto: multiplicar por (1 - i). Ex: desconto de 20% -> multiplicar por 0,80.',
      'Dois aumentos de 10% resultam em 1,10 * 1,10 = 1,21 (aumento real de 21%, não 20%).',
      'Juros simples: J = C * i * t.'
    ],
    fullSummary: [
      'O ENEM contextualiza porcentagem com folhetos de supermercado, faturas de energia e anúncios de lojas.',
      'O erro mais comum é somar descontos sucessivos (ex: 10% + 10% não é 20%, é 19% de abatimento real).',
      'A maioria das questões pode ser resolvida rapidamente encontrando 10% (dividindo por 10) e 1% (dividindo por 100).'
    ],
    practicalApplication: 'Para calcular 15% de 240: calcule 10% (24), pegue a metade que é 5% (12) e some: 24 + 12 = 36.',
    relatedVideo: {
      youtubeId: 'Kz8g5A1j8h0',
      title: 'Porcentagem no ENEM: O Guia Definitivo',
      channel: 'Matemática Rio com Procopio',
      durationMinutes: 16
    }
  },
  {
    slug: 'estatistica-media-mediana-moda',
    title: 'Estatística: Média, Mediana e Moda',
    area: 'matematica',
    subtopic: 'Estatística Básica',
    shortDescription: 'Medidas de tendência central, média aritmética ponderada e desvio padrão para análise de dados.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Cálculo de mediana com número par de elementos (média dos dois termos centrais do rol ordenado).',
      'Média ponderada em notas de vestibulares ou rendimento escolar.',
      'Interpretação de desvio padrão: menor desvio significa maior regularidade/homogeneidade.'
    ],
    keyPoints: [
      'Moda: o valor que mais se repete na amostra.',
      'Mediana: o valor do meio após ordenar a lista (em ordem crescente ou decrescente).',
      'Média: soma dos termos dividida pelo total de termos.',
      'Desvio Padrão: mede a dispersão em relação à média (quanto menor, mais constante o atleta ou aluno).'
    ],
    fullSummary: [
      'Estatística é garantia de 4 a 6 questões todo ano no ENEM. É outra mina de ouro para o algoritmo TRI.',
      'A pegadinha clássica em mediana é o aluno esquecer de ordenar os valores antes de pegar o termo central.',
      'Se o número de elementos for ímpar, há um único elemento central; se for par, faz-se a média aritmética dos dois termos do meio.'
    ],
    practicalApplication: 'Ao ler "qual competidor foi mais regular", não faça contas complexas: procure aquele com menor variância ou menor desvio padrão.',
    relatedVideo: {
      youtubeId: 'eK9j1r5V8z0',
      title: 'Média, Mediana e Moda no ENEM: Sem Pegadinhas',
      channel: 'Professor Ferretto',
      durationMinutes: 15
    }
  },
  {
    slug: 'graficos-tabelas-e-infograficos',
    title: 'Interpretação de Gráficos e Tabelas',
    area: 'matematica',
    subtopic: 'Competência Leitora em Matemática',
    shortDescription: 'Leitura de eixos cartesianos, gráficos de setores (pizza), barras, linhas e taxas de variação.',
    readingTimeMinutes: 4,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Identificar o ponto de virada ou maior crescimento percentual em gráficos de linhas.',
      'Converter valores de gráficos de setores (360° correspondem a 100%).',
      'Identificar pegadinhas de eixos que não começam no zero (escalas distorcidas).'
    ],
    keyPoints: [
      'Leia atentamente os nomes e unidades das grandezas no eixo X e no eixo Y.',
      'Crescimento absoluto vs relativo: crescer de 2 para 4 é +100%; crescer de 100 para 110 é apenas +10%.',
      'Em gráfico de pizza: cada 1% corresponde a 3,6 graus.'
    ],
    fullSummary: [
      'O ENEM exige letramento estatístico. Muitas questões não pedem cálculos difíceis, apenas leitura minuciosa de cruzamento de linhas.',
      'Atenção para legendas com símbolos parecidos ou gráficos com dois eixos verticais distintos.',
      'Economize tempo marcando com o lápis os valores exatos de interesse no próprio gráfico da prova.'
    ],
    practicalApplication: 'Se a pergunta pedir "maior taxa percentual de aumento", divida a variação pelo valor inicial, em vez de olhar apenas para a altura da barra.',
    relatedVideo: {
      youtubeId: 'qW7pL3mE9k8',
      title: 'Como Interpretar Gráficos no ENEM Rapidamente',
      channel: 'Descomplica',
      durationMinutes: 12
    }
  },
  {
    slug: 'geometria-espacial',
    title: 'Geometria Espacial: Volumes e Superfícies',
    area: 'matematica',
    subtopic: 'Geometria',
    shortDescription: 'Cálculo de capacidade e área de prismas, cilindros, cones, esferas e troncos em reservatórios reais.',
    readingTimeMinutes: 6,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Volume de cilindros (latas, reservatórios de água, silos agrícolas): V = pi * r^2 * h.',
      'Planificação de sólidos geométricos (projeção do sólido desmontado no plano).',
      'Conversão de unidades: 1 m³ = 1.000 litros; 1 dm³ = 1 litro; 1 cm³ = 1 mL.'
    ],
    keyPoints: [
      'Prisma reto e Cilindro: Volume = Área da base * Altura.',
      'Pirâmide e Cone: Volume = (1/3) * Área da base * Altura.',
      'Esfera: Volume = (4/3) * pi * r³; Área superficial = 4 * pi * r².',
      'Planificação: reconhecer faces adjacentes sem dobraduras impossíveis.'
    ],
    fullSummary: [
      'A geometria espacial no ENEM é extremamente prática: trata de caixas de papelão, piscinas, latas de refrigerante e copos descartáveis.',
      'O erro campeão está na conversão de unidades ao calcular volumes em metros e responder em litros.',
      'Quando o enunciado indicar aproximação para pi (ex: pi = 3 ou pi = 3,14), use rigorosamente o valor fornecido.'
    ],
    practicalApplication: 'Lembre-se sempre: 1 litro de água cabe exatamente em um cubo de 10 cm x 10 cm x 10 cm (1 dm³).',
    relatedVideo: {
      youtubeId: 'oM4j7E2L6nQ',
      title: 'Geometria Espacial: Os Sólidos que Mais Caem no ENEM',
      channel: 'Professor Ferretto',
      durationMinutes: 20
    }
  },
  {
    slug: 'geometria-plana-areas-e-perimetros',
    title: 'Geometria Plana: Áreas, Perímetros e Triângulos',
    area: 'matematica',
    subtopic: 'Geometria',
    shortDescription: 'Cálculo de áreas de polígonos, Teorema de Pitágoras, semelhança de triângulos e ladrilhamento.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Área de figuras compostas (decompor terrenos irregulares em retângulos e triângulos).',
      'Semelhança de triângulos para calcular alturas inacessíveis (sombras de postes ou árvores).',
      'Círculo: Comprimento da circunferência (C = 2*pi*r) e Área (A = pi*r²).'
    ],
    keyPoints: [
      'Área do Triângulo: (base * altura) / 2.',
      'Área do Trapézio: [(B + b) * h] / 2.',
      'Teorema de Pitágoras: a² + b² = c² (lembre dos triângulos pitagóricos clássicos: 3-4-5 e 5-12-13).',
      'Semelhança: se a razão linear é k, a razão entre as áreas é k².'
    ],
    fullSummary: [
      'As questões de geometria plana costumam narrar situações de reformas domésticas (ladrilhos no piso, cerca em terrenos).',
      'Atenção à diferença conceitual: perímetro mede contorno (comprimento linear), enquanto área mede superfície (bidimensional).',
      'Se dobrar o raio de uma pizza, a área quadruplica (pois a dependência do raio é quadrática, r²).'
    ],
    practicalApplication: 'Se uma figura for complexa, calcule a área de um retângulo maior ao redor dela e subtraia os cantos vazios.',
    relatedVideo: {
      youtubeId: 'uJ9p1M3L4z0',
      title: 'Geometria Plana no ENEM: Fórmulas que Salvam Vidas',
      channel: 'Brasil Escola',
      durationMinutes: 17
    }
  },
  {
    slug: 'funcoes-do-primeiro-grau',
    title: 'Funções do 1º Grau (Função Afim)',
    area: 'matematica',
    subtopic: 'Álgebra e Funções',
    shortDescription: 'Equações da reta (f(x) = ax + b), taxa de variação constante e tarifas com parte fixa e variável.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Modelar custos de serviços (ex: táxi com bandeirada fixa + valor por km rodado).',
      'Descobrir o coeficiente angular (a = delta y / delta x) através de dois pontos do gráfico.',
      'Encontrar o ponto de empate (quando o plano A se torna mais vantajoso que o plano B).'
    ],
    keyPoints: [
      'Lei de formação: f(x) = ax + b, onde "a" é o coeficiente angular e "b" é o linear.',
      'O coeficiente linear "b" é o ponto onde a reta cruza o eixo Y (quando x = 0).',
      'Se a > 0, função crescente; se a < 0, função decrescente.',
      'A raiz da função (onde corta o eixo X) é x = -b / a.'
    ],
    fullSummary: [
      'O ENEM adora a função afim porque ela representa o comportamento linear de fenômenos cotidianos.',
      'Questões de planos de telefonia, contas de água e corridas de aplicativo quase sempre caem em funções afins.',
      'Para comparar duas opções de planos, basta igualar as duas equações para achar o ponto de intersecção.'
    ],
    practicalApplication: 'Em gráficos de reta, o valor fixo inicial é sempre a altura da reta no eixo vertical.',
    relatedVideo: {
      youtubeId: 'tK3l6W1m8p0',
      title: 'Função do 1º Grau no ENEM: Questões Resolvidas',
      channel: 'Professor Ferretto',
      durationMinutes: 14
    }
  },
  {
    slug: 'funcoes-do-segundo-grau',
    title: 'Funções do 2º Grau e Vértice da Parábola',
    area: 'matematica',
    subtopic: 'Álgebra e Funções',
    shortDescription: 'Máximos e mínimos, trajetória de projéteis, lucro máximo e interpretação geométrica do vértice.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Achar o valor que gera lucro ou receita máxima (X do vértice: Xv = -b / 2a).',
      'Achar o valor máximo ou mínimo em si (Y do vértice: Yv = -delta / 4a).',
      'Trajetória parabólica de bolas de futebol, foguetes e arcos arquitetônicos.'
    ],
    keyPoints: [
      'Forma geral: f(x) = ax² + bx + c.',
      'Se a > 0: concavidade para cima (tem ponto de MÍNIMO).',
      'Se a < 0: concavidade para baixo (tem ponto de MÁXIMO).',
      'Xv = -b / (2a) indica ONDE ocorre o máximo; Yv = -delta / (4a) indica QUAL É o valor máximo.'
    ],
    fullSummary: [
      'A pegadinha clássica do ENEM é perguntar a quantidade de peças para obter o lucro máximo (Xv) e o aluno calcular o lucro máximo (Yv).',
      'Sempre leia com atenção se a pergunta pede "o valor de x" ou "o valor de y".',
      'Outra dica: o Xv fica exatamente na metade da distância entre as duas raízes da parábola.'
    ],
    practicalApplication: 'Se você já conhece as duas raízes da equação (x1 e x2), faça Xv = (x1 + x2) / 2 e economize a fórmula de Bhaskara.',
    relatedVideo: {
      youtubeId: 'yR8_0P4e5k0',
      title: 'Função Quadrática no ENEM: O Segredo do Vértice',
      channel: 'Curso Enem Gratuito',
      durationMinutes: 16
    }
  },
  {
    slug: 'probabilidade-simples-e-condicional',
    title: 'Probabilidade Simples e Condicional',
    area: 'matematica',
    subtopic: 'Probabilidade',
    shortDescription: 'Cálculo de chances: casos favoráveis sobre casos possíveis, eventos independentes e probabilidade da união.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Probabilidade condicional: quando o espaço amostral diminui após uma informação prévia.',
      'Probabilidade da união: P(A ou B) = P(A) + P(B) - P(A e B).',
      'Técnica do evento complementar: P(ao menos um) = 1 - P(nenhum).'
    ],
    keyPoints: [
      'Fórmula base: P(E) = Casos Favoráveis / Casos Possíveis.',
      'Regra do "E" (intersecção): multiplica-se as probabilidades.',
      'Regra do "OU" (união): soma-se as probabilidades (subtraindo a intersecção).',
      'Espaço amostral reduzido: em probabilidade condicional, o denominador diminui.'
    ],
    fullSummary: [
      'Probabilidade no ENEM costuma aparecer em testes médicos, jogos de tabuleiro, sorteios e diagnósticos genéticos.',
      'Em questões de "retirada sem reposição", o denominador sempre diminui a cada etapa.',
      'Quando o enunciado pedir a probabilidade de ocorrer "pelo menos um evento", é muito mais rápido calcular a probabilidade de não ocorrer nenhum e subtrair de 100%.'
    ],
    practicalApplication: 'Ao ler "sabendo que o sorteado é mulher", descarte todos os homens do total do denominador.',
    relatedVideo: {
      youtubeId: 'bV6n9X1k4j0',
      title: 'Probabilidade para o ENEM: Aprenda de Vez',
      channel: 'Professor Ferretto',
      durationMinutes: 18
    }
  },
  {
    slug: 'analise-combinatoria',
    title: 'Análise Combinatória: PFC, Arranjo e Combinação',
    area: 'matematica',
    subtopic: 'Combinatória',
    shortDescription: 'Como saber se a ordem dos elementos importa: montagem de senhas, placas, comissões e agrupamentos.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Princípio Fundamental da Contagem (PFC): multiplicar as escolhas independentes.',
      'Combinação simples: a ordem NÃO importa (escolha de membros de comissões, equipes ou sorteios).',
      'Arranjo e Permutação: a ordem IMPORTA (senhas de banco, pódio 1º/2º/3º lugar, anagramas).'
    ],
    keyPoints: [
      'Dica mágica da ordem: troque dois elementos de lugar. Se o grupo for o mesmo, é COMBINAÇÃO; se mudar, é ARRANJO.',
      'Fórmula da Combinação: C(n, p) = n! / [p! * (n - p)!].',
      'Permutação com repetição: P = n! / (a! * b!).'
    ],
    fullSummary: [
      'Análise combinatória é uma das matérias com menor índice de acerto no ENEM, por isso costuma pontuar muito na TRI para quem acerta.',
      'Muitas vezes as alternativas do ENEM não trazem o número final calculado, mas sim a expressão algébrica armada (ex: 10! / (3! 7!)).',
      'Comece sempre resolvendo pelas restrições do problema (ex: primeiro coloque quem obrigatoriamente deve sentar na ponta).'
    ],
    practicalApplication: 'Se for escolher 3 amigos entre 10 para uma viagem, a ordem não importa: é Combinação!',
    relatedVideo: {
      youtubeId: 'wF5j7L9k0zQ',
      title: 'Análise Combinatória: Como Diferenciar Arranjo e Combinação',
      channel: 'Descomplica',
      durationMinutes: 15
    }
  },
  {
    slug: 'escala-cartografica-e-numerica',
    title: 'Escala Numérica e Cartográfica',
    area: 'matematica',
    subtopic: 'Aritmética e Proporção',
    shortDescription: 'Relação entre medida no mapa e medida real (D = d * E), conversão de centímetros para metros e quilômetros.',
    readingTimeMinutes: 4,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Escala linear simples (1:50.000): cada 1 cm no mapa equivale a 50.000 cm reais (500 metros).',
      'Escala de áreas: se a escala linear é 1:100, a escala de área é (1:100)² = 1:10.000.',
      'Conversão de unidades: km -> hm -> dam -> m -> dm -> cm -> mm.'
    ],
    keyPoints: [
      'Fórmula: Escala = Distância no mapa (d) / Distância real (D).',
      'Sempre coloque o numerador e o denominador na MESMA unidade antes de simplificar.',
      'Para transformar centímetros em metros: divida por 100 (corte 2 zeros).',
      'Para transformar centímetros em quilômetros: divida por 100.000 (corte 5 zeros).'
    ],
    fullSummary: [
      'Questão de escala é presença certa em todas as provas de Matemática do ENEM e é considerada de nível fácil.',
      'Acertar a questão de escala é mandatório para garantir coerência na TRI.',
      'A maior armadilha é esquecer que quando a pergunta trata de área (m² ou cm²), a razão de escala deve ser elevada ao quadrado.'
    ],
    practicalApplication: 'Um mapa com escala 1:250.000 significa que 1 cm equivale a 2,5 km na vida real.',
    relatedVideo: {
      youtubeId: 'kL7v9Q2x0wE',
      title: 'Escala no ENEM: Acerte em 2 Minutos',
      channel: 'Brasil Escola',
      durationMinutes: 10
    }
  },
  {
    slug: 'trigonometria-basica',
    title: 'Trigonometria Básica e Triângulo Retângulo',
    area: 'matematica',
    subtopic: 'Trigonometria',
    shortDescription: 'Seno, cosseno e tangente (SOH CAH TOA), tabela de ângulos notáveis (30°, 45°, 60°) e altura de edifícios.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Calcular altura de árvores, prédios ou rampas de acessibilidade usando ângulos de elevação.',
      'Tabela de ângulos notáveis: sen, cos e tg de 30°, 45° e 60°.',
      'Lei dos cossenos para triângulos que não possuem ângulo reto (a² = b² + c² - 2bc*cosA).'
    ],
    keyPoints: [
      'Seno = Cateto Oposto / Hipotenusa.',
      'Cosseno = Cateto Adjacente / Hipotenusa.',
      'Tangente = Cateto Oposto / Cateto Adjacente (seno / cosseno).',
      'Relação fundamental: sen²(x) + cos²(x) = 1.'
    ],
    fullSummary: [
      'A trigonometria cobrada no ENEM é essencialmente geométrica e voltada para a topografia e a acessibilidade urbana.',
      'Questões de rampas segundo a norma ABNT frequentemente exigem o cálculo da tangente do ângulo de inclinação.',
      'A prova costuma fornecer os valores de seno e cosseno no enunciado quando o ângulo for diferente dos notáveis (ex: sen 20° = 0,34).'
    ],
    practicalApplication: 'Para lembrar rapidamente das fórmulas: SOH-CAH-TOA (Seno Oposto/Hip, Cosseno Adj/Hip, Tangente Oposto/Adj).',
    relatedVideo: {
      youtubeId: 'xP8k0M2l4vE',
      title: 'Trigonometria no Triângulo Retângulo para o ENEM',
      channel: 'Professor Ferretto',
      durationMinutes: 16
    }
  }
];
