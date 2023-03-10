require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");
        if(!jwtToken) {
            return res.status(403).json({msg: "authorization denied"});
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        req.user = payload.user;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(403).json({msg: "authorization denied"});
    }

   
};