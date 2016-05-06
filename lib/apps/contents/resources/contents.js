var Publisher = require('../services/publisher');

module.exports = function(middleware, errors) {
  
  return { 
    post: function *(next) { 
      var publisher = new Publisher(this.context);

      var data = {
        content: this.body.content
      , memberId: this.body.memberId
      , accountId: this.body.accountId
      };

      this.status = 200;
      this.body = { content: yield publisher.publish(data) };
    }
  };
};
