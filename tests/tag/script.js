'use strict';

document.querySelector('#a').value = pixiu.tag.encode('DIV');
document.querySelector('#b').value = pixiu.tag.decode('i');
document.querySelector('#c').value = pixiu.tag.encode('UNKNOW');
document.querySelector('#d').value = pixiu.tag.decode('abc');
