require('dotenv').config()
const { tweet } = require('./twitter-api-functions')
const { getMatchHistoryByPuuid, getSummonerInfoByPuuid } = require('./lol-api-functions')
const { lpScraper } = require('./leagueScraper')
const { tester } = require('./matchTester')
const { getParameterCaseInsensitive } = require('./caseInsensitiveFinder')
const accounts = require('./accountsList')
const HOURS = 12
const OBJETIVE = "FTREFORMED"

async function lolTweet(twitterName, acc) {
  const summoner = getParameterCaseInsensitive(accounts, twitterName)
  //Si el nombre no está en nuestra lista descartamos.
  if (!summoner){
    return await tweet("No le sabe 😔").catch(e => console.error(e))
  }
  const summonerPuuid = summoner[acc].puuid
  const tierData = await getSummonerInfoByPuuid(summonerPuuid)
  const { tier, rank, leaguePoints, name} = tierData


  const timestampLimit = Math.floor(new Date().getTime()) - HOURS * 3600000
  const matchData = await getMatchHistoryByPuuid(summonerPuuid, timestampLimit)

  const totalGames = matchData.length
  const wins = matchData.filter(el => el.win).length
  const loses = totalGames - wins

  const lpData = await lpScraper(name, totalGames)

  const makeSense = tester(matchData, lpData.order) //true or false
  const lpText = `${lpData.lp > 0 ? "+" : ""}${lpData.lp} Lps [${lpData.order}]`
  const noGamesText = `@ ${twitterName} no ha jugado lo suficiente en las últimas ${HOURS} horas bro...`
  const text =
    `
Un mal día para @ ${twitterName}

Cuenta: ${name}
En las últimas ${HOURS} horas:
${wins}W - ${loses}L
${ makeSense && !isNaN(lpData.lp) ? lpText : "" }

${tier} ${rank}  ${leaguePoints}LPs  
`

  //3 OPCIONES. 
  //1. TWEET SOBRE ESTA CUENTA
  if (totalGames > 2){
    return await tweet(text).catch(e => console.error(e))
  } 
  //2. PASA A MIRAR LA SIGUIENTE CUENTA DEL JUGADOR (SI EXISTE)
  if (acc < accounts[twitterName].length - 1){
    console.log(`Buscando en la siguiente cuenta de ${OBJETIVE}...`)
    return lolTweet(OBJETIVE, acc + 1)
  }
  //3. UNA VEZ SE HAN MIRADO TODAS Y NO HAY PARTIDAS:
  console.log("No se encontraron partidas.")
  await tweet(noGamesText).catch(e => console.error(e))
}

const bucle = async (loopTime) => {
  const interval = setInterval(async () => {
    let randomNumber = Math.floor(Math.random() * 75 );
    let randomPlayer = Object.keys(accounts)[randomNumber]
    try {
      await lolTweet(randomPlayer, 0)
    } catch (error) {
      console.error(error)
    }
  }, loopTime)
}

bucle(10000)
//lolTweet(OBJETIVE, 0)