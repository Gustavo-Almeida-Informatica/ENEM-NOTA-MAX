import { Citation } from '../../types';

export const DADOS_HISTORIA_CITATIONS: Citation[] = [
  // --- DADOS E INSTITUIÇÕES OFICIAIS ---
  {
    id: 'ibge-saneamento-basico-trata-brasil',
    quote: 'No Brasil, mais da metade dos municípios ainda convive com graves carências de coleta ou tratamento regular de esgoto domiciliar.',
    authorOrSource: 'IBGE / Instituto Trata Brasil',
    roleOrWork: 'Censo Demográfico e Painel do Saneamento Básico',
    category: 'dados',
    thematicAxes: ['Saúde', 'Cidadania', 'Meio Ambiente', 'Desigualdade'],
    howToUse: 'Use para justificar por que o investimento preventivo em saneamento é prioritário para desafogar o sistema hospitalar do SUS.',
    contextExample: '"Conforme dados compilados pelo Instituto Trata Brasil, mais da metade das cidades brasileiras não dispõem de tratamento de esgoto, multiplicando infecções parasitárias evitáveis."'
  },
  {
    id: 'ibge-analfabetismo-regional',
    quote: 'As taxas de analfabetismo e de analfabetismo funcional permanecem mais que o dobro nas regiões Norte e Nordeste em comparação com o Sul e Sudeste.',
    authorOrSource: 'IBGE (Instituto Brasileiro de Geografia e Estatística)',
    roleOrWork: 'Pesquisa Nacional por Amostra de Domicílios (PNAD Contínua Educação)',
    category: 'dados',
    thematicAxes: ['Educação', 'Desigualdade', 'Cidadania'],
    howToUse: 'Comprove as disparidades regionais históricas e a concentração da falta de instrução entre os estratos socioeconômicos mais vulneráveis.',
    contextExample: '"Indicadores da PNAD Contínua demonstram que as assimetrias regionais perpetuam índices alarmantes de analfabetismo no Nordeste, aprofundando o ciclo da pobreza."'
  },
  {
    id: 'ibge-trabalho-domestico-nao-remunerado',
    quote: 'As mulheres dedicam quase o dobro de horas semanais aos afazeres domésticos e cuidados de pessoas em comparação aos homens.',
    authorOrSource: 'IBGE',
    roleOrWork: 'Estatísticas de Gênero e Uso do Tempo',
    category: 'dados',
    thematicAxes: ['Trabalho', 'Desigualdade', 'Saúde'],
    howToUse: 'Fundamental para debater sobrecarga feminina, maternidade solitária e desvantagens na concorrência por vagas no mercado formal.',
    contextExample: '"O levantamento do IBGE sobre o uso do tempo expõe como a dupla jornada não remunerada sobrecarrega as mulheres, tolhendo oportunidades de qualificação profissional."'
  },
  {
    id: 'oms-ansiedade-brasil',
    quote: 'O Brasil ostenta uma das taxas mais altas de prevalência de transtornos de ansiedade do mundo, afetando considerável parcela da juventude.',
    authorOrSource: 'Organização Mundial da Saúde (OMS)',
    roleOrWork: 'Relatório Global de Saúde Mental e Bem-Estar',
    category: 'dados',
    thematicAxes: ['Saúde', 'Tecnologia', 'Trabalho'],
    howToUse: 'Aborde o esgotamento precoce de estudantes no vestibular, o uso desmedido de telas digitais e a necessidade de psicólogos nas escolas públicas.',
    contextExample: '"Segundo alertas emitidos pela OMS, a prevalência epidêmica de ansiedade no Brasil exige a consolidação de políticas preventivas de apoio psicológico nas escolas."'
  },
  {
    id: 'oms-obesidade-ultraprocessados',
    quote: 'O consumo crescente de alimentos ultraprocessados ricos em sódio e açúcares já é responsável pela maioria das doenças crônicas evitáveis nas Américas.',
    authorOrSource: 'Organização Mundial da Saúde / OPAS',
    roleOrWork: 'Plano de Ação para Prevenção da Obesidade e Doenças Não Transmissíveis',
    category: 'dados',
    thematicAxes: ['Saúde', 'Educação', 'Cidadania'],
    howToUse: 'Discuta a publicidade infantil abusiva de fast food, o encarecimento de alimentos frescos e a epidemia de diabetes tipo 2.',
    contextExample: '"Alertas da OMS atestam que a invasão de ultraprocessados na merenda infantil catalisa enfermidades cardiovasculares precoces em famílias vulneráveis."'
  },
  {
    id: 'fao-onu-inseguranca-alimentar',
    quote: 'Em escala global e latino-americana, dezenas de milhões de cidadãos sofrem com a insegurança alimentar moderada ou grave, apesar de safras agrícolas recordes.',
    authorOrSource: 'FAO / ONU (Organização das Nações Unidas para a Alimentação)',
    roleOrWork: 'Relatório sobre o Estado da Segurança Alimentar e Nutrição no Mundo (SOFI)',
    category: 'dados',
    thematicAxes: ['Desigualdade', 'Meio Ambiente', 'Saúde'],
    howToUse: 'Contraste o poderio exportador do agronegócio com o paradoxo de famílias periféricas sem poder de compra para alimentos básicos.',
    contextExample: '"O relatório SOFI da ONU evidencia a contradição brasileira: enquanto o país bate recordes de safra de grãos, milhões de cidadãos convivem com a escassez alimentar."'
  },
  {
    id: 'onu-mulheres-violencia-genero',
    quote: 'A grande maioria dos episódios de violência física ou feminicídio contra a mulher ocorre dentro do próprio domicílio, cometida por parceiros ou ex-companheiros.',
    authorOrSource: 'ONU Mulheres',
    roleOrWork: 'Relatório de Monitoramento dos Objetivos de Desenvolvimento Sustentável (ODS 5)',
    category: 'dados',
    thematicAxes: ['Violência', 'Cidadania', 'Desigualdade'],
    howToUse: 'Use para enfatizar que a residência muitas vezes é o espaço mais inseguro para mulheres em situação de vulnerabilidade conjugal.',
    contextExample: '"Dados da ONU Mulheres revelam que o lar se converte no principal cenário do feminicídio, demandando redes municipais integradas de acolhimento e denúncia anônima."'
  },
  {
    id: 'unesco-defasagem-leitura',
    quote: 'A perda de meses letivos presenciais gerou retrocessos históricos na alfabetização e na fluência leitora de crianças das camadas populares.',
    authorOrSource: 'UNESCO',
    roleOrWork: 'Relatório de Monitoramento Global da Educação',
    category: 'dados',
    thematicAxes: ['Educação', 'Tecnologia', 'Desigualdade'],
    howToUse: 'Aborde as consequências do fechamento das escolas e a falta de internet rápida para estudantes de áreas rurais e favelas.',
    contextExample: '"O diagnóstico educacional da UNESCO acende o alarme para o risco de uma geração inteira de jovens prejudicados por déficits estruturais de alfabetização."'
  },
  {
    id: 'ipea-atlas-da-violencia-juventude-negra',
    quote: 'Mais de 70% das vítimas de homicídio no Brasil são jovens negros e pardos residentes nas periferias urbanas.',
    authorOrSource: 'IPEA / Fórum Brasileiro de Segurança Pública',
    roleOrWork: 'Atlas da Violência',
    category: 'dados',
    thematicAxes: ['Violência', 'Desigualdade', 'Cidadania'],
    howToUse: 'Repertório incontestável para temas de segurança pública, violência urbana, letalidade juvenil e racismo institucional.',
    contextExample: '"O Atlas da Violência divulgado pelo IPEA desvela a cor da violência letal no Brasil: a esmagadora maioria dos assassinatos ceifa jovens negros das periferias."'
  },
  {
    id: 'cetic-br-exclusao-digital',
    quote: 'Mais de um terço dos lares das classes D e E no Brasil acessam a internet exclusivamente pelo celular, frequentemente sem franquia de dados para estudos.',
    authorOrSource: 'Cetic.br / Comitê Gestor da Internet no Brasil',
    roleOrWork: 'Pesquisa TIC Domicílios',
    category: 'dados',
    thematicAxes: ['Tecnologia', 'Educação', 'Cidadania'],
    howToUse: 'Derrube o mito de que "todos estão conectados igualmente": o pacote de dados restrito limita o acesso a plataformas de pesquisa e bibliotecas online.',
    contextExample: '"Consoante demonstra o Cetic.br, o acesso precário via celular e sem banda larga fixa restringe a inclusão digital e o aprendizado autônomo dos mais humildes."'
  },

  // --- HISTÓRIA E FATOS HISTÓRICOS ---
  {
    id: 'historia-lei-aurea-1888-sem-reforma',
    quote: 'A abolição formal da escravidão em 1888 ocorreu sem a concessão de terras, indenizações ou programas de educação, empurrando a população negra para morros e cortiços.',
    authorOrSource: 'Abolição Incompleta de 1888',
    roleOrWork: 'Fato Histórico da Transição Imperial-Republicana',
    category: 'historia',
    thematicAxes: ['Desigualdade', 'Cidadania', 'Trabalho', 'Cultura'],
    howToUse: 'Repertório perfeito para introduzir temas sobre racismo estrutural, ocupações irregulares de encostas e subemprego.',
    contextExample: '"A assinatura da Lei Áurea em 1888 consagrou a liberdade jurídica, mas a ausência de amparo estatal gerou a marginalização territorial que originou as favelas."'
  },
  {
    id: 'historia-revolta-da-vacina-1904',
    quote: 'A Revolta da Vacina de 1904 na capital federal evidenciou que medidas sanitárias autoritárias, desprovidas de diálogo com a população, geram revolta popular.',
    authorOrSource: 'Revolta da Vacina (Rio de Janeiro, 1904)',
    roleOrWork: 'Episódio Histórico da República Velha (Oswaldo Cruz e Pereira Passos)',
    category: 'historia',
    thematicAxes: ['Saúde', 'Cidadania', 'Educação'],
    howToUse: 'Excelente para temas sobre hesitação vacinal, desinformação em saúde coletiva e a necessidade de campanhas educativas transparentes.',
    contextExample: '"O levante popular de 1904 contra a vacinação compulsória ensina que a imposição estatal sem esclarecimento pedagógico fomenta a desconfiança nas ciências médicas."'
  },
  {
    id: 'historia-criacao-do-sus-1988',
    quote: 'Antes da Constituição de 1988, apenas trabalhadores com carteira assinada vinculados ao INPS tinham direito à saúde pública; os demais eram considerados indigentes sanitários.',
    authorOrSource: 'Movimento da Reforma Sanitária (1986–1988)',
    roleOrWork: 'Marco Histórico de Criação do Sistema Único de Saúde',
    category: 'historia',
    thematicAxes: ['Saúde', 'Cidadania', 'Desigualdade'],
    howToUse: 'Use para valorizar a conquista democrática da universalidade do SUS e combater discursos privatistas de saúde.',
    contextExample: '"A criação do SUS na Carta de 1988 superou o tempo em que cidadãos sem carteira de trabalho eram rotulados como indigentes, consolidando a saúde como direito universal."'
  },
  {
    id: 'historia-revolucao-verde-agrotoxicos',
    quote: 'A Revolução Verde a partir da década de 1960 multiplicou o rendimento das colheitas mundiais, mas consolidou o latifúndio monocultor e o uso intensivo de defensivos químicos.',
    authorOrSource: 'Revolução Verde (Década de 1960)',
    roleOrWork: 'Transformação Tecnológica da Agropecuária Global',
    category: 'historia',
    thematicAxes: ['Meio Ambiente', 'Saúde', 'Trabalho'],
    howToUse: 'Aborde contaminação de águas por agrotóxicos, perda de sementes crioulas e substituição da agricultura familiar por monoculturas de exportação.',
    contextExample: '"O modelo agrícola herdado da Revolução Verde privilegiou a produtividade de grãos à custa da contaminação do solo e da expulsão de pequenos agricultores para as cidades."'
  },
  {
    id: 'historia-conferencia-rio-92',
    quote: 'A Conferência Rio-92 consolidou perante a comunidade internacional o conceito de desenvolvimento sustentável, articulando preservação ecológica e erradicação da pobreza.',
    authorOrSource: 'Eco-92 / Cúpula da Terra (Rio de Janeiro, 1992)',
    roleOrWork: 'Marco Diplomático Global para o Meio Ambiente',
    category: 'historia',
    thematicAxes: ['Meio Ambiente', 'Cidadania'],
    howToUse: 'Perfeito para temas sobre acordos climáticos, responsabilidade intergeracional e proteção dos biomas brasileiros.',
    contextExample: '"Desde a Cúpula da Terra na Rio-92, o mundo reconhece que o crescimento econômico desatrelado da proteção florestal constitui um modelo ecologicamente inviável."'
  },
  {
    id: 'historia-diretas-ja-1984',
    quote: 'O comício das Diretas Já reuniu milhões de brasileiros nas praças públicas, demonstrando a força da sociedade civil unida pelo direito sagrado ao voto direto.',
    authorOrSource: 'Campanha das Diretas Já (1984)',
    roleOrWork: 'Mobilização Popular pela Redemocratização do Brasil',
    category: 'historia',
    thematicAxes: ['Cidadania', 'Cultura'],
    howToUse: 'Use para incentivar a participação cívica da juventude e a fiscalização ativa das instituições democráticas.',
    contextExample: '"O clamor cívico das Diretas Já em 1984 comprova que a soberania popular floresce quando a sociedade se mobiliza ativamente na defesa de garantias constitucionais."'
  },
  {
    id: 'historia-revolucao-industrial-urbanizacao',
    quote: 'A introdução da máquina a vapor no século XVIII não apenas acelerou a produção têxtil, mas provocou um êxodo rural desordenado, inaugurando a rotina febril das metrópoles.',
    authorOrSource: '1ª Revolução Industrial (Inglaterra, Século XVIII)',
    roleOrWork: 'Marco Histórico da Modernidade Produtiva',
    category: 'historia',
    thematicAxes: ['Trabalho', 'Cidadania', 'Meio Ambiente'],
    howToUse: 'Relacione com precarização moderna, uberização do trabalho, jornada excessiva e poluição de rios urbanos.',
    contextExample: '"A concentração desregulada de trabalhadores em cortiços na Revolução Industrial antecipou os dilemas habitacionais que hoje afligem as grandes capitais brasileiras."'
  },
  {
    id: 'historia-era-vargas-clt-1943',
    quote: 'A sanção da CLT em 1943 representou uma conquista civilizatória para a classe operária, assegurando férias remuneradas, jornada de 8 horas e salário mínimo.',
    authorOrSource: 'Governo Vargas / Criação da CLT (1943)',
    roleOrWork: 'Marco da Cidadania Trabalhista no Brasil',
    category: 'historia',
    thematicAxes: ['Trabalho', 'Cidadania'],
    howToUse: 'Use para discutir a perda de direitos na terceirização irrestrita, contratos intermitentes e o trabalho sem garantias por aplicativos.',
    contextExample: '"A proliferação de trabalhadores informais sem proteção previdenciária desmonta o arcabouço protetivo construído desde a sanção da CLT em 1943."'
  },
  {
    id: 'historia-queda-muro-berlim-1989',
    quote: 'A queda do Muro de Berlim em 1989 decretou o fim da Guerra Fria e abriu caminho para a expansão acelerada dos fluxos transnacionais da globalização.',
    authorOrSource: 'Queda do Muro de Berlim (1989)',
    roleOrWork: 'Fim da Ordem Bipolar e Início da Globalização Contemporânea',
    category: 'historia',
    thematicAxes: ['Cidadania', 'Cultura', 'Tecnologia'],
    howToUse: 'Aborde o surgimento da sociedade em rede, integração mundial de mercados e o desafio dos novos nacionalismos extremistas.',
    contextExample: '"O colapso da barreira ideológica de Berlim prenunciou a era das fronteiras abertas ao capital, mas que persistem herméticas contra refugiados e migrantes."'
  },
  {
    id: 'historia-crise-de-1929-colapso',
    quote: 'O crash da Bolsa de Nova York em 1929 demonstrou a falência do liberalismo econômico desregulado, ensejando a doutrina do Estado de bem-estar social.',
    authorOrSource: 'Grande Depressão (1929)',
    roleOrWork: 'Crise Sistêmica do Capitalismo Liberal',
    category: 'historia',
    thematicAxes: ['Trabalho', 'Cidadania', 'Desigualdade'],
    howToUse: 'Use para defender o papel do Estado regulador em áreas sensíveis como saúde, previdência e proteção contra monopólios.',
    contextExample: '"A derrocada econômica de 1929 comprovou que o livre mercado sem freios regulatórios aprofunda crises sociais, tornando imprescindível o socorro estatal."'
  }
];
