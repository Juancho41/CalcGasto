const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const { SECRET } = require('../util/config')
const { Ingreso } = require('../models')


const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)

    } catch {

      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.get('/', tokenExtractor, async (req, res) => {
  const ingresos = await Ingreso.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['username']
    },
    where: {
      userId: req.decodedToken.id
    },

  })
  res.json(ingresos)
})

const billeteraFinder = async (req, res, next) => {
  req.billetera = await Billetera.findByPk(req.body.billeteraId)
  next()
}


router.post('/', tokenExtractor, billeteraFinder, async (req, res) => {
  try {

    const user = await User.findByPk(req.decodedToken.id)

    const ingreso = await Ingreso.create({ ...req.body, userId: user.id })

    if (req.billetera) {
      req.billetera.monto += req.body.monto
      await req.billetera.save()
    } else {
      res.status(404).end()
    }

    res.json(ingreso)
  } catch (error) {
    return res.status(400).json({ error: error })
  }
})

const ingresoFinder = async (req, res, next) => {
  req.ingreso = await Ingreso.findByPk(req.params.id)
  next()
}

router.get('/:id', ingresoFinder, async (req, res) => {
  if (req.ingreso) {
    res.json(req.ingreso)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', ingresoFinder, billeteraFinder, async (req, res) => {
  if (req.ingreso && req.billetera) {
      await req.ingreso.destroy()
      req.billetera.monto -= req.body.monto
      await req.billetera.save()

  }
  res.status(204).end()
})

router.put('/:id', ingresoFinder, billeteraFinder, async (req, res) => {
  if (req.ingreso && req.billetera) {

    req.ingreso.date = req.body.date
    req.ingreso.categoria = req.body.categoria
    req.ingreso.comentario = req.body.comentario

    if (req.ingreso.monto != req.body.monto) {
      req.ingreso.monto = req.body.monto
      req.billetera -= req.ingreso.monto - req.body.monto
      await req.billetera.save()
    }

    if (req.ingreso.billeteraId != req.body.billeteraId) {
      req.billetera.monto += req.body.monto
      await req.billetera.save()

      billeteraAnterior = await Billetera.findByPk(req.ingreso.billeteraId)
      billeteraAnterior.monto -= req.body.monto
      await billeteraAnterior.save()

      req.ingreso.billeteraId = req.body.billeteraId

    }

    await req.egreso.save()
    res.json(req.egreso)
  } else {
    res.status(404).end()
  }
})


module.exports = router