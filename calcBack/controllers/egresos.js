const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const { SECRET } = require('../util/config')
const { Egreso, Billetera } = require('../models')


const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)

    } catch{

      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.get('/', tokenExtractor, async (req, res) => {
  const egresos = await Egreso.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['username']
    },
    where: {
      userId: req.decodedToken.id
    },

  })
  res.json(egresos)
})


router.post('/', tokenExtractor, async (req, res) => {
  try {

    const user = await User.findByPk(req.decodedToken.id)

    const egreso = await Egreso.create({...req.body, userId: user.id})

    const billetera = await Billetera.findByPk(req.body.billeteraId)
    billetera.monto -= req.body.monto
    await billetera.save()

    res.json(egreso)
  } catch(error) {
    return res.status(400).json({ error: 'error en post de egreso' })
  }
})

const egresoFinder = async (req, res, next) => {
  req.egreso = await Egreso.findByPk(req.params.id)
  next()
}

router.get('/:id', egresoFinder, async (req, res) => {
  if (req.egreso) {
    res.json(req.egreso)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', egresoFinder, async (req, res) => {
  if (req.egreso) {
    await req.egreso.destroy()
  }
  res.status(204).end()
})

// router.put('/:id', billeteraFinder, async (req, res) => {
//   if (req.billetera) {
//     req.billetera.important = req.body.important
//     await req.note.save()
//     res.json(req.note)
//   } else {
//     res.status(404).end()
//   }
// })

module.exports = router