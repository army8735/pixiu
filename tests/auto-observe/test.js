var path = require('path');
var fs = require('fs');

module.exports = {
  'auto-observe': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '[{"k":"0/1>0.0","v":"0.2"}]')
      .end();
  }
};
