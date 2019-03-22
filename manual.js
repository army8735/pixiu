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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/manual.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/manual.js":
/*!***********************!*\
  !*** ./src/manual.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(/*! ./util */ "./src/util.js");

var attrName = 'pixiu'; // 属性标签标识

var interval = 500; // 每次dom变更侦听的延迟时间

var listener; // 变更后的回调

var timeout; // 变更的临时引用

var last; // 上次获取的结果的JSON.stringify暂存

var IGNORE = Object.create(null);
IGNORE.BODY = IGNORE.SCRIPT = IGNORE.STYLE = true;

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

      var k = util.trim(dom.getAttribute(attrName));

      if (k) {
        var v = util.trim(dom.innerText);

        if (v) {
          // 数组形式不定量
          if (/\[]$/.test(k)) {
            if (hash[k]) {
              if (hash[k].list) {
                hash[k].v.push(v);
              } // 之前不是数组覆盖
              else {
                  console.warn('pixiu found a duplicate k/v: ' + k + '/' + v);
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
                console.warn('pixiu found a duplicate k/v: ' + k + '/' + v);
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

var callback = function callback(mutationsList) {
  if (util.isFunction(listener)) {
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
  collect: function collect(key) {
    if (key !== undefined) {
      attrName = key;
    }

    return exec();
  },
  observe: function observe(key, time, cb) {
    // 没有key
    if (util.isNumber(key)) {
      cb = time;
      time = key;
    } else {
      attrName = key;
    }

    interval = time;
    interval = Math.max(0, interval);
    listener = cb;
    addObserver();
  },
  collectAndObserve: function collectAndObserve(key, time, cb) {
    // 没有key
    if (util.isNumber(key)) {
      cb = time;
      time = key;
      key = undefined;
    } // 只有cb


    if (util.isFunction(time)) {
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
//# sourceMappingURL=manual.js.map