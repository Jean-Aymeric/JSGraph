/**
 * @function robot
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @param {string} start
 * @param {string} end
 * @param {string[]} nodes
 */
exports.robot = function (graph, start, end, nodes) {
    const DijkstraSP = require('./Dijkstra');
    let dijkstraSP = DijkstraSP.getDijkstraShortestPaths(graph);
    let shortestPath = [];

    function getPathLength(nodes) {
        let pathLength = 0;
        for (let i = 0; i < nodes.length-1; i++) {
            pathLength += dijkstraSP[dijkstraSP.findIndex(node => node.node === nodes[i])].path.findIndex(path => path.node === nodes[i+1]).distance;
        }
        return pathLength;
    }

    function getShortestNodes(nodes) {
        let shortestNodes = [];
        let pathLength = 0;
        if (nodes.length === 1) {
            return nodes;
        } else {
            for (let i = 0; i < nodes.length; i++) {
                let newNodes = [...nodes];
                newNodes.splice(i,1);
                let newPath = [nodes[i]].concat(getShortestNodes(newNodes));
                if ( (pathLength > getPathLength(newPath)) || (pathLength === 0) ) {
                    shortestNodes = [...newPath];
                }
            }
        }

        return shortestNodes;
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
        let shortestNodes = getShortestNodes(nodes);
        shortestPath = getCompleteShortestPath(shortestNodes);
        return shortestPath;
    }

    return getShortestPath(nodes);
}