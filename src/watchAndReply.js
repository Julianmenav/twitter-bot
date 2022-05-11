require('dotenv').config()
const { searchMentions } = require('./api/twitter-api-functions')
const { lolTweet } = require('./lol-tweet')

const getNewTweet = (arr1, arr2) => {
  return arr2.filter((element) => !arr1.map(el => el.id).includes(element.id))
}

const watchAndReply = async (loopTime) => {
  const oldMentions = await searchMentions(20);

  const watchLoop = async (loopTime, mentions) => {
    while (true) {
      console.log("Searching for mentions...")
      const newMentions = await searchMentions(20);
      const newTweets = getNewTweet(mentions, newMentions)
      //Si hay nuevas menciones, tweetea en orden sobre ellas.
      if (newTweets.length > 0) {
        for (const tweet of newTweets) {
          const objetive = tweet.msg.match(/(?<=\@)(.*?)(?=\s)/g)[0]
          console.log(`New mention from ${objetive}! \n`, tweet)
          const inReplyTo = tweet.author
          const inReplyToId = tweet.id
          if (objetive.toUpperCase() === tweet.inReplyTo.toUpperCase() && objetive !== process.env.BOT_SCREEN_NAME) {
            await lolTweet(objetive, 0, inReplyTo, inReplyToId)
          }
        }
      }
      try {
        await new Promise(resolve => setTimeout(() => resolve(watchLoop(loopTime, newMentions)), loopTime))
      } catch (error) {
        console.error(error)
      }
    }
  }
  watchLoop(loopTime, oldMentions)
}



module.exports = {
  watchAndReply
}