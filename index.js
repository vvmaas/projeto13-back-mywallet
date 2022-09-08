import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'
import joi from 'joi'
import Joi from 'joi'
dotenv.config()

const server = express()
server.use(cors())
server.use(express.json())

const mongoClient = new MongoClient(process.env.MONGO_URI)

let db;
mongoClient.connect().then(() => {
    db = mongoClient.db('mywallet')
})



server.listen(5000, () => {
    console.log("On at 5000");
})