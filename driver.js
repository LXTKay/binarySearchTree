import { Tree } from "./binarySearchTree.js";
import { prettyPrint } from "./prettyPrint.js";

const c = console.log;

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
};

function randomArray(amount, min, max){
  let arr = [];
  for(let i = 0; i < amount; i++){
    arr.push(randomNumberBetween(min ,max))
  };
  return arr;
};

function driver(){
  let tree = new Tree(randomArray(50, 0, 100));
  prettyPrint(tree.root);
  c(tree.isBalanced());
  c(tree.levelOrder());
  c(tree.inOrder());
  c(tree.preOrder());
  c(tree.postOrder());
  let arr = randomArray(20, 101, 100000);
  arr.forEach(element => {
    tree.insert(element);
  });
  prettyPrint(tree.root);
  c(tree.isBalanced());
  tree.rebalance();
  c(tree.isBalanced());
  c(tree.levelOrder());
  c(tree.inOrder());
  c(tree.preOrder());
  c(tree.postOrder());
  prettyPrint(tree.root);
}

driver()