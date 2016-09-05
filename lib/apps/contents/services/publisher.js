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
  var that = this;

  if (data.recordedAt == null) data.recordedAt = new Date;

  return Content.findByKey(data.content.key).then(function(contents) {
    if (contents.length) return;

    var content = _.assign({}, data.content, { accountId: data.accountId
                                             , memberId: data.memberId
                                             , timestamp: data.timestamp });

    return Content.create(content).then(function(content) {
      publish('aggregate:published', content, that.context);
      sceneskope('content:created', content, that.context);

      log.warn('Saving ' + content.id + ' ' + content.key + ' ' + content.timestamp);

      return redis.connection.setex('content:' + content.key, 86400 * 7, JSON.stringify(content));
    });
  });
};

module.exports = Publisher;