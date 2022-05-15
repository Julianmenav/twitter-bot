require('dotenv').config()
const { watchAndReply } = require('./watchAndReply')
const { tweetRandomPlayer } = require('./randomTweet')
const { mongoose } = require('mongoose')
const LOOP_TIME = 30000


const mongoUri = process.env.MONGO_URI;



const start = async () => {
  try {
    await mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Connected to database"));
    watchAndReply(LOOP_TIME)
    //RANDOMLOOP
    // randomLoop(LOOP_TIME)
  } catch (error) {
    console.log(error);
  }
};

async function randomLoop(loopTime) {
  while (true) {
    await new Promise(resolve => setTimeout(resolve, loopTime))
    tweetRandomPlayer();
  }
}

start();