const jwt = require("jsonwebtoken")

const verify = (req, res, next) => {
    // console.log(req)
    const authHeader = req.headers["authorization"]
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        const data = jwt.verify(token, process.env.SECRET_KEY)
        if(data){
            req.user = data
            next()
        }
    } else {
        res.status(401).json("You are not authenticated!")
    }
}

module.exports = verify