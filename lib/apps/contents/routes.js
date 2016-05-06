module.exports = function(router, resource, middleware, errors) {
  var contents = resource.contents(middleware, errors);
  
  // router.post('/', contents.post);
};
