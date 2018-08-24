const router = require('koa-router')()
const wechat = require('../api/wechat')
const ITEM = require('../db/item')
const orderAPi = require('../api/order')

router.prefix('/api')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
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

module.exports = router
