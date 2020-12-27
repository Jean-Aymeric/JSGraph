/**
 * @function robot
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @param {string[]} nodes
 * @returns {object}
 */
exports.robot = function (graph, nodes) {
    const DijkstraSP = require('./Dijkstra');
    let dijkstraSP = DijkstraSP.getDijkstraShortestPaths(graph);
    let shortestNodes = [];
    let shortestPathLength = 0;

    function getPathLength(nodes) {
        let pathLength = 0;
        for (let i = 0; i < nodes.length-1; i++) {
            const nodeIndex = dijkstraSP.findIndex(node => node.node === nodes[i])
            pathLength += dijkstraSP[nodeIndex].path[dijkstraSP[nodeIndex].path.findIndex(path => path.node === nodes[i+1])].distance;
        }
        return pathLength;
    }

    function getShortestNodes(knownNodes, remainingNodes) {
        if (remainingNodes.length === 1) {
            let newPath = knownNodes.concat(remainingNodes)
            const newPathLength = getPathLength(newPath);
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

    function getCompleteShortestPath(nodes) {
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

    function getShortestPath(nodes) {
        getShortestNodes([], nodes);
        let shortestCompletePath = getCompleteShortestPath(shortestNodes);
        let shortestBriefPath = [];
        for (let i = shortestNodes.length-1; i > 0; i--) {
            shortestBriefPath.push({"nodes": [shortestNodes[i], shortestNodes[i-1]]})
        }
        return {
            complete: shortestCompletePath,
            brief: shortestBriefPath
        };
    }

    return getShortestPath(nodes);
}