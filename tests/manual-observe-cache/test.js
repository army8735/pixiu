var path = require('path');
var fs = require('fs');

module.exports = {
  'manual-observe-cache': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .assert.value('#a', '[{"k":"a","v":"0.2"}]')
      .assert.value('#b', '')
      .end();
  }
};