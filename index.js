require('dotenv').config()
const { tweet } = require('./twitter-api-functions')
const { getMatchHistoryByPuuid, getSummonerInfoByPuuid } = require('./lol-api-functions')
const accounts = require('./accountsList')
const HOURS = 12
const OBJETIVE = "willyrex_fanboy"

async function lolTweet(twitterName, acc) {

  const summonerPuuid = accounts[twitterName][acc].puuid
  const tierData = await getSummonerInfoByPuuid(summonerPuuid)
  const { tier, rank, leaguePoints, name} = tierData


  const timestampLimit = Math.floor(new Date().getTime()) - HOURS * 3600000
  const matchData = await getMatchHistoryByPuuid(summonerPuuid, timestampLimit)
  const totalGames = matchData.length
  const wins = matchData.filter(el => el.win).length
  const loses = totalGames - wins


  const text =
    `
Un mal día para @ ${twitterName}

Cuenta: ${name}
-13 Lps en las últimas ${HOURS} horas
(${wins} victorias ${loses} derrotas)
${tier} ${rank}   ${leaguePoints}LPs  
`

  //3 OPCIONES. 
  //1. TWEET SOBRE ESTA CUENTA
  if (totalGames > 3){
    return await tweet(text).catch(e => console.error(e))
  } 
  //2. PASA A MIRAR LA SIGUIENTE CUENTA DEL JUGADOR (SI EXISTE)
  if (acc < accounts[twitterName].length - 1){
    console.log(`Buscando en la siguiente cuenta de ${OBJETIVE}...`)
    return lolTweet(OBJETIVE, acc + 1)
  }
  //3. UNA VEZ SE HAN MIRADO TODAS Y NO HAY PARTIDAS:
  console.log("No se encontraron partidas.")
  await tweet(`@ ${twitterName} no ha jugado lo suficiente en las últimas ${HOURS} horas bro...`).catch(e => console.error(e))
}

lolTweet(OBJETIVE, 0);


