let housesNodes = [];
let marketsNodes = [];
let bridgesNodes = [];
let piersNodes = [];

function createNode(height, type, index) {
  return {
    height: height,
    type,
    index: index,
    output: [],
    outputIndexesSet: new Set()
  };
}

function createEdge(node1, node2, type) {
  const edge = {
    node: node2,
    weight: findEdgeWeight(node1.height, node2.height, type),
  };
  const nodeOutputSize = node1.outputIndexesSet.size;
  node1.outputIndexesSet.add(`${node2.type}-${node2.index}`);
  if(node1.outputIndexesSet.size > nodeOutputSize) {
      node1.output.push(edge);
  }
  return edge;
}

function createNodes(rawHeights, type) {
  let nodes = [];
  rawHeights.forEach((height, index) => {
    nodes.push(createNode(height, type, index));
  });
  return nodes;
}

function createGraph(houses, markets, bridges, piers) {
  let graph = [];
  housesNodes = createNodes(houses, NODE_TYPE.HOUSE);
  marketsNodes = createNodes(markets, NODE_TYPE.MARKET);
  bridgesNodes = createNodes(bridges, NODE_TYPE.BRIDGE);
  piersNodes = createNodes(piers, NODE_TYPE.PIER);

  housesNodes.forEach((house) => {
    bridgesNodes.forEach((bridge) => {
      createEdge(house, bridge, WALK_TYPE.CYCLE);
    });

    piersNodes.forEach((pier) => {
      createEdge(house, pier, WALK_TYPE.PEDESTRIAN);
    });

    house.output.forEach((output) => {
      marketsNodes.forEach((market) => {
        createEdge(
          output.node,
          market,
          output.node.type === NODE_TYPE.BRIDGE
            ? WALK_TYPE.CYCLE
            : WALK_TYPE.PEDESTRIAN
        );
      });
    });
    graph.push(house);
  });
  return graph;
}

submitBtn.addEventListener("click", () => {
  GRAPH = [];
  houses = getNumbersFromInput(housesInput);
  markets = getNumbersFromInput(marketsInput);
  bridges = getNumbersFromInput(bridgesInput);
  piers = getNumbersFromInput(piersInput);

  GRAPH = createGraph(houses, markets, bridges, piers);
  console.log(GRAPH);
});
