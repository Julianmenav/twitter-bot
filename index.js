require('dotenv').config()
const { tweet } = require('./twitter-api-functions')
const { getSummonerInfoByName, getMatchHistoryByPuuid } = require('./lol-api-functions')
const { accounts } = require('./accountsList')
const HOURS = 12

async function lolTweet(twitterName) {

  const summonerName = accounts[twitterName][0].name
  const tierData = await getSummonerInfoByName(summonerName)
  const { tier, rank, leaguePoints, puuid } = tierData


  const timestampLimit = Math.floor(new Date().getTime()) - HOURS * 3600000
  const matchData = await getMatchHistoryByPuuid(puuid, timestampLimit)
  const totalGames = matchData.length
  const wins = matchData.filter(el => el.win).length
  const loses = totalGames - wins


  const text =
    `
Un mal día para @${twitterName}

Cuenta: ${summonerName}
-13 Lps en las últimas ${HOURS} horas
(${wins} victorias ${loses} derrotas)
${tier} ${rank}   ${leaguePoints}LPs  
`

  if (totalGames > 3){
    tweet(text).catch(e => console.error(e))
  } else {
    tweet(`@${twitterName} no ha jugado lo suficiente en las últimas ${HOURS} horas bro...`).catch(e => console.error(e))
  }
}

lolTweet("P0o_frek");


