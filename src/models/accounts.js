const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema(
  {
    twitterId: {
      type: String,
      required: [true, "Provide twitter_id"]
    },
    twitterName: {
      type: String,
      required: [true, "Provide twitterName"]
    },
    accountName: {
      type: String,
      required: [true, "Provide accountName"]
    },
    puuid: {
      type: String,
      required: [true, "Provide puuid"]
    },
  },
  { timestamps: true}
)

module.exports = mongoose.model("Account", AccountSchema);