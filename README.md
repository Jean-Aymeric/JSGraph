# Module to obtain minimum spanning tree of a graph.
Author : [jeanaymeric@gmail.com](mailto:jeanaymeric@gmail.com")
### Three algorithms are implemented :
- **Prim** with the function getPrimTree()
- **Kruskal** with the function getKruskalTree()
- **Boruvka** with the function getBoruvkaTree()

### There's also a function to calculate the weight of a graph : getTotalWeight()

All the function take a graph parameter.
It's an array of edges. Edge's constructed like this :
|**Key**|**Type**|Description|
|----|----|-|-|
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
