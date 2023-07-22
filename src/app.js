const scores = {
 Anna: 10,
 Olga: 1,
 Ivan: 5,
}

/**
 * Calculates the sum of values (scores) in the object
 * @function getScore
 * @param {Object} scores - The Object that contains the key 'username' and the value 'score'
 * @returns {number} - The sum of the values in the object
 */
const getScore = (scores) => {
 const sum = Object.values(scores).reduce((acc, score) => acc + score, 0);
 return sum;
}

getScore(scores);