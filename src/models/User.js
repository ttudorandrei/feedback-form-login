const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../config/connection");
const hooks = require("../hooks/index.js");

class User extends Model {
  async isPasswordValid(password) {
    return await bcrypt.compare(password, this.password);
  }
}

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
  hooks,
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: "User",
};

User.init(schema, options);

module.exports = User;
