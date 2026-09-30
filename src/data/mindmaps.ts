import { MindMap } from '../types';

export const MIND_MAPS: MindMap[] = [
  {
    id: 'meio-ambiente',
    title: 'Meio Ambiente & Sustentabilidade',
    theme: 'Meio Ambiente',
    area: 'natureza',
    description: 'Diagrama completo dos 8 eixos ambientais mais recorrentes no ENEM: do desmatamento à legislação ambiental.',
    rootNode: {
      id: 'root-meio-ambiente',
      label: 'Meio Ambiente no ENEM',
      color: '#059669',
      summary: 'Tema interdisciplinar central que cruza Biologia, Química, Geografia e Geopolítica em todas as edições.',
      children: [
        {
          id: 'desmatamento',
          label: 'Desmatamento',
          color: '#10B981',
          summary: 'Perda de cobertura vegetal nativa provocada pela expansão agropecuária, queimadas e extração ilegal de madeira.',
          enemTips: 'O ENEM foca na perda dos "rios voadores" da Amazônia e na erosão/lixiviação do solo descoberto.',
          relatedSubjectSlug: 'meio-ambiente-e-impactos-antropicos'
        },
        {
          id: 'mudancas-climaticas',
          label: 'Mudanças Climáticas',
          color: '#047857',
          summary: 'Intensificação do efeito estufa pela queima de combustíveis fósseis (CO2) e agropecuária intensiva (CH4).',
          enemTips: 'Atenção para o papel do degelo das calotas polares na redução do albedo terrestre e elevação do nível do mar.',
          relatedSubjectSlug: 'meio-ambiente-e-impactos-antropicos'
        },
        {
          id: 'poluicao',
          label: 'Poluição (Água, Ar e Solo)',
          color: '#065F46',
          summary: 'Chuva ácida por óxidos de enxofre e nitrogênio; contaminação de lençóis freáticos por chorume e metais pesados.',
          enemTips: 'Biomagnificação trófica de mercúrio e defensivos agrícolas é campeã de questões.',
          relatedSubjectSlug: 'meio-ambiente-e-impactos-antropicos'
        },
        {
          id: 'recursos-hidricos',
          label: 'Recursos Hídricos',
          color: '#0284C7',
          summary: 'Assoreamento de rios por desmatamento de matas ciliares, eutrofização e crise de abastecimento nas metrópoles.',
          enemTips: 'A mata ciliar funciona como um filtro natural contra o assoreamento dos cursos d’água.',
          relatedSubjectSlug: 'meio-ambiente-e-impactos-antropicos'
        },
        {
          id: 'energias-renovaveis',
          label: 'Matriz Energética Limpa',
          color: '#F59E0B',
          summary: 'Transição energética: solar fotovoltaica, eólica, biomassa e hidrogênio verde versus impactos das hidrelétricas.',
          enemTips: 'Construção de hidrelétricas inunda florestas e decompõe matéria orgânica, gerando metano.',
          relatedSubjectSlug: 'eletrodinamica-circuitos-e-potencia'
        },
        {
          id: 'sustentabilidade',
          label: 'Sustentabilidade & ESG',
          color: '#14B8A6',
          summary: 'Desenvolvimento sustentável: suprir as necessidades do presente sem comprometer as gerações futuras.',
          enemTips: 'Economia circular: substituir o modelo linear "extrair-produzir-descartar" pela reutilização contínua.',
          relatedSubjectSlug: 'meio-ambiente-e-impactos-antropicos'
        },
        {
          id: 'lixo-e-reciclagem',
          label: 'Resíduos Sólidos e Reciclagem',
          color: '#D97706',
          summary: 'Logística reversa, cooperativas de catadores, compostagem de resíduos orgânicos e a crise dos microplásticos.',
          enemTips: 'A Política Nacional de Resíduos Sólidos (PNRS) estabelece responsabilidade compartilhada.',
          relatedSubjectSlug: 'meio-ambiente-e-impactos-antropicos'
        },
        {
          id: 'legislacao-ambiental',
          label: 'Legislação e Acordos Globais',
          color: '#047857',
          summary: 'Código Florestal (reserva legal e APP), Acordo de Paris, Protocolo de Montreal e crédito de carbono.',
          enemTips: 'O Artigo 225 da CF/88 consagra o direito de todos ao meio ambiente ecologicamente equilibrado.',
          relatedSubjectSlug: 'meio-ambiente-e-impactos-antropicos'
        }
      ]
    }
  },
  {
    id: 'revolucao-industrial',
    title: 'Revolução Industrial & Capitalismo',
    theme: 'Revolução Industrial',
    area: 'humanas',
    description: 'Da Inglaterra do século XVIII à automação digital: fases tecnológicas, impactos urbanos e luta operária.',
    rootNode: {
      id: 'root-rev-ind',
      label: 'Revolução Industrial',
      color: '#D97706',
      summary: 'A maior transformação produtiva e social da humanidade desde a invenção da agricultura.',
      children: [
        {
          id: 'fase-1',
          label: '1ª Fase (Século XVIII)',
          color: '#B45309',
          summary: 'Pioneirismo inglês, máquina a vapor, tear mecânico, queima de carvão mineral e indústria têxtil.',
          enemTips: 'Cercamento dos campos (enclosure acts) expulsou camponeses para formar mão de obra barata.',
          relatedSubjectSlug: 'revolucao-industrial'
        },
        {
          id: 'fase-2',
          label: '2ª Fase (Século XIX)',
          color: '#92400E',
          summary: 'Aço, petróleo, energia elétrica, indústria química, ferrovias, imperialismo neocolonial e Fordismo.',
          enemTips: 'A busca por mercados consumidores e matérias-primas motivou a partilha da África na Conferência de Berlim.',
          relatedSubjectSlug: 'revolucao-industrial'
        },
        {
          id: 'fase-3',
          label: '3ª Fase (Século XX)',
          color: '#78350F',
          summary: 'Revolução Técnico-Científica-Informacional, robótica, biotecnologia, microeletrônica e Toyotismo (Just-in-Time).',
          enemTips: 'Toyotismo substitui a produção em massa por produção flexível sob demanda.',
          relatedSubjectSlug: 'revolucao-industrial'
        },
        {
          id: 'trabalho-operario',
          label: 'Movimento Operário & Resistência',
          color: '#DC2626',
          summary: 'Jornadas de até 16h, trabalho infantil e feminino degradante; Ludismo (quebra de máquinas) e Cartismo.',
          enemTips: 'O Cartismo foi fundamental por reivindicar voto secreto e direitos políticos para os trabalhadores.',
          relatedSubjectSlug: 'revolucao-industrial'
        },
        {
          id: 'urbanizacao-caotica',
          label: 'Urbanização & Degradação',
          color: '#EA580C',
          summary: 'Crescimento urbano sem saneamento, cortiços, poluição de rios e proliferação de doenças respiratórias.',
          enemTips: 'A nova percepção do tempo pelo relógio mecânico da fábrica substituiu os ciclos naturais.',
          relatedSubjectSlug: 'urbanizacao-brasileira-e-segregacao'
        },
        {
          id: 'capitalismo-financeiro',
          label: 'Capitalismo Financeiro & Monopólios',
          color: '#4B5563',
          summary: 'Fusão de capital bancário e industrial: criação de trustes, cartéis e holdings econômicos.',
          enemTips: 'Práticas anticompetitivas que controlam preços e eliminam pequenos concorrentes.',
          relatedSubjectSlug: 'revolucao-industrial'
        }
      ]
    }
  },
  {
    id: 'ecologia',
    title: 'Ecologia: Cadeias, Ciclos & Relações',
    theme: 'Ecologia',
    area: 'natureza',
    description: 'O ramo mais cobrado de Ciências da Natureza: fluxo de energia, ciclos da matéria e interações biológicas.',
    rootNode: {
      id: 'root-ecologia',
      label: 'Ecologia ENEM',
      color: '#059669',
      summary: 'Estudo das interações entre seres vivos e seu ambiente físico-químico.',
      children: [
        {
          id: 'cadeias-e-teias',
          label: 'Cadeias e Teias Tróficas',
          color: '#10B981',
          summary: 'Produtores (autótrofos) -> Consumidores primários -> Secundários -> Decompositores.',
          enemTips: 'A energia é sempre unidirecional e decrescente; a matéria é cíclica.',
          relatedSubjectSlug: 'ecologia-cadeias-e-relacoes'
        },
        {
          id: 'piramides-ecologicas',
          label: 'Pirâmides Ecológicas',
          color: '#059669',
          summary: 'Pirâmides de Número, Biomassa e Energia.',
          enemTips: 'Pirâmides de energia NUNCA podem ser invertidas.',
          relatedSubjectSlug: 'ecologia-cadeias-e-relacoes'
        },
        {
          id: 'ciclos-biogeoquimicos',
          label: 'Ciclos Biogeoquímicos',
          color: '#0D9488',
          summary: 'Ciclo do Nitrogênio (fixação, nitrificação e desnitrificação) e Ciclo do Carbono/Oxigênio.',
          enemTips: 'Bactérias do gênero Rhizobium associadas a leguminosas enriquecem o solo com nitrogênio.',
          relatedSubjectSlug: 'ecologia-cadeias-e-relacoes'
        },
        {
          id: 'relacoes-harmonicas',
          label: 'Relações Harmônicas (+/0 ou +/+)',
          color: '#14B8A6',
          summary: 'Mutualismo (obrigatório), Protocooperação (facultativo), Comensalismo, Inquilinismo e Sociedades.',
          enemTips: 'Cupins e protozoários digestores de celulose são exemplo clássico de mutualismo mútuo.',
          relatedSubjectSlug: 'ecologia-cadeias-e-relacoes'
        },
        {
          id: 'relacoes-desarmonicas',
          label: 'Relações Desarmônicas (+/-)',
          color: '#E11D48',
          summary: 'Predatismo, Parasitismo, Amensalismo, Competição intra e interespecífica.',
          enemTips: 'Controle biológico utiliza predadores naturais para conter pragas agrícolas sem agrotóxicos.',
          relatedSubjectSlug: 'ecologia-cadeias-e-relacoes'
        },
        {
          id: 'sucessao-ecologica',
          label: 'Sucessão Ecológica',
          color: '#047857',
          summary: 'Comunidade pioneira (ecese) -> Comunidades intermediárias (seres) -> Comunidade Clímax estável.',
          enemTips: 'No clímax, a produção bruta iguala o consumo respiratório (P/R = 1).',
          relatedSubjectSlug: 'ecologia-cadeias-e-relacoes'
        }
      ]
    }
  },
  {
    id: 'redacao-nota-1000',
    title: 'Redação ENEM: Estrutura & Competências',
    theme: 'Redação (Estrutura e Competências)',
    area: 'redacao',
    description: 'O mapa estratégico dos 4 parágrafos e os critérios das 5 competências avaliadas pelos corretores.',
    rootNode: {
      id: 'root-redacao',
      label: 'Redação Nota 1000',
      color: '#E11D48',
      summary: 'Texto dissertativo-argumentativo rigoroso de até 30 linhas com proposta de intervenção social.',
      children: [
        {
          id: 'introducao',
          label: 'Introdução (6–7 linhas)',
          color: '#F43F5E',
          summary: 'Contextualização com repertório inicial + Apresentação da Frase Temática + Tese com 2 argumentos (D1 e D2).',
          enemTips: 'Nunca deixe de usar conectivos de adversidade para contrapor o repertório à realidade brasileira.',
          relatedSubjectSlug: 'introducao-perfeita-redacao'
        },
        {
          id: 'desenvolvimento-1',
          label: 'Desenvolvimento 1 (Causa / Raiz)',
          color: '#E11D48',
          summary: 'Tópico Frasal + Repertório Legitimado + Argumentação Crítica + Desfecho.',
          enemTips: 'Demonstre a inoperância de políticas públicas ou raiz histórica do problema.',
          relatedSubjectSlug: 'desenvolvimento-1-raiz-historica'
        },
        {
          id: 'desenvolvimento-2',
          label: 'Desenvolvimento 2 (Impacto / Cultura)',
          color: '#BE123C',
          summary: 'Conectivo de adição + Tópico Frasal + Repertório sociológico + Análise do estigma social.',
          enemTips: 'Trabalhe o lado sociológico (Bauman, indiferença social, estigmas estruturais).',
          relatedSubjectSlug: 'desenvolvimento-2-impacto-social'
        },
        {
          id: 'proposta-intervencao',
          label: 'Proposta de Intervenção (5 Elementos)',
          color: '#9F1239',
          summary: 'Agente + Ação + Modo/Meio + Efeito + Detalhamento de um dos elementos.',
          enemTips: 'Cada um dos 5 elementos vale rigorosamente 40 pontos na Competência 5.',
          relatedSubjectSlug: 'competencia-5-proposta-de-intervencao'
        },
        {
          id: 'competencias-chave',
          label: 'As 5 Competências Avaliadas',
          color: '#FB7185',
          summary: 'C1: Norma culta | C2: Tema e repertório | C3: Projeto de texto | C4: Coesão | C5: Proposta social.',
          enemTips: 'Cada competência pontua de 0 a 200 pontos em degraus de 40 pontos.',
          relatedSubjectSlug: 'estrutura-dissertativo-argumentativa'
        }
      ]
    }
  },
  {
    id: 'globalizacao',
    title: 'Globalização & Redes Mundiais',
    theme: 'Globalização',
    area: 'humanas',
    description: 'Fluxos econômicos, divisão internacional do trabalho, transnacionais e contradições socioculturais.',
    rootNode: {
      id: 'root-globalizacao',
      label: 'Globalização no ENEM',
      color: '#D97706',
      summary: 'Integração econômica, cultural e tecnológica mundial acelerada no pós-Guerra Fria.',
      children: [
        {
          id: 'meio-tecnico',
          label: 'Meio Técnico-Científico-Informacional',
          color: '#B45309',
          summary: 'Conceito de Milton Santos: união de ciência e tecnologia gerando circulação veloz de capitais.',
          enemTips: 'A geografia não é mais apenas espaço físico, mas fluxo constante de dados e dinheiro.',
          relatedSubjectSlug: 'globalizacao-e-nova-ordem'
        },
        {
          id: 'divisao-trabalho',
          label: 'Nova DIT (Divisão do Trabalho)',
          color: '#92400E',
          summary: 'Países centrais detêm patentes e inovação; países periféricos fornecem commodities e mão de obra barata.',
          enemTips: 'Desconcentração espacial das fábricas em busca de incentivos fiscais e salários baixos.',
          relatedSubjectSlug: 'globalizacao-e-nova-ordem'
        },
        {
          id: 'transnacionais',
          label: 'Empresas Transnacionais',
          color: '#78350F',
          summary: 'Corporações globais que faturam mais que o PIB de muitos países emergentes.',
          enemTips: 'Desterritorialização da produção: peças produzidas em 5 países diferentes e montadas em um sexto.',
          relatedSubjectSlug: 'globalizacao-e-nova-ordem'
        },
        {
          id: 'cultura-e-crise',
          label: 'Homogeneização vs Resistência Cultural',
          color: '#D97706',
          summary: 'Americanização dos costumes (fast food, cinema) versus fortalecimento de identidades locais e xenofobia.',
          enemTips: 'A "aldeia global" convive com o fechamento violento de fronteiras contra refugiados.',
          relatedSubjectSlug: 'globalizacao-e-nova-ordem'
        },
        {
          id: 'exclusao-digital',
          label: 'Exclusão Digital e Assimetria',
          color: '#B45309',
          summary: 'Acesso desigual às tecnologias de informação intensificando o abismo social.',
          enemTips: 'Milton Santos: a globalização como perversidade que produz consumidores, não cidadãos.',
          relatedSubjectSlug: 'globalizacao-e-nova-ordem'
        }
      ]
    }
  },
  {
    id: 'funcoes-da-linguagem',
    title: 'Funções da Linguagem & Comunicação',
    theme: 'Funções da Linguagem',
    area: 'linguagens',
    description: 'Os 6 objetivos comunicativos de Roman Jakobson aplicados a charges, anúncios, poemas e notícias do ENEM.',
    rootNode: {
      id: 'root-funcoes',
      label: 'Funções da Linguagem',
      color: '#6366F1',
      summary: 'Cada função da linguagem privilegia um dos elementos constitutivos da comunicação humana.',
      children: [
        {
          id: 'funcao-conativa',
          label: 'Conativa / Apelativa (Receptor)',
          color: '#4F46E5',
          summary: 'Foco no receptor. Verbos no imperativo, pronomes de 2ª pessoa ("você"), persuasão e apelo.',
          enemTips: 'Líder em campanhas publicitárias de utilidade pública (vacinação, trânsito, eleições).',
          relatedSubjectSlug: 'funcoes-da-linguagem'
        },
        {
          id: 'funcao-emotiva',
          label: 'Emotiva / Expressiva (Emissor)',
          color: '#4338CA',
          summary: 'Foco nos sentimentos do emissor. 1ª pessoa, exclamações, opiniões subjetivas e desabafos.',
          enemTips: 'Muito presente em diários íntimos, cartas pessoais, memórias e crônicas subjetivas.',
          relatedSubjectSlug: 'funcoes-da-linguagem'
        },
        {
          id: 'funcao-referencial',
          label: 'Referencial / Denotativa (Contexto)',
          color: '#3730A3',
          summary: 'Foco na informação objetiva e no contexto real. 3ª pessoa, clareza, exatidão sem julgamento.',
          enemTips: 'Presente em reportagens investigativas, verbetes científicos e manuais técnicos.',
          relatedSubjectSlug: 'funcoes-da-linguagem'
        },
        {
          id: 'funcao-metalinguistica',
          label: 'Metalinguística (Código)',
          color: '#6366F1',
          summary: 'O código explica a si próprio: dicionário definindo palavras, poema sobre escrever poesia, filme sobre cinema.',
          enemTips: 'Muito cobrada em poemas modernistas (Drummond) refletindo sobre o fazer poético.',
          relatedSubjectSlug: 'funcoes-da-linguagem'
        },
        {
          id: 'funcao-fatica',
          label: 'Fática (Canal)',
          color: '#818CF8',
          summary: 'Foco em testar ou manter o canal de comunicação aberto: "Alô?", "Entendeu?", "Veja bem", saudações.',
          enemTips: 'Aparece em diálogos informais, telefonemas e aberturas de programas de auditório.',
          relatedSubjectSlug: 'funcoes-da-linguagem'
        },
        {
          id: 'funcao-poetica',
          label: 'Poética (Mensagem)',
          color: '#A5B4FC',
          summary: 'Foco na elaboração estética da mensagem: ritmo, rimas, aliterações, metáforas e sonoridade.',
          enemTips: 'Não confunda com emotiva: a poética privilegia a beleza e o arranjo das palavras no texto.',
          relatedSubjectSlug: 'funcoes-da-linguagem'
        }
      ]
    }
  }
];

export const getMindMapById = (id: string): MindMap | undefined => {
  return MIND_MAPS.find((m) => m.id === id);
};
