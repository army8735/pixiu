var path = require('path');
var fs = require('fs');

module.exports = {
  'auto-observe-no-cache': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .assert.value('#a', '[{"k":"0/2.0>0.0","v":"0.2"}]')
      .assert.value('#b', '[{"k":"0/2.0>0.0","v":"0.3"}]')
      .end();
  }
};
