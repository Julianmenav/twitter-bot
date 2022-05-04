//Quiero una función a la que le entrego un array de partidas(obj) y otro así : [-13LP, PROMO, +14LP, ?LP], y si concuerdan las victorias con los menos retornar true.


const tester = (matchData, lpData) => {
  return lpData.every((tag, i) => {
    if (tag.charAt(0) == "+" && !matchData[i].win) return false
    if (tag.charAt(0) == "-" && matchData[i].win) return false
    return true
  })
}

module.exports = {
  tester
};