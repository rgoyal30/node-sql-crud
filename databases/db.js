const { Sequelize } = require('sequelize')


const db = new Sequelize('shopify', 'root', 'root2001@', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    logging: true,
    dialectOptions: {
        charset: 'utf8mb4'
    }
})

module.exports = db;