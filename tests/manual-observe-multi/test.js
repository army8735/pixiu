var path = require('path');
var fs = require('fs');

module.exports = {
  'manual-observe': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .assert.value('input', '[{"k":"a","v":"0.2"}]')
      .end();
  }
};