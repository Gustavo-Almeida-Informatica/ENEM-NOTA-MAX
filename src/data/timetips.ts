import { TimeTipBlock } from '../types';

export const TIME_TIPS: TimeTipBlock[] = [
  {
    id: 'ordem-de-resolucao',
    title: 'Ordem Estratégica de Resolução e o Segredo da TRI',
    tagline: 'Como maximizar sua nota pelo algoritmo de coerência pedagógica do INEP',
    icon: 'Layers',
    readingMinutes: 4,
    summary: 'A Teoria de Resposta ao Item (TRI) não avalia apenas a quantidade de acertos, mas a consistência: acertar uma difícil e errar uma fácil gera suspeita de chute e derruba a sua nota.',
    steps: [
      {
        heading: '1º Dia (Linguagens, Humanas e Redação)',
        detail: 'Comece lendo a proposta de redação imediatamente. Faça o "brainstorming" e o esqueleto do projeto de texto (15 min). Depois, vá para as 45 questões de Humanas (que costumam ter leitura mais direta). Em seguida, faça o rascunho da redação. Finalize com Linguagens e passe a redação a limpo.'
      },
      {
        heading: '2º Dia (Matemática e Ciências da Natureza)',
        detail: 'A prova de Matemática é a que tem maior amplitude de nota (vai de 300 a quase 1000 pontos). Faça um primeiro passe de 45 minutos caçando e resolvendo apenas as questões fáceis de Matemática (gráficos, regra de três, porcentagem, média). Depois passe para Natureza e volte para as médias de Matemática.'
      },
      {
        heading: 'Nunca deixe o cartão de respostas para os 10 minutos finais',
        detail: 'Preencha o gabarito oficial com calma faltando no mínimo 30 minutos para o término. O cansaço visual é o maior causador de erros de marcação de gabarito da história do ENEM.'
      }
    ],
    enemRuleOfThumb: 'TRI é coerência: uma questão fácil vale muito mais para a sua média do que uma questão difícil!'
  },
  {
    id: 'regra-dos-tres-minutos',
    title: 'A Regra dos 3 Minutos por Questão e os 3 Passes',
    tagline: 'O método definitivo para não travar em nenhuma questão complexa',
    icon: 'Timer',
    readingMinutes: 4,
    summary: 'São 90 questões para 5 horas (1º dia com redação tem 5h30). Descontando redação e gabarito, você tem uma média estrita de 3 minutos por questão.',
    steps: [
      {
        heading: '1º Passe: As Imediatas (Verde)',
        detail: 'Leu o enunciado e sabe resolver imediatamente? Faça agora! Se for de leitura simples ou cálculo direto, garanta o ponto nos primeiros 60 a 90 segundos.'
      },
      {
        heading: '2º Passe: As Trabalhosas (Amarelo)',
        detail: 'Você sabe a matéria, mas percebeu que precisará de 3 contas ou leitura atenta de 2 gráficos? Circule o número da questão na prova e pule para a próxima. Você voltará nela no segundo passe.'
      },
      {
        heading: '3º Passe: As Difíceis ou Travadas (Vermelho)',
        detail: 'Leu duas vezes e não entendeu o raciocínio ou nunca viu a fórmula? Não queime 8 minutos nela! Marque com um "X", chute consciente no final eliminando alternativas absurdas e proteja sua energia mental.'
      }
    ],
    enemRuleOfThumb: 'Ficar 7 minutos tentando resolver uma única questão difícil é gastar o tempo de duas questões fáceis que você deixaria em branco no final.'
  },
  {
    id: 'leitura-rapida-textos-longos',
    title: 'Leitura Rápida: Vencendo Enunciados Quilométricos',
    tagline: 'A técnica do "Comando Invertido" para poupar até 40 minutos de leitura',
    icon: 'Zap',
    readingMinutes: 3,
    summary: 'Muitos textos no 1º dia possuem 30 a 50 linhas com crônicas, matérias de jornal ou textos filosóficos densos. Ler tudo sem foco esgota o cérebro.',
    steps: [
      {
        heading: 'Passo 1: Leia a Fonte (Rodapé)',
        detail: 'Olhe quem escreveu e de onde saiu o texto (ex: se for uma revista de divulgação científica, um livro de poemas modernistas ou um portal de notícias). Isso ativa seu repertório prévio instantaneamente.'
      },
      {
        heading: 'Passo 2: Leia o Comando e a Pergunta Final',
        detail: 'Antes de olhar o texto principal, leia o enunciado da questão. Você saberá exatamente qual pista precisa caçar: uma crítica irônica, uma função comunicativa ou uma causa histórica.'
      },
      {
        heading: 'Passo 3: Leitura Ativa com o Lápis',
        detail: 'Volte ao texto sublinhando apenas palavras-chave relacionadas à pergunta. Muitas vezes a resposta está em um único parágrafo central, dispensando a leitura morosa do restante.'
      }
    ],
    enemRuleOfThumb: 'Quem lê o comando primeiro transforma uma leitura passiva em uma caçada direcionada à alternativa correta.'
  },
  {
    id: 'calculo-rapido-exatas',
    title: 'Cálculo Rápido em Matemática e Natureza',
    tagline: 'Técnicas de aproximação, potência de dez e eliminação de alternativas absurdas',
    icon: 'Calculator',
    readingMinutes: 4,
    summary: 'O ENEM não exige calculadoras porque os números foram feitos para serem simplificados ou estimados com raciocínio lógico.',
    steps: [
      {
        heading: 'Olhe as alternativas antes de fazer a conta',
        detail: 'Se as alternativas forem distantes entre si (ex: A) 12; B) 85; C) 420; D) 1.200), você NÃO precisa de conta exata com 3 casas decimais! Aproxime 3,14 para 3 e 9,8 m/s² para 10 m/s².'
      },
      {
        heading: 'Use Potências de Dez e Notação Científica',
        detail: 'Em vez de fazer cálculos com 0,000045 * 2.000.000, transforme em 4,5 x 10^-5 * 2 x 10^6 = 9 x 10^1 = 90. Isso zera a chance de esquecer um zero ou errar a vírgula.'
      },
      {
        heading: 'Fatoração e Simplificação Prévia',
        detail: 'Nunca multiplique números grandes no numerador antes de verificar se eles podem ser simplificados com o denominador. Ex: (48 * 75) / 12 -> simplifique 48 por 12 (dá 4) e faça 4 * 75 = 300.'
      }
    ],
    enemRuleOfThumb: 'Na dúvida, estime a ordem de grandeza: saber se o resultado está na casa das centenas ou dos milhares elimina de 2 a 3 alternativas de cara.'
  },
  {
    id: 'redacao-sem-correria',
    title: 'Redação sem Correria: A Gestão dos 70 Minutos',
    tagline: 'O cronograma minuto a minuto para escrever um texto nota 1000 sem pânico',
    icon: 'PenTool',
    readingMinutes: 4,
    summary: 'A redação vale 1000 pontos isolados na sua média do ENEM. Não improvise: divida seu tempo em 4 blocos rigorosos.',
    steps: [
      {
        heading: '00 a 15 min: Tempestade de Ideias e Projeto de Texto',
        detail: 'Leia os textos motivadores com lápis. Defina sua Tese em uma frase clara. Escolha seus dois argumentos: D1 (Causa / negligência estatal) e D2 (Impacto social / preconceito). Liste os repertórios correspondentes.'
      },
      {
        heading: '15 a 45 min: Escrita do Rascunho Completo',
        detail: 'Redija os 4 parágrafos no caderno de rascunho sem se preocupar em excesso com a perfeição gramatical nesse momento. Deixe o raciocínio argumentativo fluir com clareza.'
      },
      {
        heading: '45 a 55 min: Checklist de Revisão Cirúrgica',
        detail: 'Confira os 5 elementos da proposta de intervenção na conclusão. Cheque a presença de conectivos interparágrafos ("Ademais", "Portanto"). Corrija crases e concordâncias verbais.'
      },
      {
        heading: '55 a 70 min: Passar a Limpo com Calma',
        detail: 'Transcreva para a folha definitiva com letra legível, respeitando as margens e sem ultrapassar a linha 30. Respire fundo: seu texto está pronto!'
      }
    ],
    enemRuleOfThumb: 'Nunca passe a redação a limpo nos 20 minutos finais da prova com o fiscal anunciando o tempo: a mão treme e os erros disparam.'
  },
  {
    id: 'rotina-semanal-produtiva',
    title: 'Rotina de Estudo Semanal: Menos Tempo Perdido',
    tagline: 'Como organizar seu ciclo de estudos com repetição espaçada e análise de erros',
    icon: 'Calendar',
    readingMinutes: 4,
    summary: 'Estudar 10 horas seguidas em um único dia causa exaustão e esquecimento. O que aprova no ENEM é a consistência em blocos de 50 minutos com intervalos e revisões ativas.',
    steps: [
      {
        heading: 'Ciclo de Estudos em vez de Grade Fixa',
        detail: 'Alterne matérias de humanas e exatas no mesmo dia para descansar diferentes áreas do cérebro. Por exemplo: 1h de Matemática + 1h de História é muito mais produtivo que 4h seguidas de Física.'
      },
      {
        heading: 'O Caderno de Erros (Ouro Puro)',
        detail: 'Ao fazer simulados e listas de exercícios, anote em um caderno especial exatamente o motivo de cada erro: foi falta de atenção, pegadinha, fórmula esquecida ou lacuna teórica? Revise esse caderno todo sábado.'
      },
      {
        heading: 'Pelo Menos 1 Redação Semanal Cronometrada',
        detail: 'Treine com temas anteriores ou inéditos usando folha modelo do ENEM com cronômetro travado em 70 minutos. A resistência muscular e mental da mão também precisa de treino físico.'
      }
    ],
    enemRuleOfThumb: 'Não meça seu estudo por horas brutas sentado na cadeira, mas por quantidade de questões corrigidas e dúvidas sanadas.'
  }
];
