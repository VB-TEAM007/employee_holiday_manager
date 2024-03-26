import { DataTypes } from "sequelize";
import { client } from "../utils/db.config.js";

export const employee = client.define('employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  remainingHolidays: {
    type: DataTypes.INTEGER
  }
  }, {
    tableName: 'employees',
    createdAt: false,
    updatedAt: false,
    underscored: true
});
