const {lolTweet, lolTweetX} = require('./lol-tweet')
const accounts = require('./accountsList')

const tweetRandomPlayer = async () => {
  let randomNumber = Math.floor(Math.random() * 75 );
  let randomPlayer = Object.keys(accounts)[randomNumber]
  try {
    await lolTweetX(randomPlayer, 0)
  } catch (error) {
    console.error(error)
  }
} 
//Si le pasamos parámetro twittea sobre el jugador que pasemos como si fuese una respuesta(lolTweet).
//Si no pasamos parametro, twittea random, simepre y cuando haya jugado suficiente y en el hace 1 hora (lolTweetX)
process.argv[2]? lolTweet(process.argv[2], 0) : tweetRandomPlayer()

