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