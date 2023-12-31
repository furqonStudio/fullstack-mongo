import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import UserRoute from './routes/UserRoute.js'

const app = express()
mongoose.connect('mongodb://0.0.0.0:27017/fullstack_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(cors())
app.use(express.json())
app.use(UserRoute)

app.listen(3000, () => { console.log('Server started') })
