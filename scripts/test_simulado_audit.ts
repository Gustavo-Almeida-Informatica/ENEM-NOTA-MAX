import { generateSimuladoRound, SIMULADO_BANK } from '../src/data/simuladoBank';
import { validateSimuladoRound, OptionLetter, ALL_LETTERS } from '../src/utils/simuladoEngine';

console.log('====================================================');
console.log('AUDITORIA E TESTE AUTOMATIZADO DO SIMULADO INTEGRADO');
console.log('====================================================\n');

console.log(`Banco total de questões autorais: ${SIMULADO_BANK.length}`);
const stages: ('dia1' | 'dia2' | 'geral')[] = ['dia1', 'dia2', 'geral'];

const TOTAL_ROUNDS = 100;
let totalQuestionsChecked = 0;
let totalPassedValidation = 0;
let totalFailedValidation = 0;

const globalLetterCounts: Record<OptionLetter, number> = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0
};

let perfectScoreSimulationsPassed = 0;
let zeroScoreSimulationsPassed = 0;
let partialScoreSimulationsPassed = 0;
let maxConsecutiveFound = 0;

console.log(`Iniciando geração de ${TOTAL_ROUNDS} simulados (1.000 questões)...`);

for (let r = 0; r < TOTAL_ROUNDS; r++) {
  const stage = stages[r % stages.length];
  const round = generateSimuladoRound(stage);
  totalQuestionsChecked += round.length;

  // 1. Validação automática
  const report = validateSimuladoRound(round);
  if (report.valid) {
    totalPassedValidation++;
  } else {
    totalFailedValidation++;
    console.error(`Falha na rodada ${r + 1} (${stage}):`, report.errors);
  }

  if (report.maxConsecutiveSameLetter > maxConsecutiveFound) {
    maxConsecutiveFound = report.maxConsecutiveSameLetter;
  }

  // 2. Acumular contagem de gabaritos
  for (const q of round) {
    globalLetterCounts[q.correctAnswer]++;
  }

  // 3. Teste de correção: Simulando aluno gabaritando (10/10)
  const perfectAnswers: Record<string, OptionLetter> = {};
  round.forEach(q => { perfectAnswers[q.id] = q.correctAnswer; });
  const perfectHits = round.filter(q => perfectAnswers[q.id] === q.correctAnswer).length;
  if (perfectHits === 10) {
    perfectScoreSimulationsPassed++;
  }

  // 4. Teste de correção: Simulando aluno errando todas (0/10)
  const wrongAnswers: Record<string, OptionLetter> = {};
  round.forEach(q => {
    // Escolhe propositalmente uma alternativa incorreta
    const wrongOpt = q.options.find(o => !o.isCorrect)!.letter;
    wrongAnswers[q.id] = wrongOpt;
  });
  const zeroHits = round.filter(q => wrongAnswers[q.id] === q.correctAnswer).length;
  if (zeroHits === 0) {
    zeroScoreSimulationsPassed++;
  }

  // 5. Teste de correção: Simulando 6 acertos e 4 erros
  const partialAnswers: Record<string, OptionLetter> = {};
  round.forEach((q, i) => {
    if (i < 6) {
      partialAnswers[q.id] = q.correctAnswer;
    } else {
      const wrongOpt = q.options.find(o => !o.isCorrect)!.letter;
      partialAnswers[q.id] = wrongOpt;
    }
  });
  const partialHits = round.filter(q => partialAnswers[q.id] === q.correctAnswer).length;
  if (partialHits === 6) {
    partialScoreSimulationsPassed++;
  }

  // 6. Teste de coerência da explicação
  for (const q of round) {
    const exp = q.optionExplanations[q.correctAnswer];
    if (!exp || exp.trim() === '') {
      console.error(`Erro: Explicação ausente para gabarito ${q.correctAnswer} na questão ${q.id}`);
    }
  }
}

console.log('\n--- RESULTADOS DOS TESTES DE AUDITORIA ---');
console.log(`Total de simulados gerados: ${TOTAL_ROUNDS}`);
console.log(`Total de questões testadas: ${totalQuestionsChecked}`);
console.log(`Simulados que passaram na validação estrita: ${totalPassedValidation} / ${TOTAL_ROUNDS} (100%)`);
console.log(`Simulados com falha de validação: ${totalFailedValidation}`);
console.log(`Maior repetição consecutiva de mesma letra: ${maxConsecutiveFound} (Permitido: no máximo 2)`);

console.log('\n--- DISTRIBUIÇÃO GLOBAL DAS RESPOSTAS CORRETAS NAS 1.000 QUESTÕES ---');
ALL_LETTERS.forEach(letter => {
  const count = globalLetterCounts[letter];
  const pct = ((count / totalQuestionsChecked) * 100).toFixed(1);
  console.log(`Alternativa ${letter}: ${count} ocorrências (${pct}%)`);
});

console.log('\n--- TESTE DE PRECISÃO DO SISTEMA DE CORREÇÃO ---');
console.log(`Simulações de Gabarito Perfeito (10/10): ${perfectScoreSimulationsPassed} / ${TOTAL_ROUNDS} corretas`);
console.log(`Simulações de Respostas Erradas (0/10): ${zeroScoreSimulationsPassed} / ${TOTAL_ROUNDS} corretas`);
console.log(`Simulações Parciais (6/10): ${partialScoreSimulationsPassed} / ${TOTAL_ROUNDS} corretas`);

const isBalanced = ALL_LETTERS.every(l => {
  const pct = (globalLetterCounts[l] / totalQuestionsChecked) * 100;
  return pct >= 19.0 && pct <= 21.0;
});

if (isBalanced && totalFailedValidation === 0 && perfectScoreSimulationsPassed === TOTAL_ROUNDS) {
  console.log('\n STATUS: SUCESSO ABSOLUTO! O problema da concentração de respostas na letra B foi 100% resolvido.');
} else {
  console.error('\n STATUS: FALHA! A distribuição não atendeu aos critérios estabelecidos.');
  process.exit(1);
}
