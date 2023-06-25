const Billetera = require('./billetera')
const Ingreso = require('./ingreso')
const Egreso = require('./egreso')
const User = require('./user')

User.hasMany(Billetera)
Billetera.belongsTo(User)

User.hasMany(Ingreso)
Ingreso.belongsTo(User)

User.hasMany(Egreso)
Egreso.belongsTo(User)

Billetera.hasMany(Ingreso)
Ingreso.belongsTo(Billetera)

Billetera.hasMany(Egreso)
Egreso.belongsTo(Billetera)

Billetera.sync({ alter: true })
User.sync({ alter: true })
Ingreso.sync({ alter: true })
Egreso.sync({ alter: true })


module.exports = {
  Billetera, Ingreso, Egreso, User
}