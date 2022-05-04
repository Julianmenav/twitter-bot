const puppeteer = require('puppeteer');

//Queremos una función que nos devuelva la cantidad de puntos de diferencia. y la cantidad de promos.
const lpScraper = async (summonerNameEncoded, nOfGames) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const VIEWPORT = { width: 1920, height: 4000}
  await page.setViewport(VIEWPORT);
  await page.goto(`https://app.mobalytics.gg/lol/profile/euw/${summonerNameEncoded}/overview`, {waitUntil: 'domcontentloaded'});
  await page.waitForTimeout(1000);
  
  
  const lastGames = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("div.m-15s0h17, div.m-122nwo5, div.m-laq7sq, div.m-2x65k2, div.m-1swtjkm > div > a > div"))  
      .map(el => ({"innerText" : el.innerText, "className": el.className}))
  })
  console.log(lastGames)
  const lpDifference = lastGames.slice(0, nOfGames).reduce((agg, el, i) => {
    let text = el.innerText
    let selector = el.className  
    if(text == "Promo"){
      agg.order.push(
        selector === 'm-laq7sq' ? "🟢" : "🔴"
      )
      agg.promo += 1;
      return agg
    } else {
      agg.order.push(text)
      agg.lp += parseInt(text.slice(0, text.length - 2))
      return agg
    }
  },{"lp": 0, "promo": 0, "order": []})

  await browser.close();
  return lpDifference
}

module.exports = {
  lpScraper
}

