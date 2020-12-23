/**
 * @file Prim's minimum spanning tree algorithm implementation.
 * @author Jean-Aymeric DIET jeanaymeric@gmail.com
 */

/**
 * Function to obtain the Prim's minimum spanning tree of a graph.
 *
 * @function getPrimTree
 * @param {Object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @returns {Object[]}
 */
exports.getPrimTree = function (graph) {
    const jadGraph = require('./JADgraph');
    let nodes = jadGraph.getAllNodes(graph);
    let knownNodes = [];
    knownNodes.push(nodes.shift());
    let primTree = [];
    while (nodes.length > 0) {
        let filterGraph = jadGraph.filterByIncludingNodesPath(graph, knownNodes);
        filterGraph.sort(jadGraph.compareByWeight);
        let edge = filterGraph.shift();
        primTree.push(edge);
        let nodeToPush;
        if (!knownNodes.includes(edge.nodes[0])) {
            nodeToPush = edge.nodes[0];
        } else {
            nodeToPush = edge.nodes[1];
        }
        knownNodes.push(nodeToPush);
        nodes.splice(nodes.indexOf(nodeToPush), 1);
    }

    return primTree;
}
