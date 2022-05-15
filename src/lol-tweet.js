require('dotenv').config()
const { tweet } = require('./api/twitter-api-functions')
const { getMatchHistoryByPuuid, getSummonerInfoByPuuid } = require('./api/lol-api-functions')
const { lpScraper } = require('./leagueScraper')
const { tester } = require('./utils/matchTester')
const { getParameterCaseInsensitive } = require('./utils/caseInsensitiveFinder')
const { getSentence } = require('./sentences')
const HOURS = 12

async function lolTweet(accounts, twitterName, acc, inReplyTo, inReplyToId) {
  console.log(`Buscando partidas para ${twitterName}...`)
  const summoner = getParameterCaseInsensitive(accounts, twitterName)
  //Si el nombre no está en nuestra lista descartamos.
  if (!summoner) {
    return console.log("No está en la lista.")
  }
  const summonerPuuid = summoner[acc].puuid
  const tierData = await getSummonerInfoByPuuid(summonerPuuid)
  const { tier, rank, leaguePoints, name } = tierData

  //Epoch timestamp in seconds
  const rightNowMS = new Date().getTime()
  const timestampLimit = Math.floor((rightNowMS - HOURS * 3600000) / 1000)
  const matchData = await getMatchHistoryByPuuid(summonerPuuid, timestampLimit)

  const totalGames = matchData.length
  const wins = matchData.filter(el => el.win).length
  const loses = totalGames - wins
  //3 OPCIONES. 
  //SI NO HAY SUFICIENTES PARTIDAS:
  if (totalGames < 3) {
    //1. PASA A MIRAR LA SIGUIENTE CUENTA DEL JUGADOR (SI EXISTE)
    if (acc < summoner.length - 1) {
      console.log(`Buscando en la siguiente cuenta de ${OBJETIVE}...`)
      return lolTweet(OBJETIVE, acc + 1)
    }
    //2. UNA VEZ SE HAN MIRADO TODAS Y NO HAY PARTIDAS SUFICIENTES:
    console.log("No se encontraron partidas.")
    const noGamesText = `.@${twitterName} no ha jugado lo suficiente en las últimas ${HOURS} horas...`
    return await tweet(noGamesText, inReplyTo, inReplyToId).catch(e => console.error(e))
  }

  console.log("Se encontraron partidas.")
  console.log("Buscando los lps...")
  // const lpData = await lpScraper(name, totalGames)
  const makeSense = false
  // const makeSense = tester(matchData, lpData.order) //true or false
  // const lpText = `${lpData.lp > 0 ? "+" : ""}${lpData.lp} Lps 
  // [${lpData.order}]`
  const text =
    `
  ${getSentence(totalGames, wins, twitterName)}
  
Cuenta: ${name}
En las últimas ${HOURS} horas:
${wins}W - ${loses}L
${makeSense && !isNaN(lpData.lp) ? lpText : ""}

${tier} ${rank}  ${leaguePoints}LPs  
`

  return await tweet(text, inReplyTo, inReplyToId).catch(e => console.error(e))
}

module.exports = {
  lolTweet
}