'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    name: DataTypes.STRING,
    message: DataTypes.TEXT,
    to: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    underscored: true,
  });
  chat.associate = function(models) {
    // associations can be defined here
  };
  return chat;
};