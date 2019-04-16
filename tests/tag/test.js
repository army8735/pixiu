var path = require('path');
var fs = require('fs');

module.exports = {
  'tag': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('#a', '0')
      .assert.value('#b', 'SELECT')
      .assert.value('#c', 'UNKNOW')
      .assert.value('#d', 'abc')
      .assert.value('#e', '#root:nth-child(1):nth-of-type(1)>div.wrapper.index-container:nth-child(1):nth-of-type(1)>div.wrapper-main:nth-child(2):nth-of-type(3)')
      .end();
  }
};
