import db from "../db.js"

async function getRegisterList (req,res) {
    const session = res.locals.session

    try {
        const register = await db.collection("register").find({userId: session.userId}).toArray()
        res.send(register)
    } catch (error) {
        res.sendStatus(401)
    }
}

async function postRegister (req,res) {
    const session = res.locals.session
    const newRegister = res.locals.newRegister

    try {
        newRegister.userId = session.userId
        await db.collection("register").insertOne({
            value: newRegister.value,
            text: newRegister.text,
            type: newRegister.type,
            date: newRegister.date,
            userId: newRegister.userId
        })
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(401)
    }

}

export {getRegisterList, postRegister}