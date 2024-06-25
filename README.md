# The Challenge
The provided code is meant to solve an online challenge. 
The challenge is to find the shortest path from each house to each market. There are bridges and piers in between houses and markets. For each road there is a weight and we must find the minimum path for each house to each market.

## Solution
solution is provided in a few steps:
1. The first thing we are doing is to create a weighted directed graph from user input.

- **A:** Every house, bridge, pier, and market is considered a node and the graph is created in the `graph.js` file using 

`function createGraph(houses, markets, bridges, piers)`

function.

- **B:** Weight of each edge is calculated using the following formula:
```|(height1 - height2 + 1) * type|```
where `type` is 2 for pedestrians and it is 1 for bicycle riders and `height1, height2` is the height of the two nodes belonging to this edge.

2. for each house we calculate the shortest path from its corresponding node to all market nodes using the Dijkstra algorithm.

**Dijkstra:** is an algorithm that finds the shortest path from all nodes to a certain node (called source).

## Time Complexity
One important factor to consider is time complexity.
Dijkstra algorithm has a time complexity of `O(V^2)` where V is the number of vertexes (in this problem sum of the number of  **houses + piers + bridges + markets**)

**BUT** Dijkstra algorithm could be improved by using `Fibonacci heap` as a priority queue and that would decrease its order to `O(E + V log V)` (*V* is a number of vertexes and *E* is the number of edges).

As we have used `Fibonacci heap` in this implementation and we are calling Dijkstra H times (H = the number of houses), the final time complexity of the problem is `O(H*(E + V LOG V))`.

**NOTE:** To implement Fibonacci heap in javascript I used this repository: https://github.com/gwtw/js-fibonacci-heap

## Visualization
for a better understanding of what is the result of the solution, I implemented a visualization of the final graph using https://visjs.github.io/vis-network/ `vis-network` repository.

here is a screenshot of the project:
![screen shot](https://github.com/sajjadpoores/shortest-path-problem/blob/main/screenshot.png?raw=true)

`Hint`:
:large_orange_diamond: orange nodes are bridges.

:red_circle: red nodes are piers.

:purple_heart: purple nodes are markets.

:green_heart: green nodes are houses.


:red_circle: red edges are used as the shortest path (the number inside `[`bracket`]` is the shortest path from that node to the source.)

:yellow_heart: yellow edges were chosen for the shortest path before red edges were found.
