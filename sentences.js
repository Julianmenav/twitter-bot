
const getSentence = (totalGames, wins, twitterName) => {
  const winRatio = wins / totalGames
  let sentence = "";
  //Based on Win ratio: 5 GRADOS: 0-0.25; 0.25-0.45; 0.45-0.55; 0.55-0.75, 0.75-1
  //Based on totalGames:   >6
  if (totalGames > 5) {
    switch (true) {
      case (winRatio < 0.25):
        sentence = [`Señoras y señores, @${twitterName} ES la pochiqueue`, `.@${twitterName} no debería haber jugado hoy`, `x9 @${twitterName} for int please`]
        break;
      case (winRatio < 0.45):
        sentence = [`Parece que @${twitterName} va en silla de ruedas`, `Mal día para @${twitterName}`, `.@${twitterName} esta troleando`]
        break;
      case (winRatio < 0.6):
        sentence = [`.@${twitterName} stucked?`, `.@${twitterName} va a por el 50% winrate`]
        break;
      case (winRatio < 0.76):
        sentence = [`A @${twitterName} no le va mal!`, `.@${twitterName} tiene manos`]
        break;
      default:
        sentence = [`.@${twitterName} SE LA ESTA SHACANDO`, `.@${twitterName} modo Faker`, `.@${twitterName} va volando`]
        break;
    }
  } else {
    switch (true) {
      case (winRatio < 0.25):
        sentence = [`A @${twitterName} no le estan saliendo las cosas`, `Parece que @${twitterName} va en silla de ruedas`]
        break;
      case (winRatio < 0.45):
        sentence = [`Mal día para @${twitterName}`, `.@${twitterName} está stucked`]
        break;
      case (winRatio < 0.67):
        sentence = [`.@${twitterName} está en su pick elo`]
        break;
      case (winRatio < 0.76):
        sentence = [`A @${twitterName} no le va mal`, `.@${twitterName} progresa adecuadamente`]
        break;
      default:
        sentence = [`.@${twitterName} está ganando partidas`, `.@${twitterName} está en la winners queue`]
        break;
    }
  }


  return sentence[Math.floor(Math.random() * sentence.length)]
}

module.exports = {
  getSentence
}

