import {CONFIG} from './common/config';
import { createConnection } from "typeorm";

import {app} from './app';
import { User } from './resourses/users/users.memory.repository';


app.listen(CONFIG.PORT, async () => {
  console.log(`App is running on http://localhost:${CONFIG.PORT}`);
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '111',
    database: 'rsschool',
    entities: [User],
  });
  // await connection.synchronize();
  console.log('database successfully connected')
});
