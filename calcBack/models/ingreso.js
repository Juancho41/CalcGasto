const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Ingreso extends Model {}

Ingreso.init({
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
    defaultValue: 0,
  },
  categoria: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'otros',
  },
  comentario: {
    type: DataTypes.TEXT,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'ingreso'
})

module.exports = Ingreso