var path = require('path');
var fs = require('fs');

module.exports = {
  'manual': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '[{"k":"0.a.b/1.0","v":"0.1"},{"k":"0.a.b/2.1","v":"0.1"},{"k":"4/3.0>5.c/0.0","v":"0.5"},{"k":"4/3.0>5.c/1.1","v":"0.2"},{"k":"4/3.0>5.d/2.0","v":"0.3"},{"k":"C/4.0","v":"0.6"},{"k":"C/5.1","v":"0.7"},{"k":"1/6.0","v":"0.8"},{"k":"4/7.1>5/0.0>C/0.0","v":"1"},{"k":"4/7.1>5/1.1>C/0.0","v":"1"},{"k":"4.e/8.0>5.c/0.0>C/0.0","v":"1"},{"k":"4.e/8.0>5.c/1.1>C/0.0","v":"1"},{"k":"#p","v":"-.3"}]')
      .end();
  }
};