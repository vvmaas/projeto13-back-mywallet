import db from "../db.js"
import bcrypt from "bcrypt"

async function checkRegistration(req,res,next) {
    const user = req.body
    res.locals.user = user

    try {
        const exists =  await db.collection("users").findOne({email: user.email})
        res.locals.userExists = exists
        
        if (exists && bcrypt.compareSync(user.password, exists.password)) {
            next()
        } else {
            return res.sendStatus(401)
        }

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export default checkRegistration