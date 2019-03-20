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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/auto.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/auto.js":
/*!*********************!*\
  !*** ./src/auto.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");



var interval = 500;
var listener;
var timeout;
var last;

function isNumberString(s) {
  return /([+-]?\d?.\d*)|([+-]?\d+)/.test(s);
}

function traverse(node, parentKey, selCache, res) {
  for (var i = 0, childNodes = node.childNodes, len = childNodes.length; i < len; i++) {
    var child = childNodes[i];

    if (child.nodeType === 1) {
      traverse(child, parentKey ? parentKey + ',' + i : String(i), selCache, res);
    } else if (child.nodeType === 3) {
      // 只需关注唯一文本节点的情况数字
      if (len === 1) {
        var s = _util__WEBPACK_IMPORTED_MODULE_0__["default"].trim(child.nodeValue);

        if (isNumberString(s)) {
          console.warn(child.parentNode, child.data, child.nodeValue, parentKey);
          var sel = getSel(child.parentNode, parentKey, selCache);
          res.push({
            k: sel,
            v: s
          });
        }
      }
    }
  }
}

function getSel(parentNode, parentKey, selCache) {
  var ks = parentKey.split(',');

  for (var i = 0, len = ks.length; i < len - 1; i++) {}
}

function exec() {
  if (typeof document !== 'undefined') {
    var res = [];
    traverse(document.body, '', Object.create(null), res);
    return res;
  }
}

var pixiu = typeof window !== 'undefined' ? window.pixiu || {} : {};
pixiu.auto = {
  collect: function collect() {
    return exec();
  }
};

if (typeof window !== 'undefined' && !window.pixiu) {
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
    return toString.call(obj) === '[object ' + type + ']';
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
//# sourceMappingURL=auto.js.map