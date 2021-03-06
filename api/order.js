const ITEM = require('../db/item')
const ORDER = require('../db/order')
const add = async query => {
  const newOrder = {
    ...query,
    state: 'WAIT',
    items: await Promise.all(query.items.map(async item => {
      const newItem =  {
        ...item,
        openid: query.openid,
      }
      const itemNew = await ITEM.add(newItem)
      return itemNew
    }))
  }
  const orderNew = await ORDER.add(newOrder)
  return new Promise(resove => resove(orderNew))
}

const send = async query => {
  const data = {
    express_image: query.express_image,
    express_no: query.express_no,
    express_name: query.express_name,
    state: 'SENDING',
  }
  return ORDER.update({ id: query.id, data })
}

module.exports = {
  add,
  send,
}