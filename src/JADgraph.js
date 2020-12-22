/**
 * @file Module to obtain minimum spanning tree of a graph.
 * @author Jean-Aymeric DIET jeanaymeric@gmail.com
 */

function compareByWeight(a, b) {
    if (a.weight < b.weight) {
        return -1;
    }
    if (a.weight > b.weight) {
        return 1;
    }
    return 0;
}

function getAllNodes(graph) {
    let allNodes = [];
    for (const edge of graph) {
        if (!allNodes.includes(edge.nodes[0])) {
            allNodes.push(edge.nodes[0]);
        }
        if (!allNodes.includes(edge.nodes[1])) {
            allNodes.push(edge.nodes[1]);
        }
    }
    return allNodes;
}

function getAllNodesObjects(graph) {
    let allNodesObjects = [];
    for (const edge of graph) {
        if (!allNodesObjects.find(node => node.name === edge.nodes[0])) {
            allNodesObjects.push({ 'name': edge.nodes[0] });
        }
        if (!allNodesObjects.find(node => node.name === edge.nodes[1])) {
            allNodesObjects.push({ 'name': edge.nodes[1] });
        }
    }
    return allNodesObjects;
}

function filterByIncludingNodesPath(array, nodesToInclude) {
    return array.filter(function (element) {
        return nodesToInclude.includes(element.nodes[0]) ^ nodesToInclude.includes(element.nodes[1]);
    })
}

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
    let nodes = getAllNodes(graph);
    let knownNodes = [];
    knownNodes.push(nodes.shift());
    let primTree = [];
    while (nodes.length > 0) {
        let filterGraph = filterByIncludingNodesPath(graph, knownNodes);
        filterGraph.sort(compareByWeight);
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
    let cloneGraph = [...graph];
    let nodes = getAllNodesObjects(cloneGraph);
    let kruskalTree = [];
    let i = 0;
    for (const node of nodes) {
        node.cycle = i++;
    }

    cloneGraph.sort(compareByWeight);
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
    let cloneGraph = [...graph];
    let nodes = getAllNodesObjects(cloneGraph);
    let boruvkaTree = [];
    let numberOfMergedNodes = 0;
    for (const node of nodes) {
        node.merge = node.name;
        numberOfMergedNodes++;
    }

    cloneGraph.sort(compareByWeight);
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
