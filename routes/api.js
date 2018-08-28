const router = require('koa-router')()
const wechat = require('../api/wechat')
const ITEM = require('../db/item')
const ORDER = require('../db/order')
const orderAPi = require('../api/order')
const moment = require('moment')
const qiniu = require('../api/qiniu.js')

router.prefix('/api')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/qiniu/token', function (ctx, next) {
  ctx.body = qiniu.getToken()
})

router.get('/wxlogin', async function (ctx, next) {
  const res = await wechat.getOpenId(ctx.query.code)
  ctx.body = res
})

router.get('/item/add', async function (ctx, next) {
  const res = await ITEM.add(ctx.query)
  ctx.body = res
})

router.get('/item/find', async function (ctx, next) {
  const list = await ITEM.find(ctx.query)
  const total = await ITEM.count()
  ctx.body = {
    list,
    total,
  }
})

router.post('/order/add', async function (ctx, next) {
  const res = await orderAPi.add(ctx.request.body)
  ctx.body = res
})

router.get('/order/find', async function (ctx, next) {
  const list = await ORDER.find(ctx.query)
  const total = await ORDER.count()
  ctx.body = {
    list: list.map(o => {
      return {
        ...o._doc,
        create_time: moment(o._id.getTimestamp()).format('YYYY-MM-DD')
      }
    }),
    total,
  }
})

router.get('/order/get', async function (ctx, next) {
  const o = await ORDER.get(ctx.query.id)
  if (o) {
    ctx.body = {
      ...o._doc,
      create_time: moment(o._id.getTimestamp()).format('YYYY-MM-DD')
    }
  } else {
    ctx.status = 404
    ctx.body = "找不到订单"
  }
})

router.post('/order/send', async function (ctx, next) {
  const data = ctx.request.body
  console.log(data.id)
  if (!data.id) {
    ctx.status = 404
    ctx.body = '缺少订单id'
  } else {
    const o = await orderAPi.send(data)
    ctx.body = o
  }
})

module.exports = router
