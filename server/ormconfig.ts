import { DataSource } from 'typeorm';

var dbConfig = null;

switch (process.env.ENV) {
  case 'DEV':
    dbConfig = new DataSource({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['**/*.entity.js'],
      migrations: [__dirname + 'migrations/*.js'],
      migrationsTableName: 'migrations',
      synchronize: true,
    });
    break;
  case 'TEST':
    dbConfig = new DataSource({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['**/*.entity.js'],
      migrations: [__dirname + 'migrations/*.js'],
      migrationsTableName: 'migrations',
      synchronize: false,
    });
    break;
  case 'PROD':
    throw new Error('Production environment is not set up');
  default:
    throw new Error('Unknown environment');
}

export default dbConfig;
