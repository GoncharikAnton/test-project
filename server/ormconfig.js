var dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.ENV) {
  case 'DEV':
    Object.assign(dbConfig, {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['**/*.entity.js'],
      synchronize: true,
    });
    break;
  case 'TEST':
    Object.assign(dbConfig, {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['**/*.entity.js'],
      synchronize: true,
    });
    break;
  case 'PROD':
    break;
  default:
    throw new Error('Unknown environment');
}

module.exports = dbConfig;
