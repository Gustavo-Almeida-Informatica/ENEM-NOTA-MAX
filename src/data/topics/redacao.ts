import { Subject } from '../../types';

export const REDACAO_TOPICS: Subject[] = [
  {
    slug: 'estrutura-dissertativo-argumentativa',
    title: 'Estrutura Dissertativo-Argumentativa do ENEM',
    area: 'redacao',
    subtopic: 'Estrutura Textual',
    shortDescription: 'O esqueleto clássico de 4 parágrafos: introdução com tese explícita, dois desenvolvimentos e conclusão com proposta.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video', 'mapa'],
    whatFallsMost: [
      'Proporção ideal dos parágrafos: 1 de Introdução (6 a 7 linhas), 2 de Desenvolvimento (7 a 8 linhas cada) e 1 de Conclusão (7 a 8 linhas).',
      'Defesa de ponto de vista claro: o ENEM não aceita texto meramente expositivo; é obrigatório se posicionar.',
      'Divisão em períodos curtos: nunca faça um parágrafo inteiro composto por apenas uma frase longa.'
    ],
    keyPoints: [
      'Introdução: Repertório de abertura + Apresentação do Tema + Tese com 2 argumentos (D1 e D2).',
      'Desenvolvimento 1: Tópico frasal + Repertório legitimado + Argumentação autoral + Desfecho crítico.',
      'Desenvolvimento 2: Conectivo de continuidade/adição + Tópico frasal + Repertório + Argumentação autoral + Desfecho.',
      'Conclusão: Conectivo conclusivo + Retomada da tese + Proposta de intervenção completa com os 5 elementos.'
    ],
    fullSummary: [
      'A redação do ENEM possui uma fórmula testada e aprovada por milhares de notas 1000.',
      'Um bom texto dissertativo não tenta convencer pela emoção, mas sim pela coerência de causas, dados e impactos na sociedade.',
      'Cada parágrafo deve conter de 2 a 4 períodos bem pontuados, conectados por operadores argumentativos adequados.'
    ],
    practicalApplication: 'Nunca comece a escrever antes de planejar o seu projeto de texto em tópicos de 1 linha para cada parágrafo.',
    relatedVideo: {
      youtubeId: 'xP7k1_4M2w0',
      title: 'Estrutura Completa da Redação Nota 1000 no ENEM',
      channel: 'Débora Aladim',
      durationMinutes: 19
    },
    mindMapId: 'redacao-nota-1000',
    frequentlyTestedYears: 'O modelo oficial de correção permanece rigorosamente o mesmo desde a edição de 2013.'
  },
  {
    slug: 'competencia-1-norma-culta',
    title: 'Competência 1: Gramática, Sintaxe e Norma Culta',
    area: 'redacao',
    subtopic: 'Critérios de Correção',
    shortDescription: 'Como garantir os 200 pontos: crase, concordância, regência, paralelismo sintático e fluidez de períodos.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Desvios mais punidos: truncamento de períodos (frases incompletas) e justaposição (vírgula separando sujeito e predicado).',
      'Uso correto da crase antes de palavras femininas e expressões adverbiais ("à medida que", "à disposição").',
      'Paralelismo sintático: manter a mesma estrutura gramatical em enumerações ("tanto pela negligência estatal quanto pela apatia social").'
    ],
    keyPoints: [
      'Tolerância oficial do ENEM: até 2 desvios gramaticais leves e 1 falha de estrutura sintática para nota máxima de 200 pontos.',
      'Nunca separe sujeito do verbo por vírgula ("A falta de saneamento, gera doenças" é ERRO GRAVE).',
      'Prefira a ordem direta das orações (Sujeito + Verbo + Complemento) para evitar ambiguidades.'
    ],
    fullSummary: [
      'A Competência 1 avalia a precisão vocabular e a clareza sintática do estudante.',
      'Evite o uso de vocabulário rebuscado que você não domina: a simplicidade culta pontua muito mais que o preciosismo truncado.',
      'Cuidado com a translineação na folha oficial: hifenize a palavra corretamente na margem direita sem invadir a borda.'
    ],
    practicalApplication: 'Troque a palavra feminina após a preposição por uma masculina; se virar "ao", há crase! Ex: "Foi à escola" -> "Foi ao colégio".',
    relatedVideo: {
      youtubeId: 'mM8k1_3P2w0',
      title: 'Competência 1 da Redação ENEM: Erros que Tiram Pontos',
      channel: 'Professor Noslen',
      durationMinutes: 14
    }
  },
  {
    slug: 'competencia-2-repertorio-sociocultural',
    title: 'Competência 2: Repertório Sociocultural Legitimado',
    area: 'redacao',
    subtopic: 'Critérios de Correção',
    shortDescription: 'Os 3 requisitos de ouro do repertório: ser legitimado por uma área do conhecimento, pertinente ao tema e produtivo no texto.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Repertório LEGITIMADO: filósofos, sociólogos, leis, obras literárias, filmes, dados estatísticos ou fatos históricos.',
      'Repertório PERTINENTE: tem relação direta com a palavra-chave central da frase temática.',
      'Repertório PRODUTIVO: não basta citar Bauman ou a CF/88; é obrigatório explicar o que essa citação tem a ver com o seu argumento.'
    ],
    keyPoints: [
      'Não copie dados dos textos motivadores sem contextualizar (cópia não conta como repertório sociocultural próprio).',
      'Uma única citação muito bem explicada e vinculada à tese garante os 200 pontos na Competência 2.',
      'Repertórios coringas eficientes: Constituição de 1988 (Art. 6º), Gilberto Dimenstein (Cidadão de Papel) e Zygmunt Bauman.'
    ],
    fullSummary: [
      'Muitos candidatos decoram citações, mas perdem pontos porque as jogam no texto sem conectá-las ao problema em discussão.',
      'O corretor quer ver a "produtividade": você citou a Constituição para mostrar que ela é desrespeitada na prática cotidiana.',
      'Tangenciamento do tema (falar de educação quando o tema é evasão escolar no ensino médio) rebaixa a nota para 40 pontos na C2.'
    ],
    practicalApplication: 'Sempre faça o arremate da citação: "De maneira análoga ao pensamento de [Autor], constata-se no Brasil que..."',
    relatedVideo: {
      youtubeId: 'qQ9p1_1M2w0',
      title: 'Repertório Sociocultural Produtivo na Redação do ENEM',
      channel: 'Débora Aladim',
      durationMinutes: 16
    }
  },
  {
    slug: 'competencia-3-projeto-de-texto',
    title: 'Competência 3: Projeto de Texto e Argumentação',
    area: 'redacao',
    subtopic: 'Critérios de Correção',
    shortDescription: 'Autoria, não-contradição, causa e consequência, e o cumprimento rigoroso do plano anunciado na introdução.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Projeto de texto estratégico: se você prometeu debater "negligência governamental" no D1 e "preconceito cultural" no D2, cumpra essa exata ordem.',
      'Argumentação consistente: fugir do senso comum raso e demonstrar a raiz estrutural do problema.',
      'Lacuna argumentativa: fazer afirmações graves sem apresentar a justificativa de por que aquilo acontece.'
    ],
    keyPoints: [
      'Evite termos vagos como "as pessoas precisam se conscientizar" sem dizer como e por que isso ainda não ocorreu.',
      'Use marcas de autoria explícitas: adjetivos e advérbios opinativos ("lamentavelmente", "urgente", "inaceitável", "perverso").',
      'Desfecho crítico em cada parágrafo de desenvolvimento mostrando o impacto do problema na dignidade humana.'
    ],
    fullSummary: [
      'A Competência 3 é historicamente a mais difícil de atingir os 200 pontos.',
      'Ela avalia se o texto foi previamente planejado ou se parece um fluxo de pensamentos desordenados.',
      'Para garantir a nota máxima, cada argumento deve seguir a trilha lógica: Apresentação da ideia -> Fundamentação com repertório -> Análise crítica da realidade -> Conclusão do parágrafo.'
    ],
    practicalApplication: 'Insira palavras com juízo de valor em todas as frases argumentativas para comprovar a defesa ativa da sua tese.',
    relatedVideo: {
      youtubeId: 'bB9p1_7K2w0',
      title: 'Como Tirar 200 na Competência 3 da Redação ENEM',
      channel: 'Descomplica',
      durationMinutes: 15
    }
  },
  {
    slug: 'competencia-4-conectivos-coesao',
    title: 'Competência 4: Conectivos e Coesão Textual',
    area: 'redacao',
    subtopic: 'Critérios de Correção',
    shortDescription: 'Regra dos conectivos interparágrafos, repertório variado de conjunções e diversidade lexical sem repetição.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Obrigatoriedade de conectivo no início dos parágrafos D1, D2 e Conclusão (ex: "Em primeiro lugar", "Ademais", "Portanto").',
      'Conectivos intraparágrafos: ligar todos os períodos internos com operadores adequados ("Nesse sentido", "Contudo", "Por conseguinte").',
      'Evitar repetição excessiva de palavras: usar pronomes, sinônimos e hiperônimos.'
    ],
    keyPoints: [
      'É obrigatório ter conectivos interparágrafos em pelo menos 2 pontos do texto (início de D2 e início da Conclusão).',
      'Diversidade: não use "além disso" ou "porém" três vezes na mesma redação.',
      'Conectivos de oposição: "não obstante", "contudo", "entretanto", "conquanto".',
      'Conectivos conclusivos: "portanto", "dessarte", "por conseguinte", "desta feita".'
    ],
    fullSummary: [
      'A Competência 4 é uma das mais mecânicas e fáceis de gabaritar com treino sistemático.',
      'O corretor procura visualmente a primeira palavra de cada parágrafo para checar a presença do operador coesivo.',
      'Para variar o vocabulário, monte um banco mental de substitutos para as palavras do tema (ex: "indivíduo", "cidadão", "população", "corpo social").'
    ],
    practicalApplication: 'Inicie o D2 com "Ademais" ou "Outrossim", e a Conclusão com "Portanto" ou "Dessarte". É regra de ouro para garantir os 200 pontos.',
    relatedVideo: {
      youtubeId: 'vV9p1_5M2w0',
      title: 'Os Conectivos Obrigatórios para a Redação do ENEM',
      channel: 'Curso Enem Gratuito',
      durationMinutes: 14
    }
  },
  {
    slug: 'competencia-5-proposta-de-intervencao',
    title: 'Competência 5: Os 5 Elementos da Proposta de Intervenção',
    area: 'redacao',
    subtopic: 'Critérios de Correção',
    shortDescription: 'A fórmula dos 200 pontos: Agente, Ação, Meio/Modo, Efeito e Detalhamento explicados detalhadamente.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Os 5 elementos obrigatórios (cada um vale exatamente 40 pontos na grade oficial do INEP).',
      'O detalhamento: pode ser do agente (especificando seu papel), da ação, do meio ou do efeito.',
      'Respeito aos Direitos Humanos: propostas que incitem violência, tortura ou discriminação zeram a C5.'
    ],
    keyPoints: [
      '1. AGENTE: Quem executará? (ex: "Ministério da Educação", "Governo Federal", "Prefeituras"). Evite agentes vagos como "nós" ou "a sociedade".',
      '2. AÇÃO: O que será feito? Verbo no infinitivo ("deve criar programas...", "precisa implementar fiscalizações...").',
      '3. MODO/MEIO: Como será feito? Marcado por "por meio de", "mediante", "através de".',
      '4. EFEITO: Para que será feito? Marcado por "a fim de", "com o fito de", "para garantir que".',
      '5. DETALHAMENTO: Uma oração explicativa entre vírgulas agregando informação útil a um dos 4 itens anteriores.'
    ],
    fullSummary: [
      'A Competência 5 é a única nota do ENEM que você pode garantir antes mesmo de conhecer o tema.',
      'Uma intervenção com os 5 elementos bem nítidos assegura os 200 pontos, independentemente de ser simples.',
      'O detalhamento mais fácil de fazer é o do Agente: basta colocar a função institucional do órgão entre vírgulas (ex: "O Ministério da Saúde, órgão responsável pela gestão do SUS,...").'
    ],
    practicalApplication: 'Decore a estrutura: "[Agente], [Detalhamento do Agente], deve [Ação], mediante [Meio], a fim de [Efeito]."',
    relatedVideo: {
      youtubeId: 'mM9p1_3K2w0',
      title: 'Proposta de Intervenção Nota 200: Passo a Passo Infalível',
      channel: 'Débora Aladim',
      durationMinutes: 17
    }
  },
  {
    slug: 'introducao-perfeita-redacao',
    title: 'Como Fazer a Introdução Perfeita na Redação',
    area: 'redacao',
    subtopic: 'Técnicas de Escrita',
    shortDescription: 'Estratégia infalível em 3 frases: contextualização com repertório, ponte temática e anúncio dos argumentos D1 e D2.',
    readingTimeMinutes: 4,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Começar direto com um marco histórico, filosófico ou literário de grande impacto.',
      'Usar a conjunção adversativa para contrapor o ideal da citação com a realidade precária brasileira ("Entretanto, no Brasil contemporâneo...").',
      'Deixar explícitos os dois problemas que serão aprofundados nos desenvolvimentos.'
    ],
    keyPoints: [
      'Frase 1 (Contextualização): citação da Constituição, alusão a um clássico da literatura ou dado histórico.',
      'Frase 2 (Ponte temática): demonstrar como o tema da prova quebra a promessa daquela contextualização.',
      'Frase 3 (Tese bipartida): "Desse modo, urge analisar não apenas a inércia estatal, mas também a desinformação popular."'
    ],
    fullSummary: [
      'A introdução é o cartão de visitas do seu texto e define a primeira impressão do avaliador.',
      'Uma introdução eficiente nunca ultrapassa 6 a 7 linhas e deve conter obrigatoriamente a frase temática completa.',
      'Se o tema for "Caminhos para combater a intolerância religiosa", essas exatas palavras devem aparecer na introdução.'
    ],
    practicalApplication: 'Sublinhe as palavras-chave da proposta do ENEM e garanta que todas elas constem na sua frase temática da introdução.',
    relatedVideo: {
      youtubeId: 'qQ9p1_2M2w0',
      title: 'A Introdução que Conquistou a Nota 1000 no ENEM',
      channel: 'Professor Noslen',
      durationMinutes: 13
    }
  },
  {
    slug: 'desenvolvimento-1-raiz-historica',
    title: 'Desenvolvimento 1: Causa Histórica e Estrutural',
    area: 'redacao',
    subtopic: 'Técnicas de Escrita',
    shortDescription: 'Como aprofundar o primeiro argumento com embasamento sociológico, demonstrando a raiz histórica do entrave.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Uso de tópicos frasais afirmativos e contundentes no início do parágrafo.',
      'Explicação causal: demonstrar que o problema não surgiu hoje, mas é fruto de heranças coloniais ou patriarcais.',
      'Crítica à inoperância governamental amparada na teoria de filósofos da política.'
    ],
    keyPoints: [
      'Frase 1 (Tópico Frasal): "Em primeiro plano, cabe destacar a omissão governamental como propulsora da problemática."',
      'Frase 2 (Repertório): "Conforme aponta Thomas Hobbes, cabe ao Estado garantir a segurança e o bem-estar dos cidadãos."',
      'Frase 3 (Argumentação): "Contudo, nota-se que as políticas públicas atuais são insuficientes, perpetuando o descaso."',
      'Frase 4 (Desfecho): "Logo, enquanto a máquina pública permanecer inerte, o quadro de vulnerabilidade persistirá."'
    ],
    fullSummary: [
      'O D1 deve convencer o leitor de que a primeira causa apontada na introdução é real e profunda.',
      'Nunca deixe o repertório isolado: a frase seguinte DEVE conter a palavra "Nesse sentido" ou "De forma análoga" para amarrar a ideia ao contexto brasileiro.',
      'Mantenha o foco estrito no primeiro argumento; guarde a segunda causa para o D2.'
    ],
    practicalApplication: 'Reserve no D1 a análise da esfera pública (leis, fiscalização, investimentos) ou da herança histórica.',
    relatedVideo: {
      youtubeId: 'bB9p1_1K2w0',
      title: 'Como Fazer o Parágrafo de Desenvolvimento 1 Perfeito',
      channel: 'Débora Aladim',
      durationMinutes: 15
    }
  },
  {
    slug: 'desenvolvimento-2-impacto-social',
    title: 'Desenvolvimento 2: Omissão Coletiva e Consequência Social',
    area: 'redacao',
    subtopic: 'Técnicas de Escrita',
    shortDescription: 'Como estruturar o segundo parágrafo argumentativo abordando preconceito, estigmas culturais e a dor dos indivíduos.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Início obrigatório com conectivo aditivo ("Ademais", "Outrossim", "Paralelamente").',
      'Abordar a face sociocultural do problema: silenciamento, individualismo e preconceitos enraizados no tecido social.',
      'Evitar contradição com o que foi dito no D1: os dois desenvolvimentos devem somar forças na defesa da tese.'
    ],
    keyPoints: [
      'Frase 1 (Tópico Frasal): "Ademais, a negligência social corrobora a perpetuação desse cenário lastimável."',
      'Frase 2 (Repertório): "Para Zygmunt Bauman, a sociedade líquida é marcada pela mercantilização e pela indiferença mútua."',
      'Frase 3 (Argumentação): "Esse comportamento individualista normaliza a exclusão das minorias em questão."',
      'Frase 4 (Desfecho): "Torna-se imperioso, portanto, desconstruir essa postura de indiferença generalizada."'
    ],
    fullSummary: [
      'Enquanto o D1 costuma focar no macro (Estado, história, economia), o D2 funciona muito bem focando no micro (sociedade, cultura, mídia).',
      'Essa dobradinha (Estado omisso + Sociedade apática) atende perfeitamente à exigência de projeto de texto rico do ENEM.',
      'Termine o D2 com um fechamento que deixe o leitor ansiando pela proposta de intervenção.'
    ],
    practicalApplication: 'Use o D2 para demonstrar empatia com as pessoas que mais sofrem na ponta com o problema temático.',
    relatedVideo: {
      youtubeId: 'vV9p1_0M2w0',
      title: 'Desenvolvimento 2 na Redação do ENEM sem Erros',
      channel: 'Descomplica',
      durationMinutes: 14
    }
  },
  {
    slug: 'erros-que-zeram-a-redacao',
    title: 'Erros Fatais que Zeram ou Destroem a Nota',
    area: 'redacao',
    subtopic: 'Regulamento Oficial',
    shortDescription: 'Fuga total ao tema, texto insuficiente (menos de 7 linhas), assinatura fora do local e desrespeito aos direitos humanos.',
    readingTimeMinutes: 4,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Fuga total ao tema (zeramento automático): falar sobre violência geral quando o tema é violência infantil.',
      'Não obedecer à tipologia dissertativa (fazer uma poesia ou narrativa).',
      'Inserir desenhos, apelidos ou recados para o corretor na folha oficial (anulação por elemento identificador).'
    ],
    keyPoints: [
      'Texto com menos de 7 linhas escritas é nota ZERO sumária.',
      'Cópia integral dos textos motivadores é descontada do cômputo de linhas; se sobrar menos de 7 linhas próprias, é zero.',
      'Desrespeito aos Direitos Humanos: não zera mais a redação inteira desde 2017, mas ZERA a Competência 5 (perda de 200 pontos imediatos).'
    ],
    fullSummary: [
      'O medo de zerar a redação paralisa muitos alunos, mas as regras de anulação são muito objetivas e fáceis de evitar.',
      'Para não fugir do tema, garanta que todas as palavras do tema apareçam no primeiro parágrafo.',
      'Escreva pelo menos 25 linhas na folha oficial para permitir o desenvolvimento aprofundado dos argumentos.'
    ],
    practicalApplication: 'Jamais proponha medidas punitivas extremas (pena de morte, tortura, trabalho forçado): isso zera a Competência 5 na hora.',
    relatedVideo: {
      youtubeId: 'qQ9p1_7M2w0',
      title: '7 Erros que Podem Zerar Sua Redação no ENEM',
      channel: 'Brasil Escola',
      durationMinutes: 12
    }
  },
  {
    slug: 'revisao-final-do-rascunho',
    title: 'Técnica de Revisão do Rascunho em 10 Minutos',
    area: 'redacao',
    subtopic: 'Gestão de Tempo',
    shortDescription: 'Protocolo de checklist rápido antes de passar a limpo: crases, conectivos, 5 elementos e repetições.',
    readingTimeMinutes: 4,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Ler o texto do final para o começo (frase por frase) para flagrar erros gramaticais que o cérebro acostumado ignora.',
      'Contar os conectivos de início de parágrafo (D1, D2 e Conclusão).',
      'Conferir com os dedos se a proposta possui os 5 elementos (Quem? O quê? Como? Para quê? Detalhe?).'
    ],
    keyPoints: [
      'Passe 1 (Estrutura): conferir se há exatamente 4 parágrafos bem delimitados visualmente.',
      'Passe 2 (Competência 5): sublinhar o agente, a ação, o meio, o efeito e o detalhamento.',
      'Passe 3 (Gramática): checar crases duvidosas e concordâncias verbais de sujeitos compostos.',
      'Passe 4 (Passar a limpo): letra legível, respeitando as margens e sem rasuras feias.'
    ],
    fullSummary: [
      'Passar a redação a limpo com pressa é receita certa para cometer erros bobos de grafia e acentuação.',
      'Ao reservar 10 minutos para uma leitura crítica calma do rascunho, você pode resgatar de 40 a 80 pontos preciosos.',
      'Se errar uma palavra na folha definitiva, passe um único traço simples por cima e escreva a palavra correta ao lado; nunca use corretivo.'
    ],
    practicalApplication: 'Se errar na folha oficial: faça apenas "exemplo" com um traço reto e continue escrevendo normalmente.',
    relatedVideo: {
      youtubeId: 'bB9p1_3K2w0',
      title: 'Checklist Definitivo antes de Passar a Redação a Limpo',
      channel: 'Curso Enem Gratuito',
      durationMinutes: 11
    }
  }
];
