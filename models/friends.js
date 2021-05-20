const Sequelize = require('sequelize')


 module.exports = (sequelize, Sequelize) => {
 const Friends = sequelize.define(
  'friends',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userid:{
        type: Sequelize.INTEGER,
      
    },
    friendid: {
        type: Sequelize.INTEGER,
    },
   
    // email: {
    //   type: Sequelize.STRING,
    //   primaryKey: true,
    // },
    // password: {
    //   type: Sequelize.STRING
    // },
    // confirm_password: {
    //   type: Sequelize.STRING
    // },
    // admission_flag: {
    //   type: Sequelize.INTEGER
    // },
    // verification_code:{
    //   type: Sequelize.INTEGER
    // },
    // verified:{
    //   type: Sequelize.INTEGER
    // },
    // admin:{
    //   type: Sequelize.INTEGER
    // },
  },
  {
    timestamps: false
  }
)
return Friends;
 }