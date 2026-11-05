// Dados estruturados da Central da Reta Final - ENEM 2026
// Conteúdos objetivos, didáticos e integrados com as ferramentas da plataforma.

export interface DailyMission {
  id: string;
  dayType: 'dia1' | 'dia2';
  title: string;
  discipline: string;
  summary: string;
  estimatedMinutes: number;
  areaId: 'linguagens' | 'humanas' | 'redacao' | 'matematica' | 'natureza';
  actionRoute?: string;
  actionLabel: string;
}

export interface ContentTopicItem {
  id: string;
  title: string;
  category: string;
  relevanceNotice: string;
  summaryPoints: string[];
  examStrategyTip: string;
  relatedToolRoute?: string;
  relatedToolLabel?: string;
  relatedSubjectSlug?: string;
}

export interface SimuladoQuestion {
  id: string;
  dayType: 'dia1' | 'dia2';
  discipline: string;
  sourceLabel: string; // Ex: 'Questão autoral de treinamento — Padrão ENEM'
  textContext: string;
  questionPrompt: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
}

// ==========================================
// MISSÕES DIÁRIAS (Etapa 1 e Etapa 2)
// ==========================================
export const DAILY_MISSIONS: DailyMission[] = [
  // Missões do 1º Dia
  {
    id: 'missao-red-1',
    dayType: 'dia1',
    title: 'Treinar 1 Introdução com Repertório e Tese Dupla',
    discipline: 'Redação',
    summary: 'Escreva um parágrafo de introdução relacionando uma alusão filosófica ou histórica ao tema, antecipando os dois argumentos (D1 e D2).',
    estimatedMinutes: 20,
    areaId: 'redacao',
    actionRoute: '/corretor',
    actionLabel: 'Abrir Corretor com IA',
  },
  {
    id: 'missao-ling-1',
    dayType: 'dia1',
    title: 'Dominar as Funções Conativa e Metalinguística',
    discipline: 'Linguagens',
    summary: 'Reconheça verbos no imperativo e recursos de persuasão em textos publicitários e poemas que refletem sobre o ato de escrever.',
    estimatedMinutes: 15,
    areaId: 'linguagens',
    actionRoute: '/assunto/funcoes-da-linguagem',
    actionLabel: 'Ver Resumo Completo',
  },
  {
    id: 'missao-hum-1',
    dayType: 'dia1',
    title: 'Revisar Cidadania e Contratualismo (Hobbes, Locke, Rousseau)',
    discipline: 'Ciências Humanas (Filosofia/Sociologia)',
    summary: 'Fixe as diferenças entre o estado de natureza, pacto social e papel do Estado em questões de direitos fundamentais.',
    estimatedMinutes: 25,
    areaId: 'humanas',
    actionRoute: '/mapas',
    actionLabel: 'Explorar Mapas Mentais',
  },
  {
    id: 'missao-red-2',
    dayType: 'dia1',
    title: 'Checklist dos 5 Elementos da Proposta de Intervenção',
    discipline: 'Redação',
    summary: 'Busque a pontuação máxima na Competência 5 com Agente, Ação, Meio/Modo, Efeito e Detalhamento explícito.',
    estimatedMinutes: 15,
    areaId: 'redacao',
    actionRoute: '/repertorio',
    actionLabel: 'Consultar Repertórios',
  },
  {
    id: 'missao-sim-1',
    dayType: 'dia1',
    title: 'Simulado Rápido de Treinamento (Questões Autorais)',
    discipline: 'Simulado Integrado',
    summary: 'Treine interpretação e eliminação de distratores nas questões autorais cronometradas da Central da Reta Final.',
    estimatedMinutes: 25,
    areaId: 'linguagens',
    actionLabel: 'Fazer Simulado Abaixo',
  },

  // Missões do 2º Dia
  {
    id: 'missao-mat-1',
    dayType: 'dia2',
    title: 'Cálculo de Proporção, Escala e Regra de Três Rápida',
    discipline: 'Matemática',
    summary: 'Priorize as questões de alta coerência TRI: conversão de unidades lineares, áreas e volumes em escalas cartográficas.',
    estimatedMinutes: 25,
    areaId: 'matematica',
    actionRoute: '/dicas',
    actionLabel: 'Dicas de Gestão de Tempo',
  },
  {
    id: 'missao-bio-1',
    dayType: 'dia2',
    title: 'Impactos Ecológicos: Eutrofização e Magnificação Trófica',
    discipline: 'Biologia / Natureza',
    summary: 'Revise o acúmulo de metais pesados na cadeia e o processo de proliferação de algas por excesso de matéria orgânica.',
    estimatedMinutes: 20,
    areaId: 'natureza',
    actionRoute: '/mapas?id=meio-ambiente',
    actionLabel: 'Mapa de Meio Ambiente',
  },
  {
    id: 'missao-fis-1',
    dayType: 'dia2',
    title: 'Consumo de Energia Elétrica (Potência e kWh na Prática)',
    discipline: 'Física',
    summary: 'Fórmula E = P . Δt aplicada ao cálculo da conta de luz residencial e comparação de aparelhos de alto consumo.',
    estimatedMinutes: 20,
    areaId: 'natureza',
    actionRoute: '/#mural',
    actionLabel: 'Ver Resumos de Física',
  },
  {
    id: 'missao-qui-1',
    dayType: 'dia2',
    title: 'Reconhecimento de Funções Orgânicas e Polaridade',
    discipline: 'Química',
    summary: 'Álcool, éster, ácido carboxílico, amina e amida aplicados a fármacos, sabões e polímeros.',
    estimatedMinutes: 20,
    areaId: 'natureza',
    actionRoute: '/#mural',
    actionLabel: 'Ver Resumos de Química',
  },
  {
    id: 'missao-sim-2',
    dayType: 'dia2',
    title: 'Resolver o Simulado de Exatas e Natureza',
    discipline: 'Simulado Integrado',
    summary: 'Treine resolução de questões sem calculadora e com raciocínio proporcional rápido.',
    estimatedMinutes: 30,
    areaId: 'matematica',
    actionLabel: 'Fazer Simulado Abaixo',
  },
];

