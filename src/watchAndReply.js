require('dotenv').config()
const { searchMentions } = require('./api/twitter-api-functions')
const { lolTweet } = require('./lol-tweet')
const {getAccounts} = require('./getAccounts')


const watchAndReply = async (loopTime) => {
  //Obtener cuentas.
  try {
    console.log("Getting accounts...")
    var accounts = await getAccounts().then(console.log("Success!"))
  } catch (error) {
    console.error(error)
  }
  //Mira ID última mención.
  const mentions = await searchMentions(10, 1524366533921558929)
  let lastID = Math.max(...mentions.map(e => e.id)) + 1000
  console.log("Last ID => ", lastID)
  //Cada X tiempo mira si existen tweets más recientes usando la ID.

  while (true) {
    await new Promise(resolve => setTimeout(resolve, loopTime))
    console.log("Searching for new mentions...")
    const newMentions = await searchMentions(10, lastID)
    if (!!newMentions.length) {
      for (const tweet of newMentions) {
        const objetive = tweet.msg.match(/(.*?)(?=\s)/g)[0]
        console.log(`New mention! Objetive => ${objetive}! \n`, tweet)
        const inReplyTo = tweet.author
        const inReplyToId = tweet.id
        if (objetive !== process.env.BOT_SCREEN_NAME) {
          await lolTweet(accounts, objetive, 0, inReplyTo, inReplyToId)
        }
      }
      lastID = Math.max(...newMentions.map(e => e.id)) + 1000
    }
  }

}

module.exports = {
  watchAndReply
}