require('dotenv').config()
const { watchAndReply } = require('./watchAndReply')
const LOOP_TIME = 30000


watchAndReply(LOOP_TIME)