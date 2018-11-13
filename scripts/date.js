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
 * @param mo   [Integer] Month number (0-11)
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
        0:"31",
        1:"28",
        2:"31",
        3:"30",
        4:"31",
        5:"30",
        6:"31",
        7:"31",
        8:"30",
        9:"31",
        10:"30",
        11:"31"
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
 * Returns the start and (final) end week date range from a given end date.
 * The (final) end date is rounded to the LAST DAY of the week on which @paramDate falls into
 * The start date is the 1st day of the week on which @paramDate falls into
 * @param { [String] date representing the end of a date range. Format: YYYY/mm/dd or (Year month, date) } paramDate 
 * @return JS Object with (computed) first and last date in [String] Date() Format
 * {
 *      @first: [Integer] first day of week (Sunday)
 *      @last: [Integer] last day of week
 *      @start_date: [String] version of JS Date() toUTCString version of (computed) starting date
 *      @end_date: [String] version of JS Date() toUTCString version of the last day of the week (Saturday)
 * }
 */
DateObj.prototype.getweekrange = function(paramDate){
    // Check for valid input
    if(!this.utils.isValiInput(paramDate))
        return null;

    this.utils.log('--computing monthrange from ' + paramDate);

    var root = new Date(paramDate);
    var first = root.getDate() - root.getDay();// + 1;
    var last = first + 6;

    this.utils.log('first: ' + first + ', last: ' + last);
    
    var startdate = new Date(root.setDate(first));
    var end = new Date(root.setDate(last));

    //Adjust end's month, if days has backtracked to last month    
    if(first < 0){
        end.setMonth(end.getMonth() + 1);
    }

    return {
        first: first,
        last: last,
        start_date: this.getdatestring(startdate.toUTCString()),
        end_date: this.getdatestring(end.toUTCString()) 
    };
};


/**
 * Returns the shorthand YYYY/mm/dd [String] format of a toUTCString()
 * @param { [String] Date() toUTCString format } date 
 */
DateObj.prototype.getdatestring = function(date){
    if(!this.utils.isValiInput(date))
        return;
    
    var convert = new Date(date);
    return convert.toLocaleDateString();
    // return (convert.getUTCFullYear() + '/' + (convert.getUTCMonth() + 1) + '/' + convert.getUTCDate());
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
 * Get the numerical index (day of year) of a Date() format in a year
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



/**
 * Creates a JS Date() object from given string date parameter
 * @param { [String] old date, format YYYY/mm/dd } date 
 */
DateObj.prototype.createdate = function(date){
    var newdate = new Date(date);
};


module.exports = new DateObj();