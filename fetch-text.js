import cheerio from 'cheerio-without-node-native'

export const fetchPage = async () => {
  const page = await (await fetch("https://www.oblates.se/index.php?o=nbreviar#")).text()
  return page
}

export const getText = (page, selector) => {
  const $ = cheerio.load(page)
  let text = $(`#${selector}`).html()
  text = text.replace(/<script.*<\/script>/gms, "")
  text = text.replace(/<font size="\+\d"> <p>/gms, "")
  text = text.replace(/<\/font>.*<p><\/p>/, "")
  text = text.replace(/<\/font>/g, "")
  text = text.replace(/<center>/g, "")
  text = text.replace(/<\/center>/g, "")
  text = text.replace(/<style>.*?<\/style>/gs, "")
  text = text.replace(/<div id="fontlinks">.*?<\/div>/gs, "")
  text = text.replace(/<font[a-zA-ZæøåÅÆØ="' +0-9#]*>/g, "")
  text = text.replace(/<style.*?>.*?<\/div>.*?<\/center>/s, "")
  text = text.replace(/<!--.*?-->/s, "")

  return `<div>${text}</div>`
}
