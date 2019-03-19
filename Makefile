test-browser:
	@nightwatch --filter test.js

test: test-browser
