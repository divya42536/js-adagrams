const LETTER_POOL = {
  'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9, 'J': 1, 'K': 1, 'L': 4, 'M': 2, 'N': 6, 
  'O': 8, 'P': 2, 'Q': 1, 'R': 6, 'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1
};

const SCORE_CHART = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10
};


export const getLetterPool = () => {
  const pool = [];
  for (const letter in LETTER_POOL) {
    const freq = LETTER_POOL[letter];

    let count = 0;
    while (count < freq) {
      pool.push(letter);
      count++;
    }
  }

  return pool;
};
const drawRandomLetterFromPool = (pool) => {
  const index = Math.floor(Math.random() * pool.length);
  const letter = pool[index];
  pool[index ] = pool[pool.length - 1];
  pool.pop();

  return letter;
};

export const drawLetters = () => {
  const pool = getLetterPool();
  const hand = [];

  for (let i = 0; i < 10; i++ ) {
    hand.push(drawRandomLetterFromPool(pool));
  }
  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const handFreq = {};
  for (const letter of lettersInHand) {
    if (handFreq[letter]) {
      handFreq[letter] += 1;
    }
    else {
      handFreq[letter] = 1;
    }
  }
  for (const letter of input.toUpperCase()) {
    if(!handFreq[letter]) {
      return false;
    }
    handFreq[letter] -= 1;
  }
  return true;
};

export const scoreWord = (word) => {
  let sumOfPoints = 0;
  for (const letter of word.toUpperCase()) {
    if (SCORE_CHART[letter]) {
      sumOfPoints += SCORE_CHART[letter];
    }
  }
  const LONG_WORD_BONUS = 8;
  if (word.length >= 7 && word.length <= 10) {
    sumOfPoints += LONG_WORD_BONUS;
  }

  return sumOfPoints;
};

// Separating each tie-breaking logic in separate condition

const chooseBestWord = (currentWord, currentScore, bestWord, bestScore) => {

  if (bestWord === '' || currentScore > bestScore) {
    return {
      bestWord: currentWord, bestScore: currentScore
    };
  }

  if (currentScore === bestScore) {
    const currentLength = currentWord.length;
    const bestLength = bestWord.length;

    if (currentLength === 10 && bestLength !== 10) {
      return { bestWord: currentWord, bestScore: currentScore };
    }

    if (bestLength !== 10 && currentLength < bestLength) {
      return { bestWord: currentWord, bestScore: currentScore };
    }
  }

  return { bestWord, bestScore };
};

export const highestScoreFrom = (words) => {

  if (!words || words.length === 0) {
    return null;
  }
  let bestWord = '';
  let bestScore = 0;

  for (const word of words) {
    const score = scoreWord(word);
    const result = chooseBestWord(word, score, bestWord, bestScore);
    bestWord = result.bestWord;
    bestScore = result.bestScore;
  }

  return { word: bestWord, score: bestScore };
};
