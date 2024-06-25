
// src/database.js

const { development } = require('./config');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(development);

// Sincronizar todos os modelos, incluindo Pessoa
sequelize.sync()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });







module.exports = { sequelize, DataTypes };
