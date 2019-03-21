'use strict';

let sels = ['#a', '#b'];
let index = 0;

pixiu.auto.collectAndObserve(1, function(list) {
  document.querySelector(sels[index++]).value = JSON.stringify(list);
});

document.querySelector('div').innerText = 0.2;
setTimeout(function() {
  document.querySelector('div').innerText = 0.3;
}, 1);
