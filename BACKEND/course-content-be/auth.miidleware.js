const jwt = require("jsonwebtoken")


const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, "instructor", (err, decoded) => {
            if (decoded) {
                req.body.UserID = decoded.UserID
                next()
            } else {
                return res.send({
                    msg: "Inavlid token"
                })
            }
        })
    } else {
        return res.send({
            msg: "Aceess denied"
        })
    }
}

module.exports = auth