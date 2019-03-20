'use strict';

pixiu.manual.collectAndObserve(1, function(list) {
  document.querySelector('input').value = JSON.stringify(list);
});
pixiu.manual.collectAndObserve(1, function(list) {
  document.querySelector('input').value = '1' + JSON.stringify(list);
});

document.querySelector('div').innerText = 0.2;
