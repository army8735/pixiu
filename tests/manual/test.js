var path = require('path');
var fs = require('fs');

module.exports = {
  'manual': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '[{"k":"a","v":"0.1"},{"k":"b","v":"0.1"},{"k":"c","v":"0.5"},{"k":"d","v":"0.2"},{"k":"e","v":"0.3"},{"k":"g","v":"0.8"}]')
      .end();
  }
};