'use strict';

const util = require('./util');
const label = require('./tag');

let interval = 500; // 每次dom变更侦听的延迟时间
let listener; // 变更后的回调
let timeout; // 变更的临时引用
let last; // 上次获取的结果的JSON.stringify暂存

const IGNORE = Object.create(null);
IGNORE.SCRIPT
  = IGNORE.STYLE
  = IGNORE.LINK
  = IGNORE.META
  = IGNORE.TITLE
  = IGNORE.CANVAS
  = IGNORE.SVG
  = IGNORE.APPLET
  = IGNORE.OBJECT
  = IGNORE.EMBED
  = IGNORE.AUDIO
  = IGNORE.VIDEO
  = IGNORE.BR
  = IGNORE.IFRAME
  = IGNORE.FRAME
  = IGNORE.MAP
  = IGNORE.NOFRAMES
  = IGNORE.NOSCRIPT
  = IGNORE.PROGRESS
  = IGNORE.FRAMESET
  = true;

function traverse(node, parentKey, selCache, res) {
  for(let i = 0, children = node.childNodes, len = children.length; i < len; i++) {
    let child = children[i];
    if (child.nodeType === 1) {
      if (IGNORE[child.nodeName]) {
        continue;
      }
      traverse(child, parentKey ? (parentKey + ',' + i) : String(i), selCache, res);
    }
    else if (child.nodeType === 3) {
      let value = child.nodeValue;
      // 去除时间日期等数字
      let list = value.replace(/\d+([/:-])\d+(\1\d+)*/g, '').match(/(?:[+-]?\d*\.\d+)|(?:[+-]?\d+)|(?:\bundefined\b)|(?:\bnull\b)|(?:\bNaN\b)/g);
      if (list && list.length) {
        // 深度遍历取得包含数字text的dom后，计算dom的完整selector
        let sel = getFullSel(node, parentKey, selCache);
        list.forEach((item, j) => {
          res.push({
            k: sel + i + '.' + j,
            v: item,
          });
        });
      }
    }
  }
}

function getFullSel(node, parentKey, selCache) {
  // 有id可以提前直接返回
  if(node.id) {
    return '#' + node.id + '>';
  }
  // 根据parentKey取每一级的sel进行拼接，同时缓存
  let sel = '';
  if(parentKey) {
    let ks = parentKey.split(',');
    let parent = document.body;
    let pk = '';
    // 先计算靠前的和靠根的为后续做缓存，动态规划
    for(let i = 0, len = ks.length; i < len; i++) {
      let k = ks[i];
      let s = getLevelSel(parent.childNodes[k], parent, pk, selCache);
      if(s.charAt(0) === '#') {
        sel = s + '>';
      }
      else {
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
  let selList = [];
  for(let i = 0, children = parent.children, len = children.length; i < len; i++) {
    let child = children[i];
    let key = parentKey ? (parentKey + ',' + i) : String(i);
    let sel = getNodeSel(child, key, selCache);
    // 计算得出sel/{节点在兄弟层的索引即nth-child}.{sel在兄弟层的索引类似nth-of-type}
    if(child === node) {
      let count = 0;
      for(let j = 0, len = selList.length; j < len; j++) {
        if(selList[j] === sel) {
          count++;
        }
      }
      return sel + '/' + i + '.' + count;
    }
    else {
      selList.push(sel);
    }
  }
}

function getNodeSel(node, key, selCache) {
  // 依旧缓存，只要有2个以上的节点计算必然会出现重复，因为每个节点都要计算之前的兄弟以及递归父节点的之前的兄弟
  if(selCache[key]) {
    return selCache[key];
  }
  let sel = label.encode(node.nodeName);
  let cn = util.trim(Array.prototype.join.call(node.classList, '.'));
  if(cn) {
    sel += '.' + cn;
  }
  return selCache[key] = sel;
}

function exec() {
  if(typeof document !== 'undefined') {
    let res = [];
    traverse(document.body, '', Object.create(null), res);
    return res;
  }
}


let callback = function(mutationsList) {
  if(util.isFunction(listener)) {
    let has = false;
    for(let i = 0, len = mutationsList.length; i < len; i++) {
      let mutation = mutationsList[i];
      let target = mutation.target;
      if(target && !IGNORE[target.nodeName]) {
        has = true;
        break;
      }
    }
    if(has) {
      if(timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      // 间隔时间可能为0，但是由于MutationObserver本身是异步，所以达不到同步效果
      timeout = setTimeout(function() {
        let res = exec();
        let s = JSON.stringify(res);
        if(last !== s) {
          last = s;
          if(s) {
            listener(res, s);
          }
        }
      }, interval);
    }
  }
};

let observer;
function addObserver() {
  if(typeof document !== 'undefined' && typeof MutationObserver !== 'undefined') {
    if(!observer) {
      observer = new MutationObserver(function(mutationsList) {
        callback(mutationsList);
      });
    }
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
}

module.exports = {
  collect() {
    return exec();
  },
  observe(time, cb) {
    // 只有cb
    if(util.isFunction(time)) {
      cb = time;
      time = interval;
    }
    interval = time;
    interval = Math.max(0, interval);
    listener = cb;
    addObserver();
  },
  collectAndObserve(time, cb) {
    // 只有cb
    if(util.isFunction(time)) {
      cb = time;
      time = interval;
    }
    let res = this.collect();
    this.observe(time, cb);
    return res;
  },
  disconnect() {
    if(observer) {
      observer.disconnect();
    }
  },
};
