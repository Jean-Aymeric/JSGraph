/**
 * @file Dijkstra's shortest path problem algorithm implementation.
 * @author Jean-Aymeric DIET jeanaymeric@gmail.com
 */

/**
 * Function to obtain all Dijkstra's shortest paths of a graph.
 *
 * @function getDijkstraShortestPaths
 * @param {Object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @returns {Object[]}
 */
exports.getDijkstraShortestPaths = function (graph) {
    const jadGraph = require('./JADgraph');
    let dijkstraShortestPaths = [];
    let nodes = jadGraph.getAllNodes(graph);

    function getDijkstraShortestPathByForANode(graph, node) {
        let dijkstraShortestPathForANode = [];
        let knownNodes = [];

        function getNexNodeDistanceByEdge(edge) {
            return edge.weight + (knownNodes.includes(edge.nodes[0]) ?
                dijkstraShortestPathForANode[dijkstraShortestPathForANode.findIndex(e => e.node === (edge.nodes[0]))].distance
                : dijkstraShortestPathForANode[dijkstraShortestPathForANode.findIndex(e => e.node === (edge.nodes[1]))].distance);
        }

        dijkstraShortestPathForANode.push({'node': node, 'distance': 0, 'previous': '-'});
        knownNodes.push(node);
        while (knownNodes.length < nodes.length) {
            let filterGraph = jadGraph.filterByIncludingNodesPath(graph, knownNodes);
            filterGraph.sort(function (a, b) {
                const weightA = getNexNodeDistanceByEdge(a);
                const weightB = getNexNodeDistanceByEdge(b);
                if (weightA < weightB) {
                    return -1;
                }
                if (weightA > weightB) {
                    return 1;
                }
                return 0;
            });
            let edge = filterGraph.shift();
            let newNode = "";
            let previousNode = "";
            if (knownNodes.includes(edge.nodes[0])) {
                newNode = edge.nodes[1];
                previousNode = edge.nodes[0];
            } else {
                newNode = edge.nodes[0];
                previousNode = edge.nodes[1];
            }
            dijkstraShortestPathForANode.push(
                {
                    'node': newNode,
                    'distance': getNexNodeDistanceByEdge(edge),
                    'previous': previousNode
                });
            knownNodes.push(newNode);
        }

        return dijkstraShortestPathForANode;
    }

    for (const node of nodes) {
        dijkstraShortestPaths.push({'node': node, 'path': getDijkstraShortestPathByForANode(graph, node)});
    }

    return dijkstraShortestPaths;
}
