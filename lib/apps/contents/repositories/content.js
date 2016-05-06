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

Repository.prototype.findByKey = function(key) {
  return this.find({ key: key });
};

Repository.prototype.sanitize = function(content) {
  if (content == null) return;

  if (content.createdAt) content.createdAt = new Date(content.createdAt).toISOString();
  if (content.recordedAt) content.recordedAt = new Date(content.recordedAt).toISOString();
  
  return content;
};

Repository.prototype.clean = function(content) {
  if (content == null) return;

  if (content.createdAt) content.createdAt = new Date(content.createdAt);
  if (content.recordedAt) content.recordedAt = new Date(content.recordedAt);

  return content;
};

Repository.prototype.index = function(content) {
  return this.createIndexes('key', 'memberId', 'accountId', 'createdAt');
};

module.exports = new Repository;
