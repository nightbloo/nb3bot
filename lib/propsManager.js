'use strict';

/**
 * @param {redisManager} redisManager
 * @constructor
 */
var PropsManager = function(redisManager) {
    this.propsSet = [];
    this.redisManager = redisManager;
    return this;
};

PropsManager.prototype.addProp = function(userId) {
    if (!this.propsSet.contains(userId)) {
        this.propsSet.push(userId);
    }
};

PropsManager.prototype.onSongChange = function(djId) {
    var that = this;
    var props = this.propsSet.length;
    this.redisManager.getProps(djId, function(result) {
        var newProps = props;
        if (result) {
            newProps += result;
        }
        that.redisManager.setProps(djId, newProps);
    });
    this.resetProps();
    return props;
};

PropsManager.prototype.resetProps = function() {
    this.propsSet = [];
};

PropsManager.prototype.getProps = function(userId, callback) {
    this.redisManager.getProps(userId, callback);
};

module.exports = PropsManager;