const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('network_app', 'root', 'Amar501@', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize
db.users = require("../models/users.js")(sequelize, Sequelize);
db.friend_request = require("../models/friendRequest.js")(sequelize, Sequelize)
db.friends = require("../models/friends.js")(sequelize,Sequelize)



module.exports = db