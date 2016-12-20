module.exports = {
  development: {
    username: process.env.PGUSER || 'root',
    password: null,
    database: 'react_webpack_node_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.PGUSER || 'root',
    password: process.env.PGPASS || null,
    database: process.env.PGDB || 'react_webpack_node_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.PGUSER || 'webserver',
    password: process.env.PGPASS || '1234567',
    database: process.env.PGDB || 'cryptoDuel',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
