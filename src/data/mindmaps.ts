import { MindMap } from '../types';

export const MIND_MAPS: MindMap[] = [
  // 1. MEIO AMBIENTE
  {
    id: 'meio-ambiente',
    title: 'Meio Ambiente & Sustentabilidade',
    theme: 'Meio ambiente',
    area: 'natureza',
    description: 'Nó central à esquerda com ramificações em 3 níveis: poluição, mudanças climáticas, recursos hídricos e legislação.',
    rootNode: {
      id: 'root-meio-ambiente',
      label: 'Meio Ambiente no ENEM',
      summary: 'Tema interdisciplinar número um do exame, unindo biologia, química ambiental, geografia física e geopolítica.',
      children: [
        {
          id: 'ma-poluicao',
          label: 'Poluição & Resíduos',
          summary: 'Contaminação de ecossistemas hídricos, atmosféricos e terrestres por atividades industriais e urbanas.',
          enemTips: 'Biomagnificação de mercúrio e eutrofização são os processos mais cobrados.',
          children: [
            {
              id: 'ma-lixo-eletronico',
              label: 'Lixo Eletrônico & Metais',
              summary: 'Descarte inadequado de baterias e placas com chumbo, cádmio e mercúrio que infiltram lençóis freáticos.',
              enemTips: 'Associação com a Lei 12.305/2010 e responsabilidade compartilhada.',
              videoQuery: 'Lixo eletronico e impacto ambiental ENEM',
              children: [
                {
                  id: 'ma-descarte-correto',
                  label: 'Logística Reversa',
                  summary: 'Obrigatoriedade de fabricantes e revendedores recolherem pilhas e eletrônicos pós-consumo.'
                },
                {
                  id: 'ma-lei-12305',
                  label: 'Lei 12.305/2010 (PNRS)',
                  summary: 'Política Nacional de Resíduos Sólidos que extingue lixões e formaliza cooperativas de catadores.'
                }
              ]
            },
            {
              id: 'ma-eutrofizacao',
              label: 'Eutrofização das Águas',
              summary: 'Excesso de esgoto e fertilizantes gerando proliferação de algas e asfixia da fauna aquática.',
              enemTips: 'As bactérias aeróbicas decompõem a biomassa morta e esgotam o O2 dissolvido.',
              videoQuery: 'Eutrofizacao biologia ENEM',
              children: [
                {
                  id: 'ma-algas-o2',
                  label: 'Hipóxia e Morte de Peixes',
                  summary: 'Queda do oxigênio dissolvido provocada pela digestão bacteriana anaeróbica.'
                }
              ]
            }
          ]
        },
        {
          id: 'ma-clima',
          label: 'Mudanças Climáticas',
          summary: 'Elevação da temperatura média global causada pela emissão acelerada de gases estufa.',
          children: [
            {
              id: 'ma-gases-estufa',
              label: 'Gases do Efeito Estufa',
              summary: 'Retenção de radiação infravermelha por CO2 (combustíveis fósseis) e CH4 (pecuária e lixões).',
              enemTips: 'O efeito estufa é um fenômeno natural benéfico; o perigo é a intensificação antrópica.',
              videoQuery: 'Efeito estufa e aquecimento global ENEM',
              children: [
                {
                  id: 'ma-queima-combustiveis',
                  label: 'Matriz Fóssil de Transporte',
                  summary: 'Dependência rodoviária de derivados de petróleo e necessidade de biocombustíveis.'
                },
                {
                  id: 'ma-pecuaria-metano',
                  label: 'Metano na Agropecuária',
                  summary: 'Fermentação entérica de ruminantes com potencial de aquecimento 28 vezes maior que o CO2.'
                }
              ]
            },
            {
              id: 'ma-albedo-oceanos',
              label: 'Acidificação dos Oceanos',
              summary: 'Dissolução de excesso de CO2 na água marinha formando ácido carbônico que dissolve corais.',
              children: [
                {
                  id: 'ma-branqueamento-corais',
                  label: 'Branqueamento de Corais',
                  summary: 'Expulsão das zooxantelas simbiontes por aquecimento da água, destruindo berçários marinhos.'
                }
              ]
            }
          ]
        },
        {
          id: 'ma-desmatamento',
          label: 'Desmatamento & Biomas',
          summary: 'Conversão de florestas nativas em pastagens e lavouras no Cerrado e na Amazônia.',
          children: [
            {
              id: 'ma-rios-voadores',
              label: 'Rios Voadores da Amazônia',
              summary: 'Evapotranspiração colossal de árvores amazônicas que transporta umidade para o Sudeste e Centro-Sul.',
              enemTips: 'O desmatamento amazônico reduz o regime de chuvas que abastece represas no Sudeste.',
              videoQuery: 'Rios voadores desmatamento amazonia ENEM',
              children: [
                {
                  id: 'ma-crise-hidrica-sudeste',
                  label: 'Secas no Centro-Sul',
                  summary: 'Quebra do equilíbrio hidrológico e queda no nível de reservatórios hidrelétricos.'
                }
              ]
            },
            {
              id: 'ma-arco-desmatamento',
              label: 'Avanço sobre o Cerrado',
              summary: 'O Cerrado como "berço das águas" de 8 bacias brasileiras, ameaçado pela monocultura da soja.',
              children: [
                {
                  id: 'ma-mata-ciliar',
                  label: 'Assoreamento de Nascentes',
                  summary: 'Destruição da vegetação ripária provocando erosão e soterramento do leito dos rios.'
                }
              ]
            }
          ]
        },
        {
          id: 'ma-energia-sustentavel',
          label: 'Transição Energética',
          summary: 'Substituição gradual de combustíveis fósseis por fontes limpas e renováveis.',
          children: [
            {
              id: 'ma-matriz-brasileira',
              label: 'Eólica & Solar Fotovoltaica',
              summary: 'Expansão veloz no Nordeste brasileiro com excelente irradiação solar e ventos constantes.',
              videoQuery: 'Matriz energetica brasileira fontes renovaveis ENEM',
              children: [
                {
                  id: 'ma-impacto-hidreletricas',
                  label: 'Dilema das Grandes Hidrelétricas',
                  summary: 'Inundação de florestas tropicais que apodrecem e geram metano, além do impacto sobre povos indígenas.'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // 2. REVOLUÇÃO INDUSTRIAL
  {
    id: 'revolucao-industrial',
    title: 'Revolução Industrial & Capitalismo',
    theme: 'Revolução Industrial',
    area: 'humanas',
    description: 'Das máquinas a vapor do século XVIII à automação e precarização contemporânea.',
    rootNode: {
      id: 'root-rev-ind',
      label: 'Revolução Industrial',
      summary: 'A mais profunda mutação produtiva, territorial e humana desde a Revolução Neolítica.',
      children: [
        {
          id: 'ri-fase1',
          label: '1ª Fase (Século XVIII)',
          summary: 'Pioneirismo inglês alicerçado na máquina a vapor, tear mecânico e queima de carvão mineral.',
          children: [
            {
              id: 'ri-fatores-ingleses',
              label: 'Pioneirismo Britânico',
              summary: 'Acúmulo de capital colonial, reservas abundantes de ferro e carvão e Marinha hegemônica.',
              enemTips: 'Os cercamentos de terras (enclosure acts) formaram o exército de mão de obra fabril barata.',
              videoQuery: 'Pioneirismo ingles Revolucao Industrial ENEM',
              children: [
                {
                  id: 'ri-cercamentos',
                  label: 'Lei de Cercamentos',
                  summary: 'Privatização de terras comunais que expulsou camponeses para as periferias urbanas.'
                }
              ]
            },
            {
              id: 'ri-tempo-relogio',
              label: 'Tempo do Relógio Fabril',
              summary: 'Ruptura com o ritmo natural das colheitas e imposição de disciplina mecânica rigorosa.',
              children: [
                {
                  id: 'ri-alienacao-trabalho',
                  label: 'Alienação da Produção',
                  summary: 'O artesão perde o domínio do processo completo e vira apêndice especializado da máquina.'
                }
              ]
            }
          ]
        },
        {
          id: 'ri-fase2',
          label: '2ª Fase (Século XIX)',
          summary: 'Aço, petróleo, eletricidade, motor a combustão e expansão imperialista neocolonial.',
          children: [
            {
              id: 'ri-fordismo-taylorismo',
              label: 'Fordismo & Linha de Montagem',
              summary: 'Produção em massa padronizada com esteira rolante e cronometragem de movimentos repetitivos.',
              enemTips: 'Crítica clássica em "Tempos Modernos" de Charles Chaplin.',
              videoQuery: 'Modelos produtivos Fordismo Taylorismo ENEM',
              children: [
                {
                  id: 'ri-consumo-massa',
                  label: 'Sociedade de Consumo',
                  summary: 'Pagamento de salários capazes de transformar o próprio operário em comprador do produto.'
                }
              ]
            },
            {
              id: 'ri-neocolonialismo',
              label: 'Imperialismo na África e Ásia',
              summary: 'Busca violenta por fontes de matérias-primas e mercados cativos para escoar excedentes industriais.',
              children: [
                {
                  id: 'ri-partilha-africa',
                  label: 'Conferência de Berlim (1885)',
                  summary: 'Divisão artificial do continente africano por potências europeias gerando guerras étnicas duradouras.'
                }
              ]
            }
          ]
        },
        {
          id: 'ri-trabalho-luta',
          label: 'Movimento Operário',
          summary: 'Reação da classe trabalhadora contra jornadas de 16 horas e exploração de mulheres e crianças.',
          children: [
            {
              id: 'ri-ludismo-cartismo',
              label: 'Ludismo vs Cartismo',
              summary: 'Da revolta impulsiva de destruição de máquinas à mobilização política organizada por sufrágio universal.',
              enemTips: 'O Cartismo foi pioneiro ao exigir voto secreto e assento no parlamento britânico.',
              videoQuery: 'Movimento operario Ludismo e Cartismo ENEM',
              children: [
                {
                  id: 'ri-trade-unions',
                  label: 'Surgimento dos Sindicatos',
                  summary: 'Conquista de redução gradual da jornada e proibição do trabalho fabril de crianças pequenas.'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // 3. ECOLOGIA
  {
    id: 'ecologia',
    title: 'Ecologia: Cadeias, Ciclos & Relações',
    theme: 'Ecologia',
    area: 'natureza',
    description: 'Fluxo unidirecional de energia, ciclos da matéria e dinâmica de populações no ENEM.',
    rootNode: {
      id: 'root-ecologia',
      label: 'Ecologia ENEM',
      summary: 'Estudo das interações bióticas e abióticas que sustentam o equilíbrio da biosfera.',
      children: [
        {
          id: 'eco-cadeias',
          label: 'Fluxo de Energia & Teias',
          summary: 'A energia solar captada por produtores decresce progressivamente ao longo dos níveis tróficos.',
          children: [
            {
              id: 'eco-piramides',
              label: 'Pirâmides Ecológicas',
              summary: 'Pirâmides de números, biomassa e energia representam graficamente o ecossistema.',
              enemTips: 'Pirâmides de energia NUNCA podem ser invertidas.',
              videoQuery: 'Piramide de energia e biomassa biologia ENEM',
              children: [
                {
                  id: 'eco-regra-10',
                  label: 'Regra dos 10%',
                  summary: 'Cerca de 90% da energia é dissipada em calor e processos metabólicos a cada degrau trófico.'
                },
                {
                  id: 'eco-biomassa-invertida',
                  label: 'Biomassa Invertida no Fitoplâncton',
                  summary: 'Alta taxa de reprodução de algas marinhas sustentando temporariamente biomassa maior de zooplâncton.'
                }
              ]
            },
            {
              id: 'eco-bioacumulacao',
              label: 'Magnificação Trófica',
              summary: 'Substâncias não biodegradáveis (mercúrio, agrotóxicos) acumulando em concentração máxima no topo da cadeia.',
              children: [
                {
                  id: 'eco-predador-topo',
                  label: 'Dano Máximo no Topo',
                  summary: 'O ser humano ou a águia consomem milhares de presas contaminadas, retendo a carga tóxica nos tecidos.'
                }
              ]
            }
          ]
        },
        {
          id: 'eco-ciclos',
          label: 'Ciclos Biogeoquímicos',
          summary: 'Circulação perpétua de elementos químicos essenciais entre organismos e a crosta terrestre.',
          children: [
            {
              id: 'eco-nitrogenio',
              label: 'Ciclo do Nitrogênio',
              summary: 'Transformação do N2 atmosférico inerte em amônia, nitrito e nitrato assimilável por vegetais.',
              enemTips: 'Rhizobium em leguminosas permite a rotação de culturas sem adubos industriais.',
              videoQuery: 'Ciclo do nitrogenio biologia ENEM',
              children: [
                {
                  id: 'eco-etapas-nitrogênio',
                  label: 'Nitrosação & Nitratação',
                  summary: 'Bactérias Nitrosomonas e Nitrobacter oxidando amônia em nitrato fértil para as plantas.'
                },
                {
                  id: 'eco-adubacao-verde',
                  label: 'Adubação Verde',
                  summary: 'Plantio intercalado de soja ou feijão para revitalizar o solo com nitrogênio natural.'
                }
              ]
            }
          ]
        },
        {
          id: 'eco-relacoes',
          label: 'Relações Ecológicas',
          summary: 'Interações harmônicas e desarmônicas entre seres da mesma espécie ou de espécies distintas.',
          children: [
            {
              id: 'eco-harmonicas',
              label: 'Mutualismo & Protocooperação',
              summary: 'Mutualismo é associação obrigatória (+/+); protocooperação é vantajosa porém facultativa.',
              videoQuery: 'Relacoes ecologicas harmonicas e desarmonicas ENEM',
              children: [
                {
                  id: 'eco-micorrizas',
                  label: 'Líquens & Micorrizas',
                  summary: 'Fungos fornecendo água e sais enquanto algas ou raízes fornecem compostos orgânicos fotossintetizados.'
                }
              ]
            },
            {
              id: 'eco-controle-biologico',
              label: 'Controle Biológico de Pragas',
              summary: 'Uso de parasitoides e predadores naturais para conter pragas agrícolas sem contaminar lençóis freáticos.',
              children: [
                {
                  id: 'eco-especies-invasoras',
                  label: 'Risco de Espécies Exóticas',
                  summary: 'Mexilhão-dourado e javali desprovidos de predadores locais dizimando espécies nativas.'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // 4. REDAÇÃO NOTA 1000
  {
    id: 'redacao-nota-1000',
    title: 'Redação ENEM: Estrutura & Competências',
    theme: 'Redação (estrutura e competências)',
    area: 'redacao',
    description: 'Os 4 parágrafos canônicos, as 5 competências avaliadas e a proposta de intervenção completa.',
    rootNode: {
      id: 'root-redacao',
      label: 'Redação Nota 1000',
      summary: 'Texto dissertativo-argumentativo com projeto de texto estratégico, repertório legitimado e intervenção detalhada.',
      children: [
        {
          id: 'red-introducao',
          label: 'Introdução Estratégica (6-7 linhas)',
          summary: 'Apresentação do recorte temático, contextualização com repertório e anúncio da tese bipartida.',
          children: [
            {
              id: 'red-tese-bipartida',
              label: 'Tese Bipartida (D1 e D2)',
              summary: 'Apresentar com clareza as duas causas ou raízes do problema que serão aprofundadas no corpo do texto.',
              enemTips: 'Use a fórmula: "não apenas por [Causa 1], mas também devido a [Causa 2]".',
              videoQuery: 'Como fazer introducao redacao ENEM nota 1000',
              children: [
                {
                  id: 'red-ponte-tematica',
                  label: 'Conectivo de Adversidade',
                  summary: 'Contrapor a teoria citada à precária realidade brasileira ("Contudo, na prática contemporânea...").'
                }
              ]
            }
          ]
        },
        {
          id: 'red-desenvolvimentos',
          label: 'Desenvolvimento 1 e 2',
          summary: 'Parágrafos de argumentação com tópico frasal, repertório sociocultural produtivo e desfecho reflexivo.',
          children: [
            {
              id: 'red-repertorio-produtivo',
              label: 'Repertório Legitimado e Produtivo',
              summary: 'Citações de filósofos, leis ou fatos históricos obrigatoriamente vinculados à causa debatida no parágrafo.',
              enemTips: 'Não basta citar; é mandatório arrematar com "De maneira análoga ao pensamento de [Autor]...".',
              videoQuery: 'Repertorio sociocultural produtivo redacao ENEM',
              children: [
                {
                  id: 'red-marcas-autoria',
                  label: 'Léxico Valorativo (Autoria)',
                  summary: 'Inserir advérbios e adjetivos críticos ("lamentavelmente", "inadmissível", "perversa omissão").'
                }
              ]
            }
          ]
        },
        {
          id: 'red-proposta',
          label: 'Conclusão & Competência 5',
          summary: 'Elaboração da proposta de intervenção social com os 5 elementos canônicos do INEP.',
          children: [
            {
              id: 'red-cinco-elementos',
              label: 'Os 5 Elementos Obrigatórios',
              summary: 'Agente, Ação, Modo/Meio, Efeito e Detalhamento de um dos componentes anteriores.',
              enemTips: 'Cada um dos 5 elementos vale exatamente 40 pontos na grade de correção.',
              videoQuery: 'Proposta de intervencao 5 elementos redacao ENEM',
              children: [
                {
                  id: 'red-detalhamento-agente',
                  label: 'Detalhamento do Agente',
                  summary: 'Especificar a função constitucional do órgão entre vírgulas ("O MEC, órgão gestor da educação básica...").'
                },
                {
                  id: 'red-respeito-dh',
                  label: 'Respeito aos Direitos Humanos',
                  summary: 'Propostas que incitem punições cruéis ou discriminação zeram a Competência 5 na hora.'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // 5. GLOBALIZAÇÃO
  {
    id: 'globalizacao',
    title: 'Globalização & Redes Mundiais',
    theme: 'Globalização',
    area: 'humanas',
    description: 'Meio técnico-científico-informacional, nova DIT, corporações transnacionais e exclusão digital.',
    rootNode: {
      id: 'root-globalizacao',
      label: 'Globalização no ENEM',
      summary: 'Integração econômica, cultural e tecnológica acelerada pela compressão espaço-tempo das telecomunicações.',
      children: [
        {
          id: 'glob-meio-tecnico',
          label: 'Meio Técnico-Informacional',
          summary: 'Conceito de Milton Santos: a fusão entre avanço científico e tecnologias digitais guiando os fluxos financeiros.',
          children: [
            {
              id: 'glob-compressao-espaco-tempo',
              label: 'Compressão Espaço-Tempo',
              summary: 'David Harvey: redução drástica do tempo de deslocamento físico e instantaneidade das comunicações.',
              enemTips: 'O capital financeiro transita em milissegundos entre bolsas de Tóquio, Londres e Nova York.',
              videoQuery: 'Milton Santos globalizacao meio tecnico cientifico informacional ENEM',
              children: [
                {
                  id: 'glob-aldeia-global',
                  label: 'Aldeia Global vs Fragmentação',
                  summary: 'A ilusão de proximidade mundial convivendo com muros reais contra refugiados do Sul global.'
                }
              ]
            }
          ]
        },
        {
          id: 'glob-nova-dit',
          label: 'Nova DIT & Transnacionais',
          summary: 'Divisão internacional do trabalho onde sedes controlam patentes e países periféricos fabricam peças baratas.',
          children: [
            {
              id: 'glob-deslocalizacao',
              label: 'Desconcentração Industrial',
              summary: 'Fábricas migrando para o Sudeste Asiático e América Latina em busca de isenção de impostos e baixos salários.',
              videoQuery: 'Divisao Internacional do Trabalho DIT e transnacionais ENEM',
              children: [
                {
                  id: 'glob-trabalho-precarizado',
                  label: 'Precarização Global do Trabalho',
                  summary: 'Dumping social e corrida para o fundo com cortes de direitos para atrair multinacionais.'
                }
              ]
            }
          ]
        },
        {
          id: 'glob-cultura-perversidade',
          label: 'Globalização como Perversidade',
          summary: 'Tese de Milton Santos: o modelo hegemônico produz consumidores insaciáveis em vez de cidadãos conscientes.',
          children: [
            {
              id: 'glob-exclusao-digital',
              label: 'Abismo Digital',
              summary: 'Desigualdade extrema no acesso a computadores e conexão veloz aprofundando o subdesenvolvimento.',
              children: [
                {
                  id: 'glob-hibridismo-resistencia',
                  label: 'Hibridismo Cultural',
                  summary: 'Resistência de identidades locais que reinterpretam e subvertem produtos da cultura de massa americana.'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // 6. FUNÇÕES DA LINGUAGEM
  {
    id: 'funcoes-da-linguagem',
    title: 'Funções da Linguagem & Comunicação',
    theme: 'Funções da Linguagem',
    area: 'linguagens',
    description: 'Os 6 objetivos comunicativos de Roman Jakobson decodificados em questões de provas do ENEM.',
    rootNode: {
      id: 'root-funcoes',
      label: 'Funções da Linguagem',
      summary: 'Cada texto é construído com foco deliberado em um dos elementos do ato comunicativo.',
      children: [
        {
          id: 'fl-conativa',
          label: 'Função Conativa (Apelativa)',
          summary: 'Foco no receptor. Busca persuadir, ordenar ou engajar o leitor através de verbos no modo imperativo.',
          children: [
            {
              id: 'fl-publicidade',
              label: 'Campanhas de Utilidade Pública',
              summary: 'Propagandas de vacinação, conscientização no trânsito e anúncios do Ministério da Saúde.',
              enemTips: 'É a campeã absoluta de recorrência no primeiro dia do ENEM.',
              videoQuery: 'Funcao conativa apelativa na publicidade ENEM',
              children: [
                {
                  id: 'fl-verbos-imperativo',
                  label: 'Verbos no Imperativo & Vocativo',
                  summary: '"Vacine seu filho", "Denuncie", "Participe": convocação explícita da audiência.'
                }
              ]
            }
          ]
        },
        {
          id: 'fl-emotiva',
          label: 'Função Emotiva (Expressiva)',
          summary: 'Foco no emissor. Expressão subjetiva de sentimentos, memórias e desabafos com uso predominante da 1ª pessoa.',
          children: [
            {
              id: 'fl-cartas-diarios',
              label: 'Diários Íntimos & Poemas Subjetivos',
              summary: 'Gêneros confessionais onde a opinião pessoal e as exclamações revelam a interioridade do autor.',
              videoQuery: 'Funcao emotiva vs funcao poetica ENEM',
              children: [
                {
                  id: 'fl-subjetividade',
                  label: 'Sinais de Pontuação Enfáticos',
                  summary: 'Reticências, exclamações e adjetivação afetiva que evidenciam o estado anímico de quem escreve.'
                }
              ]
            }
          ]
        },
        {
          id: 'fl-referencial-metalinguistica',
          label: 'Referencial & Metalinguística',
          summary: 'A função referencial foca na informação objetiva (contexto); a metalinguística explica o próprio código linguístico.',
          children: [
            {
              id: 'fl-referencial-jornalismo',
              label: 'Textos Informativos e Científicos',
              summary: 'Reportagens de divulgação científica com 3ª pessoa, dados empíricos e denotação precisa.',
              videoQuery: 'Funcao metalinguistica e referencial ENEM',
              children: [
                {
                  id: 'fl-dicionario-poesia',
                  label: 'Metalinguagem em Poesia',
                  summary: 'Drummond escrevendo poema sobre a dificuldade de escolher palavras: o texto explicando a escrita.'
                }
              ]
            }
          ]
        }
      ]
    }
  }
];

export const getMindMapById = (id: string): MindMap | undefined => {
  return MIND_MAPS.find((m) => m.id === id);
};
