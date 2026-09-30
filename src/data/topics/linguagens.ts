import { Subject } from '../../types';

export const LINGUAGENS_TOPICS: Subject[] = [
  {
    slug: 'funcoes-da-linguagem',
    title: 'Funções da Linguagem',
    area: 'linguagens',
    subtopic: 'Comunicação e Teoria do Texto',
    shortDescription: 'Como os elementos da comunicação determinam a intenção do emissor (emotiva, conativa, referencial, etc.).',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video', 'mapa'],
    whatFallsMost: [
      'Identificar o objetivo comunicativo predominante em anúncios publicitários (função conativa).',
      'Textos poéticos e crônicas explorando a sonoridade e estética das palavras (função poética).',
      'Reportagens científicas e jornalísticas focadas na informação objetiva (função referencial).'
    ],
    keyPoints: [
      'Emotiva: foco no emissor (1ª pessoa, sentimentos).',
      'Conativa/Apelativa: foco no receptor (verbos no imperativo, persuasão).',
      'Referencial: foco no contexto/referente (imparcialidade, 3ª pessoa).',
      'Metalinguística: código explicando o próprio código (dicionário, poema sobre fazer poesia).',
      'Fática: canal de contato ("alô?", "entendeu?", saudações).',
      'Poética: foco na mensagem e ritmo.'
    ],
    fullSummary: [
      'No ENEM, as funções da linguagem nunca são cobradas de forma decorada. A prova sempre apresenta um texto real (charge, notícia, anúncio ou poema) e exige que o aluno perceba a intenção de quem escreveu.',
      'A função conativa (ou apelativa) é a recordista em provas, presente em campanhas de vacinação, conscientização no trânsito e anúncios comerciais.',
      'Atenção para não confundir função emotiva (expressão de sentimentos do autor) com poética (arranjo rítmico e estético das palavras).'
    ],
    practicalApplication: 'Ao ler a questão, circule o verbo do comando: se pedir "persuadir", procure a conativa; se pedir "informar com exatidão", referencial.',
    relatedVideo: {
      youtubeId: 'W8oYc2vK6E8',
      title: 'Funções da Linguagem no ENEM: Macetes e Questões',
      channel: 'Professor Noslen',
      durationMinutes: 14
    },
    mindMapId: 'funcoes-da-linguagem',
    frequentlyTestedYears: 'Presente em praticamente todas as edições do ENEM.'
  },
  {
    slug: 'variacao-linguistica',
    title: 'Variação Linguística e Preconceito Linguístico',
    area: 'linguagens',
    subtopic: 'Sociolinguística',
    shortDescription: 'As diferenças regionais, sociais, históricas e de estilo da língua portuguesa sem juízo de valor.',
    readingTimeMinutes: 4,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Combate ao preconceito linguístico: o ENEM sempre valoriza a adequação ao contexto em vez de "certo vs errado".',
      'Variação diatópica (regional/geográfica) em canções populares e literatura regionalista.',
      'Variação diafásica (registro formal vs informal).'
    ],
    keyPoints: [
      'A língua é viva e dinâmica; adequação linguística é o critério oficial do ENEM.',
      'Variação regional (diatópica): sotaques, gírias locais e expressões culturais.',
      'Variação histórica (diacrônica): evolução das palavras como "vossa mercê" -> "você".',
      'Variação social (diastrática): dialetos de grupos etários, profissionais ou sociais.'
    ],
    fullSummary: [
      'O ENEM cobra uma visão moderna da língua portuguesa fundamentada na sociolinguística. Não existe linguagem errada, mas sim inadequada à situação comunicativa.',
      'Muitas questões trazem letras de música (Luiz Gonzaga, Adoniran Barbosa) e pedem o reconhecimento da riqueza cultural presente nas variantes populares.',
      'Desconfie de alternativas que usem termos preconceituosos como "linguagem inferior", "empobrecimento da língua" ou "incapacidade gramatical".'
    ],
    practicalApplication: 'Se a questão contrapor norma padrão e variante popular, a resposta correta quase sempre exalta a expressividade e a identidade cultural da fala popular.',
    relatedVideo: {
      youtubeId: 'Jg66GqjW6Z8',
      title: 'Variação Linguística: O que o ENEM mais cobra',
      channel: 'Brasil Escola',
      durationMinutes: 11
    }
  },
  {
    slug: 'figuras-de-linguagem',
    title: 'Figuras de Linguagem',
    area: 'linguagens',
    subtopic: 'Estilística e Semântica',
    shortDescription: 'Recursos estilísticos para gerar expressividade, ironia, antítese e metáfora em textos literários e charges.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Metáfora e Metonímia em tirinhas e charges críticas.',
      'Ironia como recurso de crítica social e denúncia.',
      'Paradoxo e Antítese no Barroco e na poesia moderna.'
    ],
    keyPoints: [
      'Metáfora: comparação implícita sem conectivo comparativo.',
      'Metonímia: troca de termos com relação de proximidade (o autor pela obra, a parte pelo todo).',
      'Ironia: afirmar o oposto do que se quer dizer para gerar sarcasmo ou humor reflexivo.',
      'Hipérbole: exagero intencional para enfatizar uma ideia.',
      'Personificação / Prosopopeia: atribuir ações humanas a seres inanimados.'
    ],
    fullSummary: [
      'Figuras de linguagem no ENEM não aparecem em listas para memorizar, mas aplicadas ao sentido global do texto.',
      'A ironia é a figura mais frequente em charges do ENEM, usada para denunciar problemas como desigualdade, consumismo e política.',
      'Antítese reúne ideias opostas que coexistem; paradoxo reúne termos contraditórios que parecem impossíveis na lógica comum.'
    ],
    practicalApplication: 'Observe imagens e balões de fala em tirinhas: a graça ou a crítica costuma nascer da quebra de expectativa provocada pela figura de estilo.',
    relatedVideo: {
      youtubeId: '3qK08Qe9cVE',
      title: 'Figuras de Linguagem Definitivas para o ENEM',
      channel: 'Descomplica',
      durationMinutes: 15
    }
  },
  {
    slug: 'modernismo-brasileiro',
    title: 'Modernismo Brasileiro (1ª, 2ª e 3ª Fases)',
    area: 'linguagens',
    subtopic: 'Literatura Brasileira',
    shortDescription: 'Semana de Arte Moderna de 1922, poesia de 30 (Drummond, Vinicius) e prosa regionalista (Graciliano Ramos).',
    readingTimeMinutes: 6,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Semana de 22: ruptura com o parnasianismo, nacionalismo crítico e antropofagia cultural.',
      'Geração de 30: denúncia social no Nordeste (Vidas Secas) e poesia engajada (Sentimento do Mundo).',
      'Clarice Lispector e Guimarães Rosa na 3ª fase: mergulho psicológico e reinvenção do sertão.'
    ],
    keyPoints: [
      '1ª Fase (1922-1930): Fase heroica/destrutiva, Oswald e Mário de Andrade, verso livre, humor.',
      '2ª Fase (1930-1945): Fase de consolidação, romance regionalista de denúncia, Drummond e Cecília Meireles.',
      '3ª Fase (1945 em diante): Pós-modernismo, inovação da linguagem (neologismos de Guimarães Rosa).'
    ],
    fullSummary: [
      'O Modernismo é a escola literária que mais cai no ENEM, somando quase metade das questões de literatura.',
      'O movimento buscou redescobrir o Brasil real, afastando a imitação de modelos europeus acadêmicos.',
      'Em Graciliano Ramos (Vidas Secas), o ENEM costuma questionar a animalização dos retirantes e o silenciamento imposto pela miséria.'
    ],
    practicalApplication: 'Relacione os poemas de Drummond e a prosa de Graciliano com temas de redação sobre desigualdade e cidadania.',
    relatedVideo: {
      youtubeId: 'YIknrK2R7yA',
      title: 'Modernismo no ENEM: As 3 Fases Explicadas',
      channel: 'Débora Aladim',
      durationMinutes: 18
    }
  },
  {
    slug: 'generos-e-tipos-textuais',
    title: 'Gêneros e Tipologias Textuais',
    area: 'linguagens',
    subtopic: 'Compreensão de Texto',
    shortDescription: 'Distinção entre tipo (narrar, descrever, dissertar, injungir) e gênero (crônica, artigo, receita, meme).',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Reconhecer a função social do gênero (para que serve um editorial, um infográfico ou um abaixo-assinado).',
      'Texto injuntivo/instrucional: receitas, bulas, manuais e regulamentos oficiais.',
      'Identificar o gênero híbrido na internet (memes com crítica política ou social).'
    ],
    keyPoints: [
      'Tipos textuais são poucos e fixos: narrativo, descritivo, dissertativo-argumentativo, expositivo e injuntivo.',
      'Gêneros textuais são infinitos e adaptáveis às necessidades cotidianas.',
      'Texto injuntivo: marcado por verbos imperativos e passo a passo ordenado.'
    ],
    fullSummary: [
      'O ENEM trata a leitura como prática social. Cada texto foi produzido em uma época, para um público específico e com uma finalidade.',
      'Questões sobre infográficos e charges exigem articular linguagem verbal e não-verbal simultaneamente.',
      'A tipologia dissertativo-argumentativa é a mesma exigida na redação do ENEM: defesa de ponto de vista com argumentos consistentes.'
    ],
    practicalApplication: 'Ao analisar um texto longo, leia primeiro a fonte no rodapé: se for de uma revista científica, o tom é expositivo; se for jornal de opinião, dissertativo.',
    relatedVideo: {
      youtubeId: 'b78a9uL1f4c',
      title: 'Diferença entre Gênero e Tipo Textual no ENEM',
      channel: 'Professor Noslen',
      durationMinutes: 12
    }
  },
  {
    slug: 'coesa-e-coerencia',
    title: 'Coesão e Coerência Textual',
    area: 'linguagens',
    subtopic: 'Gramática Textual',
    shortDescription: 'Mecanismos de amarração de ideias: conectivos interparágrafos, pronomes anafóricos e progressão temática.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Valor semântico das conjunções (adversidade, concessão, causa e consequência).',
      'Ambiguidade causada por mau uso de pronomes relativos ou possessivos.',
      'Uso de operadores argumentativos para direcionar a conclusão do leitor.'
    ],
    keyPoints: [
      'Coesão referencial: retomada ou antecipação de termos (anáfora e catáfora).',
      'Coesão sequencial: encadeamento de orações por meio de conectivos.',
      'Coerência: a harmonia de sentido e a não-contradição lógica das ideias.'
    ],
    fullSummary: [
      'Dominar coesão garante pontos duplos: na prova objetiva de Linguagens e na Competência 4 da redação.',
      'Atenção à diferença crucial entre adversativa ("mas", "porém") e concessiva ("embora", "ainda que"): a concessiva reconhece um obstáculo mas não invalida o fato principal.',
      'A falta de coesão quebra a progressão temática do texto e gera perda de tempo na releitura.'
    ],
    practicalApplication: 'Memorize conectivos menos óbvios como "outrossim" (adição), "conquanto" (concessão) e "dessarte" (conclusão).',
    relatedVideo: {
      youtubeId: 'Fh9_4K1z7n4',
      title: 'Coesão e Conectivos para Arrebentar no ENEM',
      channel: 'Curso Enem Gratuito',
      durationMinutes: 13
    }
  },
  {
    slug: 'artes-visuais-e-vanguardas',
    title: 'Vanguardas Europeias e Artes Visuais',
    area: 'linguagens',
    subtopic: 'História da Arte',
    shortDescription: 'Cubismo, Futurismo, Expressionismo, Dadaísmo e Surrealismo e suas influências no Brasil.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Identificar o impacto das vanguardas na Semana de Arte Moderna de 1922.',
      'Cubismo: geometrização e múltiplos ângulos de visão simultâneos.',
      'Expressionismo: distorção da realidade para projetar angústia e sentimentos interiores.'
    ],
    keyPoints: [
      'Cubismo: Picasso e Tarsila do Amaral (fase Pau-Brasil).',
      'Surrealismo: universo dos sonhos, inconsciente e estranhamento (Dalí).',
      'Dadaísmo: antiarte, colagem, nonsense e questionamento dos padrões burgueses.',
      'Futurismo: exaltação da máquina, velocidade e dinamismo da vida urbana.'
    ],
    fullSummary: [
      'As questões de artes no ENEM sempre relacionam a obra visual ao contexto histórico de crise da Europa pós-Primeira Guerra.',
      'O artista moderno rompe com a mimese (cópia fiel da natureza) para expressar novas formas de ver o mundo.',
      'No Brasil, Anita Malfatti foi o estopim da renovação estética modernista com sua polêmica exposição de 1917.'
    ],
    practicalApplication: 'Procure entender o que o artista quis provocar no espectador, em vez de julgar se a obra é "bonita" no sentido clássico.',
    relatedVideo: {
      youtubeId: 'D8H3j_2W0xY',
      title: 'Vanguardas Europeias para o ENEM em 10 Minutos',
      channel: 'Brasil Escola',
      durationMinutes: 10
    }
  },
  {
    slug: 'barroco-e-arcadismo',
    title: 'Barroco e Arcadismo',
    area: 'linguagens',
    subtopic: 'Literatura Colonial',
    shortDescription: 'O conflito alma vs matéria em Gregório de Matos e o retorno à simplicidade pastoril de Tomás Antônio Gonzaga.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Dualismo barroco: teocentrismo medieval contra antropocentrismo renascentista.',
      'Gregório de Matos (Boca do Inferno): sátira feroz à corrupção na Bahia colonial.',
      'Arcadismo: lemas latinos (Carpe Diem, Fugere Urbem, Locus Amoenus) e Inconfidência Mineira.'
    ],
    keyPoints: [
      'Cultismo: jogo de palavras, metáforas rebuscadas e sonoridade.',
      'Conceptismo: jogo de ideias, raciocínio lógico e argumentação (Padre Antônio Vieira).',
      'Arcadismo: clareza, bucolismo, pastores e crítica ao luxo barroco.'
    ],
    fullSummary: [
      'O Barroco expressa o homem dividido entre o pecado e a salvação, reflexo direto da Contrarreforma católica.',
      'Já o Arcadismo dialoga com o Iluminismo e os ideais de liberdade que culminaram na Inconfidência Mineira.',
      'No ENEM, os sermões de Vieira são cobrados tanto pela retórica brilhante quanto pela análise das relações coloniais.'
    ],
    practicalApplication: 'Ao analisar um poema com paradoxos e claro-escuro, pense em Barroco; se houver pastores e vida campestre simples, é Arcadismo.',
    relatedVideo: {
      youtubeId: 'q5P1k1qA5fU',
      title: 'Barroco e Arcadismo: Diferenças Essenciais no ENEM',
      channel: 'Curso Enem Gratuito',
      durationMinutes: 14
    }
  },
  {
    slug: 'intertextualidade-e-parodia',
    title: 'Intertextualidade, Paródia e Paráfrase',
    area: 'linguagens',
    subtopic: 'Análise de Texto',
    shortDescription: 'Diálogo entre textos: releituras críticas, homenagens, memes e apropriação de obras consagradas.',
    readingTimeMinutes: 4,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Paródia da "Canção do Exílio" de Gonçalves Dias por poetas modernistas como Oswald de Andrade e Drummond.',
      'Paráfrase: reescrever uma ideia com novas palavras mantendo o sentido original.',
      'Citações em propagandas para gerar cumplicidade e humor com o leitor.'
    ],
    keyPoints: [
      'Paródia: altera o sentido original para criar ironia, sátira ou subversão.',
      'Paráfrase: reafirma a mensagem original com vocabulário alternativo.',
      'Pastiche: imitação estilística como forma de tributo.',
      'Epígrafe: citação no início de uma obra que resume o tom da leitura.'
    ],
    fullSummary: [
      'O ENEM adora cobrar poemas que conversam com a Canção do Exílio ("Minha terra tem palmeiras, onde canta o sabiá...").',
      'Na paródia de Oswald ("Minha terra tem palmares / onde gorjeia o mar"), há uma crítica social e antirracista direta.',
      'Saber identificar o texto-fonte é o segredo para matar a questão em menos de 2 minutos.'
    ],
    practicalApplication: 'Procure sempre a palavra-chave que subverte o texto original: ela revelará a intenção do autor modernista.',
    relatedVideo: {
      youtubeId: 'vC_R3n9Wp_s',
      title: 'Intertextualidade no ENEM: Paródia vs Paráfrase',
      channel: 'Descomplica',
      durationMinutes: 11
    }
  },
  {
    slug: 'linguagem-publicitaria-e-charge',
    title: 'Linguagem Publicitária, Cartum e Charge',
    area: 'linguagens',
    subtopic: 'Leitura Não-Verbal',
    shortDescription: 'Decodificação de metáforas visuais, recursos persuasivos de campanhas sociais e humor crítico.',
    readingTimeMinutes: 4,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Campanhas institucionais do governo (doação de sangue, combate à dengue, respeito às mulheres).',
      'Diferença entre charge (ligada a um fato jornalístico recente) e cartum (atemporal, sobre o comportamento humano).',
      'Relação de complementaridade entre a imagem e a frase de efeito (slogan).'
    ],
    keyPoints: [
      'Texto multissemiótico: conjuga cores, tipografia, expressão facial e texto escrito.',
      'Slogan: frase curta, sonora e de fácil memorização.',
      'Efeito de humor reflexivo: não busca o riso fácil, mas a conscientização social.'
    ],
    fullSummary: [
      'Quase um terço da prova de Linguagens utiliza recursos visuais conjugados com texto verbal.',
      'O leitor deve atentar para elementos gráficos secundários: sombras, proporções exageradas e expressões faciais.',
      'Em campanhas de utilidade pública, o comando da questão costuma pedir para identificar o apelo persuasivo utilizado.'
    ],
    practicalApplication: 'Não olhe apenas para o texto: a resposta muitas vezes está em um detalhe desenhado no canto do cartum.',
    relatedVideo: {
      youtubeId: 'eK5eZ1X_2mY',
      title: 'Como Interpretar Charges e Publicidade no ENEM',
      channel: 'Brasil Escola',
      durationMinutes: 13
    }
  },
  {
    slug: 'literatura-contemporanea',
    title: 'Literatura Contemporânea e Marginal',
    area: 'linguagens',
    subtopic: 'Produção Atual',
    shortDescription: 'Vozes periféricas, literatura afro-brasileira, Carolina Maria de Jesus e Conceição Evaristo no ENEM.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Quarto de Despejo (Carolina Maria de Jesus): fome, favela e denúncia social.',
      'Escrevivência (Conceição Evaristo): escrita fundamentada na vivência da mulher negra.',
      'Poesia de Slam e Hip-hop como manifestação legítima da cultura contemporânea.'
    ],
    keyPoints: [
      'Deslocamento do centro para as periferias sociais e geográficas.',
      'Ruptura com o cânone tradicional elitista.',
      'Temas urgentes: racismo estrutural, violência urbana, desigualdade de gênero e identidade.'
    ],
    fullSummary: [
      'O ENEM das últimas edições tem valorizado intensamente autores que foram historicamente silenciados.',
      'Carolina Maria de Jesus narra com crueza a sobrevivência na favela do Canindé nos anos 1950.',
      'O conceito de "escrevivência" une vivência biográfica, memória coletiva e militância política em palavras.'
    ],
    practicalApplication: 'Esses autores são repertório de ouro para a redação em temas de justiça social, pobreza e direitos fundamentais.',
    relatedVideo: {
      youtubeId: 'hJ8_9A5q21E',
      title: 'Literatura Contemporânea e Escrevivência no ENEM',
      channel: 'Débora Aladim',
      durationMinutes: 15
    }
  },
  {
    slug: 'interpretacao-textual-estrategica',
    title: 'Interpretação Textual Estratégica',
    area: 'linguagens',
    subtopic: 'Competência Leitora',
    shortDescription: 'Técnicas de leitura de comandos, localização de pistas textuais e eliminação de distratores clássicos.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Distrator de extrapolação (a afirmativa parece verdadeira, mas não está no texto).',
      'Distrator de redução (a alternativa aborda apenas um pedaço sem responder à totalidade).',
      'Distrator de oposição (afirma o contrário de uma linha sutil do autor).'
    ],
    keyPoints: [
      'Ler o comando e as alternativas ANTES de ler o texto longo poupa até 40% do tempo.',
      'Sublinhar o verbo de ação: "destacar", "contrapor", "ironizar", "exemplificar".',
      'A resposta certa é uma paráfrase da tese defendida pelo autor, nunca da sua opinião pessoal.'
    ],
    fullSummary: [
      'A prova de Linguagens tem textos muito extensos para cansar o candidato propositalmente.',
      'A estratégia vencedora consiste em ler a fonte (rodapé) e o comando da questão para saber exatamente o que procurar.',
      'Ao voltar ao texto, leia apenas o parágrafo ou trecho relevante com atenção cirúrgica.'
    ],
    practicalApplication: 'Nunca responda com base no que você acha ou no que o senso comum dita: a resposta deve ser comprovada com linhas do texto.',
    relatedVideo: {
      youtubeId: 'p0LqW6E7t3Q',
      title: 'Método para Acertar 40+ em Linguagens no ENEM',
      channel: 'Curso Enem Gratuito',
      durationMinutes: 16
    }
  }
];
