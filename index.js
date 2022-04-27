require('dotenv').config()
const { tweet } = require('./twitter-api-functions')
const { getSummonerInfoByName, getMatchHistoryByPuuid } = require('./lol-api-functions')
const { accounts } = require('./accountsList')
const HOURS = 12
const OBJETIVE = "lupiiiix"

async function lolTweet(twitterName, acc) {

  const summonerName = accounts[twitterName][acc].name
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

  //En caso de que no haya suficientes partidas, repite el proceso con la siguiente cuenta del usuario en la lista. usando recursividad.
  if (totalGames > 3){
    await tweet(text).catch(e => console.error(e))
  } else {
    if (acc < accounts[twitterName].length - 1){
      console.log(`Buscando en la siguiente cuenta de ${OBJETIVE}...`)
      lolTweet(OBJETIVE, acc + 1)
    } else {
      console.log("No se encontraron partidas.")
      await tweet(`@${twitterName} no ha jugado lo suficiente en las últimas ${HOURS} horas bro...`).catch(e => console.error(e))
    }
  }
}

lolTweet(OBJETIVE, 0);


