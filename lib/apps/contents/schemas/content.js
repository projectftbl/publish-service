module.exports = {
  required: true
, type: 'object'
, properties: {
    title: { type: 'string' }
  , source: { type: 'string' }
  , url: { type: 'string' }
  , summary: { type: 'string' }
  , text: { type: 'string' }
  , image: { type: 'string' }
  , categories: {
      type: 'array'
    , items: {
        type: 'string'
      }
    }
  , createdAt: { type: 'string', format: 'date-time' }
  , createdBy: { type: [ 'string', 'null' ] }
  }
};