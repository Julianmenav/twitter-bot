const { searchMentions } = require('./twitter-api-functions')
const { lolTweet } = require('./lol-tweet')

const getNewTweet = (arr1, arr2) => {
  return arr2.filter((element) => !arr1.map(el => el.id).includes(element.id))
}

const watchAndReply = async (loopTime) => {
  const oldMentions = await searchMentions(20);
  
  const watchLoop = async (loopTime, mentions) => {
    while (true) {
      console.log("bucle mirando...")
      const newMentions = await searchMentions(20);
      const newTweets = getNewTweet(mentions, newMentions)
      //Si hay nuevas menciones, tweetea en orden sobre ellas.
      if (newTweets.length > 0) {
        for (const tweet of newTweets) {
          const objetive = tweet.msg.match(/(?<=\@)(.*?)(?=\s)/g)[0]
          const inReplyTo = tweet.author
          const inReplyToId = tweet.id
          if (objetive === tweet.inReplyTo && objetive !== "lolStatsES"){
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