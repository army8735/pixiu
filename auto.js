(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/auto.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/auto.js":
/*!*********************!*\
  !*** ./src/auto.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(/*! ./util */ "./src/util.js");

var label = __webpack_require__(/*! ./tag */ "./src/tag.js");

var interval = 500; // 每次dom变更侦听的延迟时间

var listener; // 变更后的回调

var timeout; // 变更的临时引用

var last; // 上次获取的结果的JSON.stringify暂存

var IGNORE = Object.create(null);
IGNORE.SCRIPT = IGNORE.STYLE = IGNORE.LINK = IGNORE.META = IGNORE.TITLE = IGNORE.CANVAS = IGNORE.SVG = IGNORE.APPLET = IGNORE.OBJECT = IGNORE.EMBED = IGNORE.AUDIO = IGNORE.VIDEO = IGNORE.BR = IGNORE.IFRAME = IGNORE.FRAME = IGNORE.MAP = IGNORE.NOFRAMES = IGNORE.NOSCRIPT = IGNORE.PROGRESS = IGNORE.FRAMESET = true;

function traverse(node, parentKey, selCache, res) {
  var _loop = function _loop(i, children, len) {
    var child = children[i];

    if (child.nodeType === 1) {
      if (IGNORE[child.nodeName.toUpperCase()]) {
        return "continue";
      }

      traverse(child, parentKey ? parentKey + ',' + i : String(i), selCache, res);
    } else if (child.nodeType === 3) {
      var value = child.nodeValue; // 去除时间日期等数字

      var list = value.replace(/\d+([/:-])\d+(\1\d+)*/g, '').match(/(?:[+-]?\d+(?:,\d{3})+(?:\.\d+)?)|(?:[+-]?\d*\.\d+)|(?:[+-]?\d+)|(?:\bundefined\b)|(?:\bnull\b)|(?:\bNaN\b)/g);

      if (list && list.length) {
        // 深度遍历取得包含数字text的dom后，计算dom的完整selector
        var sel = getFullSel(node, parentKey, selCache);
        list.forEach(function (item, j) {
          res.push({
            k: sel + i + '.' + j,
            v: item
          });
        });
      }
    }
  };

  for (var i = 0, children = node.childNodes, len = children.length; i < len; i++) {
    var _ret = _loop(i, children, len);

    if (_ret === "continue") continue;
  }
}

function getFullSel(node, parentKey, selCache) {
  // 有id可以提前直接返回
  if (node.id) {
    return '#' + node.id + '>';
  } // 根据parentKey取每一级的sel进行拼接，同时缓存


  var sel = '';

  if (parentKey) {
    var ks = parentKey.split(',');
    var parent = document.body;
    var pk = ''; // 先计算靠前的和靠根的为后续做缓存，动态规划

    for (var i = 0, len = ks.length; i < len; i++) {
      var k = ks[i];
      var s = getLevelSel(parent.childNodes[k], parent, pk, selCache);

      if (s.charAt(0) === '#') {
        sel = s + '>';
      } else {
        sel += s + '>';
      }

      pk += ',' + k;
      parent = parent.childNodes[k];
    }
  }

  return sel;
}

function getLevelSel(node, parent, parentKey, selCache) {
  // id直接返回
  if (node.id) {
    return '#' + node.id;
  }

  for (var i = 0, children = parent.children, len = children.length; i < len; i++) {
    var child = children[i];
    var key = parentKey ? parentKey + ',' + i : String(i); // 计算得出sel/{节点在兄弟层的索引即nth-child}

    if (child === node) {
      var sel = getNodeSel(child, key, selCache);
      return sel + '/' + i;
    }
  }
}

function getNodeSel(node, key, selCache) {
  // 依旧缓存，只要有2个以上的节点计算必然会出现重复，因为每个节点都要计算之前的兄弟以及递归父节点的之前的兄弟
  if (selCache[key]) {
    return selCache[key];
  }

  var sel = label.encode(node.nodeName.toUpperCase());
  var cn = util.trim(Array.prototype.join.call(node.classList, '.'));

  if (cn) {
    sel += '.' + cn;
  }

  return selCache[key] = sel;
}

function exec() {
  if (typeof document !== 'undefined') {
    var res = [];
    traverse(document.body, '', Object.create(null), res);
    return res;
  }
}

