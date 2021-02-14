import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'
const tableName = 'link_shortened'

export class LinkShortened1613278130644 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'link',
            type: 'varchar',
          },
          {
            name: 'token',
            type: 'varchar',
          },
          {
            name: 'expireAt',
            type: 'timestamp',
          },
          {
            name: 'createAt',
            type: 'timestamp',
          },
        ],
      }),
      true
    )

    await queryRunner.createIndex(
      tableName,
      new TableIndex({
        name: 'IDX_TOKEN',
        columnNames: ['token'],
      })
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName)
  }
}
