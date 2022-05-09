
const getSentence = (totalGames, wins, twitterName) => {
  const winRatio = wins / totalGames
  let mention = `@${twitterName}`
  let sentence = "";
  //Based on Win ratio: 5 GRADOS: 0-0.25; 0.25-0.45; 0.45-0.55; 0.55-0.75, 0.75-1
  //Based on totalGames:   >6
  if (totalGames > 5) {
    switch (true) {
      case (winRatio < 0.25):
        sentence = [`Señoras y señores, ${mention} ES la pochiQ`, `.${mention} no debería haber jugado hoy`, `x9 ${mention} for int please`]
        break;
      case (winRatio < 0.45):
        sentence = [`Mal día para ${mention}`, `.${mention} esta troleando`]
        break;
      case (winRatio < 0.6):
        sentence = [`.${mention} stucked?`, `.${mention} va a por el 50% winrate`]
        break;
      case (winRatio < 0.76):
        sentence = [`A ${mention} no le va mal!`, `.${mention} tiene manos`]
        break;
      default:
        sentence = [`.${mention} se la esta shacando`, `.${mention} modo Faker`, `.${mention} va volando`]
        break;
    }
  } else {
    switch (true) {
      case (winRatio < 0.25):
        sentence = [`A ${mention} no le estan saliendo las cosas`]
        break;
      case (winRatio < 0.45):
        sentence = [`Mal día para ${mention}`, `.${mention} está stucked`]
        break;
      case (winRatio < 0.67):
        sentence = [`.${mention} está en su pick elo`]
        break;
      case (winRatio < 0.76):
        sentence = [`A ${mention} no le va mal`, `.${mention} progresa adecuadamente`]
        break;
      default:
        sentence = [`.${mention} está ganando partidas`, `.${mention} está en la winners queue`]
        break;
    }
  }


  return sentence[Math.floor(Math.random() * sentence.length)]
}

module.exports = {
  getSentence
}

