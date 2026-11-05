// Motor de Embaralhamento, Balanceamento e Validação de Simulados — ENEM Nota Máxima
// Garante distribuição estatisticamente equilibrada do gabarito (2A, 2B, 2C, 2D, 2E para 10 questões),
// eliminação de padrões previsíveis, preservação permanente do gabarito e validação rigorosa.

import { AuthorialQuestion } from '../data/simuladoBank';

export type OptionLetter = 'A' | 'B' | 'C' | 'D' | 'E';
export const ALL_LETTERS: OptionLetter[] = ['A', 'B', 'C', 'D', 'E'];

export interface ValidationReport {
  valid: boolean;
  errors: string[];
  distribution: Record<OptionLetter, number>;
  maxConsecutiveSameLetter: number;
}

/**
 * Normaliza uma questão garantindo que cada alternativa tenha:
 * - isCorrect: boolean (identificação interna e permanente da resposta correta)
 * - originalLetter: OptionLetter (referência para mapear a explicação)
 */
export function normalizeQuestion(q: AuthorialQuestion): AuthorialQuestion {
  const options = q.options.map(opt => ({
    ...opt,
    originalLetter: opt.originalLetter || opt.letter,
    isCorrect: opt.isCorrect !== undefined ? opt.isCorrect : opt.letter === q.correctAnswer
  }));

  return {
    ...q,
    options,
    // Garante que correctAnswer reflita a opção correta
    correctAnswer: (options.find(o => o.isCorrect)?.letter || q.correctAnswer) as OptionLetter
  };
}

/**
 * Fisher-Yates shuffle genérico
 */
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Embaralha as alternativas de uma única questão, posicionando a resposta correta
 * na letra 'targetCorrectLetter'. Os 4 distratores são distribuídos aleatoriamente
 * nas outras 4 posições.
 *
 * Mapeia com precisão:
 * - A nova posição de cada alternativa
 * - As explicações de cada alternativa (optionExplanations)
 * - A identificação interna permanente da resposta correta
 */
export function shuffleQuestionOptions(
  rawQuestion: AuthorialQuestion,
  targetCorrectLetter: OptionLetter
): AuthorialQuestion {
  const q = normalizeQuestion(rawQuestion);

  // 1. Identificar a alternativa correta e os distratores
  const correctOption = q.options.find(opt => opt.isCorrect);
  if (!correctOption) {
    throw new Error(`Questão ${q.id} não possui alternativa correta identificada.`);
  }

  const distractors = q.options.filter(opt => !opt.isCorrect);
  if (distractors.length !== 4) {
    throw new Error(`Questão ${q.id} deve ter exatamente 4 distratores, mas tem ${distractors.length}.`);
  }

  // 2. Embaralhar os 4 distratores aleatoriamente
  const shuffledDistractors = shuffleArray(distractors);

  // 3. Montar o novo array de 5 alternativas com a correta no targetCorrectLetter
  const targetIndex = ALL_LETTERS.indexOf(targetCorrectLetter);
  const newOptions: typeof q.options = [];
  let distractorIdx = 0;

  for (let i = 0; i < 5; i++) {
    const currentLetter = ALL_LETTERS[i];
    if (i === targetIndex) {
      newOptions.push({
        ...correctOption,
        letter: currentLetter,
        isCorrect: true
      });
    } else {
      newOptions.push({
        ...shuffledDistractors[distractorIdx],
        letter: currentLetter,
        isCorrect: false
      });
      distractorIdx++;
    }
  }

  // 4. Mapear as explicações para as novas letras usando o originalLetter de cada alternativa
  const newOptionExplanations: Record<OptionLetter, string> = {} as any;
  for (const opt of newOptions) {
    const origLetter = opt.originalLetter || opt.letter;
    const explanationText = q.optionExplanations[origLetter] || '';
    newOptionExplanations[opt.letter] = explanationText;
  }

  return {
    ...q,
    options: newOptions,
    correctAnswer: targetCorrectLetter,
    optionExplanations: newOptionExplanations
  };
}

/**
 * Gera uma sequência balanceada de letras para o gabarito de N questões.
 * Para 10 questões, gera exatamente duas ocorrências de cada letra:
 * 2 A's, 2 B's, 2 C's, 2 D's, 2 E's.
 *
 * Aplica restrições obrigatórias:
 * 1. Não deixar sequência cíclica previsível (A, B, C, D, E...).
 * 2. Evitar repetições excessivas consecutivas (no máximo 2 da mesma letra em sequência).
 * 3. Embaralhamento uniforme.
 */
export function generateBalancedLetterSequence(totalQuestions: number = 10): OptionLetter[] {
  const baseCount = Math.floor(totalQuestions / 5);
  const remainder = totalQuestions % 5;

  let targetList: OptionLetter[] = [];
  for (const l of ALL_LETTERS) {
    for (let i = 0; i < baseCount; i++) {
      targetList.push(l);
    }
  }

  // Se houver resto, distribui de forma aleatória sem viés
  if (remainder > 0) {
    const extra = shuffleArray([...ALL_LETTERS]).slice(0, remainder);
    targetList.push(...extra);
  }

  // Verifica se a sequência é previsível (ex: A, B, C, D, E ou repetição de 3 em sequência)
  const isPredictableOrRepetitive = (seq: OptionLetter[]): boolean => {
    // 1. Verifica repetição de 3 seguidas (ex: A, A, A)
    for (let i = 0; i < seq.length - 2; i++) {
      if (seq[i] === seq[i + 1] && seq[i + 1] === seq[i + 2]) {
        return true;
      }
    }

    // 2. Verifica padrão cíclico perfeito (A, B, C, D, E, A, B, C, D, E)
    let cycleMatches = 0;
    for (let i = 0; i < seq.length; i++) {
      if (seq[i] === ALL_LETTERS[i % 5]) {
        cycleMatches++;
      }
    }
    if (cycleMatches === seq.length) {
      return true;
    }

    return false;
  };

  let candidate = shuffleArray(targetList);
  let attempts = 0;
  while (isPredictableOrRepetitive(candidate) && attempts < 200) {
    candidate = shuffleArray(targetList);
    attempts++;
  }

  return candidate;
}

