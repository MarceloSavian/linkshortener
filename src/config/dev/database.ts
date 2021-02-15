export default {
  type: 'postgres',
  host: '172.200.2.50',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
}
