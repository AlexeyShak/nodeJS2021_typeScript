import {CONFIG} from './common/config';
import {app} from './app';

app.listen(CONFIG.PORT, () =>
  console.log(`App is running on http://localhost:${CONFIG.PORT}`)
);
