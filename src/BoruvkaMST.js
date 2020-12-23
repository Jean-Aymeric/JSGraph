/**
 * @file Buruvka's minimum spanning tree algorithm implementation.
 * @author Jean-Aymeric DIET jeanaymeric@gmail.com
 */

/**
 * Function to obtain the Boruvka's minimum spanning tree of a graph.
 *
 * @function getBoruvkaTree
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @returns {Object[]}
 */
exports.getBoruvkaTree = function (graph) {
    const jadGraph = require('./JADgraph');
    let cloneGraph = [...graph];
    let nodes = jadGraph.getAllNodesObjects(cloneGraph);
    let boruvkaTree = [];
    let numberOfMergedNodes = 0;
    for (const node of nodes) {
        node.merge = node.name;
        numberOfMergedNodes++;
    }

    cloneGraph.sort(jadGraph.compareByWeight);
    while (numberOfMergedNodes > 1) {
        let edge = cloneGraph.shift();
        let merge1 = nodes[nodes.findIndex(node => node.name === edge.nodes[0])].merge;
        let merge2 = nodes[nodes.findIndex(node => node.name === edge.nodes[1])].merge;
        if (merge1 !== merge2) {
            boruvkaTree.push(edge);
            for (const node of nodes) {
                if (node.merge === merge2) {
                    node.merge = merge1;
                }
            }
        }
        numberOfMergedNodes = 0;
        let mergedNodes = new Set();
        for (const node of nodes) {
            mergedNodes.add(node.merge);
        }
        numberOfMergedNodes = mergedNodes.size;
    }

    return boruvkaTree;
}
