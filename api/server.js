const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const server = express()
const userRouter = require('./users/users-router')

server.use(cors())
server.use(helmet())

server.use(express.json())
server.use('/api/users', userRouter)