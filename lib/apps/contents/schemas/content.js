module.exports = {
  required: true
, type: 'object'
, properties: {
    title: { type: 'string' }
  , date: { type: 'string', format: 'date-time' }
  , author: { type: [ 'string', 'null' ] }
  , url: { type: 'string' }
  , summary: { type: 'string' }
  , description: { type: 'string' }
  , categories: {
      type: 'array'
    , items: {
        type: 'string'
      }
    }
  }
};