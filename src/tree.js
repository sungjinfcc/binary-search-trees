import Node from "./node";

export default class Tree {
  constructor(array) {
    this.array = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree();
    this.maxHeight = 0;
    this.balanced = true;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  buildTree(array = this.array, start = 0, end = this.array.length - 1) {
    this.balanced = true;
    const mid = Math.floor((start + end) / 2);

    if (start > end) return null;

    const newRoot = new Node(array[mid]);
    newRoot.left = this.buildTree(array, start, mid - 1);
    newRoot.right = this.buildTree(array, mid + 1, end);
    return newRoot;
  }

  insert(value) {
    const newNode = new Node(value);
    let nodeToCompare = this.root;
    while (this.root) {
      if (newNode.data > nodeToCompare.data) {
        if (nodeToCompare.right === null) {
          nodeToCompare.right = newNode;
          return;
        }
        nodeToCompare = nodeToCompare.right;
      } else if (newNode.data < nodeToCompare.data) {
        if (nodeToCompare.left === null) {
          nodeToCompare.left = newNode;
          return;
        }
        nodeToCompare = nodeToCompare.left;
      } else {
        return;
      }
    }
  }

  delete(value) {
    let nodeToCompare = this.root;
    let parent = null;

    while (nodeToCompare) {
      if (value > nodeToCompare.data) {
        parent = nodeToCompare;
        nodeToCompare = nodeToCompare.right;
      } else if (value < nodeToCompare.data) {
        parent = nodeToCompare;
        nodeToCompare = nodeToCompare.left;
      } else {
        if (nodeToCompare.left && nodeToCompare.right) {
          let successor = nodeToCompare.right;
          let successorParent = nodeToCompare;

          while (successor.left) {
            successorParent = successor;
            successor = successor.left;
          }
          nodeToCompare.data = successor.data;
          if (successorParent.left.data === successor.data) {
            successorParent.left = successor.right;
          } else {
            successorParent.right = successor.right;
          }
        } else if (nodeToCompare.right) {
          if (parent.left === nodeToCompare) {
            parent.left = nodeToCompare.right;
          } else {
            parent.right = nodeToCompare.right;
          }
        } else if (nodeToCompare.left) {
          if (parent.left === nodeToCompare) {
            parent.left = nodeToCompare.left;
          } else {
            parent.right = nodeToCompare.left;
          }
        } else if (parent.left === nodeToCompare) {
          parent.left = null;
        } else if (parent.right === nodeToCompare) {
          parent.right = null;
        }
        return;
      }
    }
  }

  find(value) {
    let nodeToCompare = this.root;

    while (nodeToCompare) {
      if (value > nodeToCompare.data) {
        nodeToCompare = nodeToCompare.right;
      } else if (value < nodeToCompare.data) {
        nodeToCompare = nodeToCompare.left;
      } else {
        return nodeToCompare;
      }
    }
    return "Node not found!";
  }

  levelOrder() {
    const myQueue = [];
    myQueue.push(this.root);
    const newArray = [];
    while (myQueue.length !== 0) {
      const node = myQueue.shift();
      newArray.push(node.data);
      if (node.left) myQueue.push(node.left);
      if (node.right) myQueue.push(node.right);
    }
    return newArray;
  }

  preorder(node = this.root, arr = []) {
    arr.push(node.data);
    if (node.left) this.preorder(node.left, arr);
    if (node.right) this.preorder(node.right, arr);
    return arr;
  }

  inorder(node = this.root, arr = []) {
    if (node.left) this.inorder(node.left, arr);
    arr.push(node.data);
    if (node.right) this.inorder(node.right, arr);
    return arr;
  }

  postorder(node = this.root, arr = []) {
    if (node.left) this.postorder(node.left, arr);
    if (node.right) this.postorder(node.right, arr);
    arr.push(node.data);
    return arr;
  }

  height(node) {
    if (node === "Node not found!") return "Node not found!";
    this.maxHeight = 0;
    this.recLevelOrder(node, -1);
    return this.maxHeight;
  }

  recLevelOrder(node, height) {
    const currentHeight = height + 1;
    if (currentHeight > this.maxHeight) this.maxHeight = currentHeight;
    if (node.left) {
      this.recLevelOrder(node.left, currentHeight);
    }
    if (node.right) {
      this.recLevelOrder(node.right, currentHeight);
    }
  }

  depth(node) {
    if (node === "Node not found!") return "Node not found!";
    let nodeToCompare = this.root;
    let depthCount = 0;

    while (nodeToCompare) {
      if (node.data > nodeToCompare.data) {
        nodeToCompare = nodeToCompare.right;
        depthCount += 1;
      } else if (node.data < nodeToCompare.data) {
        nodeToCompare = nodeToCompare.left;
        depthCount += 1;
      } else {
        return depthCount;
      }
    }
  }

  isBalanced(node = this.root) {
    if (node.left && node.right) {
      const heightDiff = Math.abs(
        this.height(node.left) - this.height(node.right)
      );
      if (heightDiff > 1) {
        this.balanced = false;
        return "Unbalanced";
      }
      this.isBalanced(node.left);
      this.isBalanced(node.right);
    } else if (node.left) {
      const heightDiff = Math.abs(this.height(node.left) - -1);
      if (heightDiff > 1) {
        this.balanced = false;
      }
    } else if (node.right) {
      const heightDiff = Math.abs(this.height(node.right) - -1);
      if (heightDiff > 1) {
        this.balanced = false;
      }
    }
    return this.balanced ? "Balanced" : "Unbalanced";
  }

  rebalance() {
    const sortedArray = this.inorder();
    this.array = sortedArray;
    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }
}
