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
  , data: { type: 'object' }
  , createdAt: { type: 'string', format: 'date-time' }
  , createdBy: { type: [ 'string', 'null' ] }
  , accountId: { type: 'string' }
  , memberId: { type: 'string' }
  , timestamp: { type: 'string' }
  , recordedAt: { type: 'string', format: 'date-time' }
  , key: { required: true, type: 'string' }
  }
};