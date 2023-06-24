const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Billetera extends Model {}

Billetera.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  monto: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  permitCredit: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  numDiaPagoTarj: {
    type: DataTypes.INTEGER,
    defaultValue: 7,
  },
  montoCredito: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'billetera'
})

module.exports = Billetera