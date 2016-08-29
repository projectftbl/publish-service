var _ = require('lodash')
  , moment = require('moment')
  , publish = require('@ftbl/task').publish
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
    if (contents.length) {
      var existing = _.first(contents);

      if (existing.image === data.image) return;

      return Content.update(existing.id, { image: data.image });
    }

    var content = _.assign({}, data.content, { accountId: data.accountId
                                             , memberId: data.memberId
                                             , timestamp: data.timestamp });

    publish('aggregate:published', content, that.context);
    sceneskope('content:created', content, that.context);

    return Content.create(content);
  });
};

module.exports = Publisher;