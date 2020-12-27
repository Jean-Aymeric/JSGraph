# Module to manipulate graph.
![Eslint](https://github.com/Jean-Aymeric/JSGraph/workflows/Eslint/badge.svg)

Author : [jeanaymeric@gmail.com](mailto:jeanaymeric@gmail.com")

JsDoc : [https://jean-aymeric.github.io/JSGraph/](https://jean-aymeric.github.io/JSGraph/)
### I used the board game ___Les aventuriers du rail Europe___ to experiment with it.
The board game is published by [Days of wonder](https://www.daysofwonder.com/)

![Game board of Les aventuriers du rail Europe](https://github.com/Jean-Aymeric/JSGraph/raw/master/img/lesaventuriersdurail.jpg)

Initial tree's weight : 269

Initial tree's edges : 90
<img alt='Graph of Les aventuriers du rail Europe' src='https://github.com/Jean-Aymeric/JSGraph/raw/master/img/AventuriersDuRailEurope.svg' with='350'/>

### Four algorithms are implemented :
- **Prim** with the function getPrimTree()
  - Prim MST's weight : 113
  - Prim MST's edges : 47
    <img alt='Animated graph of Prim MST' src='https://github.com/Jean-Aymeric/JSGraph/raw/master/img/PrimMST.svg' with='350px'/>
- **Kruskal** with the function getKruskalTree()
  - Kruskal MST's weight : 113
  - Kruskal MST's edges : 47
    <img alt='Animated graph of Kruskal MST' src='https://github.com/Jean-Aymeric/JSGraph/raw/master/img/KruskalMST.svg' with='350px'/>
- **Boruvka** with the function getBoruvkaTree()
  - Boruvka MST's weight : 113
  - Boruvka MST's edges : 47
    <img alt='Animated graph of Boruvka MST' src='https://github.com/Jean-Aymeric/JSGraph/raw/master/img/BoruvkaMST.svg' with='350px'/>
- **Dijkstra** with the function getDijkstraShortestPaths()
  - [The result json file](dijkstraSP.json)

### There's also a function to calculate the weight of a graph : getTotalWeight()

All the function take a graph parameter.

It's an array of edges. Edge's constructed like this :
|Key|Type|Description|
|----|----|-|
|weight|string|The edge's weight |
|nodes |array |The 2 edge's nodes in string| |

Edge's example :
```
{
    "weight": 3,
    "nodes": [
        "Paris",
        "Frankfurt"
    ]
}
```
