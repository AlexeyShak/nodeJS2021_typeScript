import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTables1642346676970 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
              {
                name: 'id',
                type: 'text',
                isPrimary: true,
                isGenerated: false
              },
              { name: 'name', type: 'text' },
              { name: 'login', type: 'text' },
              { name: 'password', type: 'text' }
            ]
          }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
