function findNextNode(queue) {
  return queue.reduce(function (prev, curr) {
    return prev.distanceToSource < curr.distanceToSource ? prev : curr;
  });
}

function dikstra(startNode) {
  startNode.distanceToSource = 0;

  const queue = [startNode, ...bridgesNodes, ...piersNodes, ...marketsNodes];
  let heap = new FibonacciHeap((a, b) => {
    return +(a.key.distanceToSource - b.key.distanceToSource);
  });
  queue.forEach((q) => heap.insert(q));

  let candidate;
  while ((candidate = heap.extractMinimum())) {
    candidate = candidate.key;
    candidate.output.forEach((edge) => {
      edge.node.distanceToSource = Math.min(
        edge.node.distanceToSource,
        candidate.distanceToSource + edge.weight
      );
    });
  }
  
    console.log(marketsNodes.map(i => i.distanceToSource));
}
