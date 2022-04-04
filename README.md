# Communere challenge
The provided code is meant to solve the cummunere company's challege. The challenge is a shortest path problem, where there are some houses and markets and some bridges and piers in between and we want to find the shortest path from each house to each market.

## Solution
solution is provided in a few steps:
1. The first thing we are doing is to create a weighted directed graph from user input.

**A:** Every house, bridge, pier, market is considered as a node and the graph is created in `graph.js` file using `function createGraph(houses, markets, bridges, piers)` function.
**B:** Weight of each edge is calculated using following formula:
```|(height1 - height2 + 1) * type|```
where `type` is 2 for pedestrians and it is 1 for bicycle riders and `height1, height2` is the height of the two nodes belonging to this edge.

2. for each house calculating the shortest path from it's node to all market nodes using Dijkstra algorithm.

**Dijkstra:** is a algorithm that finds the shortest path from all nodes to a certain node (called source).

## Time Complexity
One important factor to consider is time complexity.
Dijkstra algorithm has time complexity of `O(V^2)` where V is the number of vertexes (in this problem sum of number of  **houses + piers + bridges + markets**)

**BUT** Dijkstra algorithm could be improved by using `Fibonacci heap` as priority queue and that would decrease its order to `O(E + V log V)` (*V* is number of vertexes and *E* is number of edges).

As we have used `Fibonacci heap` in this implementation the final time complexity of the problem is `O(H*(E + V LOG V)`.

**NOTE:** To implement fibonacci heap in javascript I used this repository: https://github.com/gwtw/js-fibonacci-heap

## Visualization
for better understanding of what is the result of the solution I implemented a visualization of the final graph using https://visjs.github.io/vis-network/ `vis-network` repository.

here is a screenshot of project:
![screen shot](https://github.com/sajjadpoores/shortest-path-problem/blob/main/screenshot.png?raw=true)

`Hint`:
:red_circle: red edges are answer
:yellow_heart: yellow edges were choosed for shortest path before red edges being found.