// ==========================================
// CONTEÚDOS DO 1º DIA (4 Áreas)
// ==========================================

export const LINGUAGENS_CONTENT: ContentTopicItem[] = [
  {
    id: 'ling-interp',
    title: 'Interpretação Textual & Localização de Informações',
    category: 'Linguagens e Códigos',
    relevanceNotice: 'Tema com presença massiva em todas as edições.',
    summaryPoints: [
      'Leitura orientada pelo enunciado: leia a pergunta antes do texto para saber exatamente qual dado ou intenção buscar.',
      'Atenção aos distratores de extrapolação: alternativas que trazem afirmações verdadeiras no mundo real, mas que não estão sustentadas pelo texto.',
      'Identificação da tese e do ponto de vista do autor através de modalizadores como adjetivos valorativos e advérbios.',
    ],
    examStrategyTip: 'Se duas alternativas parecerem corretas, escolha aquela que responde estritamente ao comando e tem suporte direto no texto de apoio.',
    relatedToolRoute: '/videos',
    relatedToolLabel: 'Ver Videoaulas de Interpretação',
  },
  {
    id: 'ling-generos',
    title: 'Gêneros Textuais e Esferas de Circulação',
    category: 'Linguagens e Códigos',
    relevanceNotice: 'Muito cobrado na prova de Linguagens.',
    summaryPoints: [
      'Gêneros jornalísticos e informativos: notícia (fato imediato, pirâmide invertida) vs. reportagem (aprofundamento com múltiplas vozes).',
      'Gêneros de opinião: editorial (voz institucional do veículo), artigo de opinião (assinado por especialista/autor) e carta aberta.',
      'Gêneros digitais e multimodais: memes, infográficos e campanhas onde texto verbal e elementos visuais se complementam.',
    ],
    examStrategyTip: 'Pergunte-se sempre: "Quem escreveu?", "Para quem?", "Em qual veículo?" e "Com qual objetivo?".',
    relatedSubjectSlug: 'funcoes-da-linguagem',
    relatedToolRoute: '/assunto/funcoes-da-linguagem',
    relatedToolLabel: 'Resumo de Comunicação',
  },
  {
    id: 'ling-funcoes',
    title: 'Funções da Linguagem na Prática',
    category: 'Linguagens e Códigos',
    relevanceNotice: 'Recorrente em propagandas, poemas e textos informativos.',
    summaryPoints: [
      'Conativa/Apelativa (Foco no receptor): imperativo, pronomes de 2ª pessoa ("você"), presente em propagandas e cartazes educativos.',
      'Emotiva/Expressiva (Foco no emissor): 1ª pessoa, exclamações, relato subjetivo de sentimentos e impressões pessoais.',
      'Referencial/Denotativa (Foco no contexto): 3ª pessoa, linguagem direta, objetividade em textos científicos e notícias.',
      'Metalinguística (Foco no código): poema explicando o ato da criação poética, dicionários, dicionário de cinema.',
      'Poética (Foco na mensagem): sonoridade, ritmo, rimas e jogos de palavras.',
      'Fática (Foco no canal): teste ou manutenção do contato ("Alô?", "Veja bem", "Entende?").',
    ],
    examStrategyTip: 'No ENEM a questão costuma associar a função ao objetivo social do texto.',
    relatedSubjectSlug: 'funcoes-da-linguagem',
    relatedToolRoute: '/assunto/funcoes-da-linguagem',
    relatedToolLabel: 'Revisar Funções da Linguagem',
  },
  {
    id: 'ling-literatura',
    title: 'Literatura Brasileira e Modernismo',
    category: 'Linguagens e Códigos',
    relevanceNotice: 'O Modernismo (1922 e 1930) é a corrente com maior incidência.',
    summaryPoints: [
      '1ª Fase Modernista (1922): ruptura radical, liberdade formal, valorização do falar brasileiro cotidiano (Oswald de Andrade, Mário de Andrade).',
      '2ª Fase Modernista (1930): denúncia social, seca no Nordeste e desigualdade regional (Graciliano Ramos, Drummond, Jorge Amado).',
      '3ª Fase (1945): introspecção psicológica e metalinguagem (Clarice Lispector, Guimarães Rosa).',
      'Literatura Contemporânea: representatividade, periferia, vozes femininas e indígenas (Carolina Maria de Jesus, Conceição Evaristo).',
    ],
    examStrategyTip: 'O ENEM analisa como o texto literário reflete e problematiza as contradições históricas e sociais brasileiras.',
    relatedToolRoute: '/repertorio',
    relatedToolLabel: 'Repertórios Literários',
  },
  {
    id: 'ling-artes',
    title: 'Artes Visuais e Vanguardas Europeias',
    category: 'Linguagens e Códigos',
    relevanceNotice: 'Presente em questões com imagens, esculturas e patrimônio.',
    summaryPoints: [
      'Vanguardas do início do século XX: Cubismo (geometrização e múltiplos ângulos), Surrealismo (inconsciente e sonhos), Futurismo (velocidade e tecnologia).',
      'Arte Moderna no Brasil: Antropofagia cultural (deglutir influências externas e produzir arte com essência nacional).',
      'Arte Contemporânea: instalações, grafite, performances e questionamento sobre o que é arte e quem ocupa os espaços públicos.',
    ],
    examStrategyTip: 'Observe as legendas das imagens (título, ano e suporte) para contextualizar a intenção do artista.',
    relatedToolRoute: '/mapas',
    relatedToolLabel: 'Ver Mapas Mentais',
  },
  {
    id: 'ling-variacao',
    title: 'Variação Linguística & Preconceito Linguístico',
    category: 'Linguagens e Códigos',
    relevanceNotice: 'Cobrado com foco na adequação linguística e cidadania.',
    summaryPoints: [
      'Variação Regional (diatópica): vocabulário e sotaques característicos de estados ou regiões brasileiras.',
      'Variação Social (diastrática): gírias de grupos etários, jargões profissionais ou de classes socioeconômicas.',
      'Variação de Registro (diafásica): diferença entre a fala coloquial informal e a norma-padrão formal.',
      'Combate ao Preconceito Linguístico: todas as variedades possuem regras internas e são legítimas para a comunicação; a norma-padrão deve ser vista como uma ferramenta, não como instrumento de exclusão.',
    ],
    examStrategyTip: 'A alternativa correta jamais condenará o falar popular ou defenderá uma suposta "superioridade" gramatical.',
    relatedToolRoute: '/#mural',
    relatedToolLabel: 'Ver Tópicos de Linguagens',
  },
];

