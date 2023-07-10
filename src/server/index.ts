import express from 'express'
import cors from 'cors'

const port = 3000

const app = express()

app.use(express.json())

app.use(cors())

app.get('/ping', (req, res) => {
  console.log('server was pinged')
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})



