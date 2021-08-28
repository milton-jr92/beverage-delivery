const { abs } = require('mathjs');

const score = (NB, NC, D) => {
    let N = 100 - 25 * abs((NB - NC) / 10);    

    return (N + D) / 2;
}

module.exports = score;