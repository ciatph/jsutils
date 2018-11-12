var _utils = require('./scripts/utils.js');
var _date = require('./scripts/date.js');

// Initialize scripts with utils
_date.init(_utils);

// Main process: Various JS testing
var a = '2016/02/28';
g = _date.getmonthrange(a);
_utils.log('start: ' + g.raw_date + '\nend: ' + g.end_date);