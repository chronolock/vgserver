const app = require('./src/config/server-config');
const routs = require('./src/app/rotas/rotas');
const middleware = require('./src/config/middleware')

middleware(app);
routs(app);

