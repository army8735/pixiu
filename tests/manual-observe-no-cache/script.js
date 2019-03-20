'use strict';

let sels = ['#a', '#b'];
let index = 0;

pixiu.manual.observe(0, function(list, str) { console.warn('cb')
  document.querySelector(sels[index++]).value = str;
});

document.querySelector('div').innerText = 0.2;
setTimeout(function() {
  document.querySelector('div').innerText = 0.3;
}, 100);
