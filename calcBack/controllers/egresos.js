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

        } catch {

            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
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

const billeteraFinder = async (req, res, next) => {
    req.billetera = await Billetera.findByPk(req.body.billeteraId)

    next()
}


router.post('/', tokenExtractor, billeteraFinder, async (req, res) => {
    try {
        console.log('egreso')
        const user = await User.findByPk(req.decodedToken.id)


        const egreso = await Egreso.create({ ...req.body, userId: user.id })
        console.log(egreso)

        if (req.billetera) {
            console.log('asdfasdfasdf')
            req.billetera.monto -= req.body.monto
            await req.billetera.save()
            console.log('aca una vez')
        } else {
            res.status(404).end()
        }


        res.json(egreso)
    } catch (error) {
        return res.status(400).json({ error: 'error en post de egreso' })
    }
})

const egresoFinder = async (req, res, next) => {
    console.log(req.params.id)
    req.egreso = await Egreso.findByPk(req.params.id)
    console.log(req.egreso)
    next()
}

router.get('/:id', egresoFinder, async (req, res) => {
    if (req.egreso) {
        res.json(req.egreso)
    } else {
        res.status(404).end()
    }
})

router.delete('/:id', egresoFinder, billeteraFinder, async (req, res) => {
    if (req.egreso && req.billetera) {
        await req.egreso.destroy()
        req.billetera.monto -= req.body.monto
        await req.billetera.save()

    }
    res.status(204).end()
})

router.put('/:id', egresoFinder, billeteraFinder, async (req, res) => {
  if (req.egreso && req.billetera) {

    req.egreso.date = req.body.date
    req.egreso.categoria = req.body.categoria
    req.egreso.comentario = req.body.comentario
    req.egreso.formaPago = req.body.formaPago

    if(req.egreso.monto != req.body.monto) {
        req.egreso.monto = req.body.monto
        req.billetera += req.egreso.monto - req.body.monto
        await req.billetera.save()
    }

    if(req.egreso.billeteraId != req.body.billeteraId){
        req.billetera.monto -= req.body.monto
        await req.billetera.save()

        billeteraAnterior = await Billetera.findByPk(req.egreso.billeteraId)
        billeteraAnterior.monto += req.body.monto
        await billeteraAnterior.save()

        req.egreso.billeteraId = req.body.billeteraId

    }

    await req.egreso.save()
    res.json(req.egreso)
  } else {
    res.status(404).end()
  }
})

module.exports = router