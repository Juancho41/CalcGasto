const express = require('express')
const app = express()
const cors = require('cors')


const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const billeterasRouter = require('./controllers/billeteras')
const ingresosRouter = require('./controllers/ingresos')
const egresosRouter = require('./controllers/egresos')

const scheduledFunctions = require('./scheduledFunctions/scheduledFunctions')


app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/billeteras', billeterasRouter)
app.use('/api/ingresos', ingresosRouter)
app.use('/api/egresos', egresosRouter)

scheduledFunctions.initScheduledJobs();


const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()