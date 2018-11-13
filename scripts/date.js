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
 * Checks if a year is aleap year or not
 * @param {Year} year 
 * Returns TRUE|FALSE
 */
DateObj.prototype.isLeapYear = function(year){
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
};


/**
 * Returns the number of days in a month considering the leap years
 * @param mo   [Integer] Month number (1-12)
 * @param year [Integer] Year, format: YYYY
 * @param date [String] Date format YYYY-mm-dd (optional)
 */
DateObj.prototype.getdaysinmonth = function(mo, year, date){
    var monthIndex = mo;
    var yearIndex = year; 

    if(date !== undefined){
        if(date.indexOf('-') >= 0){
            monthIndex = date.split('-')[1];
            yearIndex = date.split('-')[0];
        }
    }

    var months = {
        1:"31",
        2:"28",
        3:"31",
        4:"30",
        5:"31",
        6:"30",
        7:"31",
        8:"31",
        9:"30",
        10:"31",
        11:"30",
        12:"31"
    };

    // Check if leap year
    months[2] = this.isLeapYear(yearIndex) ? 29 : 28;
    return parseInt(months[monthIndex]);
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


/**
 * Get the numerical start index (day of year, first day) of a month in a year
 * @param date [String] Date format YYYY-mm-dd
 * Returns 1-365
 */
DateObj.prototype.getdoymonth = function(date){
    var datesplit = date.split('-');

    var months = {
        1:"31",
        2:"28",
        3:"31",
        4:"30",
        5:"31",
        6:"30",
        7:"31",
        8:"31",
        9:"30",
        10:"31",
        11:"30",
        12:"31"
    };

    // Check if leap year
    months[2] = this.isLeapYear(datesplit[0]) ? 29 : 28;

    var sum = 0;
    date = date.split('-');

    for(mo in months){
        if(mo < parseInt(date[1])){
            sum += parseInt(months[mo]);
      }
      else{
            break;
        }
    }
    return sum + 1;
};


/**
 * Get the numerical index (day of year) of a month in a year
 * @param date [String] Date format "YYYY-mm-dd" or "YYYY/mm/dd"
 * Returns 1-365, null if invalid value
 */
DateObj.prototype.getdoy = function(date){
    var curr = new Date(date);
    var start = new Date(curr.getFullYear(), 0, 0);
    var difference = (curr - start) + ((start.getTimezoneOffset() - curr.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var doy = Math.floor(difference / oneDay);
    return isNaN(doy) ? null : doy;
};


module.exports = new DateObj();