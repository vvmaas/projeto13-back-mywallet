import express from 'express'
import cors from 'cors'
import router from './routers/index.js'

const server = express()
server.use(cors())
server.use(express.json())

server.use(router)

server.listen(5000, () => {
    console.log("On at 5000");
})