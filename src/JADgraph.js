/**
 * @file Functions to manipulate graph.
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
 * Function to obtain an array of all name's nodes contained in the graph.
 * @function getTotalWeight
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @returns {string[]}
 */
exports.getAllNodes = function (graph) {
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

/**
 * Function to obtain an array of all nodes contained in the graph.
 * @function getTotalWeight
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @returns {object[]}
 */
exports.getAllNodesObjects = function (graph) {
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

/**
 * Function to compare two elements by their weight. Use it in array.sort().
 * @param {object} a
 * @param {number} a.weight
 * @param {string[]} a.nodes
 * @param {object} b
 * @param {number} b.weight
 * @param {string[]} b.nodes
 * @return {number}
 */
exports.compareByWeight = function (a, b) {
    if (a.weight < b.weight) {
        return -1;
    }
    if (a.weight > b.weight) {
        return 1;
    }
    return 0;
}

/**
 * Function to find if a edge contains one and only one node from nodesToInclude
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @param {string[]} nodesToInclude
 * @return {object[]}
 */
exports.filterByIncludingNodesPath = function (graph, nodesToInclude) {
    return graph.filter(function (element) {
        return nodesToInclude.includes(element.nodes[0]) ^ nodesToInclude.includes(element.nodes[1]);
    })
}

exports.nodesToNamedCirclesSvg = function (nodes) {
    let svg = '';
    for (const node of nodes) {
        svg += '<circle cx="' + node.x + '" cy="' + node.y + '" r="5" fill="red" />\n';
        svg += '<text x="' + (node.x + 7) + '" y="' + node.y + '" fill="red">' + node.name +'</text>\n';
    }
    return svg;
}

exports.edgesTolineSvg = function (nodes, edges, color, blink = false) {
    let svg = '';
    let i = 1;
    for (const edge of edges) {
        let node1Index = nodes.findIndex(node => node.name === edge.nodes[0]);
        let node2Index = nodes.findIndex(node => node.name === edge.nodes[1]);

        svg += '<line' +
            ' x1="' + nodes[node1Index].x + '" y1="' + nodes[node1Index].y + '"' +
            ' x2="' + nodes[node2Index].x + '" y2="' + nodes[node2Index].y + '"' +
            ' stroke="' + color + '" stroke-width=' + (blink?'"0"':'"5"') + '>';
        if (blink) {
            svg += '\n\t<animate attributeName="stroke-width" from="10" to="0" dur="4s" begin="edge' + (nodes.length-1) +'.end" fill="freeze"/>';
            svg += '\n\t<animate id="edge' + i + '"' +
                ' attributeName="stroke-width" from="0" to="5" dur="0.2s" fill="freeze"' +
                ' begin=' + ((i == 1) ? '"0s;edge' + (nodes.length-1) +'.end + 4s"' : '"edge' + (i-1) + '.end"') +
                ' />';
            i++;
        }
        svg += '\n</line>\n';
    }
    return svg;
}