const WALK_TYPE = {
    PEDESTRIAN: 2,
    CYCLE: 1,
    BOAT: 1
}

const NODE_TYPE = {
    HOUSE: 'house',
    MARKET: 'market',
    BRIDGE: 'bridge',
    PIER: 'pier'
}

let houses = [];
let markets = [];
let bridges = [];
let piers = [];

const housesInput = document.getElementById('houses');
const marketsInput = document.getElementById('markets');
const bridgesInput = document.getElementById('bridges');
const piersInput = document.getElementById('piers');
const submitBtn = document.getElementById('submit');

let GRAPH = [];