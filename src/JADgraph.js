/**
 * @file Module to manipulate graph.
 * @author Jean-Aymeric DIET jeanaymeric@gmail.com
 */

/**
 * Function to obtain the total weight of a graph.
 * @function getTotalWeight
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @returns {number}
 */
exports.getTotalWeight = function (graph) {
    let totalWeight = 0;
    for (const edge of graph) {
        totalWeight += edge.weight;
    }
    return totalWeight;
}

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
    const commonGraphFunctions = require('./commonGraphFunctions');
    let nodes = commonGraphFunctions.getAllNodes(graph);
    let knownNodes = [];
    knownNodes.push(nodes.shift());
    let primTree = [];
    while (nodes.length > 0) {
        let filterGraph = commonGraphFunctions.filterByIncludingNodesPath(graph, knownNodes);
        filterGraph.sort(commonGraphFunctions.compareByWeight);
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

/**
 * Function to obtain the Prim's minimum spanning tree of a graph.
 *
 * @function getKruskalTree
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @returns {Object[]}
 */
exports.getKruskalTree = function (graph) {
    const commonGraphFunctions = require('./commonGraphFunctions');
    let cloneGraph = [...graph];
    let nodes = commonGraphFunctions.getAllNodesObjects(cloneGraph);
    let kruskalTree = [];
    let i = 0;
    for (const node of nodes) {
        node.cycle = i++;
    }

    cloneGraph.sort(commonGraphFunctions.compareByWeight);
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

/**
 * Function to obtain the Prim's minimum spanning tree of a graph.
 *
 * @function getBoruvkaTree
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @returns {Object[]}
 */
exports.getBoruvkaTree = function (graph) {
    const commonGraphFunctions = require('./commonGraphFunctions');
    let cloneGraph = [...graph];
    let nodes = commonGraphFunctions.getAllNodesObjects(cloneGraph);
    let boruvkaTree = [];
    let numberOfMergedNodes = 0;
    for (const node of nodes) {
        node.merge = node.name;
        numberOfMergedNodes++;
    }

    cloneGraph.sort(commonGraphFunctions.compareByWeight);
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