export const HUMANAS_CONTENT: ContentTopicItem[] = [
  {
    id: 'hum-brasil',
    title: 'História do Brasil: Era Vargas e Ditadura Militar',
    category: 'Ciências Humanas',
    relevanceNotice: 'Períodos com alta frequência de questões interpretativas.',
    summaryPoints: [
      'Era Vargas (1930-1945): industrialização por substituição de importações, CLT e leis trabalhistas, criação do DIP e propaganda política.',
      'Governo JK (1956-1961): Plano de Metas ("50 anos em 5"), abertura ao capital estrangeiro, construção de Brasília e endividamento externo.',
      'Ditadura Militar (1964-1985): AI-5 e restrição aos direitos civis, "Milagre Econômico", censura à imprensa e posterior abertura lenta e gradual.',
      'Processo de Redemocratização: campanha das Diretas Já e promulgação da "Constituição Cidadã" de 1988.',
    ],
    examStrategyTip: 'Atente-se a documentos de época (panfletos, letras de música de MPB e charges) que expressam resistência cultural.',
    relatedToolRoute: '/repertorio',
    relatedToolLabel: 'Citações da História do Brasil',
  },
  {
    id: 'hum-geral',
    title: 'História Geral: Iluminismo, Cidadania e Guerras Mundiais',
    category: 'Ciências Humanas',
    relevanceNotice: 'Foco na evolução de direitos e transformações econômicas.',
    summaryPoints: [
      'Grécia e Roma Antiga: limites da cidadania ateniense (exclusão de mulheres, escravos e estrangeiros) e República romana.',
      'Iluminismo e Revoluções Burguesas: razão, separação dos três poderes (Montesquieu) e liberdade de expressão (Voltaire).',
      'Revolução Industrial: transição para o modelo fabril, formação do proletariado, jornadas exaustivas e surgimento do movimento operário.',
      'Século XX: Imperialismo na África e Ásia, Primeira e Segunda Guerras Mundiais, Guerra Fria e polarização ideológica.',
    ],
    examStrategyTip: 'Relacione o passado com debates contemporâneos sobre soberania, direitos humanos e diplomacia.',
    relatedToolRoute: '/videos',
    relatedToolLabel: 'Videoaulas de História',
  },
  {
    id: 'hum-geo',
    title: 'Geografia: Urbanização, Climatologia e Agronegócio',
    category: 'Ciências Humanas',
    relevanceNotice: 'Uma das disciplinas com maior número de questões interdisciplinares.',
    summaryPoints: [
      'Espaço Urbano Brasileiro: crescimento acelerado e desordenado, macrocefalia urbana, conurbação, segregação socioespacial e mobilidade.',
      'Geografia Agrária: avanço da fronteira agrícola (Matopiba), monocultura voltada à exportação vs. agricultura familiar (alimentação interna).',
      'Biomas Brasileiros: Amazônia, Cerrado (berço das águas e ameaçado pelo agronegócio), Mata Atlântica e Caatinga.',
      'Problemas Ambientais Urbanos: ilhas de calor, inversão térmica, enchentes por impermeabilização do solo e deslizamentos de encostas.',
    ],
    examStrategyTip: 'Interprete com cuidado mapas temáticos, pirâmides etárias e gráficos de dispersão geográfica.',
    relatedToolRoute: '/mapas?id=meio-ambiente',
    relatedToolLabel: 'Mapa de Impacto Ambiental',
  },
  {
    id: 'hum-filo',
    title: 'Filosofia: Ética, Política e Teoria Crítica',
    category: 'Ciências Humanas',
    relevanceNotice: 'Cobrança focada em conceitos aplicados a situações da vida prática.',
    summaryPoints: [
      'Filosofia Grega: Sócrates (maiêutica), Platão (Mundo das Ideias e Mito da Caverna) e Aristóteles (ética do justo meio e animal político).',
      'Contratualismo Moderno: Thomas Hobbes (Leviatã para conter a guerra de todos contra todos), John Locke (direitos naturais à vida e propriedade), Jean-Jacques Rousseau (bom selvagem e vontade geral).',
      'Immanuel Kant: imperativo categórico (agir conforme uma máxima que possa se tornar lei universal) e dever moral.',
      'Escola de Frankfurt: Theodor Adorno e Max Horkheimer (Indústria Cultural e massificação do consumo).',
    ],
    examStrategyTip: 'Identifique se o autor valoriza a razão individual ou se analisa a influência dos condicionamentos sociais sobre o indivíduo.',
    relatedToolRoute: '/repertorio',
    relatedToolLabel: 'Repertórios Filosóficos',
  },
  {
    id: 'hum-socio',
    title: 'Sociologia: Desigualdades, Cidadania e Cultura',
    category: 'Ciências Humanas',
    relevanceNotice: 'Base conceitual fundamental para a prova de Humanas e para a Redação.',
    summaryPoints: [
      'Tríade Clássica: Karl Marx (luta de classes e mais-valia), Émile Durkheim (fato social e anomia), Max Weber (ação social e ética protestante).',
      'Modernidade Líquida: Zygmunt Bauman e a fragilidade dos vínculos humanos, hiperconsumismo e incerteza institucional.',
      'Cidadania no Brasil: José Murilo de Carvalho (cidadania concedida de cima para baixo) e Gilberto Dimenstein (cidadãos de papel).',
      'Movimentos Sociais e Diversidade: feminismo, movimento negro, defesa de povos originários e minorias.',
    ],
    examStrategyTip: 'Conceitos sociológicos bem dominados servem de repertório perfeito para contextualizar qualquer tema de redação.',
    relatedToolRoute: '/repertorio',
    relatedToolLabel: 'Explorar Banco de Repertório',
  },
];

