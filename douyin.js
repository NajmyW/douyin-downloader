const axios = require('axios')
const cheerio = require('cheerio')
async function douyin(url) {
  try {
  const getToken = (await axios.get('https://snaptikapp.me/download-douyin-video/')).data
  const $ = cheerio.load(getToken)
  const token = $('#token').attr('value')
  const { data } = await axios.post('https://snaptikapp.me/wp-json/aio-dl/video-data/',{
    url: url,
    token
  },{
    headers:{
      'Content-Type':"application/x-www-form-urlencoded"
    }
  })
  const mp4_Hd = data.medias.filter(i => i.quality === 'hd')[0]
  const mp4_Sd = data.medias.filter(i => i.quality === 'sd')[0]
  const watermark = data.medias.filter(i => i.quality === 'watermark')[0]
  const mp3 = data.medias.filter(i => i.extension === 'mp3')[0]
  const res = {
    title: data.title,
    duration: data.duration,
    mp4: mp4_Hd ? mp4_Hd : mp4_Sd,
    mp4_watermark: watermark ? watermark : 'yahh link tidak ditemukan',
    mp3:mp3.url,
  }
return res
  } catch (e) {
  return e
  }
}
