let context = require.context('.', true, /.+\.test\.js?$/);
context.keys().forEach(context);
module.exports = context;
