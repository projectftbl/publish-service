var _ = require('lodash')
  , inherits = require('util').inherits
  , Promise = require('bluebird')
  , Base = require('@ftbl/store').Repository
  , util = require('@ftbl/store').util
  , schema = require('../schemas/content');

var NAME = 'content';

var Repository = function() {
  if (this instanceof Repository === false) return new Repository;

  Base.call(this, NAME, schema);
};

inherits(Repository, Base);

Repository.prototype.sanitize = function(content) {
  if (content == null) return;
  
  return content;
};

Repository.prototype.clean = function(content) {
  if (content == null) return;

  return content;
};

module.exports = new Repository;
