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

    } catch{

      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
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


router.post('/', tokenExtractor, async (req, res) => {
  try {

    const user = await User.findByPk(req.decodedToken.id)

    const ingreso = await Ingreso.create({...req.body, userId: user.id})

    const billetera = await Billetera.findByPk(req.body.billeteraId)
    billetera.monto += req.body.monto
    await billetera.save()
    
    res.json(ingreso)
  } catch(error) {
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

router.delete('/:id', ingresoFinder, async (req, res) => {
  if (req.ingreso) {
    await req.ingreso.destroy()
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