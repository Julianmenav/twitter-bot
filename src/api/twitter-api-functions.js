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
const tweet = async (msg, inReplyToScreenName, inReplyToId) => {
  if (inReplyToScreenName) {
    msg = '@' + inReplyToScreenName + msg
  }
  let twitterClient = newClient();
  const data = await twitterClient.tweets.statusesUpdate({
    status: msg,
    in_reply_to_status_id: inReplyToId
  })
  console.log("Tweeted!")
}

const searchMentions = async (count, sinceId) => {
  let twitterClient = newClient();
  const data = await twitterClient.tweets.statusesMentionsTimeline({ count: count, since_id: sinceId})
  return data.map(tweet => ({ "id": tweet.id_str, "author": tweet.user.screen_name, "msg": tweet.text, "inReplyTo": tweet.in_reply_to_screen_name }))
}

module.exports = {
  tweet,
  searchMentions
}


