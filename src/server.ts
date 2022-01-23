import 'reflect-metadata'
import { createConnection } from "typeorm";

import {app} from './app';
import { User } from './resourses/users/users.memory.repository';
import {CONFIG} from './common/config';
import { Task } from './resourses/tasks/tasks.memory.repository';
import { Board } from './resourses/boards/board.memory.repository';
import { ColumnEntity } from './resourses/columns/columns';
import { createAdmin } from './resourses/login/login.service';

const PG_USER = process.env.PG_USER;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PG_PORT = parseInt(process.env.PG_PORT as string);
const PG_DATABASE = process.env.PG_DATABASE;

app.listen(CONFIG.PORT, async () => {
  console.log(`App is running on http://localhost1:${CONFIG.PORT}`);
  const connection = await createConnection({
    type: 'postgres',
    host: 'nodejs2021_typescript_database_1',
    port: PG_PORT,
    username: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
  //   migrations: ["migration/*.ts"],
  //   cli: {
  //       "migrationsDir": "migration"
  //   },
    entities: [User, Task, Board, ColumnEntity]
  });

  await connection.synchronize();
  createAdmin();
  console.log('database successfully connected')
});
