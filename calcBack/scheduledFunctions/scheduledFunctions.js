const CronJob = require("node-cron");
const Billetera = require("../models/billetera");

const cobroCredit = async () => {
  const billeteras = await Billetera.findAll({
    where: {
      permitCredit: true,
      numDiaPagoTarj: new Date().getDate(),
    },
  });

  billeteras.map(async (bille) => {
    bille.monto -= bille.montoCreditoMesAnt;
    bille.montoCreditoMesAnt = 0;
    await bille.save();
  });

  //console.log('funcion 1');
};

const cierreTarjeta = async () => {
  const billeteras = await Billetera.findAll({
    where: {
      permitCredit: true,
      numDiaCierreTarj: new Date().getDate(),
    },
  });

  billeteras.map(async (bille) => {
    bille.montoCreditoMesAnt = bille.montoCredito;
    bille.montoCredito = 0;
    await bille.save();
  });

  //console.log('funcion2');
};

exports.initScheduledJobs = () => {
  const scheduledCobroCredit = CronJob.schedule("0 0 * * *", cobroCredit, {
    timezone: "America/Argentina/Buenos_Aires",
  });

  const scheduledCierreTarjeta = CronJob.schedule("0 0 * * *", cierreTarjeta, {
    timezone: "America/Argentina/Buenos_Aires",
  });

  scheduledCobroCredit.start();
  scheduledCierreTarjeta.start();
};
