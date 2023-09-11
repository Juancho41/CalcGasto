const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { SECRET } = require("../util/config");
const { Ingreso, Billetera } = require("../models");

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
  const ingresos = await Ingreso.findAll({
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
  res.json(ingresos);
});

const billeteraFinder = async (req, res, next) => {
  req.billetera = await Billetera.findByPk(req.body.billeteraId);
  next();
};

router.post("/", tokenExtractor, billeteraFinder, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);

    const ingreso = await Ingreso.create({ ...req.body, userId: user.id });

    if (req.billetera) {
      req.billetera.monto += req.body.monto;
      await req.billetera.save();
    } else {
      res.status(404).end();
    }

    //ingresoReturned sirve para devolver desde la base de dato el objeto al forntend con los atributos de nombre billetera
    const ingresoReturned = await Ingreso.findOne({
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
      where: { id: ingreso.id },
    });
    res.json(ingresoReturned);
  } catch (error) {
    return res.status(400).json({ error: "error en post de ingreso" });
  }
});

//Buscar ingreso segun parametro de URL
const ingresoFinder = async (req, res, next) => {
  req.ingreso = await Ingreso.findByPk(req.params.id);
  next();
};

router.get("/:id", ingresoFinder, async (req, res) => {
  if (req.ingreso) {
    res.json(req.ingreso);
  } else {
    res.status(404).end();
  }
});

//borrar ingreso de billetera y quitar la plata a la billetera
router.delete("/:id", ingresoFinder, async (req, res) => {
  req.billetera = await Billetera.findByPk(req.ingreso.billeteraId);
  if (req.ingreso && req.billetera) {
    await req.ingreso.destroy();
    req.billetera.monto -= req.ingreso.monto;
    await req.billetera.save();
  }
  res.status(204).end();
});

router.put("/:id", ingresoFinder, billeteraFinder, async (req, res) => {
  if (req.ingreso && req.billetera) {
    req.ingreso.date = req.body.date;
    req.ingreso.categoria = req.body.categoria;
    req.ingreso.comentario = req.body.comentario;

    if (req.ingreso.monto != req.body.monto) {
      req.billetera.monto -= (req.ingreso.monto - req.body.monto);
      req.ingreso.monto = req.body.monto;      
      await req.billetera.save();
    }

    if (req.ingreso.billeteraId != req.body.billeteraId) {
      req.billetera.monto += req.body.monto;
      await req.billetera.save();

      billeteraAnterior = await Billetera.findByPk(req.ingreso.billeteraId);
      billeteraAnterior.monto -= req.body.monto;
      await billeteraAnterior.save();

      req.ingreso.billeteraId = req.body.billeteraId;
    }

    await req.ingreso.save();
    res.json(req.ingreso);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
