require('dotenv').config()
const { TwitterClient } = require('twitter-api-client')

//We are creating new CLients for every Request so the API data will be updated in each one.
const newClient = () => {
  const twitterClient = new TwitterClient({
    apiKey: process.env.CONSUMER_API_KEY,
    apiSecret: process.env.CONSUMER_API_SECRET,
    accessToken: process.env.BOT_ACCESS_TOKEN,
    accessTokenSecret: process.env.BOT_TOKEN_SECRET
  })
  return twitterClient
}

//Send tweet function.
const tweet = async (msg, inReplyToId ) => {
  let twitterClient = newClient();        
  const data = await twitterClient.tweets.statusesUpdate({
    status: msg,
    in_reply_to_status_id: inReplyToId
  })
  console.log("Tweeted!")
}

const borraTweets = async () => {
  let twitterClient = newClient();
  const dataf = await twitterClient.tweets.statusesUserTimeline({
    screen_name: process.env.BOT_SCREEN_NAME,
    count: 300
  }).then(data => data.map(el => el.id_str))

  for (const id of dataf){
    console.log(id)
    try {
      await twitterClient.tweets.statusesDestroyById({
        id: id
      })
      
    } catch (error) {
      console.error(error)
    }
  }
  console.log("borrado")
}

module.exports = {
  tweet
}


