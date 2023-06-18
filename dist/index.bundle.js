"use strict";
(self["webpackChunkbinary_search_trees"] = self["webpackChunkbinary_search_trees"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree */ "./src/tree.js");


const myArray = [];
for (let i = 0; i < 10; i++) {
  myArray.push(Math.floor(Math.random() * 100) + 1);
}
const myTree = new _tree__WEBPACK_IMPORTED_MODULE_0__["default"](myArray);
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


/***/ }),

/***/ "./src/node.js":
/*!*********************!*\
  !*** ./src/node.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Node)
/* harmony export */ });
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}


/***/ }),

/***/ "./src/tree.js":
/*!*********************!*\
  !*** ./src/tree.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tree)
/* harmony export */ });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./src/node.js");


class Tree {
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

    const newRoot = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](array[mid]);
    newRoot.left = this.buildTree(array, start, mid - 1);
    newRoot.right = this.buildTree(array, mid + 1, end);
    return newRoot;
  }

  insert(value) {
    const newNode = new _node__WEBPACK_IMPORTED_MODULE_0__["default"](value);
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


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQTBCOztBQUUxQjtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQSxtQkFBbUIsNkNBQUk7QUFDdkI7QUFDQSx5QkFBeUIsb0JBQW9COztBQUU3QyxzQkFBc0Isb0JBQW9CO0FBQzFDLG9CQUFvQixrQkFBa0I7QUFDdEMscUJBQXFCLG1CQUFtQjtBQUN4QyxtQkFBbUIsaUJBQWlCOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixvQkFBb0I7O0FBRTdDO0FBQ0E7QUFDQSx5QkFBeUIsb0JBQW9COztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM3QmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOMEI7O0FBRVg7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU8sRUFBRSx5QkFBeUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxVQUFVO0FBQ2pFO0FBQ0EscUNBQXFDLE9BQU8sRUFBRSx5QkFBeUI7QUFDdkU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsd0JBQXdCLDZDQUFJO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLDZDQUFJO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZXMvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlcy8uL3NyYy9ub2RlLmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZXMvLi9zcmMvdHJlZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJlZSBmcm9tIFwiLi90cmVlXCI7XG5cbmNvbnN0IG15QXJyYXkgPSBbXTtcbmZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICBteUFycmF5LnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDEpO1xufVxuY29uc3QgbXlUcmVlID0gbmV3IFRyZWUobXlBcnJheSk7XG5teVRyZWUucHJldHR5UHJpbnQoKTtcbmNvbnNvbGUubG9nKGBCYWxhbmNlZD8gJHtteVRyZWUuaXNCYWxhbmNlZCgpfWApO1xuXG5jb25zb2xlLmxvZyhgbGV2ZWw6ICR7bXlUcmVlLmxldmVsT3JkZXIoKX1gKTtcbmNvbnNvbGUubG9nKGBwcmU6ICR7bXlUcmVlLnByZW9yZGVyKCl9YCk7XG5jb25zb2xlLmxvZyhgcG9zdDogJHtteVRyZWUucG9zdG9yZGVyKCl9YCk7XG5jb25zb2xlLmxvZyhgaW46ICR7bXlUcmVlLmlub3JkZXIoKX1gKTtcblxubXlUcmVlLmluc2VydCgzMTApO1xubXlUcmVlLmluc2VydCgxMjUpO1xubXlUcmVlLmluc2VydCg2NzcpO1xubXlUcmVlLnByZXR0eVByaW50KCk7XG5jb25zb2xlLmxvZyhgQmFsYW5jZWQ/ICR7bXlUcmVlLmlzQmFsYW5jZWQoKX1gKTtcblxubXlUcmVlLnJlYmFsYW5jZSgpO1xubXlUcmVlLnByZXR0eVByaW50KCk7XG5jb25zb2xlLmxvZyhgQmFsYW5jZWQ/ICR7bXlUcmVlLmlzQmFsYW5jZWQoKX1gKTtcblxubXlUcmVlLmRlbGV0ZSgzMTApO1xubXlUcmVlLnByZXR0eVByaW50KCk7XG5jb25zb2xlLmxvZyhteVRyZWUuZmluZCg2NSkpO1xuY29uc29sZS5sb2cobXlUcmVlLmhlaWdodChteVRyZWUuZmluZCg2NSkpKTtcbmNvbnNvbGUubG9nKG15VHJlZS5kZXB0aChteVRyZWUuZmluZCg2NSkpKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLmxlZnQgPSBudWxsO1xuICAgIHRoaXMucmlnaHQgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgTm9kZSBmcm9tIFwiLi9ub2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWUge1xuICBjb25zdHJ1Y3RvcihhcnJheSkge1xuICAgIHRoaXMuYXJyYXkgPSBbLi4ubmV3IFNldChhcnJheSldLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICB0aGlzLnJvb3QgPSB0aGlzLmJ1aWxkVHJlZSgpO1xuICAgIHRoaXMubWF4SGVpZ2h0ID0gMDtcbiAgICB0aGlzLmJhbGFuY2VkID0gdHJ1ZTtcbiAgfVxuXG4gIHByZXR0eVByaW50KG5vZGUgPSB0aGlzLnJvb3QsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpIHtcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5wcmV0dHlQcmludChcbiAgICAgICAgbm9kZS5yaWdodCxcbiAgICAgICAgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilIIgICBcIiA6IFwiICAgIFwifWAsXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUlOKUgOKUgCBcIiA6IFwi4pSM4pSA4pSAIFwifSR7bm9kZS5kYXRhfWApO1xuICAgIGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucHJldHR5UHJpbnQobm9kZS5sZWZ0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIiAgICBcIiA6IFwi4pSCICAgXCJ9YCwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGRUcmVlKGFycmF5ID0gdGhpcy5hcnJheSwgc3RhcnQgPSAwLCBlbmQgPSB0aGlzLmFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICB0aGlzLmJhbGFuY2VkID0gdHJ1ZTtcbiAgICBjb25zdCBtaWQgPSBNYXRoLmZsb29yKChzdGFydCArIGVuZCkgLyAyKTtcblxuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBuZXdSb290ID0gbmV3IE5vZGUoYXJyYXlbbWlkXSk7XG4gICAgbmV3Um9vdC5sZWZ0ID0gdGhpcy5idWlsZFRyZWUoYXJyYXksIHN0YXJ0LCBtaWQgLSAxKTtcbiAgICBuZXdSb290LnJpZ2h0ID0gdGhpcy5idWlsZFRyZWUoYXJyYXksIG1pZCArIDEsIGVuZCk7XG4gICAgcmV0dXJuIG5ld1Jvb3Q7XG4gIH1cblxuICBpbnNlcnQodmFsdWUpIHtcbiAgICBjb25zdCBuZXdOb2RlID0gbmV3IE5vZGUodmFsdWUpO1xuICAgIGxldCBub2RlVG9Db21wYXJlID0gdGhpcy5yb290O1xuICAgIHdoaWxlICh0aGlzLnJvb3QpIHtcbiAgICAgIGlmIChuZXdOb2RlLmRhdGEgPiBub2RlVG9Db21wYXJlLmRhdGEpIHtcbiAgICAgICAgaWYgKG5vZGVUb0NvbXBhcmUucmlnaHQgPT09IG51bGwpIHtcbiAgICAgICAgICBub2RlVG9Db21wYXJlLnJpZ2h0ID0gbmV3Tm9kZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbm9kZVRvQ29tcGFyZSA9IG5vZGVUb0NvbXBhcmUucmlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKG5ld05vZGUuZGF0YSA8IG5vZGVUb0NvbXBhcmUuZGF0YSkge1xuICAgICAgICBpZiAobm9kZVRvQ29tcGFyZS5sZWZ0ID09PSBudWxsKSB7XG4gICAgICAgICAgbm9kZVRvQ29tcGFyZS5sZWZ0ID0gbmV3Tm9kZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbm9kZVRvQ29tcGFyZSA9IG5vZGVUb0NvbXBhcmUubGVmdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZWxldGUodmFsdWUpIHtcbiAgICBsZXQgbm9kZVRvQ29tcGFyZSA9IHRoaXMucm9vdDtcbiAgICBsZXQgcGFyZW50ID0gbnVsbDtcblxuICAgIHdoaWxlIChub2RlVG9Db21wYXJlKSB7XG4gICAgICBpZiAodmFsdWUgPiBub2RlVG9Db21wYXJlLmRhdGEpIHtcbiAgICAgICAgcGFyZW50ID0gbm9kZVRvQ29tcGFyZTtcbiAgICAgICAgbm9kZVRvQ29tcGFyZSA9IG5vZGVUb0NvbXBhcmUucmlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlIDwgbm9kZVRvQ29tcGFyZS5kYXRhKSB7XG4gICAgICAgIHBhcmVudCA9IG5vZGVUb0NvbXBhcmU7XG4gICAgICAgIG5vZGVUb0NvbXBhcmUgPSBub2RlVG9Db21wYXJlLmxlZnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobm9kZVRvQ29tcGFyZS5sZWZ0ICYmIG5vZGVUb0NvbXBhcmUucmlnaHQpIHtcbiAgICAgICAgICBsZXQgc3VjY2Vzc29yID0gbm9kZVRvQ29tcGFyZS5yaWdodDtcbiAgICAgICAgICBsZXQgc3VjY2Vzc29yUGFyZW50ID0gbm9kZVRvQ29tcGFyZTtcblxuICAgICAgICAgIHdoaWxlIChzdWNjZXNzb3IubGVmdCkge1xuICAgICAgICAgICAgc3VjY2Vzc29yUGFyZW50ID0gc3VjY2Vzc29yO1xuICAgICAgICAgICAgc3VjY2Vzc29yID0gc3VjY2Vzc29yLmxlZnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIG5vZGVUb0NvbXBhcmUuZGF0YSA9IHN1Y2Nlc3Nvci5kYXRhO1xuICAgICAgICAgIGlmIChzdWNjZXNzb3JQYXJlbnQubGVmdC5kYXRhID09PSBzdWNjZXNzb3IuZGF0YSkge1xuICAgICAgICAgICAgc3VjY2Vzc29yUGFyZW50LmxlZnQgPSBzdWNjZXNzb3IucmlnaHQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1Y2Nlc3NvclBhcmVudC5yaWdodCA9IHN1Y2Nlc3Nvci5yaWdodDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZVRvQ29tcGFyZS5yaWdodCkge1xuICAgICAgICAgIGlmIChwYXJlbnQubGVmdCA9PT0gbm9kZVRvQ29tcGFyZSkge1xuICAgICAgICAgICAgcGFyZW50LmxlZnQgPSBub2RlVG9Db21wYXJlLnJpZ2h0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQucmlnaHQgPSBub2RlVG9Db21wYXJlLnJpZ2h0O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChub2RlVG9Db21wYXJlLmxlZnQpIHtcbiAgICAgICAgICBpZiAocGFyZW50LmxlZnQgPT09IG5vZGVUb0NvbXBhcmUpIHtcbiAgICAgICAgICAgIHBhcmVudC5sZWZ0ID0gbm9kZVRvQ29tcGFyZS5sZWZ0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQucmlnaHQgPSBub2RlVG9Db21wYXJlLmxlZnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHBhcmVudC5sZWZ0ID09PSBub2RlVG9Db21wYXJlKSB7XG4gICAgICAgICAgcGFyZW50LmxlZnQgPSBudWxsO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcmVudC5yaWdodCA9PT0gbm9kZVRvQ29tcGFyZSkge1xuICAgICAgICAgIHBhcmVudC5yaWdodCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZpbmQodmFsdWUpIHtcbiAgICBsZXQgbm9kZVRvQ29tcGFyZSA9IHRoaXMucm9vdDtcblxuICAgIHdoaWxlIChub2RlVG9Db21wYXJlKSB7XG4gICAgICBpZiAodmFsdWUgPiBub2RlVG9Db21wYXJlLmRhdGEpIHtcbiAgICAgICAgbm9kZVRvQ29tcGFyZSA9IG5vZGVUb0NvbXBhcmUucmlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlIDwgbm9kZVRvQ29tcGFyZS5kYXRhKSB7XG4gICAgICAgIG5vZGVUb0NvbXBhcmUgPSBub2RlVG9Db21wYXJlLmxlZnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbm9kZVRvQ29tcGFyZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFwiTm9kZSBub3QgZm91bmQhXCI7XG4gIH1cblxuICBsZXZlbE9yZGVyKCkge1xuICAgIGNvbnN0IG15UXVldWUgPSBbXTtcbiAgICBteVF1ZXVlLnB1c2godGhpcy5yb290KTtcbiAgICBjb25zdCBuZXdBcnJheSA9IFtdO1xuICAgIHdoaWxlIChteVF1ZXVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgY29uc3Qgbm9kZSA9IG15UXVldWUuc2hpZnQoKTtcbiAgICAgIG5ld0FycmF5LnB1c2gobm9kZS5kYXRhKTtcbiAgICAgIGlmIChub2RlLmxlZnQpIG15UXVldWUucHVzaChub2RlLmxlZnQpO1xuICAgICAgaWYgKG5vZGUucmlnaHQpIG15UXVldWUucHVzaChub2RlLnJpZ2h0KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0FycmF5O1xuICB9XG5cbiAgcHJlb3JkZXIobm9kZSA9IHRoaXMucm9vdCwgYXJyID0gW10pIHtcbiAgICBhcnIucHVzaChub2RlLmRhdGEpO1xuICAgIGlmIChub2RlLmxlZnQpIHRoaXMucHJlb3JkZXIobm9kZS5sZWZ0LCBhcnIpO1xuICAgIGlmIChub2RlLnJpZ2h0KSB0aGlzLnByZW9yZGVyKG5vZGUucmlnaHQsIGFycik7XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGlub3JkZXIobm9kZSA9IHRoaXMucm9vdCwgYXJyID0gW10pIHtcbiAgICBpZiAobm9kZS5sZWZ0KSB0aGlzLmlub3JkZXIobm9kZS5sZWZ0LCBhcnIpO1xuICAgIGFyci5wdXNoKG5vZGUuZGF0YSk7XG4gICAgaWYgKG5vZGUucmlnaHQpIHRoaXMuaW5vcmRlcihub2RlLnJpZ2h0LCBhcnIpO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBwb3N0b3JkZXIobm9kZSA9IHRoaXMucm9vdCwgYXJyID0gW10pIHtcbiAgICBpZiAobm9kZS5sZWZ0KSB0aGlzLnBvc3RvcmRlcihub2RlLmxlZnQsIGFycik7XG4gICAgaWYgKG5vZGUucmlnaHQpIHRoaXMucG9zdG9yZGVyKG5vZGUucmlnaHQsIGFycik7XG4gICAgYXJyLnB1c2gobm9kZS5kYXRhKTtcbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgaGVpZ2h0KG5vZGUpIHtcbiAgICBpZiAobm9kZSA9PT0gXCJOb2RlIG5vdCBmb3VuZCFcIikgcmV0dXJuIFwiTm9kZSBub3QgZm91bmQhXCI7XG4gICAgdGhpcy5tYXhIZWlnaHQgPSAwO1xuICAgIHRoaXMucmVjTGV2ZWxPcmRlcihub2RlLCAtMSk7XG4gICAgcmV0dXJuIHRoaXMubWF4SGVpZ2h0O1xuICB9XG5cbiAgcmVjTGV2ZWxPcmRlcihub2RlLCBoZWlnaHQpIHtcbiAgICBjb25zdCBjdXJyZW50SGVpZ2h0ID0gaGVpZ2h0ICsgMTtcbiAgICBpZiAoY3VycmVudEhlaWdodCA+IHRoaXMubWF4SGVpZ2h0KSB0aGlzLm1heEhlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XG4gICAgaWYgKG5vZGUubGVmdCkge1xuICAgICAgdGhpcy5yZWNMZXZlbE9yZGVyKG5vZGUubGVmdCwgY3VycmVudEhlaWdodCk7XG4gICAgfVxuICAgIGlmIChub2RlLnJpZ2h0KSB7XG4gICAgICB0aGlzLnJlY0xldmVsT3JkZXIobm9kZS5yaWdodCwgY3VycmVudEhlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgZGVwdGgobm9kZSkge1xuICAgIGlmIChub2RlID09PSBcIk5vZGUgbm90IGZvdW5kIVwiKSByZXR1cm4gXCJOb2RlIG5vdCBmb3VuZCFcIjtcbiAgICBsZXQgbm9kZVRvQ29tcGFyZSA9IHRoaXMucm9vdDtcbiAgICBsZXQgZGVwdGhDb3VudCA9IDA7XG5cbiAgICB3aGlsZSAobm9kZVRvQ29tcGFyZSkge1xuICAgICAgaWYgKG5vZGUuZGF0YSA+IG5vZGVUb0NvbXBhcmUuZGF0YSkge1xuICAgICAgICBub2RlVG9Db21wYXJlID0gbm9kZVRvQ29tcGFyZS5yaWdodDtcbiAgICAgICAgZGVwdGhDb3VudCArPSAxO1xuICAgICAgfSBlbHNlIGlmIChub2RlLmRhdGEgPCBub2RlVG9Db21wYXJlLmRhdGEpIHtcbiAgICAgICAgbm9kZVRvQ29tcGFyZSA9IG5vZGVUb0NvbXBhcmUubGVmdDtcbiAgICAgICAgZGVwdGhDb3VudCArPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRlcHRoQ291bnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNCYWxhbmNlZChub2RlID0gdGhpcy5yb290KSB7XG4gICAgaWYgKG5vZGUubGVmdCAmJiBub2RlLnJpZ2h0KSB7XG4gICAgICBjb25zdCBoZWlnaHREaWZmID0gTWF0aC5hYnMoXG4gICAgICAgIHRoaXMuaGVpZ2h0KG5vZGUubGVmdCkgLSB0aGlzLmhlaWdodChub2RlLnJpZ2h0KVxuICAgICAgKTtcbiAgICAgIGlmIChoZWlnaHREaWZmID4gMSkge1xuICAgICAgICB0aGlzLmJhbGFuY2VkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBcIlVuYmFsYW5jZWRcIjtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNCYWxhbmNlZChub2RlLmxlZnQpO1xuICAgICAgdGhpcy5pc0JhbGFuY2VkKG5vZGUucmlnaHQpO1xuICAgIH0gZWxzZSBpZiAobm9kZS5sZWZ0KSB7XG4gICAgICBjb25zdCBoZWlnaHREaWZmID0gTWF0aC5hYnModGhpcy5oZWlnaHQobm9kZS5sZWZ0KSAtIC0xKTtcbiAgICAgIGlmIChoZWlnaHREaWZmID4gMSkge1xuICAgICAgICB0aGlzLmJhbGFuY2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2RlLnJpZ2h0KSB7XG4gICAgICBjb25zdCBoZWlnaHREaWZmID0gTWF0aC5hYnModGhpcy5oZWlnaHQobm9kZS5yaWdodCkgLSAtMSk7XG4gICAgICBpZiAoaGVpZ2h0RGlmZiA+IDEpIHtcbiAgICAgICAgdGhpcy5iYWxhbmNlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5iYWxhbmNlZCA/IFwiQmFsYW5jZWRcIiA6IFwiVW5iYWxhbmNlZFwiO1xuICB9XG5cbiAgcmViYWxhbmNlKCkge1xuICAgIGNvbnN0IHNvcnRlZEFycmF5ID0gdGhpcy5pbm9yZGVyKCk7XG4gICAgdGhpcy5hcnJheSA9IHNvcnRlZEFycmF5O1xuICAgIHRoaXMucm9vdCA9IHRoaXMuYnVpbGRUcmVlKHNvcnRlZEFycmF5LCAwLCBzb3J0ZWRBcnJheS5sZW5ndGggLSAxKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9