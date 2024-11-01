const axios = require('axios')
const FormData = require('form-data')
const cheerio = require('cheerio')
async function douyin(url) {
  try {
    const form = new FormData()
    form.append('q', url)
    form.append('lang', 'en')
    const { data } = await axios.post('https://lovetik.app/api/ajaxSearch', form, {
      headers: {
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })
    const $ = cheerio.load(data.data);

    // Find all <a> tags and extract href attributes
    const result = [];
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      const type = $(element).text().trim()
      if (href) {
        if (!href.includes("https")) return
        result.push({ type, href });
      }
    });
    return result
  } catch (e) {
    console.log(e.message)
    return e
  }
}
// douyin('https://v.douyin.com/iJAgnX8D/') //Contoh pemanggil function
