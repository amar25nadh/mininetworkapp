const Sequelize = require('sequelize')


 module.exports = (sequelize, Sequelize) => {
 const User = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
   
    email: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING
    },
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
return User;
 }