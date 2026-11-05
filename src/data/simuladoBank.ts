// Banco Amplo e Organizado de Questões Autorais — Simulado Integrado ENEM 2026
// Padrão INEP com 5 alternativas, distratores qualificados, análise alternativa por alternativa e dicas TRI.

import { buildBalancedShuffledRound } from '../utils/simuladoEngine';

export type SimuladoAreaId = 'linguagens' | 'humanas' | 'natureza' | 'matematica' | 'redacao';
export type SimuladoDifficulty = 'facil' | 'media' | 'dificil';

export interface AuthorialOption {
  letter: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
  originalLetter?: 'A' | 'B' | 'C' | 'D' | 'E';
  isCorrect?: boolean;
}

export interface AuthorialQuestion {
  id: string;
  dayType: 'dia1' | 'dia2' | 'geral';
  areaId: SimuladoAreaId;
  discipline: string;
  topic: string;
  difficulty: SimuladoDifficulty;
  sourceLabel: string;
  textContext: string;
  questionPrompt: string;
  options: AuthorialOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  optionExplanations: Record<'A' | 'B' | 'C' | 'D' | 'E', string>;
  distractorTip: string;
}

export interface SimuladoHistoryRecord {
  id: string;
  timestamp: number;
  dateFormatted: string;
  stage: 'dia1' | 'dia2' | 'geral';
  score: number;
  total: number;
  percentage: number;
  timeSpentSeconds: number;
  questionIds: string[];
  distribution?: Record<'A' | 'B' | 'C' | 'D' | 'E', number>;
}

