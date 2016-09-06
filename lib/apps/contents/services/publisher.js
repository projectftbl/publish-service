var _ = require('lodash')
  , moment = require('moment')
  , publish = require('@ftbl/task').publish
  , log = require('@ftbl/log')
  , redis = require('@ftbl/redis')
  , sceneskope = require('@ftbl/sceneskope')
  , Content = require('../repositories/content');

var timestamp = 'YYYYMMDDHHmmss';

var Publisher = function(context) {
  if (this instanceof Publisher === false) return new Publisher(context);

  this.context = context;
};

Publisher.prototype.publish = function(data) {
  var that = this
    , key = 'content:' + data.content.key;

  if (data.recordedAt == null) data.recordedAt = new Date;

  // return Content.findByKey(data.content.key).then(function(contents) {
  return redis.connection.get(key).then(function(contents) {
    if (contents) return;

    var content = _.assign({}, data.content, { accountId: data.accountId
                                             , memberId: data.memberId
                                             , timestamp: data.timestamp });

    // return Content.create(content).then(function(content) {
    return redis.connection.setex(key, 86400 * 28, JSON.stringify(content)).then(function() {
      publish('aggregate:published', content, that.context);
      sceneskope('content:created', content, that.context);

      log.warn('Saving ' + content.id + ' ' + content.key + ' ' + content.timestamp);        
    });
  });
};

module.exports = Publisher;