var callback = function callback(mutationsList) {
  if (util.isFunction(listener)) {
    var has = false;

    for (var i = 0, len = mutationsList.length; i < len; i++) {
      var mutation = mutationsList[i];
      var target = mutation.target;

      if (target && !IGNORE[target.nodeName.toUpperCase()]) {
        has = true;
        break;
      }
    }

    if (has) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      } // 间隔时间可能为0，但是由于MutationObserver本身是异步，所以达不到同步效果


      timeout = setTimeout(function () {
        var res = exec();
        var s = JSON.stringify(res);

        if (last !== s) {
          last = s;

          if (s) {
            listener(res, s);
          }
        }
      }, interval);
    }
  }
};

var observer;

function addObserver() {
  if (typeof document !== 'undefined' && typeof MutationObserver !== 'undefined') {
    if (!observer) {
      observer = new MutationObserver(function (mutationsList) {
        callback(mutationsList);
      });
    }

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }
}

module.exports = {
  collect: function collect() {
    return exec();
  },
  observe: function observe(time, cb) {
    // 只有cb
    if (util.isFunction(time)) {
      cb = time;
      time = interval;
    }

    interval = time;
    interval = Math.max(0, interval);
    listener = cb;
    addObserver();
  },
  collectAndObserve: function collectAndObserve(time, cb) {
    // 只有cb
    if (util.isFunction(time)) {
      cb = time;
      time = interval;
    }

    var res = this.collect();
    this.observe(time, cb);
    return res;
  },
  disconnect: function disconnect() {
    if (observer) {
      observer.disconnect();
    }
  }
};

/***/ }),

/***/ "./src/tag.js":
/*!********************!*\
  !*** ./src/tag.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hash = Object.create(null);
hash.DIV = '0';
hash.P = '1';
hash.A = '2';
hash.SPAN = '3';
hash.UL = '4';
hash.LI = '5';
hash.OL = '6';
hash.DL = '7';
hash.DD = '8';
hash.DT = '9';
hash.STRONG = 'a';
hash.B = 'b';
hash.U = 'c';
hash.TABLE = 'd';
hash.TH = 'e';
hash.TD = 'f';
hash.PRE = 'g';
hash.INPUT = 'h';
hash.SELECT = 'i';
hash.OPTION = 'j';
hash.TEXTAREA = 'k';
hash.FONT = 'l';
hash.EM = 'm';
hash.SMALL = 'n';
hash.ABBR = 'o';
hash.ADDRESS = 'p';
hash.ARTICLE = 'q';
hash.ASIDE = 'r';
hash.BIG = 's';
hash.BLOCKQUOTE = 't';
hash.BUTTON = 'u';
hash.CAPTION = 'v';
hash.CENTER = 'w';
hash.DEL = 'x';
hash.FIELDSET = 'y';
hash.FONT = 'z';
hash.FOOTER = 'A';
hash.HEADER = 'B';
hash.SECTION = 'C';
hash.H1 = 'D';
hash.H2 = 'E';
hash.H3 = 'F';
hash.H4 = 'G';
hash.H5 = 'H';
hash.H6 = 'I';
hash.I = 'J';
hash.INS = 'K';
hash.LABEL = 'L';
hash.MENU = 'M';
hash.OPTION = 'N';
hash.S = 'O';
hash.Q = 'P';
hash.SUB = 'Q';
hash.SUP = 'R';
hash.STRIKE = 'S';
var reverse = Object.create(null);

for (var i in hash) {
  reverse[hash[i]] = i;
}

module.exports = {
  encode: function encode(s) {
    if (!s) {
      return s;
    }

    return hash[s] || s;
  },
  decode: function decode(s) {
    if (!s) {
      return s;
    }

    return reverse[s] || s;
  },
  decodeAll: function decodeAll(s) {
    var _this = this;

    if (!s) {
      return s;
    }

    var list = s.replace(/>\d+\.\d+$/, '').split('>');
    return list.map(function (item) {
      var arr = item.split('/');
      var sel = arr[0];

      if (sel.charAt(0) !== '#') {
        sel = _this.decode(sel.charAt(0)).toLowerCase() + sel.slice(1);
      }

      return sel + ':nth-child(' + (parseInt(arr[1]) + 1) + ')';
    }).join('>');
  }
};

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

function isType(type) {
  return function (obj) {
    return toString.call(obj) === '[object ' + type + ']';
  };
}

module.exports = {
  trim: function trim(s) {
    return (s || '').replace(/^\s+/, '').replace(/\s+$/, '');
  },
  isObject: isType('Object'),
  isString: isType('String'),
  isFunction: isType('Function'),
  isNumber: isType('Number'),
  isBoolean: isType('Boolean'),
  isDate: isType('Date')
};

/***/ })

/******/ });
});
//# sourceMappingURL=auto.js.map