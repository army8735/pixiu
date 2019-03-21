'use strict';

import util from './util';

let attrName = 'pixiu'; // 属性标签标识
let interval = 500; // 每次dom变更侦听的延迟时间
let listener; // 变更后的回调
let timeout; // 变更的临时引用
let last; // 上次获取的结果的JSON.stringify暂存

const IGNORE = Object.create(null);
IGNORE.BODY = IGNORE.SCRIPT = IGNORE.STYLE = true;

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

let pixiu = typeof window !== 'undefined' ? (window.pixiu || {}) : {};

pixiu.manual = {
  collect(key) {
    if(key !== undefined) {
      attrName = key;
    }
    return exec();
  },
  observe(key, time, cb) {
    // 没有key
    if(util.isNumber(key)) {
      cb = time;
      time = key;
    }
    else {
      attrName = key;
    }
    interval = time;
    interval = Math.max(0, interval);
    listener = cb;
    addObserver();
  },
  collectAndObserve(key, time, cb) {
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

if(typeof window !== 'undefined' && !window.pixiu) {
  window.pixiu = pixiu;
}

export default pixiu;
