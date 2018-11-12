var date = require('./date.js');

/**
 * Script for various JS processing and tests
 */

Utils = function(){
    this.init();
};


Utils.prototype.init = function(){
    console.log('UTILS object created');
};


/**
 * Checks if @input is valid. Returns TRUE if input is
 * NOT null, undefined or (blank) ''
 * @param { String, Integer or Object parameter } input 
 */
Utils.prototype.isValiInput = function(input){
    return (input === undefined || input === null || input === '') ? false : true;
};



/**
 * A shorthand code for console.log()
 * @param { JS string, number or decimal ro output } str 
 */
Utils.prototype.log = function(str){
    console.log(str);
}


module.exports = new Utils();