export const REDACAO_CONTENT: ContentTopicItem[] = [
  {
    id: 'red-estrutura',
    title: 'Estrutura do Texto Dissertativo-Argumentativo',
    category: 'Redação Nota 1000',
    relevanceNotice: 'Estrutura rígida de 30 linhas avaliada diretamente na Competência 2.',
    summaryPoints: [
      'Parágrafo 1 (Introdução - 6 a 7 linhas): Repertório legitimado para contextualização + Definição clara do tema + Tese com 2 argumentos norteadores (A1 e A2).',
      'Parágrafo 2 (D1 - 7 a 8 linhas): Tópico frasal abordando o argumento A1 + Repertório sociocultural produtivo + Discussão crítica do problema + Fechamento.',
      'Parágrafo 3 (D2 - 7 a 8 linhas): Conectivo interparágrafo (ex: "Ademais", "Outrossim") + Tópico frasal de A2 + Repertório ou aprofundamento da causa/consequência + Desfecho.',
      'Parágrafo 4 (Conclusão - 7 a 8 linhas): Conectivo conclusivo ("Portanto", "Infere-se, logo") + Retomada da tese + Proposta de intervenção completa com os 5 elementos.',
    ],
    examStrategyTip: 'Não misture opinião pessoal em primeira pessoa ("eu acho", "no meu ponto de vista"). Use impessoalidade ("evidencia-se", "constata-se").',
    relatedToolRoute: '/corretor',
    relatedToolLabel: 'Praticar no Corretor com IA',
  },
  {
    id: 'red-introducao',
    title: 'Construção da Introdução Perfeita',
    category: 'Redação Nota 1000',
    relevanceNotice: 'O primeiro contato do avaliador com seu projeto de texto.',
    summaryPoints: [
      '1. Gancho / Contextualização: inicie citando uma obra literária, série, fato histórico, filme ou artigo constitucional.',
      '2. Ponte com a Realidade: use conectivos como "Contudo, fora da ficção...", "Analogamente ao cenário atual brasileiro...".',
      '3. Apresentação do Tema: inclua todas as palavras-chave do tema oficial para afastar qualquer risco de tangenciamento.',
      '4. Tese Explícita: antecipe suas duas teses (ex: "seja pela negligência governamental, seja pela passividade social").',
    ],
    examStrategyTip: 'Nunca comece a introdução direto no problema com frases genéricas como "Desde os primórdios da humanidade".',
    relatedToolRoute: '/repertorio',
    relatedToolLabel: 'Ver Repertórios para Introdução',
  },
  {
    id: 'red-desenvolvimento',
    title: 'Desenvolvimento Consistente e Argumentação Crítica',
    category: 'Redação Nota 1000',
    relevanceNotice: 'Onde se conquista a nota máxima na Competência 3.',
    summaryPoints: [
      'Tópico Frasal: uma frase curta e contundente que resume a ideia principal do parágrafo.',
      'Fundamentação Teórica: explicação de como a teoria citada se encaixa perfeitamente no problema real.',
      'Argumentação do Autor: o repertório não argumenta sozinho; você deve explicar por que aquela situação é prejudicial à sociedade.',
      'Desfecho do Parágrafo: frase de efeito sintetizando a urgência de superação do entrave.',
    ],
    examStrategyTip: 'Cada parágrafo de desenvolvimento deve responder: "Por que esse problema acontece?" e "Quais são as suas consequências?".',
    relatedToolRoute: '/corretor',
    relatedToolLabel: 'Submeter Redação para Correção',
  },
  {
    id: 'red-conclusao-c5',
    title: 'Proposta de Intervenção com os 5 Elementos Obrigatórios',
    category: 'Redação Nota 1000',
    relevanceNotice: 'Estrutura fundamental para buscar a nota máxima na Competência 5.',
    summaryPoints: [
      '1. AGENTE (Quem executa?): Ministério da Educação, Ministério da Saúde, Poder Legislativo, Secretarias Estaduais (evite "o governo").',
      '2. AÇÃO (O que será feito?): verbo no infinitivo com ação prática e viável ("deve implementar programas...", "deve fiscalizar...").',
      '3. MEIO / MODO (Como será feito?): iniciado por "por meio de...", "mediante a realização de parcerias com...", "através de campanhas...".',
      '4. EFEITO / FINALIDADE (Para que serve?): "com o fito de...", "a fim de assegurar a plena inclusão...", "para que se erradique...".',
      '5. DETALHAMENTO: explicação adicional de um dos quatro elementos (ex: detalhar a ação ou o meio explicando canais ou etapas concretas).',
    ],
    examStrategyTip: 'A proposta deve respeitar os Direitos Humanos. Propostas que violem a dignidade humana zeram a Competência 5.',
    relatedToolRoute: '/corretor',
    relatedToolLabel: 'Validar Competência 5',
  },
  {
    id: 'red-competencias',
    title: 'Entendendo as 5 Competências Avaliadas',
    category: 'Redação Nota 1000',
    relevanceNotice: 'Cada competência vale de 0 a 200 pontos (total de 1000 pontos).',
    summaryPoints: [
      'C1 (Norma-Padrão): concordância, crase, pontuação, regência e vocabulário formal.',
      'C2 (Compreensão do Tema e Repertório): não tangenciar, dominar o texto dissertativo e trazer repertório legitimado das áreas do conhecimento.',
      'C3 (Projeto de Texto e Argumentação): coerência, ordem lógica de raciocínio, sem contradições e sem parágrafos embrionários.',
      'C4 (Coesão Textual): diversidade de operadores argumentativos entre os parágrafos e no interior de cada parágrafo.',
      'C5 (Proposta de Intervenção): presença dos 5 elementos completos e viáveis respeitando os Direitos Humanos.',
    ],
    examStrategyTip: 'Atingir 160 em cada competência soma 800 pontos; o detalhamento da C5 e a consistência na C1 aproximam seu texto da nota máxima.',
    relatedToolRoute: '/corretor',
    relatedToolLabel: 'Análise por Competência no Corretor',
  },
];

