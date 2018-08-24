var rp = require('request-promise');
const appConfig = require('../appConfig');

const getOpenId = code => {
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appConfig.AppID}&secret=${appConfig.AppSecret}&js_code=${code}&grant_type=authorization_code`
  return rp(url).then(res => JSON.parse(res));
}

module.exports = {
  getOpenId,
}
