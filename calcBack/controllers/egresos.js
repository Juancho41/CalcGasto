const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { SECRET } = require("../util/config");
const { Egreso, Billetera } = require("../models");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

router.get("/", tokenExtractor, async (req, res) => {
  const egresos = await Egreso.findAll({
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Billetera,
        attributes: ["nombre"],
      },
    ],

    where: {
      userId: req.decodedToken.id,
    },
  });
  res.json(egresos);
});

const billeteraFinder = async (req, res, next) => {
  req.billetera = await Billetera.findByPk(req.body.billeteraId);
  next();
};

router.post("/", tokenExtractor, billeteraFinder, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);

    const egreso = await Egreso.create({ ...req.body, userId: user.id });

    if (req.billetera) {
      if (!egreso.credito) {
        req.billetera.monto -= req.body.monto;
        await req.billetera.save();
      } else if(egreso.credito){
        req.billetera.montoCredito += req.body.monto;
        await req.billetera.save();
      } else {
        res.status(404).end();
      }
    } else {
      res.status(404).end();
    }

    //egreso returned sirve para devolver desde la base de dato el objeto al forntend con los atributos de nombre billetera
    const egresoReturned = await Egreso.findOne({
      attributes: { exclude: ["userId"] },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Billetera,
          attributes: ["nombre"],
        },
      ],
      where: { id: egreso.id },
    });
    res.json(egresoReturned);
  } catch (error) {
    return res.status(400).json({ error: "error en post de egreso" });
  }
});

//Buscar egreso segun parametro de URL
const egresoFinder = async (req, res, next) => {
  req.egreso = await Egreso.findByPk(req.params.id);
  next();
};

router.get("/:id", egresoFinder, async (req, res) => {
  if (req.egreso) {
    res.json(req.egreso);
  } else {
    res.status(404).end();
  }
});

//borrar gasto de billetera y devolver la plata a la billetera
router.delete("/:id", egresoFinder, async (req, res) => {
  req.billetera = await Billetera.findByPk(req.egreso.billeteraId);
  if (req.egreso && req.billetera) {
    await req.egreso.destroy();
    req.billetera.monto += req.egreso.monto;
    await req.billetera.save();
  }
  res.status(204).end();
});

router.put("/:id", egresoFinder, billeteraFinder, async (req, res) => {

  if (req.egreso && req.billetera) {
    req.egreso.date = req.body.date;
    req.egreso.categoria = req.body.categoria;
    req.egreso.comentario = req.body.comentario;
    req.egreso.credito = req.body.credito;

    if (req.egreso.monto != req.body.monto) {
      req.billetera.monto = (req.billetera.monto + req.egreso.monto - req.body.monto);
      req.egreso.monto = req.body.monto;
      await req.billetera.save();
    }

    if (req.egreso.billeteraId != req.body.billeteraId) {

      req.billetera.monto -= req.body.monto;
      await req.billetera.save();

      billeteraAnterior = await Billetera.findByPk(req.egreso.billeteraId);
      billeteraAnterior.monto += req.body.monto;
      await billeteraAnterior.save();

      req.egreso.billeteraId = req.body.billeteraId;
    }

    await req.egreso.save();
    res.json(req.egreso);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
