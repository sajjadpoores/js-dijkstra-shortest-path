function calulateGraphAndShortestPath() {
  houses = getNumbersFromInput(housesInput);
  markets = getNumbersFromInput(marketsInput);
  bridges = getNumbersFromInput(bridgesInput);
  piers = getNumbersFromInput(piersInput);
  whichInput.value = whichInput.value % houses.length;

  const { graph, cleanGraphForShortestPath, createVisualization } = createGraph(
    houses,
    markets,
    bridges,
    piers
  );

  cleanGraphForShortestPath();
  dikstra(graph[+whichInput.value]);
  createVisualization();
}
submitBtn.addEventListener("click", () => {
  calulateGraphAndShortestPath();
});

whichInput.addEventListener("change", () => {
  calulateGraphAndShortestPath();
});
