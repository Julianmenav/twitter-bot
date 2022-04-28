require('dotenv').config()
const { getSummonerInfoByName } = require('./lol-api-functions')
const accounts = require('./accountsList')



const finder = async () => {
  for (const key of Object.keys(accounts)){
    if(accounts[key][0].puuid === ""){
      try {
        console.log(accounts[key][0].name)
        const {puuid} = await getSummonerInfoByName(encodeURIComponent(accounts[key][0].name));
        console.log(0, puuid)
        
        accounts[key][0].puuid = puuid
  
      } catch (error) {
        console.error(error)
        break ;
      }
    }
  }
  
  
  console.log(JSON.stringify(accounts))

}

finder();