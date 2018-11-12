var utils = require('./utils.js');


/**
 * Script for processing JS Dates()
 */
var DateObj = function(utils){
    
};


/**
 * 
 * @param { [JS Utils Script] A local copy of the Utils script} utils 
 */
DateObj.prototype.init = function(utils){
    this.utils = utils;
};


/**
 * Get the number of months between (2) dates
 * @param { [String] date to subtract FROM @date2. Format: YYYY/mm/dd or (Year month, date) } date1 
 * @param { [String] date to subtract. Format: YYYY/mm/dd or (Year month, date) } date2 
 */
DateObj.prototype.getmonthdiff = function(date1, date2){
    date1 = new Date(date1);
    date2 = new Date(date2);

    var months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth() + 1;
    months += date2.getMonth();
    return months <= 0 ? 0 : months;
};


/**
 * Returns the start and (final) end date range from a given (raw) end date.
 * The (final) end date is rounded to the LAST DAY of the week on which @endDate falls into
 * The start date is counted (30 * numMonths) from the (final) end date
 * @param { [String] date representing the end of a date range. Format: YYYY/mm/dd or (Year month, date) } endDate 
 * @param { [Integer] number of months to backtract from the endDate} numMonths 
 * @return JS Object with (computed) first date and last dat in Date() Format
 * {
 *      @first: [Integer] first day of week (Sunday)
 *      @last: [Integer] last day of week
 *      @start_date: [String] version of JS Date() toUTCString Object of (computed) starting date
 *      @end_date: [String] version of JS Date() toUTCString Object of the last day of the week (Saturday)
 * }
 */
DateObj.prototype.getmonthrange = function(endDate, numMonths){
    // Check for valid input
    if(!(this.utils.isValiInput(endDate) || this.utils.isValiInput(numMonths)))
        return null;

    this.utils.log('--computing monthrange from ' + endDate);

    var root = new Date(endDate);
    var first = root.getDate() - root.getDay() + 1;
    var last = first + 6;

    this.utils.log('first: ' + first + ', last: ' + last);

    return {
        first: first,
        last: last,
        raw_date: this.getdatefromutc(new Date(root.setDate(first)).toUTCString()),
        end_date: this.getdatefromutc(new Date(root.setDate(last)).toUTCString()) 
    };
};


/**
 * Returns the shorthand YYYY/mm/dd [String] format of a toUTCString()
 * @param { [String] Date() toUTCString format } date 
 */
DateObj.prototype.getdatefromutc = function(date){
    if(!this.utils.isValiInput(date))
        return;
    
    var convert = new Date(date);
    return (convert.getUTCFullYear() + '/' + (convert.getUTCMonth() + 1) + '/' + convert.getUTCDate());
};


module.exports = new DateObj();