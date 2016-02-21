/* Math object extensions */
Math.dice = function (min, max) {
    if(typeof(max) === 'undefined') {
        max = min;
        min = 0;
    }
    var min1 = Math.min(min, max), max1 = Math.max(min, max);
    return Math.floor(Math.random() * (max1 - min1)) + min1;
};

/* Array object extensions */
Array.prototype.contains = function (element) {
    return (this.indexOf(element) > -1);
};
Array.prototype.remove = function (element) {
    if (this.contains(element)) {
        this.splice(this.indexOf(element), 1);
        return true;
    }
    else {
        return false;
    }
};

/* .env variables */
require('dotenv').load();