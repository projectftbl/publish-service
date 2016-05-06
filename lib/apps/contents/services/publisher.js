var _ = require('lodash')
  , moment = require('moment')
  , publish = require('@ftbl/task').publish
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

    publish('publish:content', data, that.context);
    publish('aggregate:published', data, that.context);

    return Content.create(_.assign({}, data.content, data));
  });
};

module.exports = Publisher;