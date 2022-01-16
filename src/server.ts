import 'reflect-metadata'
import { createConnection } from "typeorm";

import {app} from './app';
import { User } from './resourses/users/users.memory.repository';
import {CONFIG} from './common/config';
import { Task } from './resourses/tasks/tasks.memory.repository';
import { Board } from './resourses/boards/board.memory.repository';
import { ColumnEntity } from './resourses/columns/columns';

app.listen(CONFIG.PORT, async () => {
  console.log(`App is running on http://localhost1:${CONFIG.PORT}`);
  const connection = await createConnection({
    type: 'postgres',
    host: 'nodejs2021_typescript_database_1',
    port: 5432,
    username: 'postgres',
    password: '111',
    database: 'rsschool',
    migrations: ["migration/*.ts"],
    cli: {
        "migrationsDir": "migration"
    },
    entities: [User, Task, Board, ColumnEntity]
  });
  //await connection.synchronize();
  console.log('database successfully connected')
});
