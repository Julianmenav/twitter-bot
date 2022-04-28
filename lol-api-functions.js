require("dotenv").config()
const axios = require('axios')

//Funcion que devuelva las ultimas partidas jugadas, victorias, y el tiempo en unix
const getMatchHistoryByPuuid = async (puuid, timestamp) => {
  const matchHistoryResponse = await axios
    .get(`${process.env.LOL_REGION}/lol/match/v5/matches/by-puuid/${puuid}/ids`,
      { headers: { "X-Riot-Token": process.env.LOL_KEY } })
    .catch(e => {
      console.error(e.response.data)
    })
  result = []

  //Sólo este bucle me permite esperar los datos sin saltar al siguiente ciclo.  
  for (const element of matchHistoryResponse.data) {
    let gameResponse = await axios
      .get(`${process.env.LOL_REGION}/lol/match/v5/matches/${element}`,
        { headers: { "X-Riot-Token": process.env.LOL_KEY } })
      .catch(e => {
        console.error(e.response.data)
      })
    gameData = gameResponse.data.info

    //TIME LIMIT
    if (gameData.gameEndTimestamp < timestamp) { break; }

    //ONLY RANKED GAMES
    if (gameData.gameType === "MATCHED_GAME" && gameData.gameMode === "CLASSIC") {
      result.push({
        //"game": gameResponse.data.metadata.matchId,
        //"gameMode": gameData.gameMode,
        //"gameType": gameData.gameType,
        "timestamp": gameData.gameEndTimestamp,
        "win": gameData.participants.filter((el) => el.puuid === puuid)[0].win,
        "champ": gameData.participants.filter((el) => el.puuid === puuid)[0].championName
      })
    }
  }
  return result
}

const getSummonerInfoByName = async (summonerName) => {

  const summonerIdResponse = await axios
    .get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`,
      { headers: { "X-Riot-Token": process.env.LOL_KEY } })
    .catch(e => {
      console.error(e.response.data)
    })

  const { id, puuid, summonerLevel } = summonerIdResponse.data
  const responseRanked = await axios
    .get(`${process.env.LOL_URL}/lol/league/v4/entries/by-summoner/${id}`,
      { headers: { "X-Riot-Token": process.env.LOL_KEY } })
    .catch(e => {
      console.error(e)
    })

  //Return for Unrankeds  
  if (responseRanked.data.length === 0) {
    return {
      id,
      puuid,
      summonerLevel,
      tier: "Unranked",
      rank: "",
      wins: 0,
      losses: 0,
      leaguePoints: 0,
      winRate: 0
    }
  }

  const { tier, rank, wins, losses, leaguePoints } = responseRanked.data.filter(rank => rank.queueType === "RANKED_SOLO_5x5")[0]
  return {
    id,
    puuid,
    summonerLevel,
    tier,
    rank,
    wins,
    losses,
    leaguePoints,
    winRate: ((wins / (wins + losses)) * 100).toFixed(1)
  }
}

const getSummonerInfoByPuuid = async (puuid) => {

  const summonerIdResponse = await axios
    .get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      { headers: { "X-Riot-Token": process.env.LOL_KEY } })
    .catch(e => {
      console.error(e.response.data)
    })

  const { id, name, summonerLevel } = summonerIdResponse.data
  const responseRanked = await axios
    .get(`${process.env.LOL_URL}/lol/league/v4/entries/by-summoner/${id}`,
      { headers: { "X-Riot-Token": process.env.LOL_KEY } })
    .catch(e => {
      console.error(e)
    })

  //Return for Unrankeds  
  if (responseRanked.data.length === 0) {
    return {
      id,
      puuid,
      summonerLevel,
      tier: "Unranked",
      rank: "",
      wins: 0,
      losses: 0,
      leaguePoints: 0,
      winRate: 0
    }
  }

  const { tier, rank, wins, losses, leaguePoints } = responseRanked.data.filter(rank => rank.queueType === "RANKED_SOLO_5x5")[0]
  return {
    id,
    name,
    summonerLevel,
    tier,
    rank,
    wins,
    losses,
    leaguePoints,
    winRate: ((wins / (wins + losses)) * 100).toFixed(1)
  }
}

module.exports = {
  getSummonerInfoByName,
  getMatchHistoryByPuuid,
  getSummonerInfoByPuuid
}








