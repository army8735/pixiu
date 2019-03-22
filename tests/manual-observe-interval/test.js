var path = require('path');
var fs = require('fs');

module.exports = {
  'manual-observe-interval': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .assert.value('#a', '[{"k":"a","v":"0.3"}]')
      .assert.value('#b', '')
      .end();
  }
};