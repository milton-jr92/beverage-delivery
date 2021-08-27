const score = require('../service/score');

test('Score based on the deliver capacity and the current location of the vehicle.', () => {
    const result = score(30, 50, 100);
    expect(result).toEqual(75);
});