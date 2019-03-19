'use strict';

import util from './util';

let attrName = 'pixiu';
let interval = 500;
let listener;
let timeout;

const IGNORE = Object.create(null);
IGNORE.BODY = IGNORE.SCRIPT = IGNORE.STYLE = true;

let callback = function(mutationsList) {
  if(util.isFunction(listener)) {
    let has = false;
    for(let mutation of mutationsList) {
      let target = mutation.target;
      if(target && !IGNORE[target.nodeName]) {
        has = true;
        break;
      }
    }
    if(has) {
      if(timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function() {
        listener(exec());
      }, interval);
    }
  }
};
let observer;

function exec() {
  if(typeof document !== 'undefined') {
    let list = document.querySelectorAll(`[${attrName}]`);
    let res = [];
    let hash = Object.create(null);
    for(let i = 0, len = list.length; i < len; i++) {
      let dom = list[i];
      // 只能包含一个文本节点
      if(dom.childNodes.length !== 1 || dom.firstChild.nodeType !== 3) {
        continue;
      }
      let k = util.trim(dom.getAttribute(attrName));
      if(k) {
        let v = util.trim(dom.innerText);
        if(v) {
          // 数组形式不定量
          if(/\[]$/.test(k)) {
            if(hash[k]) {
              if(hash[k].list) {
                hash[k].v.push(v);
              }
              // 之前不是数组覆盖
              else {
                console.warn('pixiu found a duplicate k/v: ' + k + '/' + v);
                let arr = [v];
                hash[k].list = true;
                hash[k].v = arr;
                res[hash[k].index] = {
                  k,
                  v: arr,
                };
              }
            }
            else {
              let arr = [v];
              hash[k] = {
                index: res.length,
                list: true,
                v: arr,
              };
              res.push({
                k,
                v: arr,
              });
            }
          }
          // 普通的单个
          else {
            // 重复的替换
            if(hash[k]) {
              console.warn('pixiu found a duplicate k/v: ' + k + '/' + v);
              hash[k].list = false;
              res[hash[k].index] = {
                k,
                v,
              };
            }
            else {
              hash[k] = {
                index: res.length,
              };
              res.push({
                k,
                v,
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

let pixiu = {
  collect(key) {
    if(key !== undefined) {
      attrName = key;
    }
    return exec();
  },
  observe(time, cb) {
    interval = time || interval;
    interval = Math.max(0, interval);
    listener = cb;
    addObserver();
  },
  collectAndObserver(key, time, cb) {
    // 没有key
    if(util.isNumber(key)) {
      cb = time;
      time = key;
      key = undefined;
    }
    // 只有cb
    if(util.isFunction(time)) {
      cb = time;
      key = undefined;
      time = undefined;
    }
    let res = this.collect(key);
    this.observe(time, cb);
    return res;
  },
  disconnect() {
    if(observer) {
      observer.disconnect();
    }
  },
};

if(typeof window !== 'undefined') {
  window.pixiu = pixiu;
}

export default pixiu;
