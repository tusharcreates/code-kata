import App from '@/app';
// routes
import IndexRoute from '@routes/index.route';

import validateEnv from '@utils/validateEnv';


validateEnv();

const app = new App([
  new IndexRoute(),
]);

app.listen();
