var log = require('@ftbl/log')
  , Publisher = require('../services/publisher');

var Subscriber = function(queue) {
  if (this instanceof Subscriber === false) return new Subscriber(queue);

  this.queue = queue;
};

var logError = function(err) {
  log.error(err.message, err.stack);
};

Subscriber.prototype.subscribe = function() {
  this.queue.on('data', function(data, options) {
    new Publisher(options).publish(data).catch(logError);
  });

  this.queue.on('error', logError);

  this.queue.subscribe('aggregate:content');
};

module.exports = Subscriber;