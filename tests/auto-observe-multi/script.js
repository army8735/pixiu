'use strict';

pixiu.auto.collectAndObserve(1, function(list) {
  document.querySelector('input').value = JSON.stringify(list);
});

document.querySelector('div').innerText = 0.2;
setTimeout(function() {
  document.querySelector('div').innerText = 0.3;
}, 1);
