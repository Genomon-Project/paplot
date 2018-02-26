const assert = require('power-assert');
require('./test_function.js');
require('./test_jsdom.js');

describe( 'Tests...', function () {

    test_function.run();
    
    test_jsdom.run();
})
