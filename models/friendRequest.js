const Sequelize = require("sequelize");
// const { users } = require("../db/db");
// const users = require("./users.js");
 const db = require('../db/db.js');
// const User = db.users;

module.exports = (sequelize, Sequelize) => {
  const friendRequest = sequelize.define(
    "friend_request",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   // This is a reference to another model
        //   model: db.users,

        //   // This is the column name of the referenced model
        //   key: "id",
        // },
      },
      friend_user_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.INTEGER,
      },

      // frien: {
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
      timestamps: false,
    }
  );
  return friendRequest;
};
