/**
 * @file Kruskal's minimum spanning tree algorithm implementation.
 * @author Jean-Aymeric DIET jeanaymeric@gmail.com
 */

/**
 * Function to obtain the Kruskal's minimum spanning tree of a graph.
 *
 * @function getKruskalTree
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @returns {Object[]}
 */
exports.getKruskalTree = function (graph) {
    const jadGraph = require('./JADgraph');
    let cloneGraph = [...graph];
    let nodes = jadGraph.getAllNodesObjects(cloneGraph);
    let kruskalTree = [];
    let i = 0;
    for (const node of nodes) {
        node.cycle = i++;
    }

    cloneGraph.sort(jadGraph.compareByWeight);
    while (cloneGraph.length > 0) {
        let edge = cloneGraph.shift();
        let cycle1 = nodes[nodes.findIndex(node => node.name === edge.nodes[0])].cycle;
        let cycle2 = nodes[nodes.findIndex(node => node.name === edge.nodes[1])].cycle;
        if (cycle1 !== cycle2) {
            kruskalTree.push(edge);
            for (const node of nodes) {
                if (node.cycle === cycle2) {
                    node.cycle = cycle1;
                }
            }
        }
    }

    return kruskalTree;
}
