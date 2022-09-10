import db from "../db.js"

async function checkAvailability(req,res,next) {
    const user = req.body
    res.locals.user = req.body

    try {
        const taken = await db.collection("users").findOne({email: user.email})
        
        if(taken){
            return res.sendStatus(420)
        }

        next()
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export default checkAvailability