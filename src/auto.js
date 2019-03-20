'use strict';

import util from './util';

let interval = 500;
let listener;
let timeout;
let last;

function isNumberString(s) {
  return /([+-]?\d?.\d*)|([+-]?\d+)/.test(s);
}

function traverse(node, parentKey, selCache, res) {
  for(let i = 0, childNodes = node.childNodes, len = childNodes.length; i < len; i++) {
    let child = childNodes[i];
    if(child.nodeType === 1) {
      traverse(child, parentKey ? (parentKey + ',' + i) : String(i), selCache, res);
    }
    else if(child.nodeType === 3) {
      // 只需关注唯一文本节点的情况数字
      if(len === 1) {
        let s = util.trim(child.nodeValue);
        if(isNumberString(s)) {
          console.warn(child.parentNode, child.data, child.nodeValue, parentKey);
          let sel = getSel(child.parentNode, parentKey, selCache);
          res.push({
            k: sel,
            v: s,
          });
        }
      }
    }
  }
}

function getSel(parentNode, parentKey, selCache) {
  let ks = parentKey.split(',');
  for(let i = 0, len = ks.length; i < len - 1; i++) {}
}

function exec() {
  if(typeof document !== 'undefined') {
    let res = [];
    traverse(document.body, '', Object.create(null), res);
    return res;
  }
}

let pixiu = typeof window !== 'undefined' ? (window.pixiu || {}) : {};

pixiu.auto = {
  collect() {
    return exec();
  },
};

if(typeof window !== 'undefined' && !window.pixiu) {
  window.pixiu = pixiu;
}

export default pixiu;
