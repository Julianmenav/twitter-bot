require('dotenv').config()
const { watchAndReply } = require('./watchAndReply')
const LOOP_TIME = 60000


watchAndReply(LOOP_TIME)