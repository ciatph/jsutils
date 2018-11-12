/**
 * Script for various JS processing and tests
 */

Utils = function(){
    this.init();
};


Utils.prototype.init = function(){
    console.log('UTILS object created');
};

module.exports = new Utils();