// ==========================================
// CONTEÚDOS DO 2º DIA (Exatas e Natureza)
// ==========================================

export const MATEMATICA_CONTENT: ContentTopicItem[] = [
  {
    id: 'mat-proporcao',
    title: 'Razão, Proporção, Escala e Regra de Três',
    category: 'Matemática e suas Tecnologias',
    relevanceNotice: 'Assunto com maior frequência histórica da prova de Matemática.',
    summaryPoints: [
      'Escala Cartográfica: Escala = Distância no mapa (d) / Distância real (D). Lembre-se de converter para a mesma unidade (cm).',
      'Escala de Área e Volume: Se a escala linear é 1:k, a escala de área é 1:k² e a de volume é 1:k³.',
      'Regra de Três Composta: Analise se as grandezas são diretamente ou inversamente proporcionais antes de multiplicar.',
      'Porcentagem e Aumentos/Descontos Sucessivos: Multiplique pelos fatores (ex: +20% = fator 1,20; -15% = fator 0,85).',
    ],
    examStrategyTip: 'Por serem questões comumente de nível básico e médio, acertá-las é essencial para valorizar sua pontuação pela TRI.',
    relatedToolRoute: '/dicas',
    relatedToolLabel: 'Ver Estratégia de Prova',
  },
  {
    id: 'mat-geometria',
    title: 'Geometria Espacial e Plana',
    category: 'Matemática e suas Tecnologias',
    relevanceNotice: 'Presente em pelo menos 10 a 12 questões da prova.',
    summaryPoints: [
      'Geometria Plana: Áreas de triângulos, retângulos, trapézios e círculos (A = π.r²; Comprimento = 2.π.r).',
      'Prismas e Cilindros: Volume = Área da base × Altura. Cilindro: V = π.r².h.',
      'Pirâmides e Cones: Volume = (Área da base × Altura) / 3.',
      'Projeção Ortogonal e Vistas: Questões visuais que cobram a sombra projetada de um objeto ou o caminho percorrido.',
    ],
    examStrategyTip: 'Desenhe sempre o sólido e anote as unidades de medida para não errar metros cúbicos com litros (1 m³ = 1000 L).',
    relatedToolRoute: '/#mural',
    relatedToolLabel: 'Ver Resumos de Geometria',
  },
  {
    id: 'mat-estatistica',
    title: 'Estatística e Probabilidade',
    category: 'Matemática e suas Tecnologias',
    relevanceNotice: 'Presente em gráficos de barras, tabelas e interpretação de dados.',
    summaryPoints: [
      'Média Aritmética Simples e Ponderada (pesos diferentes).',
      'Mediana: Ordene os dados em rol (crescente). Se número ímpar, é o termo central; se par, a média dos dois centrais.',
      'Moda: O valor que aparece com maior frequência no conjunto de dados.',
      'Probabilidade: P = (Casos Favoráveis) / (Casos Possíveis). Atenção à probabilidade condicional ("sabendo que...").',
    ],
    examStrategyTip: 'Sempre confira se os dados estão ordenados antes de calcular a mediana.',
    relatedToolRoute: '/#mural',
    relatedToolLabel: 'Ver Tópicos de Estatística',
  },
];

