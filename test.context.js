var context = require.context('./server/tests', true, /.spec\.js$/);

context.keys().forEach(context);