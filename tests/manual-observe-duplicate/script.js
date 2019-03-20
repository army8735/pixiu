'use strict';

pixiu.manual.collectAndObserver(0, function(list) {
  document.querySelector('input').value = JSON.stringify(list);
});
pixiu.manual.collectAndObserver(0, function(list) {
  document.querySelector('input').value = '1' + JSON.stringify(list);
});

document.querySelector('div').innerText = 0.2;
