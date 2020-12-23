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
