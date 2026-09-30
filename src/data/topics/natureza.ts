import { Subject } from '../../types';

export const NATUREZA_TOPICS: Subject[] = [
  {
    slug: 'meio-ambiente-e-impactos-antropicos',
    title: 'Meio Ambiente e Impactos Antrópicos',
    area: 'natureza',
    subtopic: 'Ecologia e Química Ambiental',
    shortDescription: 'Eutrofização, efeito estufa, chuva ácida, ilhas de calor, microplásticos e contaminação de mananciais.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video', 'mapa'],
    whatFallsMost: [
      'Eutrofização das águas: esgoto ou fertilizantes ricos em N e P -> proliferação de algas -> morte por falta de O2 dissolvido.',
      'Gases do efeito estufa (CO2 e CH4): retenção de radiação infravermelha refletida pela crosta terrestre.',
      'Magnificação trófica (bioacumulação): metais pesados e agrotóxicos acumulando em maior concentração no topo da cadeia trófica.'
    ],
    keyPoints: [
      'Chuva ácida: óxidos de enxofre (SO2/SO3) e nitrogênio (NOx) formando ácidos fortes em contato com a umidade.',
      'Inversão térmica: retenção de camada de ar frio sob o ar quente no inverno, represando poluentes próximos ao solo.',
      'Biomagnificação: o predador de topo (ex: seres humanos ou aves de rapina) sofre maior intoxicação que o fitoplâncton.'
    ],
    fullSummary: [
      'O meio ambiente é o tema interdisciplinar número um da prova de Ciências da Natureza, unindo Biologia, Química e Física.',
      'Atenção à pegadinha: o efeito estufa é um fenômeno natural indispensável à manutenção da temperatura média da Terra; o problema é a sua intensificação antrópica desmedida.',
      'A eutrofização causa a morte de peixes porque as bactérias aeróbicas decompõem a biomassa morta e consomem todo o oxigênio livre da água.'
    ],
    practicalApplication: 'Em questões sobre poluição de rios com mercúrio ou agrotóxicos, o organismo mais prejudicado é sempre o último elo da cadeia alimentar.',
    relatedVideo: {
      youtubeId: 'zU9k1_7M3w0',
      title: 'Impactos Ambientais que Mais Caem no ENEM',
      channel: 'Biologia Total com Jubilut',
      durationMinutes: 18
    },
    mindMapId: 'meio-ambiente',
    frequentlyTestedYears: 'Mais de 15% das questões de Biologia e Química abordam esse tema.'
  },
  {
    slug: 'ecologia-cadeias-e-relacoes',
    title: 'Ecologia: Cadeias, Ciclos e Relações Ecológicas',
    area: 'natureza',
    subtopic: 'Ecologia Geral',
    shortDescription: 'Fluxo unidirecional de energia, pirâmides ecológicas, ciclo do nitrogênio e relações interespecíficas.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video', 'mapa'],
    whatFallsMost: [
      'Pirâmides de energia: NUNCA são invertidas (a energia disponível decresce a cada nível trófico).',
      'Ciclo do Nitrogênio: fixação por bactérias (Rhizobium), nitrificação (nitrosação e nitratação) e desnitrificação.',
      'Relações ecológicas: mutualismo (+/+ obrigatório), protocooperação (+/+ facultativo) e predação/parasitismo (+/-).'
    ],
    keyPoints: [
      'Produtores autótrofos iniciam o fluxo energético convertendo energia luminosa em energia química.',
      'Apenas cerca de 10% da energia de um nível trófico é repassada ao nível seguinte (regra dos 10%).',
      'Bactérias fixadoras em leguminosas (soja, feijão) reduzem a necessidade de fertilizantes nitrogenados industriais.'
    ],
    fullSummary: [
      'Ecologia é a matéria com maior peso na prova de Biologia do ENEM.',
      'Enquanto a energia flui de maneira unidirecional e se dissipa na forma de calor, a matéria é reciclada perpetuamente nos ciclos biogeoquímicos.',
      'O controle biológico de pragas é muito cobrado no ENEM por ser uma alternativa ecologicamente sustentável aos agrotóxicos.'
    ],
    practicalApplication: 'Se a questão pedir uma pirâmide invertida, pense em biomassa marinha (fitoplâncton se reproduz muito rápido) ou em pirâmide de números (uma árvore sustentando milhares de pulgões).',
    relatedVideo: {
      youtubeId: 'bB8k1_9P2w0',
      title: 'Ecologia Básica no ENEM: Relações e Ciclos',
      channel: 'Biologia Total com Jubilut',
      durationMinutes: 17
    },
    mindMapId: 'ecologia'
  },
  {
    slug: 'genetica-e-biotecnologia',
    title: 'Genética Mendeliana e Biotecnologia',
    area: 'natureza',
    subtopic: 'Genética Molecular',
    shortDescription: '1ª e 2ª Leis de Mendel, grupos sanguíneos (sistema ABO e Rh), transgênicos, PCR e vacinas de RNA.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Sistema ABO e eritroblastose fetal (incompatibilidade do fator Rh em mãe negativa e feto positivo).',
      'Organismos Geneticamente Modificados (transgênicos): inserção de gene de outra espécie via DNA recombinante.',
      'Testes de DNA e clonagem: eletroforese em gel para identificação de paternidade e investigação criminal.'
    ],
    keyPoints: [
      'Alelos dominantes se expressam em homozigose (AA) ou heterozigose (Aa); recessivos apenas em homozigose (aa).',
      'Transgênico vs Cisgênico: transgênico recebe gene de espécie diferente; cisgênico recebe gene da mesma espécie.',
      'Eritroblastose fetal ocorre do 2º filho em diante (a mãe foi sensibilizada no parto do primeiro).'
    ],
    fullSummary: [
      'O ENEM foca nas aplicações tecnológicas da genética que impactam a medicina e a produção de alimentos.',
      'A edição gênica (CRISPR-Cas9) e as vacinas de RNA mensageiro são apostas constantes nas provas recentes.',
      'As bandas no teste de DNA de um filho devem ser compartilhadas 50% com a mãe biológica e 50% com o pai biológico.'
    ],
    practicalApplication: 'Para eritroblastose: Mãe sempre Rh- e Bebê sempre Rh+. O pai obrigatoriamente é Rh+.',
    relatedVideo: {
      youtubeId: 'vV7k1_8N2e0',
      title: 'Genética e Biotecnologia no ENEM: Questões Mais Comuns',
      channel: 'Brasil Escola',
      durationMinutes: 16
    }
  },
  {
    slug: 'fisiologia-humana-imunologia',
    title: 'Fisiologia Humana: Imunologia e Homeostase',
    area: 'natureza',
    subtopic: 'Sistemas do Corpo Humano',
    shortDescription: 'Diferença vital entre soro e vacina, sistema imunológico, regulação glicêmica (insulina e glucagon) e digestão.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Vacina (imunização ativa, preventiva, antígeno) vs Soro (imunização passiva, curativa de emergência, anticorpos prontos).',
      'Diabetes Tipo 1 (autoimune, falta de insulina) vs Tipo 2 (resistência dos receptores celulares à insulina por estilo de vida).',
      'Absorção de nutrientes no intestino delgado (microvilosidades aumentando a superfície de contato).'
    ],
    keyPoints: [
      'Antígeno: qualquer substância estranha que estimula a produção de anticorpos.',
      'Anticorpo: proteína de defesa produzida por linfócitos B (plasmócitos) altamente específica.',
      'Memória imunológica: gerada apenas pela imunização ativa (infecção prévia ou vacinação).'
    ],
    fullSummary: [
      'A confusão clássica entre soro e vacina é uma das questões mais recorrentes de toda a história do ENEM.',
      'O soro antiofídico é usado para picadas de cobra porque o organismo não teria tempo hábil de produzir seus próprios anticorpos antes do veneno agir.',
      'A insulina facilita a entrada da glicose nas células e promove a formação de glicogênio no fígado; o glucagon faz o processo inverso no jejum.'
    ],
    practicalApplication: 'Se houver urgência com risco iminente de morte (veneno de escorpião, tétano ativo), a resposta é SORO.',
    relatedVideo: {
      youtubeId: 'mM9k1_6P2w0',
      title: 'Soro ou Vacina? O que o ENEM sempre cobra',
      channel: 'Biologia Total com Jubilut',
      durationMinutes: 13
    }
  },
  {
    slug: 'citologia-e-bioenergetica',
    title: 'Citologia e Bioenergética',
    area: 'natureza',
    subtopic: 'Biologia Celular',
    shortDescription: 'Respiração celular mitocondrial, fermentação alcoólica e lática, e as etapas da fotossíntese vegetal.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Fotossíntese: a fase clara (fotoquímica) quebra a molécula de água liberando oxigênio para a atmosfera.',
      'Fermentação: processo anaeróbico com baixo rendimento (2 ATP por glicose), gerando etanol no pão e ácido lático no músculo fatigado.',
      'Respiração aeróbica: alto rendimento energético (cerca de 30 a 32 ATPs), com o oxigênio atuando como aceptor final de elétrons.'
    ],
    keyPoints: [
      'Glicólise ocorre no citoplasma (hialoplasma) sem necessidade de oxigênio.',
      'Ciclo de Krebs ocorre na matriz mitocondrial; Cadeia Respiratória ocorre nas cristas mitocondriais.',
      'O gás oxigênio liberado na fotossíntese provém da fotólise da ÁGUA, e não do gás carbônico.'
    ],
    fullSummary: [
      'A bioenergética estuda como as células transformam matéria orgânica em ATP, a moeda energética universal.',
      'O ENEM explora a fermentação aplicada à indústria de bebidas, panificação e produção de biocombustíveis como o etanol de cana-de-açúcar.',
      'A clorofila reflete a luz verde e absorve com máxima eficiência os comprimentos de onda azul e vermelho.'
    ],
    practicalApplication: 'Em estufas agrícolas, iluminar as plantas com luz verde é inútil, pois é o comprimento de onda refletido pelas folhas.',
    relatedVideo: {
      youtubeId: 'jL8p1_4M2w0',
      title: 'Fotossíntese e Respiração Celular no ENEM',
      channel: 'Curso Enem Gratuito',
      durationMinutes: 15
    }
  },
  {
    slug: 'eletrodinamica-circuitos-e-potencia',
    title: 'Eletrodinâmica: Circuitos, Consumo e Potência',
    area: 'natureza',
    subtopic: 'Física',
    shortDescription: 'Lei de Ohm (U = R*i), potência elétrica (P = U*i), consumo da conta de luz em kWh e circuitos em série e paralelo.',
    readingTimeMinutes: 6,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Calcular o consumo mensal de chuveiros, ferros de passar e lâmpadas: Energia (kWh) = Potência (kW) * Tempo (horas).',
      'Associação em paralelo: circuitos residenciais funcionam em paralelo para que todos os aparelhos recebam a mesma voltagem (110V ou 220V).',
      'Fusíveis e disjuntores: dispositivos de segurança ligados em SÉRIE com a fase para interromper correntes excessivas.'
    ],
    keyPoints: [
      'Primeira Lei de Ohm: U = R * i (Volts = Ohms * Amperes).',
      'Fórmulas de Potência: P = U * i = R * i² = U² / R.',
      'No inverno: o chuveiro precisa de maior potência (esquentar mais), logo a resistência deve ser MENOR (P = U² / R).',
      'Em paralelo: a corrente total se divide entre os ramos; se uma lâmpada queima, as outras continuam acesas.'
    ],
    fullSummary: [
      'Eletrodinâmica é o conteúdo de Física mais frequente no ENEM sem exceção.',
      'O choque elétrico depende da corrente que atravessa o corpo (em miliamperes), e não apenas da tensão.',
      'Atenção ao cálculo do valor da conta de energia: converta watts para quilowatts dividindo por 1.000 antes de multiplicar pelas horas do mês.'
    ],
    practicalApplication: 'Para diminuir a resistência de um chuveiro e deixá-lo mais quente, o resistor metálico deve ser encurtado.',
    relatedVideo: {
      youtubeId: 'eM7p1_5K2w0',
      title: 'Eletrodinâmica para o ENEM: Circuitos e Contas de Luz',
      channel: 'Professor Ferretto',
      durationMinutes: 20
    }
  },
  {
    slug: 'ondulatoria-e-acustica',
    title: 'Ondulatória e Acústica: Fenômenos Ondulatórios',
    area: 'natureza',
    subtopic: 'Física',
    shortDescription: 'Equação fundamental (v = lambda * f), difração, refração, interferência, ressonância e Efeito Doppler.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Efeito Doppler: ambulância se aproximando soa mais aguda (maior frequência percebida); se afastando, soa mais grave.',
      'Ressonância: corpo recebendo energia na sua frequência natural de vibração (ponte de Tacoma, taça de cristal quebrando).',
      'Difração: capacidade da onda de contornar obstáculos (ondas de rádio e som contornam muros com facilidade por terem comprimentos de onda maiores).'
    ],
    keyPoints: [
      'Equação fundamental: v = λ * f (a frequência depende unicamente da fonte emissora).',
      'Onda sonora é mecânica e longitudinal (NÃO se propaga no vácuo).',
      'Onda eletromagnética é transversal (propaga-se no vácuo com velocidade da luz).',
      'Na refração: a frequência não muda; mudam a velocidade e o comprimento de onda.'
    ],
    fullSummary: [
      'Ondulatória no ENEM aborda tecnologias do cotidiano: Wi-Fi, ultrassom, fones com cancelamento de ruído e fibra óptica.',
      'Fones antirruído utilizam o princípio da interferência destrutiva para neutralizar o som externo.',
      'A altura do som se refere à sua frequência (som alto = agudo; som baixo = grave), nunca ao volume!'
    ],
    practicalApplication: 'Dizer "abaixe o som da TV" no linguajar da física significa diminuir a frequência (deixá-lo mais grave), e não reduzir a intensidade sonora.',
    relatedVideo: {
      youtubeId: 'qQ8p1_3M2w0',
      title: 'Ondulatória no ENEM: Todos os Fenômenos Explicados',
      channel: 'Descomplica',
      durationMinutes: 16
    }
  },
  {
    slug: 'cinematica-e-leis-de-newton',
    title: 'Cinemática e Dinâmica: Leis de Newton',
    area: 'natureza',
    subtopic: 'Física',
    shortDescription: 'Inércia, F = m*a, ação e reação, atrito, cinto de segurança, airbags e distância de frenagem de veículos.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      '1ª Lei de Newton (Inércia) explicando a função vital do cinto de segurança e do encosto de cabeça nos carros.',
      'Trabalho e Teorema da Energia Cinética: se a velocidade do carro dobra, a energia cinética e a distância de frenagem quadruplicam (Ec = mv² / 2).',
      'Atrito estático (o pneu rola sem deslizar) vs atrito cinético (o pneu trava e derrapa): o sistema ABS impede o travamento mantendo o atrito estático.'
    ],
    keyPoints: [
      '1ª Lei (Inércia): corpos em repouso ou MU continuam no seu estado se a força resultante for nula.',
      '2ª Lei: Força Resultante = massa * aceleração (FR = m * a).',
      '3ª Lei: Ação e Reação nunca se anulam porque atuam em CORPOS DIFERENTES.',
      'Airbag e deformação da lataria: aumentam o tempo de colisão, diminuindo a força de impacto sobre os passageiros (Impulso = F * delta t).'
    ],
    fullSummary: [
      'O ENEM foca na física da segurança veicular e no trânsito urbano.',
      'Freios ABS funcionam melhor que freios comuns porque o coeficiente de atrito estático é sempre superior ao atrito dinâmico.',
      'Para reduzir a severidade de uma colisão, o automóvel moderno é projetado para se amassar, dissipando energia mecânica gradualmente.'
    ],
    practicalApplication: 'Dobrar a velocidade de um automóvel multiplica por quatro a energia do impacto em uma batida.',
    relatedVideo: {
      youtubeId: 'bB7p1_2K2w0',
      title: 'Leis de Newton e Segurança no Trânsito para o ENEM',
      channel: 'Brasil Escola',
      durationMinutes: 14
    }
  },
  {
    slug: 'termologia-e-calorimetria',
    title: 'Termologia, Calorimetria e Mudanças de Fase',
    area: 'natureza',
    subtopic: 'Física Térmica',
    shortDescription: 'Calor sensível (Q = m*c*deltaT), calor latente (Q = m*L), condução, convecção, irradiação e garrafa térmica.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Processos de propagação do calor: condução (sólidos), convecção (fluidos em correntes térmicas) e irradiação (ondas eletromagnéticas).',
      'Brisa marítima e terrestre: devido ao alto calor específico da água comparado ao da areia.',
      'Mudança de fase: enquanto uma substância pura muda de estado físico à pressão constante, a sua temperatura NÃO varia.'
    ],
    keyPoints: [
      'Calor Sensível provoca variação de temperatura: Q = m * c * ΔT.',
      'Calor Latente provoca mudança de estado físico: Q = m * L.',
      'A garrafa térmica neutraliza as três formas de calor: vácuo (impede condução e convecção) e paredes espelhadas (refletem a irradiação).',
      'O suor resfria o corpo porque a água retira calor da pele para evaporar.'
    ],
    fullSummary: [
      'A água possui um calor específico excepcionalmente alto (1 cal/g°C), funcionando como excelente moderador térmico do clima planetário.',
      'Durante o dia na praia, a terra esquenta mais rápido que o mar; o ar quente sobre a areia sobe e puxa o ar fresco do mar (brisa marítima).',
      'À noite o processo se inverte, pois a terra esfria muito mais depressa que o oceano (brisa terrestre).'
    ],
    practicalApplication: 'Uma panela de pressão cozinha os alimentos mais rápido porque o aumento de pressão eleva a temperatura de ebulição da água acima de 100°C.',
    relatedVideo: {
      youtubeId: 'vV8p1_1M2w0',
      title: 'Calorimetria no ENEM: Fórmulas e Fenômenos',
      channel: 'Curso Enem Gratuito',
      durationMinutes: 15
    }
  },
  {
    slug: 'quimica-organica-funcoes-e-isomeria',
    title: 'Química Orgânica: Funções Oxigenadas e Isomeria',
    area: 'natureza',
    subtopic: 'Química Orgânica',
    shortDescription: 'Identificação de grupos funcionais (álcool, éster, ácido carboxílico, amina) e isomeria espacial plana e óptica.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Identificar funções em moléculas de medicamentos e agrotóxicos (ácido carboxílico, amida, amina, éster).',
      'Forças intermoleculares: compostos com ligação de hidrogênio (álcoois, ácidos) possuem pontos de ebulição mais elevados.',
      'Isomeria óptica: presença de carbono quiral/assimétrico (ligado a 4 grupos diferentes) e atividade farmacológica de enantiômeros.'
    ],
    keyPoints: [
      'Álcool: grupo -OH ligado a carbono saturado.',
      'Éster: responsável pelo aroma de frutas artificiais e fragrâncias.',
      'Ácido Carboxílico: presença do grupo carboxila (-COOH), caráter ácido.',
      'Carbono Quiral (*C): gera moléculas quirais que desviam a luz polarizada (dextrógiro e levógiro).'
    ],
    fullSummary: [
      'O ENEM cobra química orgânica focada no mundo real: remédios como paracetamol e aspirina, aromatizantes alimentícios e plásticos.',
      'A polaridade da molécula dita sua solubilidade: hidrocarbonetos apolares são insolúveis em água ("semelhante dissolve semelhante").',
      'O sabão tem caráter anfipático: cauda apolar interage com a gordura e cabeça polar iônica interage com a água.'
    ],
    practicalApplication: 'Procure carbonos que possuem quatro ligantes totalmente diferentes entre si: eles conferem isomeria óptica e atividade biológica ao fármaco.',
    relatedVideo: {
      youtubeId: 'mM7p1_0K2w0',
      title: 'Funções Orgânicas no ENEM: Identificação Rápida',
      channel: 'Professor Ferretto',
      durationMinutes: 18
    }
  },
  {
    slug: 'eletroquimica-pilhas-e-eletrólise',
    title: 'Eletroquímica: Pilhas, Corrosão e Eletrólise',
    area: 'natureza',
    subtopic: 'Físico-Química',
    shortDescription: 'Oxirredução, potencial padrão de redução, pilha de Daniell, proteção catódica (metal de sacrifício) e eletrólise.',
    readingTimeMinutes: 5,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Identificar o ânodo e cátodo em pilhas: CROPO (Cátodo Reduz, Ânodo Oxida).',
      'Cálculo da ddp da pilha: deltaE° = E°maior - E°menor (sempre positivo em processo espontâneo).',
      'Metal de sacrifício para evitar ferrugem: uso de magnésio ou zinco em cascos de navios e tubulações de ferro.'
    ],
    keyPoints: [
      'Oxidação: perda de elétrons (o NOX aumenta) -> ocorre no ÂNODO.',
      'Redução: ganho de elétrons (o NOX diminui) -> ocorre no CÁTODO.',
      'Elétrons sempre fluem do ÂNODO para o CÁTODO através do circuito externo.',
      'Eletrólise: processo NÃO espontâneo forçado por uma fonte elétrica externa.'
    ],
    fullSummary: [
      'A eletroquímica do ENEM aborda reciclagem de baterias, carros elétricos e proteção de pontes contra a maresia.',
      'Para ser um bom metal de sacrifício, o metal escolhido precisa ter maior tendência a oxidar (menor potencial de redução) do que o ferro.',
      'A corrosão do ferro depende da presença conjunta de oxigênio e água; sem ambos, a ferrugem não se forma.'
    ],
    practicalApplication: 'Macete infalível: VOGAL com VOGAL, CONSOANTE com CONSOANTE (Ânodo Oxida, Cátodo Reduz).',
    relatedVideo: {
      youtubeId: 'qQ7p1_9M2w0',
      title: 'Eletroquímica no ENEM: Pilhas e Proteção Catódica',
      channel: 'Descomplica',
      durationMinutes: 16
    }
  },
  {
    slug: 'estequiometria-e-solucoes',
    title: 'Estequiometria, Rendimento e Soluções',
    area: 'natureza',
    subtopic: 'Química Geral',
    shortDescription: 'Cálculo estequiométrico passo a passo, reagente limitante e em excesso, pureza, rendimento e molaridade.',
    readingTimeMinutes: 6,
    availableFormats: ['resumo', 'video'],
    whatFallsMost: [
      'Reagente limitante: aquele que acaba primeiro e determina a quantidade máxima de produto gerada.',
      'Pureza de minérios e matérias-primas (ex: calcário com 80% de carbonato de cálcio).',
      'Concentração comum (g/L) versus Concentração molar (mol/L) e diluição (C1*V1 = C2*V2).'
    ],
    keyPoints: [
      '1 mol de qualquer gás nas CNTP ocupa exatamente 22,4 litros.',
      'Massa molar: 1 mol de átomos = Massa atômica em gramas.',
      'Passo a passo: 1) Balancear a equação; 2) Converter para mols ou gramas; 3) Montar a proporção; 4) Aplicar pureza e rendimento.'
    ],
    fullSummary: [
      'O cálculo estequiométrico assusta muitos vestibulandos, mas no ENEM segue sempre a mesma receita de bolo.',
      'As equações envolvem reações da indústria química, neutralização de acidentes ecológicos com ácidos e queima de combustíveis.',
      'Se o rendimento da reação for de 80%, multiplique a quantidade de produto calculada teoricamente por 0,80 no final.'
    ],
    practicalApplication: 'Ao resolver diluição de remédios ou sucos, lembre-se: a quantidade de soluto não muda, apenas o volume total de água aumenta.',
    relatedVideo: {
      youtubeId: 'bB8p1_8K2w0',
      title: 'Estequiometria sem Mistério para o ENEM',
      channel: 'Brasil Escola',
      durationMinutes: 18
    }
  }
];