export const SIMULADO_BANK: AuthorialQuestion[] = [
  // ==========================================
  // LINGUAGENS, CÓDIGOS E SUAS TECNOLOGIAS (8 Questões)
  // ==========================================
  {
    id: 'sim-ling-01',
    dayType: 'dia1',
    areaId: 'linguagens',
    discipline: 'Linguagens',
    topic: 'Funções da Linguagem',
    difficulty: 'facil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Em uma campanha nacional veiculada em pontos de ônibus e redes sociais pelo Ministério da Saúde, lê-se:
"Não espere os sintomas da dengue piorarem. Elimine a água parada do seu quintal hoje mesmo e proteja a sua família. Faça a sua parte: a prevenção está em suas mãos."`,
    questionPrompt: 'No cartaz publicitário analisado, a predominância da função conativa (ou apelativa) da linguagem manifesta-se formalmente pelo:',
    options: [
      { letter: 'A', text: 'emprego de vocabulário técnico com foco direcionado à análise gramatical do código linguístico.' },
      { letter: 'B', text: 'uso de orações no imperativo e pronomes de segunda pessoa voltados a persuadir o interlocutor.' },
      { letter: 'C', text: 'relato intimista das vivências e inquietações subjetivas sentidas pelo emissor da mensagem.' },
      { letter: 'D', text: 'apreço pela musicalidade e pela cadência rítmica característica de composições de tom lírico.' },
      { letter: 'E', text: 'esclarecimento etimológico de termo científico com a finalidade de instruir o público leigo.' }
    ],
    correctAnswer: 'B',
    explanation: 'A função conativa (apelativa) tem como foco o receptor/destinatário, objetivando influenciar seu comportamento. No texto, isso é comprovado pelo uso recorrente de verbos no imperativo afirmativo ("Não espere", "Elimine", "proteja", "Faça") e pronomes possessivos de 2ª pessoa ("seu quintal", "sua família", "suas mãos").',
    optionExplanations: {
      A: 'Incorreta (distrator de inversão). O texto não foca na metalinguagem nem na análise técnica do código.',
      B: 'Correta. Os verbos imperativos e o apelo direto ao interlocutor definem a função conativa/apelativa.',
      C: 'Incorreta (distrator de confusão conceitual). A expressão de subjetividade caracteriza a função emotiva/expressiva.',
      D: 'Incorreta (distrator de extrapolação). O cartaz é uma peça institucional em prosa, sem trabalho rítmico poético.',
      E: 'Incorreta (distrator de extrapolação). Não há explicação etimológica ou gramatical do vocábulo no texto.'
    },
    distractorTip: 'No ENEM, ao identificar função conativa, procure imediatamente o destinatário (verbos no imperativo, vocativos e pronomes "você/seu").'
  },
  {
    id: 'sim-ling-02',
    dayType: 'dia1',
    areaId: 'linguagens',
    discipline: 'Linguagens',
    topic: 'Variação Linguística & Adequação',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `No sertão nordestino, um agricultor relata em entrevista gravada:
"A gente peleja desde cedo com a enxada nas custas do sol quente. Quando as primeira chuva desce no chão rachado, o coração da gente arreganha num alívio que doutor de cidade nem imagina."`,
    questionPrompt: 'Sob a ótica da sociolinguística contemporânea adotada pelo ENEM, a fala do agricultor deve ser compreendida como uma:',
    options: [
      { letter: 'A', text: 'evidência de limitação vocabular decorrente do afastamento da escolarização formal urbana.' },
      { letter: 'B', text: 'quebra gramatical grave que compromete de modo irreparável o entendimento da mensagem dita.' },
      { letter: 'C', text: 'expressão legítima de variedade regional e sociocultural plenamente adequada ao meio em uso.' },
      { letter: 'D', text: 'tentativa frustrada de reprodução do registro padrão culto exigido em ocasiões institucionais.' },
      { letter: 'E', text: 'deformação histórica da sintaxe lusitana motivada pelo isolamento geográfico do meio letrado.' }
    ],
    correctAnswer: 'C',
    explanation: 'A sociolinguística rejeita a ideia de "erro" absoluto quando a língua cumpre sua função comunicativa. A fala do agricultor reflete uma variedade diatópica (regional) e diastrática (social) rica em expressividade e coerência contextual, jamais inferior à norma-padrão.',
    optionExplanations: {
      A: 'Incorreta (distrator preconceituoso). O ENEM pune posturas de preconceito linguístico; variedades populares não indicam limitação intelectual.',
      B: 'Incorreta (distrator de exagero). A mensagem é clara, poética e plenamente compreensível pelo interlocutor.',
      C: 'Correta. Toda variedade linguística é válida em sua esfera social e cultural.',
      D: 'Incorreta (distrator de extrapolação). O entrevistado não estava em tribunal ou petição formal, e sim conversando espontaneamente.',
      E: 'Incorreta (distrator depreciativo). Não se trata de deformação, mas da dinâmica natural de variação histórica e regional da língua.'
    },
    distractorTip: 'No ENEM, nenhuma alternativa que classifique uma variedade popular como "errada", "feia", "deficiente" ou "inferior" será o gabarito oficial.'
  },
  {
    id: 'sim-ling-03',
    dayType: 'dia1',
    areaId: 'linguagens',
    discipline: 'Linguagens',
    topic: 'Gêneros Digitais & Desinformação',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Uma postagem sensacionalista em rede social trazia em letras garrafais vermelhas: "URGENTE: Chá de erva-cidreira cura infecções virais graves em 24 horas, afirma estudo secreto de universidade alemã!". O texto não citava autores, metodologia, link de publicação científica ou data precisa, mas pedia para ser "compartilhado antes que o sistema apague".`,
    questionPrompt: 'A estrutura textual e os recursos discursivos empregados na publicação revelam uma estratégia típica de desinformação (fake news) caracterizada pelo:',
    options: [
      { letter: 'A', text: 'rigor metodológico na sustentação de hipóteses clínicas testadas em estudos controlados.' },
      { letter: 'B', text: 'apelo alarmista à urgência e ocultação de fontes para induzir o compartilhamento precipitado.' },
      { letter: 'C', text: 'emprego de vocabulário estritamente referencial e neutro isento de julgamentos de valor.' },
      { letter: 'D', text: 'incentivo ao debate acadêmico qualificado entre especialistas da área biomédica moderna.' },
      { letter: 'E', text: 'compromisso rigoroso com os padrões de checagem adotados no jornalismo científico sério.' }
    ],
    correctAnswer: 'B',
    explanation: 'As notícias fraudulentas recorrem a gatilhos psicológicos de urgência ("URGENTE", "antes que apaguem"), tom conspiratório ("estudo secreto") e ausência proposital de fontes checáveis para provocar reações emocionais e compartilhamento compulsivo.',
    optionExplanations: {
      A: 'Incorreta (distrator de oposição). Não há rigor metodológico nem menção a periódicos revisados por pares.',
      B: 'Correta. O texto usa gatilhos de urgência, conspiração e anonimato para viralizar falsidades.',
      C: 'Incorreta (distrator contraditório). A linguagem é extremamente apelativa e sensacionalista, nada neutra.',
      D: 'Incorreta (distrator de extrapolação). A publicação busca enganar o público leigo, não debater na academia.',
      E: 'Incorreta (distrator de inversão). Viola todos os preceitos básicos de verificação e checagem de fatos.'
    },
    distractorTip: 'Gêneros digitais no ENEM cobram o reconhecimento da intenção comunicativa por trás de títulos apelativos e recursos visuais.'
  },
  {
    id: 'sim-ling-04',
    dayType: 'dia1',
    areaId: 'linguagens',
    discipline: 'Linguagens',
    topic: 'Literatura Brasileira & Escrevivência',
    difficulty: 'dificil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Em "Quarto de Despejo", Carolina Maria de Jesus anota:
"O Brasil precisa ser dirigido por uma pessoa que já passou fome. A fome também é professora. Quem passa fome aprende a pensar no próximo e nas crianças."`,
    questionPrompt: 'A reflexão de Carolina Maria de Jesus exemplifica a força da literatura testemunhal brasileira ao demonstrar que:',
    options: [
      { letter: 'A', text: 'a ficção pura sem compromisso social constitui o único caminho capaz de comover o leitor culto.' },
      { letter: 'B', text: 'a vivência da vulnerabilidade converte-se em instrumento crítico de denúncia e ação política.' },
      { letter: 'C', text: 'a privação material crônica inviabiliza a elaboração de julgamentos éticos sobre a sociedade.' },
      { letter: 'D', text: 'a criação literária popular deve limitar-se à contemplação bucólica do cotidiano periférico.' },
      { letter: 'E', text: 'o domínio da norma acadêmica é requisito prévio para que uma obra adquira relevância formal.' }
    ],
    correctAnswer: 'B',
    explanation: 'A obra de Carolina Maria de Jesus materializa a chamada literatura de testemunho e "escrevivência": a vivência direta da miséria e da fome transforma-se em conhecimento crítico vigoroso sobre a estrutura de poder e a injustiça social do Brasil.',
    optionExplanations: {
      A: 'Incorreta (distrator contraditório). "Quarto de Despejo" é um diário real ancorado na crueza da realidade social.',
      B: 'Correta. A fome vivida na favela é ressignificada como saber ético e político que contesta as elites governantes.',
      C: 'Incorreta (distrator redutor). O texto mostra justamente o oposto: a fome gerou aguda consciência ética e humanitária.',
      D: 'Incorreta (distrator descabido). A obra retrata a luta feroz pela sobrevivência urbana, nada tendo de "bucólico".',
      E: 'Incorreta (distrator elitista). A relevância histórica e literária de Carolina transcende qualquer exigência formalista da academia.'
    },
    distractorTip: 'Nas questões sobre autores contemporâneos e periféricos, busque a relação indissociável entre narrativa biográfica e transformação social.'
  },
  {
    id: 'sim-ling-05',
    dayType: 'dia1',
    areaId: 'linguagens',
    discipline: 'Linguagens',
    topic: 'Coesão Referencial & Interpretação',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Analise o excerto jornalístico:
"O desmatamento na Amazônia recuou nos últimos meses graças à intensificação das fiscalizações por satélite. Essa medida de monitoramento contínuo, aliada ao embargo remoto de propriedades irregulares, asfixiou o fluxo financeiro de infratores ambientais, os quais operavam na clandestinidade com sensação de total impunidade."`,
    questionPrompt: 'No fragmento apresentado, o pronome relativo "os quais" desempenha a função coesiva de:',
    options: [
      { letter: 'A', text: 'delimitar o intervalo temporal de atuação das forças públicas na proteção das florestas.' },
      { letter: 'B', text: 'antecipar a punição administrativa a ser aplicada pelos órgãos de fiscalização federal.' },
      { letter: 'C', text: 'retomar a expressão "infratores ambientais", introduzindo oração adjetiva explicativa.' },
      { letter: 'D', text: 'vincular a fiscalização por imagens de satélite ao embargo de imóveis agrícolas legais.' },
      { letter: 'E', text: 'substituir o substantivo "satélite", personificando o recurso tecnológico empregado.' }
    ],
    correctAnswer: 'C',
    explanation: 'O pronome relativo composto "os quais" retoma anaforicamente o antecedente substantivo masculino plural "infratores ambientais", iniciando uma oração subordinada adjetiva explicativa que caracteriza o modo como tais criminosos operavam.',
    optionExplanations: {
      A: 'Incorreta (distrator de erro de referência). "Os quais" não se refere a tempo, mas a agentes humanos (infratores).',
      B: 'Incorreta (distrator de tempo). O pronome opera de modo anafórico (retoma termo passado), e não catafórico (antecipa).',
      C: 'Correta. Recupera com precisão sintática e semântica os "infratores ambientais".',
      D: 'Incorreta (distrator de redução). Essa relação é feita pela locução "aliada ao", e não pelo pronome relativo.',
      E: 'Incorreta (distrator absurdo). "Satélite" está no singular, tornando a concordância com "os quais" sintaticamente impossível.'
    },
    distractorTip: 'Em coesão textual, verifique gênero e número do antecedente imediatamente anterior ao pronome relativo.'
  },
  {
    id: 'sim-ling-06',
    dayType: 'dia1',
    areaId: 'linguagens',
    discipline: 'Linguagens',
    topic: 'Figuras de Linguagem',
    difficulty: 'facil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Em uma crônica sobre a correria urbana na Avenida Paulista, o cronista escreve:
"A cidade mastigava os minutos com dentes de asfalto, engolindo os pedestres apressados que desciam aos borbotões na estação de metrô."`,
    questionPrompt: 'O recurso estilístico predominante no excerto para retratar a opressão da rotina metropolitana é a:',
    options: [
      { letter: 'A', text: 'personificação, ao atribuir comportamentos biológicos humanos a um espaço urbano inanimado.' },
      { letter: 'B', text: 'antítese formal, ao contrapor de maneira direta e simétrica os vocábulos "minutos" e "ruas".' },
      { letter: 'C', text: 'pleonasmo enfático, ao reiterar termos semanticamente idênticos sem ampliar a significação.' },
      { letter: 'D', text: 'eufemismo estilístico, com o objetivo claro de suavizar a intensidade da rotina na capital.' },
      { letter: 'E', text: 'metonímia contínua, ao trocar atributos qualitativos por grandezas rigorosamente mensuráveis.' }
    ],
    correctAnswer: 'A',
    explanation: 'A personificação (prosopopeia) consiste em atribuir características, sentimentos ou comportamentos humanos/biológicos a seres inanimados ou abstratos. Ao dizer que a "cidade mastigava com dentes de asfalto e engolia", o cronista personifica o ambiente urbano para enfatizar sua força devoradora.',
    optionExplanations: {
      A: 'Correta. A cidade adquire ações biológicas humanas (mastigar, engolir com dentes).',
      B: 'Incorreta (distrator de erro conceitual). Não há relação de antonímia ou contraste antitético direto entre minutos e pedestres.',
      C: 'Incorreta (distrator infundado). O texto não comete redundância viciosa, constrói imagem poética rica.',
      D: 'Incorreta (distrator de inversão). O autor hiperboliza e dramatiza a pressa, jamais a ameniza com eufemismo.',
      E: 'Incorreta (distrator inventado). Não se aplica ao trecho em questão.'
    },
    distractorTip: 'Sempre que seres inanimados (a rua, a noite, a máquina) praticarem verbos de ação humana, desconfie de prosopopeia.'
  },
  {
    id: 'sim-ling-07',
    dayType: 'dia1',
    areaId: 'linguagens',
    discipline: 'Linguagens',
    topic: 'Modernismo Brasileiro & Ruptura',
    difficulty: 'dificil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `A Semana de Arte Moderna de 1922 propôs romper com o academicismo parnasiano que engessava as letras brasileiras no início do século XX. Mário de Andrade, em suas cartas, insistia na urgência de "desrecalcar a cultura nacional, falando tupi no violão clássico europeu".`,
    questionPrompt: 'O projeto cultural modernista sintetizado na expressão de Mário de Andrade tinha como diretriz central:',
    options: [
      { letter: 'A', text: 'rejeitar por completo qualquer forma de diálogo com as tradições artísticas ocidentais.' },
      { letter: 'B', text: 'reproduzir fielmente os padrões métricos e o purismo gramatical lusitano do século XIX.' },
      { letter: 'C', text: 'deglutir técnicas externas para recriar uma arte enraizada nas vivências e dilemas locais.' },
      { letter: 'D', text: 'restringir manifestações populares a arquivos folclóricos sem conexão com as vanguardas.' },
      { letter: 'E', text: 'impor a obrigatoriedade da língua tupi em substituição ao português nos círculos oficiais.' }
    ],
    correctAnswer: 'C',
    explanation: 'O Modernismo da 1ª fase (especialmente a vertente antropofágica e de Mário/Oswald) propôs devorar a técnica e a vanguarda internacional para regurgitá-la sob a forma de uma brasilidade autêntica, sincrética e livre dos preconceitos bacharelescos.',
    optionExplanations: {
      A: 'Incorreta (distrator de exagero). Mário tocava violão clássico e estudava música europeia; o modernismo dialogava com o mundo.',
      B: 'Incorreta (distrator de oposição). O modernismo combateu ferozmente o passadismo e o purismo lusitano.',
      C: 'Correta. A deglutição crítica da cultura externa aliada ao mergulho nas raízes populares é a essência do movimento.',
      D: 'Incorreta (distrator de redução). O modernismo colocou a cultura popular na linha de frente da arte erudita.',
      E: 'Incorreta (distrator literal ingênuo). "Falar tupi no violão" é uma metáfora poética de brasilidade, não uma reforma ortográfica obrigatória.'
    },
    distractorTip: 'Cuidado com alternativas radicais que usem "rejeitar por completo" ou interpretem metáforas modernistas ao pé da letra.'
  },
  {
    id: 'sim-ling-08',
    dayType: 'dia1',
    areaId: 'linguagens',
    discipline: 'Linguagens',
    topic: 'Interpretação de Infográficos & Saúde',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Um infográfico publicado pela Organização Mundial da Saúde (OMS) exibe um gráfico de barras comparando os níveis de sedentarismo entre jovens de 11 a 17 anos em diferentes continentes. Ao lado dos números, pequenos ícones representam telas digitais, fones de ouvido e cadeiras de escritório, acompanhados da legenda: "A inatividade física na adolescência ultrapassa 80% globalmente, gerando impactos precoces no sistema cardiovascular e na saúde mental."`,
    questionPrompt: 'A articulação entre os elementos verbais e não verbais desse gênero infográfico visa conscientizar o público leitor ao:',
    options: [
      { letter: 'A', text: 'responsabilizar o modelo pedagógico escolar pelo sedentarismo corporal dos adolescentes.' },
      { letter: 'B', text: 'articular dados estatísticos e imagens cotidianas para denunciar um grave impasse social.' },
      { letter: 'C', text: 'propor a interdição coercitiva e ampla do acesso juvenil a dispositivos tecnológicos.' },
      { letter: 'D', text: 'contestar pesquisas médicas prévias sobre os benefícios das práticas desportivas diárias.' },
      { letter: 'E', text: 'demonstrar que a inatividade física juvenil é fenômeno restrito aos países periféricos.' }
    ],
    correctAnswer: 'B',
    explanation: 'O infográfico combina dados quantitativos precisos (mais de 80%) com ícones representativos do estilo de vida contemporâneo (telas, cadeiras) para evidenciar a gravidade sistêmica do sedentarismo juvenil e alertar para as consequências físicas e mentais.',
    optionExplanations: {
      A: 'Incorreta (distrator de redução e culpabilização). O texto trata de um fenômeno global que envolve hábitos familiares e sociais.',
      B: 'Correta. A soma de estatísticas com elementos visuais de telas reforça a urgência do problema de saúde.',
      C: 'Incorreta (distrator autoritário/exagerado). A OMS recomenda equilíbrio e redução de tempo sedentário, não proibição total.',
      D: 'Incorreta (distrator de oposição). O infográfico ratifica e reforça a ligação entre sedentarismo e transtornos de saúde.',
      E: 'Incorreta (distrator contraditório). O texto afirma expressamente que a inatividade ultrapassa 80% "globalmente".'
    },
    distractorTip: 'Em textos multimodais (infográficos e cartazes), observe sempre como o desenho ou ícone reforça a tese expressa nas palavras.'
  },

  // ==========================================
  // CIÊNCIAS HUMANAS E SUAS TECNOLOGIAS (8 Questões)
  // ==========================================
  {
    id: 'sim-hum-01',
    dayType: 'dia1',
    areaId: 'humanas',
    discipline: 'Filosofia',
    topic: 'Contratualismo & Estado Moderno',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Em "O Leviatã", Thomas Hobbes argumenta que, no estado de natureza, os seres humanos encontram-se em uma constante condição de guerra de todos contra todos ("bellum omnium contra omnes"), decorrente do medo mútuo e da disputa pelos mesmos recursos escassos, tornando a vida solitária, pobre, sórdida, embrutecida e curta.`,
    questionPrompt: 'De acordo com a filosofia política de Hobbes, a superação desse cenário de insegurança generalizada exige dos indivíduos:',
    options: [
      { letter: 'A', text: 'o isolamento anárquico da vida em comunidade com a recusa definitiva a qualquer autoridade civil.' },
      { letter: 'B', text: 'a concessão mútua da liberdade natural a um soberano supremo encarregado de impor a ordem pública.' },
      { letter: 'C', text: 'a instituição periódica de plebiscitos universais e levantes cívicos de contestação ao governante.' },
      { letter: 'D', text: 'o retorno ao nomadismo primitivo guiado pela crença na harmonia espontânea da condição humana.' },
      { letter: 'E', text: 'a submissão incondicional às bulas teocráticas papais sem a presença de estatutos jurídicos civis.' }
    ],
    correctAnswer: 'B',
    explanation: 'Para Hobbes, o pacto social ocorre quando os indivíduos, movidos pelo medo da morte violenta, abdicam de sua liberdade ilimitada em favor de um soberano absolutista (o Leviatã), que monopoliza o uso da força legal para assegurar a convivência pacífica.',
    optionExplanations: {
      A: 'Incorreta (distrator anarquista). O anarquismo é o oposto do que Hobbes preconiza; para ele, sem poder central reina o terror.',
      B: 'Correta. O contrato hobbesiano transfere o poder ao soberano para conter os impulsos destrutivos humanos.',
      C: 'Incorreta (distrator anacrônico / lockeano). Hobbes rejeitava a desobediência civil e a democracia representativa periódica.',
      D: 'Incorreta (distrator rousseauniano). A bondade inata do estado de natureza é tese de Rousseau, rejeitada por Hobbes.',
      E: 'Incorreta (distrator medieval). Hobbes defendia o poder secular e civil do Estado moderno soberano, sem subordinação ao Papa.'
    },
    distractorTip: 'Hobbes = medo, estado de natureza caótico, poder concentrado no soberano para garantir sobrevivência.'
  },
  {
    id: 'sim-hum-02',
    dayType: 'dia1',
    areaId: 'humanas',
    discipline: 'Sociologia',
    topic: 'Modernidade Líquida & Trabalho',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `O sociólogo Zygmunt Bauman, ao analisar as transformações do mundo globalizado, introduziu a metáfora da "modernidade líquida" para descrever uma época marcada pela dissolução de laços sólidos e certezas institucionais. Nesse cenário, o mercado de trabalho privilegia a flexibilidade extrema, contratos temporários e a transferência dos riscos econômicos para os próprios trabalhadores individuais.`,
    questionPrompt: 'No contexto contemporâneo das relações laborais, a perspectiva de Bauman identifica que a precarização das relações contratuais gera como principal consequência subjetiva:',
    options: [
      { letter: 'A', text: 'a garantia generalizada de estabilidade e previsão orçamentária contínua para as classes trabalhadoras.' },
      { letter: 'B', text: 'a consolidação institucional dos sindicatos com ampliação de salvaguardas previdenciárias coletivas.' },
      { letter: 'C', text: 'a vulnerabilidade psicológica contínua e a transferência solitária dos riscos produtivos ao indivíduo.' },
      { letter: 'D', text: 'a redução drástica de empregos nos setores terciários e de suporte às tecnologias de informação.' },
      { letter: 'E', text: 'a superação da concorrência entre os pares em benefício de um ambiente corporativo cooperativo.' }
    ],
    correctAnswer: 'C',
    explanation: 'A modernidade líquida gera instabilidade crônica ("uberização", pejotização). Os trabalhadores tornam-se responsáveis solitários pelo próprio sucesso ou fracasso, vivendo em estado constante de ansiedade e privação de garantias trabalhistas históricas.',
    optionExplanations: {
      A: 'Incorreta (distrator de oposição). A modernidade líquida destrói o planejamento estável e as garantias de longo prazo.',
      B: 'Incorreta (distrator de inversão). Os sindicatos enfraqueceram com a fragmentação dos locais de trabalho.',
      C: 'Correta. A vulnerabilidade e a incerteza crônica são as marcas existenciais da liquidez baumaniana.',
      D: 'Incorreta (distrator factual falso). O setor de serviços e tecnologia é o que mais cresce na economia pós-industrial.',
      E: 'Incorreta (distrator ingênuo). O modelo incentiva o individualismo extremado e a competição predatória entre os próprios trabalhadores.'
    },
    distractorTip: 'Bauman no ENEM está sempre associado a: fluidez, fragilidade dos laços humanos, consumo e insegurança no trabalho.'
  },
  {
    id: 'sim-hum-03',
    dayType: 'dia1',
    areaId: 'humanas',
    discipline: 'História do Brasil',
    topic: 'Era Vargas & Legislação Trabalhista',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Durante o Estado Novo (1937–1945), o governo Getúlio Vargas consolidou a Consolidação das Leis do Trabalho (CLT) em 1º de maio de 1943. Ao mesmo tempo em que garantiu conquistas históricas da classe operária (férias remuneradas, jornada de 8 horas e salário mínimo), o regime manteve rigoroso enquadramento ministerial sobre as entidades sindicais e proibiu o direito de greve.`,
    questionPrompt: 'A política trabalhista implementada por Getúlio Vargas na década de 1940 caracterizou-se historicamente pelo mecanismo de:',
    options: [
      { letter: 'A', text: 'incentivo estatal à mobilização operária autônoma sem interferência do poder central.' },
      { letter: 'B', text: 'concessão de direitos trabalhistas associada à subordinação dos sindicatos ao governo.' },
      { letter: 'C', text: 'adesão ao modelo econômico liberal clássico com repúdio às doutrinas corporativistas.' },
      { letter: 'D', text: 'privatização de indústrias de base com abertura comercial a capitais multinacionais.' },
      { letter: 'E', text: 'extensão de amparos legais à mão de obra rural em prejuízo do proletariado fabril.' }
    ],
    correctAnswer: 'B',
    explanation: 'O trabalhismo varguista operou pelo modelo corporativista: o Estado concedeu direitos fundamentais demandados há décadas pelos operários, mas em troca exigiu controle e tutela dos sindicatos (sindicatos "pelegos" atrelados ao Ministério do Trabalho), domesticando a luta de classes.',
    optionExplanations: {
      A: 'Incorreta (distrator contraditório). Greves eram proibidas e sindicatos autônomos eram reprimidos com violência pelo DOPS.',
      B: 'Correta. A relação ambivalente entre concessão de direitos e cooptação política define o trabalhismo de Vargas.',
      C: 'Incorreta (distrator de oposição). Vargas inspirou-se na Carta del Lavoro italiana e combateu o liberalismo clássico oligárquico.',
      D: 'Incorreta (distrator factual falso). Vargas criou a CSN, Vale do Rio Doce e FNM, fortalecendo a indústria de base estatal.',
      E: 'Incorreta (distrator histórico clássico). A CLT de 1943 excluiu expressamente os trabalhadores rurais, que só obtiveram direitos em 1963.'
    },
    distractorTip: 'Lembre-se: no ENEM, a era Vargas não é vista como "benevolência do pai dos pobres" nem como "pura tirania", mas como uma estratégia política de cooptação social via direitos reais.'
  },
  {
    id: 'sim-hum-04',
    dayType: 'dia1',
    areaId: 'humanas',
    discipline: 'Geografia',
    topic: 'Urbanização Brasileira & Segregação',
    difficulty: 'facil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Nas últimas décadas, as metrópoles brasileiras assistiram à expansão de condomínios horizontais fechados nas bordas das cidades, ao mesmo tempo em que áreas periféricas precárias cresceram sem saneamento, transporte público e equipamentos de lazer. O geógrafo Milton Santos definia essa assimetria como fruto de um modelo de modernização concentradora e excludente.`,
    questionPrompt: 'O fenômeno espacial e social descrito no texto expressa a:',
    options: [
      { letter: 'A', text: 'segregação socioespacial, orientada pela especulação imobiliária e investimentos seletivos do poder público.' },
      { letter: 'B', text: 'distribuição equânime de equipamentos coletivos entre a área central e as periferias dos polos urbanos.' },
      { letter: 'C', text: 'conurbação equilibrada, capaz de nivelar os rendimentos médios das famílias residentes nos municípios.' },
      { letter: 'D', text: 'desmetropolização acelerada, causada pela migração em massa de contingentes urbanos em direção ao campo.' },
      { letter: 'E', text: 'padronização das tipologias habitacionais em decorrência do nivelamento socioeconômico das populações.' }
    ],
    correctAnswer: 'A',
    explanation: 'A segregação socioespacial reflete no território as desigualdades de classe: quem tem renda acessa bairros e condomínios com infraestrutura e segurança privada, enquanto a população de menor renda é empurrada para periferias desprovidas de serviços urbanos básicos.',
    optionExplanations: {
      A: 'Correta. A segregação resulta do valor da terra (especulação imobiliária) e da omissão seletiva do Estado nas periferias.',
      B: 'Incorreta (distrator de oposição). Os investimentos concentram-se historicamente nas áreas nobres e centrais.',
      C: 'Incorreta (distrator técnico inadequado). Conurbação é o encontro físico de manchas urbanas, mas não extingue disparidades de renda.',
      D: 'Incorreta (distrator de exagero). Embora cidades médias cresçam, não há abandono maciço das metrópoles rumo ao campo.',
      E: 'Incorreta (distrator absurdo). A paisagem urbana brasileira é notória pelo forte contraste entre mansões e favelas.'
    },
    distractorTip: 'Milton Santos no ENEM cobra a leitura crítica do espaço: o território nunca é neutro, reflete conflitos de poder e de classe.'
  },
  {
    id: 'sim-hum-05',
    dayType: 'dia1',
    areaId: 'humanas',
    discipline: 'História do Brasil',
    topic: 'Transição da Escravidão para o Trabalho Livre',
    difficulty: 'dificil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Após a promulgação da Lei Áurea em 13 de maio de 1888, o Império brasileiro não implementou qualquer política de distribuição de terras, indenização ou inserção educacional para os cerca de 700 mil escravizados libertos. Paralelamente, o Estado subsidiou passagens para atrair imigrantes europeus com base em teorias eugenistas de embranquecimento populacional.`,
    questionPrompt: 'As escolhas estatais adotadas no contexto pós-abolição no Brasil tiveram como desdobramento estrutural duradouro:',
    options: [
      { letter: 'A', text: 'a ascensão imediata dos ex-escravizados aos postos de comando da agropecuária exportadora.' },
      { letter: 'B', text: 'a concessão universal de pequenas parcelas produtivas de terra aos novos cidadãos libertos.' },
      { letter: 'C', text: 'a marginalização socioeconômica persistente e a perpetuação do racismo estrutural no país.' },
      { letter: 'D', text: 'a supressão definitiva de modalidades abusivas ou análogas à escravidão em todas as áreas.' },
      { letter: 'E', text: 'o desmantelamento político e financeiro das tradicionais oligarquias cafeeiras do Sudeste.' }
    ],
    correctAnswer: 'C',
    explanation: 'A abolição inconclusa no Brasil foi meramente jurídica, sem reformas estruturais (como a reforma agrária). Ao privilegiar imigrantes brancos e abandonar a população negra sem trabalho ou moradia, o país alicerçou as profundas desigualdades raciais e socioeconômicas que persistem até hoje.',
    optionExplanations: {
      A: 'Incorreta (distrator contraditório). Os libertos foram relegados a subempregos e à invisibilidade social.',
      B: 'Incorreta (distrator falso). A Lei de Terras de 1850 já havia impedido o acesso à terra por quem não tivesse capital para compra.',
      C: 'Correta. A ausência de suporte material pós-abolição gerou a marginalização e o racismo estrutural contemporâneo.',
      D: 'Incorreta (distrator desmentido pelos fatos). Casos de trabalho análogo à escravidão continuam sendo resgatados até os dias de hoje.',
      E: 'Incorreta (distrator de inversão). Os cafeicultores assumiram o comando da recém-proclamada República Oligárquica (Café com Leite).'
    },
    distractorTip: 'No ENEM, a abolição é sempre compreendida como um processo de conquista dos movimentos abolicionistas, mas com uma herança de exclusão social por falta de políticas de reparação.'
  },
  {
    id: 'sim-hum-06',
    dayType: 'dia1',
    areaId: 'humanas',
    discipline: 'Geografia',
    topic: 'Climatologia & Biomas Brasileiros',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `O Cerrado brasileiro, conhecido como a "caixa d'água do Brasil", abriga nascentes de importantes bacias hidrográficas (São Francisco, Tocantins-Araguaia e Paraná). Sua vegetação nativa apresenta árvores com troncos tortuosos, cascas grossas e raízes profundas que funcionam como esponjas hídricas no período de estiagem.`,
    questionPrompt: 'O avanço acelerado da monocultura de grãos e da pecuária extensiva sobre esse bioma compromete a segurança hídrica nacional porque:',
    options: [
      { letter: 'A', text: 'amplia a infiltração de água nos aquíferos profundos por conta da compactação do solo pelas máquinas agrícolas.' },
      { letter: 'B', text: 'remove raízes profundas que recarregam os lençóis freáticos, favorecendo a erosão e o assoreamento dos rios.' },
      { letter: 'C', text: 'provoca o resfriamento anômalo da atmosfera local, gerando geadas frequentes na área do Planalto Central.' },
      { letter: 'D', text: 'induz a saturação química do terreno que impede totalmente a fotossíntese de gramíneas exóticas cultivadas.' },
      { letter: 'E', text: 'acelera processos de salinização das águas superficiais restritos às faixas litorâneas do território nacional.' }
    ],
    correctAnswer: 'B',
    explanation: 'As raízes pivotantes profundas do Cerrado facilitam a recarga dos aquíferos Guarani e Urucuia. Ao desmatar para plantar soja ou capim de raízes superficiais, o solo perde capacidade de recarga hídrica, a água escorre rápido erodindo o terreno e assoreando nascentes vitais.',
    optionExplanations: {
      A: 'Incorreta (distrator ilógico). A compactação por máquinas pesadas REDUZ a infiltração de água, não aumenta.',
      B: 'Correta. A perda das raízes profundas diminui a recarga dos aquíferos e gera assoreamento nos rios que abastecem o país.',
      C: 'Incorreta (distrator falso). O desmatamento provoca aquecimento e aumento da aridez local, não geadas.',
      D: 'Incorreta (distrator sem sentido). A correção com calcário (calagem) viabiliza o cultivo, mas a ameaça ecológica é hídrica.',
      E: 'Incorreta (distrator geográfico incoerente). O Cerrado é continental no Planalto Central, sem dunas litorâneas.'
    },
    distractorTip: 'Cerrado e água no ENEM: "raízes profundas = recarga de aquíferos". Desmatou o Cerrado = secou a torneira do Sudeste e Nordeste.'
  },
  {
    id: 'sim-hum-07',
    dayType: 'dia1',
    areaId: 'humanas',
    discipline: 'Sociologia',
    topic: 'Cidadania & Constituição de 1988',
    difficulty: 'facil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `A Constituição da República Federativa do Brasil de 1988 consagrou em seu Artigo 6º que: "São direitos sociais a educação, a saúde, a alimentação, o trabalho, a moradia, o transporte, o lazer, a segurança, a previdência social, a proteção à maternidade e à infância, a assistência aos desamparados."`,
    questionPrompt: 'O pioneirismo da chamada "Constituição Cidadã" residiu em consolidar no ordenamento jurídico do país a concepção de que:',
    options: [
      { letter: 'A', text: 'o acesso a benefícios coletivos fica condicionado exclusivamente à capacidade de pagamento dos cidadãos.' },
      { letter: 'B', text: 'a seguridade social constitui dever indelegável do Estado e direito universal de toda a coletividade.' },
      { letter: 'C', text: 'os atendimentos em hospitais e creches devem ser transferidos compulsoriamente a empresas privadas.' },
      { letter: 'D', text: 'as prerrogativas individuais e cívicas dependem de autorização especial expedida por tribunais locais.' },
      { letter: 'E', text: 'o Poder Executivo possui permissão explícita para anular cláusulas fundamentais em conjunturas de crise.' }
    ],
    correctAnswer: 'B',
    explanation: 'A Constituição de 1988 é o marco da redemocratização. Ao instituir a Seguridade Social (Saúde pública universal via SUS, Previdência e Assistência Social), estabeleceu os direitos sociais como dever irrenunciável do Estado democrático de direito.',
    optionExplanations: {
      A: 'Incorreta (distrator neoliberal radical). Os direitos sociais da CF/88 independem de renda ou mérito financeiro.',
      B: 'Correta. A CF/88 colocou a dignidade da pessoa humana e os direitos sociais como pilares da República.',
      C: 'Incorreta (distrator de oposição). A CF/88 criou o SUS ("saúde é direito de todos e dever do Estado") e a escola pública gratuita.',
      D: 'Incorreta (distrator restritivo inconstitucional). O exercício de direitos fundamentais não é condicionado a pagamento prévio.',
      E: 'Incorreta (distrator autoritário). O texto constitucional fortaleceu a separação dos Poderes e os freios e contrapesos.'
    },
    distractorTip: 'A CF/88 no ENEM é tratada como divisor de águas da cidadania, universalização da saúde (SUS) e garantia de direitos humanos.'
  },
  {
    id: 'sim-hum-08',
    dayType: 'dia1',
    areaId: 'humanas',
    discipline: 'Geografia',
    topic: 'Geopolítica & Migrações Globais',
    difficulty: 'dificil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `De acordo com dados do ACNUR (Alto Comissariado das Nações Unidas para Refugiados), o número de pessoas deslocadas à força por perseguições, conflitos armados, colapsos ambientais e graves violações de direitos humanos superou 110 milhões no mundo. Ao mesmo tempo, fronteiras de países do Norte Global têm reforçado barreiras físicas, tecnologias de biometria e leis restritivas.`,
    questionPrompt: 'A contradição geopolítica destacada entre o fluxo migratório forçado e as respostas estatais revela:',
    options: [
      { letter: 'A', text: 'a vigência irrestrita do direito de livre trânsito internacional de populações vulneráveis.' },
      { letter: 'B', text: 'o conflito entre deveres humanitários de proteção e medidas estatais de endurecimento fronteiriço.' },
      { letter: 'C', text: 'a superação de crises migratórias impulsionadas por desastres decorrentes do colapso ecológico.' },
      { letter: 'D', text: 'o acolhimento unânime e voluntário de solicitantes de asilo nas instâncias legislativas ocidentais.' },
      { letter: 'E', text: 'o êxito conclusivo dos programas de assentamento administrados por organismos multilaterais.' }
    ],
    correctAnswer: 'B',
    explanation: 'A globalização abriu fronteiras para capitais e mercadorias, mas ergueu muros contra pessoas em fuga. Há um choque evidente entre a Declaração Universal dos Direitos Humanos e o fechamento militarizado das fronteiras alimentado pela xenofobia.',
    optionExplanations: {
      A: 'Incorreta (distrator desmentido pela realidade). O Norte Global adota políticas severas de contenção e deportação.',
      B: 'Correta. O contraste entre a necessidade humanitária de refúgio e o fechamento xenófobo de fronteiras é um dos maiores dilemas geopolíticos atuais.',
      C: 'Incorreta (distrator falso). Secas e inundações extremas (refugiados climáticos) já figuram entre os principais motores migratórios.',
      D: 'Incorreta (distrator irreal). O acolhimento enfrenta enorme resistência partidária e leis cada vez mais restritivas.',
      E: 'Incorreta (distrator ingênuo). O número de deslocados bate recordes anuais, longe de qualquer resolução.'
    },
    distractorTip: 'Fluxos migratórios no ENEM: capitais e dados circulam livremente, mas corpos humanos de países periféricos enfrentam muros e vigilância.'
  },

  // ==========================================
  // CIÊNCIAS DA NATUREZA E SUAS TECNOLOGIAS (8 Questões)
  // ==========================================
  {
    id: 'sim-nat-01',
    dayType: 'dia2',
    areaId: 'natureza',
    discipline: 'Biologia',
    topic: 'Ecologia & Biomagnificação Trófica',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Em uma bacia hidrográfica próxima a garimpos ilegais de ouro, houve contaminação crônica por mercúrio metálico. Amostras coletadas ao longo de meses demonstraram que a concentração desse metal tóxico aumentava consideravelmente a cada nível trófico da teia alimentar aquática: fitoplâncton < zooplâncton < pequenos lambaris < traíras carnívoras < garças pescadoras.`,
    questionPrompt: 'O fenômeno ecológico descrito e o motivo de a garça apresentar a maior taxa de contaminação correspondem a:',
    options: [
      { letter: 'A', text: 'eutrofização antrópica, gerada pelo aporte desmedido de fósforo orgânico em mananciais hídricos.' },
      { letter: 'B', text: 'biomagnificação trófica, decorrente da ingestão contínua de presas com resíduo tóxico persistente.' },
      { letter: 'C', text: 'sucessão ecológica secundária, em que predadores geram metais pesados por via de reações internas.' },
      { letter: 'D', text: 'bioacumulação linear, restrita aos organismos autótrofos posicionados na base do ecossistema local.' },
      { letter: 'E', text: 'quimiossíntese anaeróbia, responsável pela transferência gasosa do contaminante para as aves carnívoras.' }
    ],
    correctAnswer: 'B',
    explanation: 'A biomagnificação trófica (ou magnificação trófica) ocorre com poluentes persistentes e lipossolúveis (mercúrio, agrotóxicos clorados). Como os animais não conseguem metabolizar nem excretar a substância, ela se concentra em teores crescentes à medida que se sobe na cadeia trófica, atingindo o pico no topo (consumidor terciário / topo de cadeia).',
    optionExplanations: {
      A: 'Incorreta (distrator de confusão conceitual). Eutrofização envolve excesso de nutrientes orgânicos (fósforo e nitrogênio), não mercúrio.',
      B: 'Correta. Por não ser biodegradável, o mercúrio se acumula em concentração máxima no topo da teia alimentar (garça).',
      C: 'Incorreta (distrator absurdo). Animais não sintetizam mercúrio; este é um elemento químico inorgânico absorvido do ambiente.',
      D: 'Incorreta (distrator contraditório). O texto mostra que a contaminação máxima ocorreu no topo da teia, e não nos produtores.',
      E: 'Incorreta (distrator sem embasamento). Quimiossíntese é processo autotrófico realizado por bactérias, não por predadores vertebrados.'
    },
    distractorTip: 'Fluxo de energia na cadeia trófica = DIMINUI a cada nível. Concentração de poluente não biodegradável = AUMENTA a cada nível (topo sofre mais).'
  },
  {
    id: 'sim-nat-02',
    dayType: 'dia2',
    areaId: 'natureza',
    discipline: 'Física',
    topic: 'Eletrodinâmica & Consumo de Energia',
    difficulty: 'facil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Em uma residência com quatro pessoas, um chuveiro elétrico de potência 6.000 W (ou 6 kW) é utilizado diariamente. Cada morador toma um banho de 10 minutos por dia, totalizando 40 minutos diários de funcionamento contínuo do aparelho durante um mês padrão de 30 dias.`,
    questionPrompt: 'Considerando que a companhia distribuidora cobra R$ 0,75 por cada quilowatt-hora (kWh) consumido, o gasto mensal correspondente exclusivamente a esses banhos é de:',
    options: [
      { letter: 'A', text: 'R$ 45,00' },
      { letter: 'B', text: 'R$ 60,00' },
      { letter: 'C', text: 'R$ 90,00' },
      { letter: 'D', text: 'R$ 120,00' },
      { letter: 'E', text: 'R$ 180,00' }
    ],
    correctAnswer: 'C',
    explanation: '1) Tempo diário: 4 × 10 min = 40 min/dia = 40/60 h = 2/3 h por dia.\n2) Tempo no mês (30 dias): (2/3 h/dia) × 30 dias = 20 horas no mês.\n3) Energia consumida: E = P × Δt = 6 kW × 20 h = 120 kWh.\n4) Custo: 120 kWh × R$ 0,75 = R$ 90,00.',
    optionExplanations: {
      A: 'Incorreta (distrator de cálculo pela metade). Resultaria de calcular apenas 10 horas de uso no mês.',
      B: 'Incorreta (distrator de erro de tarifa). Resultaria de multiplicar 120 kWh por R$ 0,50.',
      C: 'Correta. 6 kW × 20 h = 120 kWh. 120 × 0,75 = R$ 90,00.',
      D: 'Incorreta (distrator de erro de unidade). O valor 120 é a energia consumida em kWh, e não o valor em reais.',
      E: 'Incorreta (distrator de duplicação). Resultaria de considerar 40 horas de uso mensal.'
    },
    distractorTip: 'Fórmula básica da conta de luz no ENEM: E(kWh) = P(kW) × Tempo(horas). Lembre-se sempre de converter minutos para fração de hora!'
  },
  {
    id: 'sim-nat-03',
    dayType: 'dia2',
    areaId: 'natureza',
    discipline: 'Química',
    topic: 'Química Orgânica & Polaridade de Fármacos',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `O ácido acetilsalicílico (aspirina) e o paracetamol são analgésicos amplamente utilizados. O paracetamol apresenta em sua estrutura uma hidroxila fenólica (-OH) e um grupo amida (-NH-CO-CH3), enquanto o ácido acetilsalicílico contém um anel aromático ligado a um grupo éster e a um grupo ácido carboxílico (-COOH).`,
    questionPrompt: 'A presença do grupo hidroxila (-OH) e da carboxila (-COOH) confere a essas moléculas a capacidade de formar com a água interações intermoleculares do tipo:',
    options: [
      { letter: 'A', text: 'forças de dispersão de London de fraca intensidade características de cadeias puramente apolares.' },
      { letter: 'B', text: 'ligações de hidrogênio entre grupos polares e moléculas do solvente, favorecendo a hidrossolubilidade.' },
      { letter: 'C', text: 'ligações metálicas originadas pelo compartilhamento de nuvens de elétrons deslocalizados no plasma.' },
      { letter: 'D', text: 'interações dipolo induzido-dipolo induzido comuns a gases nobres dispersos na circulação sanguínea.' },
      { letter: 'E', text: 'ligações covalentes coordenadas com monômeros de glicose dissolvidos na corrente circulatória humana.' }
    ],
    correctAnswer: 'B',
    explanation: 'Grupos que possuem hidrogênio ligado a átomos altamente eletronegativos (flúor, oxigênio ou nitrogênio — FON) formam ligações de hidrogênio com a água (H2O), conferindo hidrofilia e facilitando a dissolução e transporte nos fluidos corporais.',
    optionExplanations: {
      A: 'Incorreta (distrator de inversão). London é típica de substâncias puramente apolares (como hidrocarbonetos e óleos).',
      B: 'Correta. O hidrogênio polarizado da hidroxila interage com os pares de elétrons do oxigênio da água via ligação de hidrogênio.',
      C: 'Incorreta (distrator absurdo). Ligação metálica só existe entre átomos de elementos metálicos em estado sólido ou ligas.',
      D: 'Incorreta (distrator sinônimo de A). Dipolo induzido não se aplica a substâncias fortemente polares ionizáveis.',
      E: 'Incorreta (distrator sem embasamento químico). A dissolução não envolve formação de ligações covalentes com a glicose.'
    },
    distractorTip: 'Regra de ouro no ENEM: H ligado a Flúor, Oxigênio ou Nitrogênio (FON) = LIGAÇÃO DE HIDROGÊNIO (alta solubilidade em água e alto ponto de ebulição).'
  },
  {
    id: 'sim-nat-04',
    dayType: 'dia2',
    areaId: 'natureza',
    discipline: 'Biologia',
    topic: 'Fisiologia & Imunologia (Vacinas vs Soros)',
    difficulty: 'facil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Um trabalhador rural foi picado por uma serpente peçonhenta da espécie jararaca durante o manejo da lavoura. Ao dar entrada na emergência de um hospital regional com inchaço e dor intensa, a equipe médica optou pela administração imediata do soro antiofídico específico.`,
    questionPrompt: 'O soro terapêutico foi o recurso biológico indicado para o caso (em detrimento de uma vacina) porque o soro confere:',
    options: [
      { letter: 'A', text: 'imunização ativa tardia, inoculando antígenos atenuados para estimular a produção celular de anticorpos.' },
      { letter: 'B', text: 'imunização passiva imediata, fornecendo anticorpos específicos capazes de neutralizar toxinas circulantes.' },
      { letter: 'C', text: 'proteção preventiva duradoura que confere defesa imunitária vitalícia contra novos acidentes ofídicos.' },
      { letter: 'D', text: 'modificação genética somática capaz de converter hemácias circulantes em macrófagos fagocitários ativos.' },
      { letter: 'E', text: 'ação analgésica sintética sem a participação de imunoglobulinas sintetizadas pelo sistema de defesa animal.' }
    ],
    correctAnswer: 'B',
    explanation: 'Diferença clássica no ENEM: SORO = curativo, rápido, imunização PASSIVA (contém anticorpos prontos, sem criar memória imunológica). VACINA = preventiva, imunização ATIVA (contém antígenos para o próprio corpo produzir anticorpos e células de memória). Na emergência do veneno, não há tempo para esperar o corpo produzir anticorpos.',
    optionExplanations: {
      A: 'Incorreta (distrator clássico: descreve vacina). A vacina gera imunização ativa e memória, mas leva semanas para funcionar.',
      B: 'Correta. O soro já traz anticorpos prontos (gerados em cavalos) para agir no momento da emergência.',
      C: 'Incorreta (distrator de extrapolação). O soro não confere imunidade permanente; os anticorpos são eliminados do corpo após alguns dias.',
      D: 'Incorreta (distrator biológico sem sentido). Hemácias não se convertem em macrófagos.',
      E: 'Incorreta (distrator de erro de definição). O soro antiofídico é puramente biológico, composto de imunoglobulinas (anticorpos).'
    },
    distractorTip: 'Vacina: Previne, Antígeno, Ativa, Memória. Soro: Cura emergência, Anticorpo pronto, Passiva, Sem memória.'
  },
  {
    id: 'sim-nat-05',
    dayType: 'dia2',
    areaId: 'natureza',
    discipline: 'Física',
    topic: 'Ondulatória & Efeito Doppler',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Ao aguardar na calçada de uma avenida movimentada, uma pessoa percebe que o som da sirene de uma ambulância parece mais agudo (frequência mais alta) enquanto o veículo se aproxima rapidamente e, logo após ultrapassá-la e se afastar, o mesmo som torna-se nitidamente mais grave (frequência mais baixa).`,
    questionPrompt: 'Essa alteração perceptível no tom do som emitido pela sirene é explicada pelo(a):',
    options: [
      { letter: 'A', text: 'variação efetiva na potência mecânica do emissor sonoro causada pela aceleração tangencial do veículo.' },
      { letter: 'B', text: 'difração das ondas sonoras ao contornarem barreiras físicas e o contorno corporal do pedestre receptor.' },
      { letter: 'C', text: 'efeito Doppler acústico decorrente do movimento relativo entre a fonte geradora e o receptor em repouso.' },
      { letter: 'D', text: 'ressonância sonora originada pela coincidência entre as vibrações das partículas do ar e a cavidade auditiva.' },
      { letter: 'E', text: 'refração da frente de onda ao atravessar gradientes de temperatura e densidade presentes na massa atmosférica.' }
    ],
    correctAnswer: 'C',
    explanation: 'O Efeito Doppler é a mudança aparente na frequência de uma onda percebida por um observador devido ao movimento relativo entre a fonte emissora e o receptor. Na aproximação, as frentes de onda são comprimidas (menor comprimento de onda aparente, maior frequência percebida = som agudo). No afastamento, as frentes de onda se distanciam (menor frequência aparente = som grave).',
    optionExplanations: {
      A: 'Incorreta (distrator de erro físico). A frequência e a potência da fonte emissora na ambulância permanecem rigorosamente constantes.',
      B: 'Incorreta (distrator de confusão ondulatória). Difração é a capacidade da onda de contornar obstáculos, não alterando a frequência.',
      C: 'Correta. É a definição exata do Efeito Doppler acústico.',
      D: 'Incorreta (distrator de fenômeno distinto). Ressonância é a transferência máxima de energia em frequências iguais.',
      E: 'Incorreta (distrator conceitual). Refração altera velocidade e comprimento de onda ao mudar de meio, mas a frequência da onda permanece constante.'
    },
    distractorTip: 'Aproximação = frequência aparente MAIOR (som agudo, desvio para o azul). Afastamento = frequência aparente MENOR (som grave, desvio para o vermelho).'
  },
  {
    id: 'sim-nat-06',
    dayType: 'dia2',
    areaId: 'natureza',
    discipline: 'Química',
    topic: 'Eletroquímica & Pilhas de Lítio',
    difficulty: 'dificil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `As baterias recarregáveis de íons de lítio (Li-ion) revolucionaram os smartphones e os veículos elétricos devido à sua alta densidade energética e baixo peso. Durante o processo espontâneo de descarga da bateria em funcionamento, os íons de lítio migram pelo eletrólito do ânodo de grafite para o cátodo de óxido de cobalto, liberando corrente de elétrons através do circuito externo.`,
    questionPrompt: 'Considerando os princípios da eletroquímica, no polo onde ocorre o ânodo durante a descarga da bateria observa-se o processo de:',
    options: [
      { letter: 'A', text: 'redução com ganho de elétrons, promovendo a elevação do estado de oxidação das espécies químicas ativas.' },
      { letter: 'B', text: 'oxidação com liberação de elétrons, constituindo o polo de sinal negativo durante a descarga do sistema.' },
      { letter: 'C', text: 'eletrólise não espontânea forçada pela aplicação de uma fonte externa contínua de potencial eletroquímico.' },
      { letter: 'D', text: 'decomposição térmica espontânea do eletrólito sólido com liberação de vapores inflamáveis de hidrocarboneto.' },
      { letter: 'E', text: 'precipitação de sais insolúveis de lítio na interface do eletrodo sem trânsito efetivo de cargas elétricas.' }
    ],
    correctAnswer: 'B',
    explanation: 'Mnemônico universal da eletroquímica (CRAO): Cátodo = Redução; Ânodo = Oxidação. Em uma pilha ou bateria em descarga (processo espontâneo), o ânodo é o polo NEGATIVO onde ocorre OXIDAÇÃO (perda de elétrons que fluem pelo circuito externo para abastecer o dispositivo).',
    optionExplanations: {
      A: 'Incorreta (distrator contraditório). Redução envolve ganho de elétrons e DIMINUIÇÃO do NOx, ocorrendo no cátodo.',
      B: 'Correta. Ânodo = Oxidação = Perda de elétrons = Polo negativo da pilha.',
      C: 'Incorreta (distrator de inversão de etapa). A eletrólise ocorre na RECARGA da bateria, não na sua descarga em funcionamento.',
      D: 'Incorreta (distrator alarmista). A bateria opera por reações redox controladas em temperatura ambiente, não decomposição térmica.',
      E: 'Incorreta (distrator absurdo). A essência das baterias é justamente a transferência contínua de elétrons.'
    },
    distractorTip: 'Lembre-se sempre do mnemônico CRAO: Consoante com Consoante (Cátodo = Redução), Vogal com Vogal (Ânodo = Oxidação).'
  },
  {
    id: 'sim-nat-07',
    dayType: 'dia2',
    areaId: 'natureza',
    discipline: 'Biologia',
    topic: 'Genética & Engenharia Genética',
    difficulty: 'dificil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `A tecnologia CRISPR-Cas9 atua como uma "tesoura molecular" programável capaz de identificar sequências específicas do DNA genômico celular e clivá-las com altíssima precisão. Essa técnica abriu caminho para o tratamento de doenças genéticas hereditárias, como a anemia falciforme, ao permitir a correção da mutação pontual no gene da hemoglobina.`,
    questionPrompt: 'O diferencial biotecnológico da ferramenta CRISPR em comparação com as técnicas tradicionais de transgenia reside na sua capacidade de:',
    options: [
      { letter: 'A', text: 'inserir aleatoriamente segmentos de DNA exógeno sem qualquer orientação enzimática predeterminada.' },
      { letter: 'B', text: 'editar e corrigir nucleotídeos em pontos exatos do próprio genoma guiado por uma sequência de RNA.' },
      { letter: 'C', text: 'produzir clones celulares idênticos sem depender de mecanismos naturais de mitose ou citocinese.' },
      { letter: 'D', text: 'bloquear universalmente a síntese de qualquer molécula de ácido ribonucleico no citoplasma celular.' },
      { letter: 'E', text: 'duplicar o número de cromossomos sexuais presentes nas células somáticas diferenciadas do organismo.' }
    ],
    correctAnswer: 'B',
    explanation: 'Enquanto a transgenia clássica insere genes exógenos (muitas vezes de outras espécies e em locais aleatórios do genoma), o sistema CRISPR é guiado por um RNA-guia que encontra exatamente a sequência mutada e permite editar ou corrigir as bases nitrogenadas específicas com precisão cirúrgica.',
    optionExplanations: {
      A: 'Incorreta (distrator de inversão). O grande trunfo do CRISPR é precisamente a altíssima precisão guiada, acabando com a aleatoriedade.',
      B: 'Correta. A edição gênica permite consertar o próprio gene humano com base no RNA guia específico.',
      C: 'Incorreta (distrator de confusão biotecnológica). CRISPR edita sequências de DNA, não é técnica de clonagem reprodutiva de organismos.',
      D: 'Incorreta (distrator de exagero letal). Parar todos os RNAs mensageiros causaria a morte imediata da célula.',
      E: 'Incorreta (distrator sem relação). Não provoca aneuploidias cromossômicas gerais.'
    },
    distractorTip: 'Diferença no ENEM: Transgênico = recebe gene de OUTRA espécie. Edição gênica (CRISPR) = altera/corrige o próprio DNA do organismo com RNA-guia.'
  },
  {
    id: 'sim-nat-08',
    dayType: 'dia2',
    areaId: 'natureza',
    discipline: 'Física',
    topic: 'Cinemática & Dinâmica no Trânsito',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Em uma campanha de segurança no trânsito, a polícia rodoviária alerta: "Dobrar a velocidade do veículo não dobra a distância de frenagem, ela quadruplica!". Um motorista em pista seca a 72 km/h (20 m/s) necessita de 20 metros de frenagem até parar totalmente sob desaceleração constante provocada pelo atrito dos pneus.`,
    questionPrompt: 'Se o mesmo veículo trafegar a 144 km/h (40 m/s) sob as mesmas condições mecânicas de frenagem e atrito, a nova distância de frenagem percorrida será de:',
    options: [
      { letter: 'A', text: '40 metros' },
      { letter: 'B', text: '60 metros' },
      { letter: 'C', text: '80 metros' },
      { letter: 'D', text: '100 metros' },
      { letter: 'E', text: '160 metros' }
    ],
    correctAnswer: 'C',
    explanation: 'Pela Equação de Torricelli: v² = v₀² + 2aΔs. Na parada (v = 0), temos: Δs = v₀² / (2|a|). Como a distância de frenagem Δs é proporcional ao QUADRADO da velocidade inicial (v₀²), se a velocidade dobra (de 20 para 40 m/s, fator 2), a distância é multiplicada por 2² = 4. Portanto, 20 m × 4 = 80 metros.',
    optionExplanations: {
      A: 'Incorreta (distrator de proporcionalidade linear simples). Supõe erroneamente que dobrar a velocidade dobraria a distância (20 × 2 = 40 m).',
      B: 'Incorreta (distrator de soma direta).',
      C: 'Correta. A energia cinética e Torricelli dependem de v²: (2)² × 20 m = 80 metros.',
      D: 'Incorreta (distrator de cálculo impreciso).',
      E: 'Incorreta (distrator de fator cúbico ou octuplicado).'
    },
    distractorTip: 'Frenagem e energia cinética no ENEM: ambas dependem da VELOCIDADE AO QUADRADO (v²). Dobrou a velocidade? A distância quadruplica!'
  },

  // ==========================================
  // MATEMÁTICA E SUAS TECNOLOGIAS (8 Questões)
  // ==========================================
  {
    id: 'sim-mat-01',
    dayType: 'dia2',
    areaId: 'matematica',
    discipline: 'Matemática',
    topic: 'Escala Cartográfica & Proporção',
    difficulty: 'facil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Um arquiteto está desenhando a planta de um futuro parque ecológico urbano na escala 1 : 50.000. No projeto desenhado sobre a mesa, a ciclovia principal mede exatamente 8 centímetros em linha reta.`,
    questionPrompt: 'A extensão real correspondente dessa ciclovia no terreno, em quilômetros, é igual a:',
    options: [
      { letter: 'A', text: '0,4 km' },
      { letter: 'B', text: '4 km' },
      { letter: 'C', text: '40 km' },
      { letter: 'D', text: '400 km' },
      { letter: 'E', text: '4.000 km' }
    ],
    correctAnswer: 'B',
    explanation: '1) Distância real em centímetros: D = 8 cm × 50.000 = 400.000 cm.\n2) Converter cm para metros (divide por 100): 400.000 cm = 4.000 metros.\n3) Converter metros para quilômetros (divide por 1.000): 4.000 m = 4 km.',
    optionExplanations: {
      A: 'Incorreta (distrator de erro de vírgula). Dividiu por 1.000.000 em vez de 100.000.',
      B: 'Correta. 8 × 50.000 = 400.000 cm = 4.000 m = 4 km.',
      C: 'Incorreta (distrator de esquecer de dividir metros para km). 400.000 cm = 40 km seria se a escala fosse 1:500.000.',
      D: 'Incorreta (distrator de falta de conversão).',
      E: 'Incorreta (distrator grosseiro de casas decimais).'
    },
    distractorTip: 'Dica rápida de escala no ENEM: para passar de centímetros para quilômetros, basta cortar 5 zeros (ou andar 5 casas com a vírgula para a esquerda).'
  },
  {
    id: 'sim-mat-02',
    dayType: 'dia2',
    areaId: 'matematica',
    discipline: 'Matemática',
    topic: 'Estatística (Média, Mediana e Moda)',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Em uma pequena cooperativa agrícola familiar, as idades dos sete produtores associados são: 24, 38, 29, 52, 29, 44 e 63 anos.`,
    questionPrompt: 'A mediana e a moda desse conjunto de idades correspondem, respectivamente, a:',
    options: [
      { letter: 'A', text: '38 anos e 29 anos.' },
      { letter: 'B', text: '29 anos e 38 anos.' },
      { letter: 'C', text: '40 anos e 29 anos.' },
      { letter: 'D', text: '52 anos e 44 anos.' },
      { letter: 'E', text: '38 anos e 52 anos.' }
    ],
    correctAnswer: 'A',
    explanation: '1) Para a MEDIANA, é obrigatório colocar os valores em ROL (ordem crescente): 24, 29, 29, 38, 44, 52, 63.\nComo temos 7 elementos (ímpar), a mediana é exatamente o 4º elemento (termo central) = 38 anos.\n2) A MODA é o valor mais frequente. O número 29 aparece duas vezes (os demais aparecem apenas uma) = 29 anos.\nPortanto: Mediana = 38 anos e Moda = 29 anos.',
    optionExplanations: {
      A: 'Correta. Rol: [24, 29, 29, 38, 44, 52, 63] -> Central = 38. Frequente = 29.',
      B: 'Incorreta (distrator de inversão dos conceitos). Trocou a mediana pela moda.',
      C: 'Incorreta (distrator da média aritmética). 40 é a média aproximada, não a mediana.',
      D: 'Incorreta (distrator de cálculo sem ordenar o rol). Se não ordenar e pegar o meio dos dados brutos, erra o cálculo.',
      E: 'Incorreta (distrator de confusão).'
    },
    distractorTip: 'Pegadinha fatal do ENEM em mediana: NUNCA pegue o número do meio sem antes colocar a lista em ORDEM CRESCENTE (ROL).'
  },
  {
    id: 'sim-mat-03',
    dayType: 'dia2',
    areaId: 'matematica',
    discipline: 'Matemática',
    topic: 'Geometria Espacial (Cilindros & Volumes)',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Para armazenar água da chuva em uma horta comunitária, foi instalado um reservatório em formato de cilindro circular reto com raio da base igual a 2 metros e altura igual a 3 metros. Adote a aproximação π = 3.`,
    questionPrompt: 'Considerando que 1 metro cúbico equivale a 1.000 litros, a capacidade máxima total desse reservatório, em litros, é de:',
    options: [
      { letter: 'A', text: '12.000 litros' },
      { letter: 'B', text: '18.000 litros' },
      { letter: 'C', text: '24.000 litros' },
      { letter: 'D', text: '36.000 litros' },
      { letter: 'E', text: '72.000 litros' }
    ],
    correctAnswer: 'D',
    explanation: '1) Volume do cilindro: V = π × r² × h.\n2) V = 3 × (2 m)² × 3 m = 3 × 4 × 3 = 36 m³.\n3) Conversão para litros (1 m³ = 1.000 L): 36 m³ × 1.000 L/m³ = 36.000 litros.',
    optionExplanations: {
      A: 'Incorreta (distrator de esquecer o raio ao quadrado). Calculou V = π × r × h = 3 × 2 × 3 = 18 m³.',
      B: 'Incorreta (distrator de esquecer o π). Calculou apenas r² × h = 4 × 3 = 12.',
      C: 'Incorreta (distrator de erro de raio). Multiplicou por 2 em vez de elevar ao quadrado.',
      D: 'Correta. V = 3 × 2² × 3 = 36 m³ = 36.000 litros.',
      E: 'Incorreta (distrator de duplicação indevida).'
    },
    distractorTip: 'Conversões essenciais de volume no ENEM: 1 m³ = 1.000 L | 1 dm³ = 1 L | 1 cm³ = 1 mL.'
  },
  {
    id: 'sim-mat-04',
    dayType: 'dia2',
    areaId: 'matematica',
    discipline: 'Matemática',
    topic: 'Matemática Financeira & Porcentagem',
    difficulty: 'facil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Uma loja de artigos esportivos ofereceu uma promoção de queima de estoque: um tênis de corrida que custava originalmente R$ 400,00 teve um desconto de 20% no valor de etiqueta. Para pagamentos à vista no Pix, a loja concedeu um desconto adicional de 10% sobre o novo valor promocional com desconto.`,
    questionPrompt: 'O preço final pago por um cliente que adquiriu esse tênis à vista pelo Pix foi de:',
    options: [
      { letter: 'A', text: 'R$ 280,00' },
      { letter: 'B', text: 'R$ 288,00' },
      { letter: 'C', text: 'R$ 300,00' },
      { letter: 'D', text: 'R$ 320,00' },
      { letter: 'E', text: 'R$ 350,00' }
    ],
    correctAnswer: 'B',
    explanation: 'Descontos sucessivos NUNCA devem ser simplesmente somados (20% + 10% ≠ 30%).\n1º Desconto de 20%: R$ 400 × 0,80 = R$ 320,00.\n2º Desconto de 10% sobre R$ 320: R$ 320 × 0,90 = R$ 288,00.\nValor final: R$ 288,00.',
    optionExplanations: {
      A: 'Incorreta (distrator clássico de somar porcentagens). Somou 20% + 10% = 30% de desconto sobre 400 = R$ 280,00. No comércio, o 2º desconto incide sobre o saldo!',
      B: 'Correta. R$ 400 × 0,80 = R$ 320. R$ 320 × 0,90 = R$ 288,00.',
      C: 'Incorreta (distrator aproximado).',
      D: 'Incorreta (distrator que esqueceu o segundo desconto). Parou no primeiro desconto de 20% (R$ 320).',
      E: 'Incorreta (distrator sem base).'
    },
    distractorTip: 'Descontos ou aumentos sucessivos no ENEM: multiplique os fatores de correção: (1 - 0,20) × (1 - 0,10) = 0,80 × 0,90 = 0,72 (desconto real de 28%, e não 30%).'
  },
  {
    id: 'sim-mat-05',
    dayType: 'dia2',
    areaId: 'matematica',
    discipline: 'Matemática',
    topic: 'Função Afim (Primeiro Grau)',
    difficulty: 'facil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Em uma cidade turística, o serviço de táxi cobra uma tarifa fixa de partida ("bandeirada") no valor de R$ 6,00 mais um adicional variável de R$ 3,50 por cada quilômetro rodado.`,
    questionPrompt: 'A lei da função matemática f(x) que calcula o valor total da corrida em reais em função dos x quilômetros rodados, e o preço cobrado por uma viagem de 12 km, são respectivamente:',
    options: [
      { letter: 'A', text: 'f(x) = 6x + 3,50 e R$ 75,50' },
      { letter: 'B', text: 'f(x) = 3,50x + 6 e R$ 48,00' },
      { letter: 'C', text: 'f(x) = 3,50x + 6 e R$ 42,00' },
      { letter: 'D', text: 'f(x) = 9,50x e R$ 114,00' },
      { letter: 'E', text: 'f(x) = 6x - 3,50 e R$ 68,50' }
    ],
    correctAnswer: 'B',
    explanation: 'Função afim clássica: f(x) = ax + b, onde:\n- Coeficiente angular a = taxa variável = R$ 3,50 por km.\n- Coeficiente linear b = termo fixo (bandeirada) = R$ 6,00.\nLogo: f(x) = 3,50x + 6.\nPara x = 12 km: f(12) = 3,50 × 12 + 6 = 42 + 6 = R$ 48,00.',
    optionExplanations: {
      A: 'Incorreta (distrator de inverter os papéis de a e b). Considerou a bandeirada como variável.',
      B: 'Correta. f(x) = 3,50x + 6. Para x = 12: 3,50 × 12 + 6 = 42 + 6 = R$ 48,00.',
      C: 'Incorreta (distrator que esqueceu de somar a bandeirada). Calculou apenas 3,50 × 12 = 42.',
      D: 'Incorreta (distrator de somar os dois coeficientes). Somou 6 + 3,50 = 9,50x.',
      E: 'Incorreta (distrator com subtração indevida).'
    },
    distractorTip: 'Identificação rápida de função do 1º grau: termo que tem "por km / por hora / por unidade" sempre acompanha o x. Termo fixo é o termo independente sem x.'
  },
  {
    id: 'sim-mat-06',
    dayType: 'dia2',
    areaId: 'matematica',
    discipline: 'Matemática',
    topic: 'Probabilidade Simples e Condicional',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Em uma clínica médica de triagem rápida, 100 pacientes com sintomas gripais foram submetidos a testes laboratoriais. A tabela de contingência registrou os seguintes dados:
- 60 pacientes testaram positivo para o vírus Influenza (sendo 36 mulheres e 24 homens).
- 40 pacientes testaram negativo (sendo 24 mulheres e 16 homens).`,
    questionPrompt: 'Ao sortear aleatoriamente um paciente sabendo-se de antemão que o seu teste foi POSITIVO, a probabilidade de que a pessoa sorteada seja um homem é de:',
    options: [
      { letter: 'A', text: '24%' },
      { letter: 'B', text: '40%' },
      { letter: 'C', text: '60%' },
      { letter: 'D', text: '16%' },
      { letter: 'E', text: '50%' }
    ],
    correctAnswer: 'B',
    explanation: 'Atenção à probabilidade condicional: o termo "sabendo-se que o teste foi POSITIVO" restringe o espaço amostral aos que testaram positivo.\n1) Espaço amostral reduzido (casos possíveis): total de positivos = 60 pacientes.\n2) Casos favoráveis (homens com teste positivo): 24 homens.\n3) Probabilidade: P = 24 / 60 = 4 / 10 = 0,40 = 40%.',
    optionExplanations: {
      A: 'Incorreta (distrator clássico de não reduzir o espaço amostral). Calculou 24 / 100 = 24% (em relação ao total de pacientes, ignorando a condição "sabendo que").',
      B: 'Correta. P(Homem | Positivo) = 24 / 60 = 2 / 5 = 40%.',
      C: 'Incorreta (distrator da probabilidade do teste positivo geral). 60% é a chance de um paciente qualquer ser positivo.',
      D: 'Incorreta (distrator de homens negativos).',
      E: 'Incorreta (distrator de chute equilibrado).'
    },
    distractorTip: 'Probabilidade condicional no ENEM: quando o enunciado diz "sabendo que...", "dado que..." ou "dentre os que...", o denominador MUDA e fica menor que o total geral!'
  },
  {
    id: 'sim-mat-07',
    dayType: 'dia2',
    areaId: 'matematica',
    discipline: 'Matemática',
    topic: 'Análise Combinatória (Princípio Multiplicativo)',
    difficulty: 'dificil',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `Um sistema de autenticação bancária exige que o cliente crie uma senha eletrônica composta por exatamente 4 algarismos distintos (sem repetição), escolhidos entre os dígitos de 0 a 9. Por questões de segurança, a instituição estipula uma regra obrigatória adicional: o primeiro algarismo da senha não pode ser zero (0).`,
    questionPrompt: 'A quantidade total de senhas distintas que atendem a todos os critérios de segurança estabelecidos é dada por:',
    options: [
      { letter: 'A', text: '3.024' },
      { letter: 'B', text: '4.536' },
      { letter: 'C', text: '5.040' },
      { letter: 'D', text: '9.000' },
      { letter: 'E', text: '10.000' }
    ],
    correctAnswer: 'B',
    explanation: 'Aplicação do Princípio Fundamental da Contagem (PFC) com restrições:\n- 1º dígito: dígitos de 1 a 9 (o zero é proibido) = 9 possibilidades.\n- 2º dígito: qualquer dígito de 0 a 9, exceto o que já foi usado no 1º (agora o zero pode entrar) = 9 possibilidades.\n- 3º dígito: qualquer um dos restantes = 8 possibilidades.\n- 4º dígito: qualquer um dos restantes = 7 possibilidades.\nTotal de senhas = 9 × 9 × 8 × 7 = 81 × 56 = 4.536 senhas.',
    optionExplanations: {
      A: 'Incorreta (distrator de restringir o zero em todas as posições). 9 × 8 × 7 × 6 = 3.024.',
      B: 'Correta. 9 opções para o 1º dígito × 9 para o 2º × 8 para o 3º × 7 para o 4º = 4.536.',
      C: 'Incorreta (distrator de permitir o zero no início). 10 × 9 × 8 × 7 = 5.040.',
      D: 'Incorreta (distrator com repetição permitida). 9 × 10 × 10 × 10 = 9.000.',
      E: 'Incorreta (distrator de 10⁴). Total de números de 4 dígitos sem restrições.'
    },
    distractorTip: 'Em contagem com restrição: sempre comece preenchendo a vaga que tem a restrição mais severa (o primeiro dígito sem zero).'
  },
  {
    id: 'sim-mat-08',
    dayType: 'dia2',
    areaId: 'matematica',
    discipline: 'Matemática',
    topic: 'Geometria Plana & Otimização de Áreas',
    difficulty: 'media',
    sourceLabel: 'Questão autoral de treinamento — Padrão ENEM',
    textContext: `O telhado de uma escola técnica tem formato retangular com dimensões de 15 metros de comprimento por 8 metros de largura. A diretoria planeja instalar placas solares fotovoltaicas retangulares de 2 metros por 1 metro cada. Por normas técnicas de segurança e circulação dos bombeiros, deve-se deixar 20% da área total do telhado completamente desobstruída.`,
    questionPrompt: 'A quantidade máxima dessas placas solares que podem ser instaladas na área restante aproveitável do telhado é de:',
    options: [
      { letter: 'A', text: '36 placas' },
      { letter: 'B', text: '48 placas' },
      { letter: 'C', text: '60 placas' },
      { letter: 'D', text: '96 placas' },
      { letter: 'E', text: '120 placas' }
    ],
    correctAnswer: 'B',
    explanation: '1) Área total do telhado: A = 15 m × 8 m = 120 m².\n2) Área útil aproveitável (descontando 20% livres): 120 m² × 0,80 = 96 m².\n3) Área de cada placa solar: 2 m × 1 m = 2 m².\n4) Número máximo de placas: 96 m² / 2 m² = 48 placas.',
    optionExplanations: {
      A: 'Incorreta (distrator de desconto de 40%). Resultaria de abater 40% da área útil.',
      B: 'Correta. Telhado total = 120 m². Área livre 20% -> Área útil 80% = 96 m². Placas de 2 m²: 96 / 2 = 48 placas.',
      C: 'Incorreta (distrator que esqueceu os 20% de segurança). 120 m² / 2 m² = 60 placas.',
      D: 'Incorreta (distrator que confundiu metros quadrados úteis com número de placas). 96 m² é a área útil restante.',
      E: 'Incorreta (distrator que usou área total de 120 m²).'
    },
    distractorTip: 'Fique atento ao comando: o ENEM costuma aplicar descontos de circulação ("deve-se deixar X% livre"). Calcule a área ÚTIL antes de dividir pelo tamanho das placas.'
  }
];

// Função inteligente que seleciona 10 questões equilibradas para uma rodada
// Garante distribuição pelas 4 áreas do conhecimento do ENEM e distribuição de dificuldade
export function generateSimuladoRound(
  stage: 'dia1' | 'dia2' | 'geral' = 'geral',
  seed?: number
): AuthorialQuestion[] {
  // Filtro por dia, se aplicável, ou geral (com todas as áreas)
  let pool = [...SIMULADO_BANK];

  if (stage === 'dia1') {
    pool = SIMULADO_BANK.filter(q => q.dayType === 'dia1' || q.areaId === 'linguagens' || q.areaId === 'humanas');
  } else if (stage === 'dia2') {
    pool = SIMULADO_BANK.filter(q => q.dayType === 'dia2' || q.areaId === 'natureza' || q.areaId === 'matematica');
  }

  // Se a seleção for geral ou se um dos dias tiver menos de 10 questões, balanceia pelas 4 grandes áreas
  const linguagens = pool.filter(q => q.areaId === 'linguagens');
  const humanas = pool.filter(q => q.areaId === 'humanas');
  const natureza = pool.filter(q => q.areaId === 'natureza');
  const matematica = pool.filter(q => q.areaId === 'matematica');

  const shuffle = <T>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  let selected10: AuthorialQuestion[] = [];

  if (stage === 'dia1') {
    // 5 de Linguagens + 5 de Humanas
    const lShuffled = shuffle(linguagens).slice(0, 5);
    const hShuffled = shuffle(humanas).slice(0, 5);
    selected10 = shuffle([...lShuffled, ...hShuffled]);
  } else if (stage === 'dia2') {
    // 5 de Natureza + 5 de Matemática
    const nShuffled = shuffle(natureza).slice(0, 5);
    const mShuffled = shuffle(matematica).slice(0, 5);
    selected10 = shuffle([...nShuffled, ...mShuffled]);
  } else {
    // Geral / Integrado (equilíbrio total: 2 a 3 de cada área somando exatamente 10 questões)
    const l = shuffle(linguagens).slice(0, 3);
    const h = shuffle(humanas).slice(0, 2);
    const n = shuffle(natureza).slice(0, 3);
    const m = shuffle(matematica).slice(0, 2);
    selected10 = shuffle([...l, ...h, ...n, ...m]);
  }

  // Se por alguma razão o filtro teve menos de 10, preenche com questões do pool geral sem duplicatas
  if (selected10.length < 10) {
    const existingIds = new Set(selected10.map(q => q.id));
    const remaining = shuffle(pool.filter(q => !existingIds.has(q.id)));
    selected10 = [...selected10, ...remaining.slice(0, 10 - selected10.length)];
  }

  // Aplica o motor de embaralhamento e balanceamento estrito (2A, 2B, 2C, 2D, 2E)
  return buildBalancedShuffledRound(selected10.slice(0, 10));
}
