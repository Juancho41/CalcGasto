const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { SECRET } = require('../util/config')

const { User, Billetera } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Billetera,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const data = {
      username: username,
      email: email,
      passHash: passwordHash

    }


    const user = await User.create(data)

    //se agrega logica para loguear despues de crear usuario
    const userForToken = {
      username: user.username,
      id: user.id,
    }
  
    const token = jwt.sign(userForToken, SECRET)
  
    res
      .status(200)
      .send({ token, username: user.username })


    
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router