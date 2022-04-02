submitBtn.addEventListener("click", () => {
  GRAPH = [];
  houses = getNumbersFromInput(housesInput);
  markets = getNumbersFromInput(marketsInput);
  bridges = getNumbersFromInput(bridgesInput);
  piers = getNumbersFromInput(piersInput);

  GRAPH = createGraph(houses, markets, bridges, piers);
  dikstra(GRAPH[0]);
});
