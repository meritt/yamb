"use strict";

var utils = require('./../../../utils');

// yamb.prototype.created

var validate = function(value) {
  return utils.is.date(value) || (utils.is.str(value) && utils.is.date(new Date(value)));
};

module.exports = function(priv) {
  var getter = function() {
    var date = this[priv.symbl].created;

    if (utils.is.str(date)) {
      this[priv.symbl].created = new Date(date);
    }

    return this[priv.symbl].created;
  };

  return {
    validate: validate,
    get: getter,
    set: false
  };
};