export const NATUREZA_CONTENT: ContentTopicItem[] = [
  {
    id: 'nat-ecologia',
    title: 'Ecologia e Impactos Ambientais (Biologia)',
    category: 'Ciências da Natureza',
    relevanceNotice: 'O assunto mais cobrado em Ciências da Natureza.',
    summaryPoints: [
      'Cadeias e Teias Tróficas: produtores, consumidores primários e decompositores. Fluxo unidirecional de energia.',
      'Relações Ecológicas: harmônicas (mutualismo, protocooperação, comensalismo) e desarmônicas (predatismo, parasitismo, competição).',
      'Biomagnificação Trófica: acúmulo progressivo de poluentes não biodegradáveis (mercúrio, agrotóxicos) nos níveis tróficos superiores.',
      'Eutrofização: despejo de esgoto -> proliferação de algas -> bloqueio de luz -> morte e decomposição anaeróbia -> queda drástica de O2.',
    ],
    examStrategyTip: 'Questões ecológicas no ENEM costumam cobrar soluções sustentáveis (biorremediação, controle biológico de pragas).',
    relatedToolRoute: '/mapas?id=meio-ambiente',
    relatedToolLabel: 'Mapa Mental de Meio Ambiente',
  },
  {
    id: 'nat-eletro',
    title: 'Eletrodinâmica e Circuitos (Física)',
    category: 'Ciências da Natureza',
    relevanceNotice: 'Garante pontos cruciais na prova de Física.',
    summaryPoints: [
      'Primeira Lei de Ohm: U = R . i (Tensão = Resistência × Corrente).',
      'Potência Elétrica: P = U . i = R . i² = U² / R.',
      'Associação de Resistores: Em série (mesma corrente, soma das resistências); Em paralelo (mesma tensão, resistências divididas).',
      'Aparelhos de Casa: Chuveiro no "inverno" tem menor resistência para gerar maior corrente e maior potência térmica.',
    ],
    examStrategyTip: 'Cuidado com fusíveis e disjuntores: eles são ligados em série com o circuito para proteger contra sobrecorrente.',
    relatedToolRoute: '/#mural',
    relatedToolLabel: 'Resumos de Física',
  },
  {
    id: 'nat-quim-org',
    title: 'Química Orgânica e Reações Cotidianas (Química)',
    category: 'Ciências da Natureza',
    relevanceNotice: 'Altíssima incidência nas questões de Química.',
    summaryPoints: [
      'Identificação de Funções: Álcool (-OH em carbono saturado), Fenol (-OH no anel), Ácido Carboxílico (-COOH), Éster, Amina e Amida.',
      'Interações Intermoleculares e Solubilidade: "Semelhante dissolve semelhante". Ligações de hidrogênio geram altos pontos de ebulição.',
      'Sabões e Tensoativos: Molécula anfifílica com cabeça polar hidrofílica e cauda apolar lipofílica que forma micelas.',
      'Polímeros e Reciclagem: Termoplásticos (recicláveis por aquecimento) vs. Termofixos.',
    ],
    examStrategyTip: 'Procure pontes de hidrogênio e grupos polares para justificar por que certas substâncias são hidrossolúveis.',
    relatedToolRoute: '/#mural',
    relatedToolLabel: 'Resumos de Química',
  },
];

