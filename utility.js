function getNumbersFromInput(input) {
    return input.value.split(' ').map(i => +i);
}

function findEdgeWeight(height1, height2, type) {
    return (Math.abs(height1 - height2) + 1) * type;
}