var Content = require('../repositories/content');

var Publisher = function(context) {
  if (this instanceof Publisher === false) return new Publisher(context);

  this.context = context;
};

Publisher.prototype.publish = function(content) {
  return Content.findByKey(content.key).then(function(contents) {
    if (contents.length) return;

    return Content.create(content);
  });
};

module.exports = Publisher;