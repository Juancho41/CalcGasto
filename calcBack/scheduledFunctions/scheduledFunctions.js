const schedule = require('node-schedule');
const Billetera = require('../models/billetera')


const dataSearch = () => async () => {
    const billeteras = await Billetera.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['username']
        },
        where: {
            permitCredit: true
        },

    })
    const response = json(billeteras)
    console.log(response)
}

const job = schedule.scheduleJob('0 0 * * *', dataSearch);

module.exports = { job }