import Tree from "./tree";

const myArray = [];
for (let i = 0; i < 10; i++) {
  myArray.push(Math.floor(Math.random() * 100) + 1);
}
const myTree = new Tree(myArray);
myTree.prettyPrint();
console.log(`Balanced? ${myTree.isBalanced()}`);

console.log(`level: ${myTree.levelOrder()}`);
console.log(`pre: ${myTree.preorder()}`);
console.log(`post: ${myTree.postorder()}`);
console.log(`in: ${myTree.inorder()}`);

myTree.insert(310);
myTree.insert(125);
myTree.insert(677);
myTree.prettyPrint();
console.log(`Balanced? ${myTree.isBalanced()}`);

myTree.rebalance();
myTree.prettyPrint();
console.log(`Balanced? ${myTree.isBalanced()}`);

myTree.delete(310);
myTree.prettyPrint();
console.log(myTree.find(65));
console.log(myTree.height(myTree.find(65)));
console.log(myTree.depth(myTree.find(65)));

console.log(`level: ${myTree.levelOrder()}`);
console.log(`pre: ${myTree.preorder()}`);
console.log(`post: ${myTree.postorder()}`);
console.log(`in: ${myTree.inorder()}`);
