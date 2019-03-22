var path = require('path');
var fs = require('fs');

module.exports = {
  'manual': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('#a', '0')
      .assert.value('#b', 'SELECT')
      .assert.value('#c', 'UNKNOW')
      .assert.value('#d', 'abc')
      .end();
  }
};