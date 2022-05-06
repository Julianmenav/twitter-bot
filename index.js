require('dotenv').config()
const {lolTweet} = require('./lol-tweet')
const accounts = require('./accountsList')
const OBJETIVE = "FTREFORMED"



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

bucle(5000)
//lolTweet(OBJETIVE, 0)