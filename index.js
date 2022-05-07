require('dotenv').config()
const {lolTweet} = require('./lol-tweet')
const {watchAndReply} = require('./watchAndReply')
const accounts = require('./accountsList')
const OBJETIVE = "FTREFORMED"
const LOOP_TIME = 10000


const bucle = async (loopTime) => {
  while (true){
    let randomNumber = Math.floor(Math.random() * 75 );
    let randomPlayer = Object.keys(accounts)[randomNumber]
    try {
      await new Promise(resolve => setTimeout(() => resolve(lolTweet(randomPlayer, 0)), loopTime))
    } catch (error) {
      console.error(error)
    }
  }
}

//bucle(5000)
watchAndReply(LOOP_TIME)