const distanceTable = (distance) => {
    distance = parseInt(distance);

    if (distance >= 0 && distance <= 5) {
        return 100;
    } else if (distance > 5 && distance <= 10) {
        return 75;
    } else if (distance > 10 && distance <= 15) {
        return 50;
    } else if (distance > 15 && distance <= 20) {
        return 25;
    } else {
        return 0;
    }
}

module.exports = distanceTable;