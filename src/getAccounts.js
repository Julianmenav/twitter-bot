require('dotenv').config()
const mongoose = require('mongoose')

const Account = require('./models/accounts')

const mongoUri = process.env.MONGO_URI;

const getAccounts = async () => {
  try {
    const data = await Account.find({})
    //I love reduce method
    const accounts = data.reduce((agg, el) => {
      if (agg.hasOwnProperty(el.twitterName)){
        agg[el.twitterName].push(
          {
            "name": el.accountName,
            "puuid": el.puuid
          }
        )
        return agg
      }
      agg[el.twitterName] = [
        {
          "name": el.accountName,
          "puuid": el.puuid
        }
      ]
      return agg
    //Transform all documents to the format we need.
    },{})
    return accounts

  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getAccounts
}