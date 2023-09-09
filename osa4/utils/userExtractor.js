const User = require('../models/user')
const jwt = require('jsonwebtoken')

const userExtractor = async function (request, response, next) {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id){
            return response.status(401).json({error:'token invalid'})
        }
        const user = await User.findById(decodedToken.id)
        request.user = user._id
    } catch{
        return response.status(401).json({error:"token missing or invalid"})
    }
    next()
}

module.exports = userExtractor