'use strict';

const jadGraph = require('./JADgraph');
let europePaths = require('./AventuriersDuRailEurope.json');

let kruskalTree = jadGraph.getKruskalTree(europePaths);
let primTree = jadGraph.getPrimTree(europePaths);
let boruvkaTree = jadGraph.getBoruvkaTree(europePaths);

console.log("Poids de l'arbre initial : " + jadGraph.getTotalWeight(europePaths));
console.log("Nombre de chemin de l'arbre initial : " + Array.from(europePaths).length);

console.log("\nPoids de l'arbre couvrant minimum avec Kruskal : " + jadGraph.getTotalWeight(kruskalTree));
console.log("Nombre de chemin de l'arbre couvrant minimum avec Kruskal : " + kruskalTree.length);

console.log("\nPoids de l'arbre couvrant minimum avec Prim : " + jadGraph.getTotalWeight(primTree));
console.log("Nombre de chemin de l'arbre couvrant minimum avec Prim : " + primTree.length);

console.log("\nPoids de l'arbre couvrant minimum avec Boruvka : " + jadGraph.getTotalWeight(boruvkaTree));
console.log("Nombre de chemin de l'arbre couvrant minimum avec Boruvka : " + boruvkaTree.length);