// ==========================================
// BANCO DE QUESTÕES DE SIMULADO (1º e 2º Dias)
// Questões autorais com padrão ENEM
// ==========================================

export const SIMULADO_QUESTIONS: SimuladoQuestion[] = [
  // Questões do 1º Dia
  {
    id: 'sim-d1-1',
    dayType: 'dia1',
    discipline: 'Linguagens — Funções da Linguagem',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Em uma campanha nacional de combate ao desperdício de água, veiculada em cartazes no transporte público, lê-se o seguinte texto:
"Economize hoje para não faltar amanhã. Feche a torneira enquanto escova os dentes e reduza o tempo no chuveiro. O futuro do planeta depende da sua atitude agora."`,
    questionPrompt: 'No cartaz publicitário analisado, a predominância da função conativa (ou apelativa) da linguagem justifica-se pelo fato de o texto ter como objetivo principal:',
    options: [
      { letter: 'A', text: 'Transmitir medições numéricas exatas sobre o nível do volume hídrico dos reservatórios.' },
      { letter: 'B', text: 'Sensibilizar o leitor pelo compartilhamento sincero de aflições e emoções do próprio autor.' },
      { letter: 'C', text: 'Orientar o comportamento do interlocutor por meio de verbos no modo imperativo e apelo direto.' },
      { letter: 'D', text: 'Elucidar o significado gramatical dos termos técnicos empregados no saneamento ambiental.' },
      { letter: 'E', text: 'Explorar a sonoridade poética das palavras com métricas rimadas para entreter os cidadãos.' },
    ],
    correctAnswer: 'C',
    explanation: 'A função conativa (ou apelativa) centra-se no destinatário/receptor. Seu objetivo primordial é persuadir e direcionar uma conduta, o que se evidencia pelo uso explícito de verbos no imperativo ("Economize", "Feche", "reduza") e pelo pronome possessivo de 2ª pessoa ("sua atitude"). A alternativa C é a correta.',
  },
  {
    id: 'sim-d1-2',
    dayType: 'dia1',
    discipline: 'Ciências Humanas — Sociologia e Cidadania',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Em sua obra "Cidadão de Papel", o jornalista Gilberto Dimenstein analisa a discrepância entre os direitos formalmente assegurados pela Constituição Cidadã de 1988 e a realidade material vivenciada por milhões de brasileiros em situação de vulnerabilidade, para os quais tais garantias não se concretizam no dia a dia.`,
    questionPrompt: 'A reflexão proposta pelo conceito de "cidadão de papel" denuncia um problema central da sociedade brasileira contemporânea, que se caracteriza pela:',
    options: [
      { letter: 'A', text: 'Inexistência de um ordenamento jurídico consolidado que proteja formalmente a cidadania brasileira.' },
      { letter: 'B', text: 'Efetividade plena e universal das políticas públicas de amparo a toda a população em vulnerabilidade.' },
      { letter: 'C', text: 'Superação consistente das disparidades socioeconômicas em razão do crescimento do mercado interno.' },
      { letter: 'D', text: 'Distância entre a garantia formal das leis e a sua efetivação prática na vida cotidiana dos indivíduos.' },
      { letter: 'E', text: 'Recusa espontânea das famílias de baixa renda em utilizar as redes públicas de educação e de saúde.' },
    ],
    correctAnswer: 'D',
    explanation: 'Dimenstein cunhou a metáfora do "cidadão de papel" precisamente para evidenciar que, embora a lei brasileira seja avançada e generosa no papel (Constituição de 1988), na prática muitos cidadãos permanecem invisibilizados e desprovidos de direitos fundamentais. A alternativa D retrata com fidelidade esse abismo entre o direito formal e o direito material.',
  },
  {
    id: 'sim-d1-3',
    dayType: 'dia1',
    discipline: 'Redação — Proposta de Intervenção (Competência 5)',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Considere o seguinte trecho de proposta de intervenção elaborado por um candidato:
"Portanto, cabe ao Ministério da Educação implementar oficinas semanais de letramento digital nas escolas públicas, por meio de palestras interativas com especialistas da área de tecnologia, a fim de conscientizar os jovens contra a desinformação online. Essas oficinas devem contar com cartilhas ilustrativas distribuídas a todos os alunos."`,
    questionPrompt: 'Em relação aos critérios de pontuação da Competência 5 da Matriz de Referência do ENEM, a proposta transcrita:',
    options: [
      { letter: 'A', text: 'Alcança o nível máximo de 200 pontos por articular de modo completo os cinco elementos da matriz.' },
      { letter: 'B', text: 'Recebe nota zero nessa competência por violar frontalmente preceitos básicos dos Direitos Humanos.' },
      { letter: 'C', text: 'Atinge pontuação mediana de 120 pontos em razão da ausência explícita do meio de implementação.' },
      { letter: 'D', text: 'Sofre penalização de nota decorrente da escolha inadequada de órgão do poder público executivo.' },
      { letter: 'E', text: 'Tem sua nota reduzida para 160 pontos pela falta de detalhamento suplementar na ação sugerida.' },
    ],
    correctAnswer: 'A',
    explanation: 'A proposta contém todos os 5 elementos exigidos pelo ENEM: 1) Agente: "Ministério da Educação"; 2) Ação: "implementar oficinas semanais de letramento digital nas escolas públicas"; 3) Meio/Modo: "por meio de palestras interativas com especialistas da área de tecnologia"; 4) Efeito: "a fim de conscientizar os jovens contra a desinformação online"; e 5) Detalhamento: "Essas oficinas devem contar com cartilhas ilustrativas distribuídas a todos os alunos" (detalhamento da ação/formato). Logo, a alternativa A está correta.',
  },

  // Questões do 2º Dia
  {
    id: 'sim-d2-1',
    dayType: 'dia2',
    discipline: 'Matemática — Escala e Proporção',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Em um mapa rodoviário impresso na escala 1 : 250.000, um estudante mediu com uma régua a distância em linha reta entre dois municípios, obtendo exatamente 6 centímetros.`,
    questionPrompt: 'A distância real correspondente entre os dois municípios, em quilômetros, é igual a:',
    options: [
      { letter: 'A', text: '1,5 km' },
      { letter: 'B', text: '15 km' },
      { letter: 'C', text: '25 km' },
      { letter: 'D', text: '150 km' },
      { letter: 'E', text: '1.500 km' },
    ],
    correctAnswer: 'B',
    explanation: 'Pela fórmula da escala: D = d × Escala. D = 6 cm × 250.000 = 1.500.000 cm. Para converter de centímetros para metros, divide-se por 100: 1.500.000 cm = 15.000 m. Para converter de metros para quilômetros, divide-se por 1.000: 15.000 m = 15 km. Resposta correta: Alternativa B.',
  },
  {
    id: 'sim-d2-2',
    dayType: 'dia2',
    discipline: 'Ciências da Natureza — Ecologia e Meio Ambiente',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Em um lago próximo a uma região agrícola, foi observado um aumento expressivo no uso de fertilizantes nitrogenados e fosfatados nas lavouras. Com as chuvas, esses nutrientes foram carreados para o corpo d\'água, desencadeando intensa proliferação de algas superficiais e, semanas depois, mortalidade em massa de peixes.`,
    questionPrompt: 'O evento ecológico descrito e a causa imediata da mortalidade dos peixes correspondem, respectivamente, a:',
    options: [
      { letter: 'A', text: 'Magnificação trófica e intoxicação aguda por íons metálicos pesados lixiviados das lavouras vizinhas.' },
      { letter: 'B', text: 'Eutrofização artificial e anóxia severa decorrente da rápida proliferação de bactérias decompositoras.' },
      { letter: 'C', text: 'Biomagnificação celular e aumento anômalo da temperatura superficial provocado pelo lodo em suspensão.' },
      { letter: 'D', text: 'Sucessão ecológica primária e perda progressiva de nutrientes essenciais à sobrevivência da vida aquática.' },
      { letter: 'E', text: 'Bioacumulação de compostos poliméricos insolúveis que bloqueiam mecanicamente as brânquias dos peixes.' },
    ],
    correctAnswer: 'B',
    explanation: 'O excesso de fósforo e nitrogênio causa a eutrofização. O crescimento explosivo de algas bloqueia a fotossíntese nas camadas inferiores. Quando essas algas morrem, bactérias decompositoras proliferam aceleradamente e consomem o oxigênio dissolvido na água (anóxia/hipóxia), provocando a morte por asfixia dos peixes. Resposta correta: Alternativa B.',
  },
  {
    id: 'sim-d2-3',
    dayType: 'dia2',
    discipline: 'Ciências da Natureza — Física (Potência e Energia)',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Um chuveiro elétrico de potência 5.500 W é utilizado diariamente por quatro moradores de uma residência, sendo que cada um toma um banho de 15 minutos por dia, totalizando 1 hora de funcionamento diário do aparelho durante um mês de 30 dias.`,
    questionPrompt: 'Considerando que a tarifa da distribuidora de energia elétrica é de R$ 0,80 por kWh consumido, o custo mensal decorrente exclusivamente dos banhos com esse chuveiro é de:',
    options: [
      { letter: 'A', text: 'R$ 44,00' },
      { letter: 'B', text: 'R$ 66,00' },
      { letter: 'C', text: 'R$ 132,00' },
      { letter: 'D', text: 'R$ 165,00' },
      { letter: 'E', text: 'R$ 220,00' },
    ],
    correctAnswer: 'C',
    explanation: 'Potência P = 5.500 W = 5,5 kW. Tempo total no mês: 1 hora/dia × 30 dias = 30 horas. Energia mensal consumida E = P × Δt = 5,5 kW × 30 h = 165 kWh. Custo = 165 kWh × R$ 0,80 = R$ 132,00. Portanto, alternativa C.',
  },
];