/**
 * Executa validação automática completa de uma rodada de questões antes de disponibilizá-la.
 */
export function validateSimuladoRound(questions: AuthorialQuestion[]): ValidationReport {
  const errors: string[] = [];
  const distribution: Record<OptionLetter, number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0
  };

  if (questions.length !== 10) {
    errors.push(`Rodada deve conter 10 questões, mas contém ${questions.length}.`);
  }

  // Checagem de duplicação de questões
  const seenIds = new Set<string>();
  for (const q of questions) {
    if (seenIds.has(q.id)) {
      errors.push(`Questão duplicada encontrada na rodada: ${q.id}.`);
    }
    seenIds.add(q.id);
  }

  // Checagem por questão
  for (let idx = 0; idx < questions.length; idx++) {
    const q = questions[idx];
    const qNum = idx + 1;

    // 1. Exatamente 5 alternativas?
    if (!q.options || q.options.length !== 5) {
      errors.push(`Questão ${qNum} (${q.id}) não possui 5 alternativas (possui ${q.options?.length || 0}).`);
      continue;
    }

    // 2. Letras das alternativas são A, B, C, D, E?
    const lettersPresent = q.options.map(o => o.letter).join('');
    if (lettersPresent !== 'ABCDE') {
      errors.push(`Questão ${qNum} (${q.id}) possui ordem ou letras inválidas: ${lettersPresent}.`);
    }

    // 3. Existe somente uma resposta correta?
    const correctOptions = q.options.filter(o => o.isCorrect || o.letter === q.correctAnswer);
    if (correctOptions.length !== 1) {
      errors.push(`Questão ${qNum} (${q.id}) deve ter exatamente 1 alternativa correta (tem ${correctOptions.length}).`);
    }

    // 4. A resposta correta coincide com correctAnswer?
    const optAtCorrect = q.options.find(o => o.letter === q.correctAnswer);
    if (!optAtCorrect || !optAtCorrect.isCorrect) {
      errors.push(`Questão ${qNum} (${q.id}) tem divergência entre correctAnswer (${q.correctAnswer}) e a opção marcada como isCorrect.`);
    }

    // 5. A explicação corresponde à alternativa correta?
    const correctExplanation = q.optionExplanations?.[q.correctAnswer];
    if (!correctExplanation) {
      errors.push(`Questão ${qNum} (${q.id}) não possui explicação para o gabarito ${q.correctAnswer}.`);
    }

    // 6. Contagem para distribuição
    if (ALL_LETTERS.includes(q.correctAnswer)) {
      distribution[q.correctAnswer]++;
    } else {
      errors.push(`Questão ${qNum} (${q.id}) possui letra de gabarito inválida: ${q.correctAnswer}.`);
    }
  }

  // Checagem de repetição consecutiva máxima
  let maxConsecutive = 1;
  let currentConsecutive = 1;
  for (let i = 1; i < questions.length; i++) {
    if (questions[i].correctAnswer === questions[i - 1].correctAnswer) {
      currentConsecutive++;
      if (currentConsecutive > maxConsecutive) {
        maxConsecutive = currentConsecutive;
      }
    } else {
      currentConsecutive = 1;
    }
  }

  if (maxConsecutive > 2) {
    errors.push(`Repetição consecutiva excessiva detectada: ${maxConsecutive} questões seguidas com a mesma letra.`);
  }

  // Para 10 questões, deve haver exatamente 2 respostas de cada letra
  if (questions.length === 10) {
    for (const l of ALL_LETTERS) {
      if (distribution[l] !== 2) {
        errors.push(`Distribuição desequilibrada: letra ${l} tem ${distribution[l]} ocorrências (esperado: 2).`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    distribution,
    maxConsecutiveSameLetter: maxConsecutive
  };
}

/**
 * Cria uma rodada balanceada e embaralhada a partir de 10 questões selecionadas.
 */
export function buildBalancedShuffledRound(selectedQuestions: AuthorialQuestion[]): AuthorialQuestion[] {
  if (selectedQuestions.length !== 10) {
    throw new Error(`buildBalancedShuffledRound requer exatamente 10 questões (recebeu ${selectedQuestions.length}).`);
  }

  const targetLetters = generateBalancedLetterSequence(10);
  const shuffledQuestions = selectedQuestions.map((q, i) => {
    return shuffleQuestionOptions(q, targetLetters[i]);
  });

  const report = validateSimuladoRound(shuffledQuestions);
  if (!report.valid) {
    console.error('Erros de validação na rodada gerada:', report.errors);
  }

  return shuffledQuestions;
}
