const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class User extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

const options = {
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: "User",
};

User.init(schema, options);

module.exports = User;
