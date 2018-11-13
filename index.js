// Use this script to test methods 
var _utils = require('./scripts/utils.js');
var _date = require('./scripts/date.js');

// Initialize scripts with utils
_date.init(_utils);

// Main process: Various JS testing


// Testing for 30/60 days backtrack
var date = "2014/01/12";
var numBacktrack = 30;
var doy = _date.getdoy(date);
_utils.log('doy: ' + doy);


if(doy > numBacktrack){
    _utils.log("i fits!");
}
else{
    var needs = Math.abs(doy - numBacktrack);
    _utils.log("Not enough days to backtrack!");
    _utils.log(" --needs " + needs + " more days from last year");

    var subdate = "2018/11/13";
    var sdate = new Date(subdate);
    _utils.log('start date: ' + sdate + ', all backtrack: ' + numBacktrack);

    var range = _date.getweekrange(subdate);
    _utils.log(range);
    _utils.log('backtrack: ' + numBacktrack);

    //sdate.setMonth(sdate.getMonth() - 1);
    var end_date = new Date(range.end_date);
    end_date.setDate(end_date.getDate() - numBacktrack);

    _utils.log('start-process: ' + end_date.toLocaleDateString() + ', end-process: ' + range.end_date);
 
    // Loop the dates
    for(var i=new Date(range.start_date); i<new Date(range.end_date); i.setDate(i.getDate() + 1)) {
        _utils.log(new Date(i).toLocaleDateString());
    }
}