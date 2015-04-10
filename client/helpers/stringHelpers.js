var deparam = function(queryString) {
  var i, obj, pairs, split;
  obj = {};
  pairs = queryString.split('&');
  for (i in pairs) {
    i = i;
    split = pairs[i].split('=');
    obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
  }
  return obj;
};

Template.registerHelper('truncate', function(string, length) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(length);
});

Template.registerHelper('pathFor',function(path, view) {
  var query;
  if (!path) {
    throw new Error('no path defined');
  }
  query = view.hash.query ? deparam(view.hash.query) : {};
  return FlowRouter.path(path, view.hash, query);
});

Template.registerHelper('urlFor',function(path, view) {
  var relativePath;
  relativePath = pathFor(path, view);
  return Meteor.absoluteUrl(relativePath.substr(0));
});