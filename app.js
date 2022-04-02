let houses = [];
let markets = [];
let bridges = [];
let piers = [];

const housesInput = document.getElementById('houses');
const marketsInput = document.getElementById('markets');
const bridgesInput = document.getElementById('bridges');
const piersInput = document.getElementById('piers');
const submitBtn = document.getElementById('submit');

function getNumbersFromInput(input) {
    return input.value.split(' ').map(i => +i);
}

submitBtn.addEventListener('click', () => {
    houses = getNumbersFromInput(housesInput);
    markets = getNumbersFromInput(marketsInput);
    bridges = getNumbersFromInput(bridgesInput);
    piers = getNumbersFromInput(piersInput);

    console.log(houses, markets, bridges, piers);
})