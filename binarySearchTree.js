"use strict"

import { prettyPrint } from "./prettyPrint.js";

class Node {
  constructor(value){
    this.value = value;
  }
  left = null;
  right = null;
}

export class Tree{
  constructor(array){
    array = array.sort( (a, b) => a - b );
    let filtered = array.filter((element, index) => {
      return array.indexOf(element) === index;
    });
    this.root = this.buildTree(filtered)
  };
  buildTree(array){ 
    if(array.length == 0) return null;
    let mid = Math.floor((array.length - 1) / 2);
    let node = new Node(array[mid]);
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1, array.length));
    return node;
  };
  insert(value, currentNode = this.root){
    if(value == currentNode.value) return;
    if(value > currentNode.value) {
      if(!(currentNode.right == null)) {
        this.insert(value, currentNode.right);
        return;
      };
      currentNode.right = new Node(value);
    };
    if(value < currentNode.value){
      if(!(currentNode.left == null)) {
        this.insert(value, currentNode.left);
        return;
      };
      currentNode.left = new Node(value);
    };
  };
  remove(value, node = this.root){
    if(node == null) return null;
    if(value < node.value) {
      node.left = this.remove(value, node.left);
    } else if(value > node.value){
      node.right = this.remove(value, node.right);
    } else {
      if(node.left == null && node.right == null){
        //no child
        node = null;
      } else if(node.left == null){
        //one child
        node = node.right;
      } else if (node.right == null){
        node = node.left;
      } else {
        //two children
        let minNode = this.findMin(node.right);
        node.value = minNode.value;
        node.right = this.remove(node.value, node.right);
      };
    };
    return node;
  };
  findMin(node){
    if(node.left != null) return this.findMin(node.left);
    return node;
  };
  find(value, node = this.root){
    if(node == null) return "Not found";
    if(value == node.value) return node;
    if(value < node.value) return this.find(value, node.left);
    if(value > node.value) return this.find(value, node.right);
  };
  levelOrder(callback = null, node = this.root){
    let queue = []
    if(node == null) return;
    let arr = [];
    queue.push(node);
    while(queue.length > 0){
      let current = queue.shift();
      if(callback == null){
        arr.push(current.value);
      }
      else{
        callback(current);
      }
      if(current.left != null) queue.push(current.left);
      if(current.right != null) queue.push(current.right);
    }
    if(callback == null) return arr;
  };
  inOrder(callback = null, node = this.root, arr = []){
    if(node == null) return;
    this.inOrder(callback, node.left, arr);
    if(callback == null){
      arr.push(node.value);
    } else {
      callback(node);
    };
    this.inOrder(callback, node.right, arr);
    if(callback == null) return arr;
  };
  preOrder(callback = null, node = this.root, arr = []){
    if(node == null) return;
    if(callback == null){
      arr.push(node.value);
    } else {
      callback(node);
    };
    this.preOrder(callback, node.left, arr);
    this.preOrder(callback, node.right, arr);
    if(callback == null) return arr;
  };
  postOrder(callback = null, node = this.root, arr = []){
    if(node == null) return;
    this.postOrder(callback, node.left, arr);
    this.postOrder(callback, node.right, arr);
    if(callback == null){
      arr.push(node.value);
    } else {
      callback(node);
    };
    if(callback == null) return arr;
  };
  height(node = this.root) {
    if (node == null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  };
  depth(node = null, root = this.root, d = 0) {
    if (node == null) return null;
    if (root == null) return 0;
    if (root === node) return d;
    let count = this.depth(node, root.left, d + 1);
    if (count != 0) return count;
    return this.depth(node, root.right, d + 1);
  };
  isBalanced(node = this.root) {
    if (node === null) return true;
    const difference = Math.abs(this.height(node.left) - this.height(node.right));
    if(difference <= 1
    && this.isBalanced(node.left)
    && this.isBalanced(node.right)){
      return true;
    }
    return false;
  };
  rebalance(){
    let arr = this.inOrder();
    this.root = (new Tree(arr)).root;
  }
};