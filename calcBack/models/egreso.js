const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Egreso extends Model {}

Egreso.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'otros',
  },
  comentario: {
    type: DataTypes.TEXT,
  },
  credito: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'egreso'
})

module.exports = Egreso