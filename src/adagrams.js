const LETTER_POOL = {
  'A': 9, 
  'B': 2, 
  'C': 2, 
  'D': 4, 
  'E': 12, 
  'F': 2, 
  'G': 3, 
  'H': 2, 
  'I': 9, 
  'J': 1, 
  'K': 1, 
  'L': 4, 
  'M': 2, 
  'N': 6, 
  'O': 8, 
  'P': 2, 
  'Q': 1, 
  'R': 6, 
  'S': 4, 
  'T': 6, 
  'U': 4, 
  'V': 2, 
  'W': 2, 
  'X': 1, 
  'Y': 2, 
  'Z': 1
};

const SCORE_CHART = {
  ITEMS: {
1 : ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
2 : ['D', 'G'],
3 : ['B', 'C', 'M', 'P'],
4 : ['F', 'H', 'V', 'W', 'Y'],
5 : ['K'],	
8 : ['J', 'X'],
10 : ['Q', 'Z']
  }
};

export const drawLetters = () => {
  const pool = [];

  for (const letter in LETTER_POOL) {
    const freq = LETTER_POOL[letter];

    for (let i = 0 ; i < freq; i++) {

      pool.push(letter);
    }
  }
  const hand = [];
  for (let i = 0; i < 10; i++ ) {
    const index = Math.floor(Math.random() * pool.length);
    hand.push(pool[index]);
    pool.splice(index, 1);
  }
  return hand;  
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const inputUpper = input.toUpperCase();
  const handCopy = lettersInHand.map(letter => letter);

  for (const letter of inputUpper) {
    const index = handCopy.indexOf(letter);

    if (index === -1) {
      return false;  // Letter not available
    }
    handCopy[index] = handCopy[handCopy.length - 1]; 
    handCopy.pop();
  }

  return true;
};

export const scoreWord = (word) => {
  let sumOfPoints = 0;
  const upperWord = word.toUpperCase();
  for (let letter of upperWord) {
    for (let points in SCORE_CHART.ITEMS) {
      if (SCORE_CHART.ITEMS[points].includes(letter)) {
        sumOfPoints += Number(points);
        break;
      }
    }
  }

  if (word.length >= 7 && word.length <= 10) {
    sumOfPoints += 8;
  }

  return sumOfPoints;
};

export const highestScoreFrom = (words) => {
  if (!(words) || words.length === 0) return null;
  let bestScore = 0;
  let bestWord = '';

  for (const word of words) {
    const score = scoreWord(word);
    if (bestWord === word || score > bestScore) {
      bestWord = word;
      bestScore = score;
    }
    if (score === bestScore) {
      const currentWordLength = word.length;
      const bestLength = bestWord.length;

      if (currentWordLength === 10 && bestLength !== 10) {
        bestWord = word;
      }

      if (bestLength !== 10) {
        if (currentWordLength < bestLength) {
          bestWord = word;
        }
      }
    }
  }

  return { word: bestWord, score: bestScore };
};
