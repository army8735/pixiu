/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/manual.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/manual.js":
/*!***********************!*\
  !*** ./src/manual.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");



var attrName = 'pixiu';
var interval = 500;
var listener;
var timeout;
var IGNORE = Object.create(null);
IGNORE.BODY = IGNORE.SCRIPT = IGNORE.STYLE = true;

var callback = function callback(mutationsList) {
  if (_util__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(listener)) {
    var has = false;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var mutation = _step.value;
        var target = mutation.target;

        if (target && !IGNORE[target.nodeName]) {
          has = true;
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (has) {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(function () {
        listener(exec());
      }, interval);
    }
  }
};

var observer;

function exec() {
  if (typeof document !== 'undefined') {
    var list = document.querySelectorAll("[".concat(attrName, "]"));
    var res = [];
    var hash = Object.create(null);

    for (var i = 0, len = list.length; i < len; i++) {
      var dom = list[i]; // 只能包含一个文本节点

      if (dom.childNodes.length !== 1 || dom.firstChild.nodeType !== 3) {
        continue;
      }

      var k = _util__WEBPACK_IMPORTED_MODULE_0__["default"].trim(dom.getAttribute(attrName));

      if (k) {
        var v = _util__WEBPACK_IMPORTED_MODULE_0__["default"].trim(dom.innerText);

        if (v) {
          // 数组形式不定量
          if (/\[]$/.test(k)) {
            if (hash[k]) {
              if (hash[k].list) {
                hash[k].v.push(v);
              } // 之前不是数组覆盖
              else {
                  console.warn('pixiu found a duplicate k-v: ' + k + '-' + v);
                  var arr = [v];
                  hash[k].list = true;
                  hash[k].v = arr;
                  res[hash[k].index] = {
                    k: k,
                    v: arr
                  };
                }
            } else {
              var _arr = [v];
              hash[k] = {
                index: res.length,
                list: true,
                v: _arr
              };
              res.push({
                k: k,
                v: _arr
              });
            }
          } // 普通的单个
          else {
              // 重复的替换
              if (hash[k]) {
                console.warn('pixiu found a duplicate k-v: ' + k + '-' + v);
                hash[k].list = false;
                res[hash[k].index] = {
                  k: k,
                  v: v
                };
              } else {
                hash[k] = {
                  index: res.length
                };
                res.push({
                  k: k,
                  v: v
                });
              }
            }
        }
      }
    }

    return res;
  }
}

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

var pixiu = {
  collect: function collect(key) {
    if (key !== undefined) {
      attrName = key;
    }

    return exec();
  },
  observe: function observe(time, cb) {
    interval = time || interval;
    interval = Math.max(0, interval);
    listener = cb;
    addObserver();
  },
  collectAndObserver: function collectAndObserver(key, time, cb) {
    // 没有key
    if (_util__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(key)) {
      cb = time;
      time = key;
      key = undefined;
    } // 只有cb


    if (_util__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(time)) {
      cb = time;
      key = undefined;
      time = undefined;
    }

    var res = this.collect(key);
    this.observe(time, cb);
    return res;
  },
  disconnect: function disconnect() {
    if (observer) {
      observer.disconnect();
    }
  }
};

if (typeof window !== 'undefined') {
  window.pixiu = pixiu;
}

/* harmony default export */ __webpack_exports__["default"] = (pixiu);

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


var toString = {}.toString;

function isType(type) {
  return function (obj) {
    return toString.call(obj) == '[object ' + type + ']';
  };
}

/* harmony default export */ __webpack_exports__["default"] = ({
  trim: function trim(s) {
    return (s || '').replace(/^\s+/, '').replace(/\s+$/, '');
  },
  isObject: isType('Object'),
  isString: isType('String'),
  isFunction: isType('Function'),
  isNumber: isType('Number'),
  isBoolean: isType('Boolean'),
  isDate: isType('Date')
});

/***/ })

/******/ });
//# sourceMappingURL=manual.js.map