const CronJob = require("node-cron");
const Billetera = require('../models/billetera')
const User = require('../models/user')

const dataSearch = async () => {
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
      
      console.log(billeteras[0].dataValues)
      console.log(new Date().getDate())
      
}


exports.initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule("*/5 * * * * *", dataSearch, 
  {
    timezone: "America/Argentina/Buenos_Aires"
  });

  scheduledJobFunction.start();
}

