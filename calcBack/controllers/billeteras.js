const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Billetera = require('../models/billetera')

const { SECRET } = require('../util/config')


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
  const billeteras = await Billetera.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['username']
    },
    where: {
      userId: req.decodedToken.id
    },

  })
  res.json(billeteras)
})


router.post('/', tokenExtractor, async (req, res) => {
  try {

    const user = await User.findByPk(req.decodedToken.id)

    const billetera = await Billetera.create({...req.body, userId: user.id})
    res.json(billetera)
  } catch(error) {
    return res.status(400).json({ error: 'heres the error' })
  }
})

//middleware para encontrar billetera segurn info del req.params
const billeteraFinder = async (req, res, next) => {
  req.billetera = await Billetera.findByPk(req.params.id)
  next()
}

router.get('/:id', billeteraFinder, async (req, res) => {
  if (req.billetera) {
    res.json(req.billetera)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', billeteraFinder, async (req, res) => {
  if (req.billetera) {
    //el monto que tenia la billetera a borrar debería ir a otra billetera a menos q sea cero
    if(req.billetera.monto != 0){
      //buscar la billetera q se va a seleccionar para enviar el monto de la billetera a borrar
      billeteraParaMonto = await Billetera.findByPk(req.body.billeteraId)
      billeteraParaMonto.monto += req.billetera.monto
      await billeteraParaMonto.save()
    }
    await req.billetera.destroy()
  }
  res.status(204).end()
})

router.put('/:id', billeteraFinder, async (req, res) => {
  if (req.billetera) {
    req.billetera.nombre = req.body.nombre
    req.billetera.permitCredit = req.body.permitCredit
    req.billetera.numDiaPagoTarj = req.body.numDiaPagoTarj
    await req.billetera.save()
    res.json(req.billetera)
  } else {
    res.status(404).end()
  }
})

module.exports = router