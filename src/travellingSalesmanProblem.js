/**
 * @function getPathLength
 * @param {string[]} nodes
 * @param {object[]} dijkstraSP
 * @param {string} dijkstraSP.node
 * @param {object[]} dijkstraSP.path
 * @param {string} dijkstraSP.path.node
 * @param {number} dijkstraSP.path.distance
 * @param {string} dijkstraSP.path.previous
 * @returns {number}
 */
exports.getPathLength = function(nodes, dijkstraSP) {
    let pathLength = 0;
    for (let i = 0; i < nodes.length-1; i++) {
        const nodeIndex = dijkstraSP.findIndex(node => node.node === nodes[i])
        pathLength += dijkstraSP[nodeIndex].path[dijkstraSP[nodeIndex].path.findIndex(path => path.node === nodes[i+1])].distance;
    }
    return pathLength;
}

/**
 * @function getCompleteShortestPath
 * @param {string[]} nodes
 * @param {object[]} dijkstraSP
 * @param {string} dijkstraSP.node
 * @param {object[]} dijkstraSP.path
 * @param {string} dijkstraSP.path.node
 * @param {number} dijkstraSP.path.distance
 * @param {string} dijkstraSP.path.previous
 * @returns {object[]}
 */
exports.getCompleteShortestPath = function (nodes, dijkstraSP) {
    let completeShortestPath = [];
    for (let i = nodes.length-1; i > 0; i--) {
        let nodeIndex = dijkstraSP.findIndex(node => node.node === nodes[i-1]);
        let node = dijkstraSP[nodeIndex].path.find(path => path.node === nodes[i]);
        while (node.node !== nodes[i-1]) {
            completeShortestPath.push({"nodes":[node.node, node.previous]});
            node = dijkstraSP[nodeIndex].path.find(path => path.node === node.previous);
        }
    }
    return completeShortestPath;
}

/**
 * Function to solve the travelling salesman problem with the exhaustive algorithm, like a robot.
 * @function TSPRobotMethod
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @param {string[]} nodes
 * @returns {object}
 */
exports.TSPRobotMethod = function (graph, nodes) {
    const DijkstraSP = require('./Dijkstra');
    const dijkstraSP = DijkstraSP.getDijkstraShortestPaths(graph);
    const tsp = require('./travellingSalesmanProblem');
    let shortestNodes = [];
    let shortestPathLength = 0;

    function getShortestNodes(knownNodes, remainingNodes) {
        if (remainingNodes.length === 1) {
            let newPath = knownNodes.concat(remainingNodes)
            const newPathLength = tsp.getPathLength(newPath, dijkstraSP);
            if ((newPathLength < shortestPathLength) || (shortestPathLength === 0)) {
                shortestNodes = newPath;
                shortestPathLength = newPathLength;
            }
        } else {
            for (let i = 0; i < remainingNodes.length; i++) {
                const newKnowNodes = knownNodes.concat(remainingNodes[i]);
                let newRemainingNodes = [...remainingNodes];
                newRemainingNodes.splice(i, 1);
                getShortestNodes(newKnowNodes, newRemainingNodes);
            }
        }
    }

    function getShortestPath(nodes) {
        getShortestNodes([], nodes);
        let shortestCompletePath = tsp.getCompleteShortestPath(shortestNodes, dijkstraSP);
        let shortestBriefPath = [];
        for (let i = shortestNodes.length-1; i > 0; i--) {
            shortestBriefPath.push({"nodes": [shortestNodes[i], shortestNodes[i-1]]})
        }
        return {
            complete: shortestCompletePath,
            brief: shortestBriefPath,
            pathLength: tsp.getPathLength(shortestNodes, dijkstraSP)
        };
    }

    return getShortestPath(nodes);
}

/**
 * Function to solve the travelling salesman problem with the random algorithm, like a monkey.
 * @function TSPMonkeyMethod
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @param {string[]} nodes
 * @param {number} allottedTime
 * @returns {object}
 */
exports.TSPMonkeyMethod = function (graph, nodes, allocatedTime = 10000) {
    const t0 = new Date().getTime();
    const DijkstraSP = require('./Dijkstra');
    const dijkstraSP = DijkstraSP.getDijkstraShortestPaths(graph);
    const tsp = require('./travellingSalesmanProblem');
    let shortestNodes = [];
    let shortestPathLength = 0;
    let newPath = [...nodes];
    let swap = "";
    let counter = 1;
    let newPathLength = 0;

    while ((new Date().getTime() - t0) <= allocatedTime) {
        for (let n = 0; n < 10000; n++) {
            for (let i = newPath.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                swap = newPath[i];
                newPath[i] = newPath[j];
                newPath[j] = swap;
            }
            newPathLength = tsp.getPathLength(newPath, dijkstraSP);
            if ((newPathLength < shortestPathLength) || (shortestPathLength === 0)) {
                shortestNodes = [...newPath];
                shortestPathLength = newPathLength;
            }
        }
    }

    let shortestCompletePath = tsp.getCompleteShortestPath(shortestNodes, dijkstraSP);
    let shortestBriefPath = [];
    for (let i = shortestNodes.length-1; i > 0; i--) {
        shortestBriefPath.push({"nodes": [shortestNodes[i], shortestNodes[i-1]]})
    }
    return {
        complete: shortestCompletePath,
        brief: shortestBriefPath,
        pathLength: tsp.getPathLength(shortestNodes, dijkstraSP)
    };
}