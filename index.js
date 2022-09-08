import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'
import joi from 'joi'
import Joi from 'joi'
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid';

const token = uuid();
dotenv.config()

const server = express()
server.use(cors())
server.use(express.json())

const mongoClient = new MongoClient(process.env.MONGO_URI)

let db;
mongoClient.connect().then(() => {
    db = mongoClient.db('mywallet')
})

server.post("/login", async (req,res) => {
    const user = req.body

    try {
        const exists =  await db.collection("users").findOne({email: user.email})
        
        if (exists && bcrypt.compareSync(user.password, exists.password)) {
            const token = uuid()

            await db.collection("sessions").insertOne({
                userId: exists._id,
                token: token
            })

            res.send(token)
        } else {
            return res.sendStatus(401)
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

server.post("/signup", async (req,res) => {
    const user = req.body
    console.log(user)

    try {
        const taken = await db.collection("users").findOne({email: user.email})
        console.log(taken)

        if(taken){
            return res.sendStatus(420)
        }
        const hashedPassword = bcrypt.hashSync(user.password, 10)
        const signup = await db.collection("users").insertOne({
            name: user.name,
            email: user.email,
            password: hashedPassword,
        })

        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

server.listen(5000, () => {
    console.log("On at 5000");
})