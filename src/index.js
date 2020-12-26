'use strict';

const jadGraph = require('./JADgraph');
const KruskalMST = require('./KruskalMST');
const PrimMST = require('./PrimMST');
const BoruvkaMST = require('./BoruvkaMST');
const DijkstraSP = require('./Dijkstra');
const fs = require('fs');

let europePaths = require('./AventuriersDuRailEurope.json');
let kruskalTree = KruskalMST.getKruskalTree(europePaths);
let primTree = PrimMST.getPrimTree(europePaths);
let boruvkaTree = BoruvkaMST.getBoruvkaTree(europePaths);
let dijkstraSP = DijkstraSP.getDijkstraShortestPaths(europePaths);

function generateSVG(fileName, nodes, edges, allEdges = '') {
    let svg = '';
    svg += '<svg width="700px" height="446px" version="1.1" xmlns="http://www.w3.org/2000/svg">\n';
    if (allEdges != '') {
        svg += jadGraph.edgesTolineSvg(nodes, allEdges, "lightgrey");
    }
    svg += jadGraph.edgesTolineSvg(nodes, edges, "blue", true);
    svg += jadGraph.nodesToNamedCirclesSvg(nodes);
    svg += '</svg>\n';
    fs.writeFile(fileName, svg, (errno) => {
        if (errno) {
            throw errno;
        }
        console.log(fileName + ' saved');
    })
}

console.log("Initial tree's weight : " + jadGraph.getTotalWeight(europePaths));
console.log("Initial tree's edges : " + Array.from(europePaths).length);

console.log("\nKruskal MST's weight : " + jadGraph.getTotalWeight(kruskalTree));
console.log("Kruskal MST's edges : " + kruskalTree.length);

console.log("\nPrim MST's weight : " + jadGraph.getTotalWeight(primTree));
console.log("Prim MST's edges : " + primTree.length);

console.log("\nBoruvka MST's weight : " + jadGraph.getTotalWeight(boruvkaTree));
console.log("Boruvka MST's edges : " + boruvkaTree.length);

fs.writeFile('dijkstraSP.json', JSON.stringify(dijkstraSP, null, 4), (errno) => {
    if (errno) {
        throw errno;
    }
    console.log("Dijkstra's shortest paths saved in dijkstraSP.json");
})

let allNodes = require('./allNodes.json');
generateSVG('KruskalMST.svg', allNodes, kruskalTree, europePaths);
generateSVG('PrimMST.svg', allNodes, primTree, europePaths);
generateSVG('BoruvkaMST.svg', allNodes, boruvkaTree, europePaths);
generateSVG('map.svg', allNodes, europePaths);
