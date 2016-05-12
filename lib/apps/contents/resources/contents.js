var Publisher = require('../services/publisher');

module.exports = function(middleware, errors) {
  
  return { 
    post: function *(next) { 
      var publisher = new Publisher(this.context);

      this.status = 200;
      this.body = { content: yield publisher.publish(this.body) };
    }
  };
};
