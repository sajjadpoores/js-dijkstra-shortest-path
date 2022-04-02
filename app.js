submitBtn.addEventListener("click", () => {
  houses = getNumbersFromInput(housesInput);
  markets = getNumbersFromInput(marketsInput);
  bridges = getNumbersFromInput(bridgesInput);
  piers = getNumbersFromInput(piersInput);

  const { graph, cleanGraphForShortestPath, createVisualization } = createGraph(
    houses,
    markets,
    bridges,
    piers
  );

  createVisualization();
  // graph.forEach(house => {
  dikstra(graph[0]);
  createVisualization();
  // cleanGraphForShortestPath();
  // })
});
