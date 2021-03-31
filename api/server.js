const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('./users/users-router')
const productRouter = require('./products/products-router')
const restricted = require('./middleware/restricted')


const server = express()
server.use(helmet())
server.use(cors())


server.use(express.json())
server.use('/api/users', userRouter)
server.use('/api/products', productRouter)



module.exports = server