import express from 'express'
import initApp from './app.router.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

initApp(app,express)
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))