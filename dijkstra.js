function findEdgesToNode(node) {
  return EDGES.filter(
    (e) => e.to === node.id && e.isUsedInShortestPath === true
  );
}

function markEdgeAsUnusedAnymore(edges) {
  edges.forEach((edge) => {
    edge.isUsedInShortestPath = false;
    edge.color = {
      color: "yellow",
      inherit: false,
      opacity: 1,
    };
    edge.width = 2;
  });
}

function markEdgeAsUsed(edge) {
  edge.width = 3;
  edge.color = {
    color: "red",
    inherit: false,
    opacity: 1,
  };
  edge.isUsedInShortestPath = true;
}

function dikstra(startNode) {
  startNode.distanceToSource = 0;
  startNode.label =
    startNode.type[0].toUpperCase() +
    startNode.index +
    ` [${startNode.distanceToSource}]`;

  const allNodes = [startNode, ...bridgesNodes, ...piersNodes, ...marketsNodes];
  let heap = new FibonacciHeap();
  allNodes.forEach((q) => {
    q.heapNode = null;
    const node = heap.insert(q.distanceToSource, q);
    q.heapNode = node;
  });

  let candidate;
  while ((candidate = heap.extractMinimum())) {
    candidate = candidate.value;
    candidate.output.forEach((edge) => {
      if (
        edge.node.distanceToSource >
        candidate.distanceToSource + edge.weight
      ) {
        const pastEdge = findEdgesToNode(edge.node);
        if (pastEdge) {
          markEdgeAsUnusedAnymore(pastEdge);
        }

        markEdgeAsUsed(edge);

        heap.decreaseKey(
          edge.node.heapNode,
          candidate.distanceToSource + edge.weight
        );
      }

      edge.node.distanceToSource = Math.min(
        edge.node.distanceToSource,
        candidate.distanceToSource + edge.weight
      );

      edge.node.label =
        edge.node.type[0].toUpperCase() +
        edge.node.index +
        ` [${edge.node.distanceToSource}]`;
    });
  }

  [...bridgesNodes, ...piersNodes].forEach((node) => {
    const nodeIsNotUsedInShortestPath =
      node.output.filter((e) => e.isUsedInShortestPath === true).length === 0;

    if (nodeIsNotUsedInShortestPath) {
      const edgesNeedToBeUnuse = findEdgesToNode(node);
      if (edgesNeedToBeUnuse) {
        markEdgeAsUnusedAnymore(edgesNeedToBeUnuse);
      }
    }
  });
}
