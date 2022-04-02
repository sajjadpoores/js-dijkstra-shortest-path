let housesNodes = [];
let marketsNodes = [];
let bridgesNodes = [];
let piersNodes = [];

let NODES = [];
let EDGES = [];

function getNodeColor(type) {
  switch (type) {
    case NODE_TYPE.HOUSE:
      return '#00FF00'
      break;
      case NODE_TYPE.BRIDGE:
        return '#FFA500'
        break;
        case NODE_TYPE.MARKET:
        return '#800080'
        break;
        case NODE_TYPE.PIER:
        return '#FF0000'
        break;
    default:
      return "#FFF"
      break;
  }
}

function getNodeX(type) {
  switch (type) {
    case NODE_TYPE.HOUSE:
      return 0
      break;
      case NODE_TYPE.BRIDGE:
        return 300
        break;
        case NODE_TYPE.MARKET:
        return 600
        break;
        case NODE_TYPE.PIER:
        return 300
        break;
    default:
      return "#FFF"
      break;
  }
}
function createNode(height, type, index) {
  let node = {
    height: height,
    type,
    index: index,
    output: [],
    outputIndexesSet: new Set(),
    distanceToSource: Infinity,
    // for visualization
    id: NODES.length,
    color: getNodeColor(type),
    label: type[0].toUpperCase() + index,
    x: getNodeX(type),
    y: height * 50,
  };
  NODES.push(node);
  return node;
}

function createEdge(node1, node2, type) {
  const edge = {
    node: node2,
    weight: findEdgeWeight(node1.height, node2.height, type),
    // for visualization
    from: node1.id,
    to: node2.id,
    arrows: "to",
    label: `${findEdgeWeight(node1.height, node2.height, type)}`,
    color: '#000'
  };

  // use set to check repeated edges
  const nodeOutputSize = node1.outputIndexesSet.size;
  node1.outputIndexesSet.add(`${node2.type}-${node2.index}`);
  if (node1.outputIndexesSet.size > nodeOutputSize) {
    node1.output.push(edge);
  }

  EDGES.push(edge);
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

  // create a network
  var container = document.getElementById("visualization");
  var data = {
    nodes: NODES,
    edges: EDGES,
  };
  var options = {
    nodes: {
      shape: "dot",
      size: 10,
    },
    physics: false,
  };
  new vis.Network(container, data, options);
  return graph;
}
