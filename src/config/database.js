module.exports = {
  "development": {
    "username": "postgres",
    "password": "12345",
    "database": "node-sequelize-do-zero",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "define": {
      "timestamps": true,
      "underscored": true,
      "underscoredAll": true
    }
  },
  "test": {
    "username": "postgres",
    "password": "12345",
    "database": "node-sequelize-do-zero-test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "define": {
      "timestamps": true,
      "underscored": true,
      "underscoredAll": true
    }
  },
  "prod": {
    "username": "postgres",
    "password": "12345",
    "database": "node-sequelize-do-zero-pro",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "define": {
      "timestamps": true,
      "underscored": true,
      "underscoredAll": true
    }
  }
}