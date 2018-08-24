const mongoose = require('../db/mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  openid: String,
  name: String,
  type: String,
  color: String,
  size: String,
  price: Number,
  cost: Number,
  sku_no: String,
  supplier: String,
  address: String,
  images: [String],
  location: String,
  num: Number,
  remark: String,
});

const Item = mongoose.model('Item', ItemSchema);

const add = data => {
  return new Item(data).save()
}

const get =  id => {
  return Item.findById(id).exec()
}

const find =  ({ filters = {}, sort = { id: -1 }, skip = 0, limit = 10 }) => {
  return Item.find(filters).sort(sort).skip(skip).limit(limit).exec()
}

const count = filters => {
  return Item.count(filters).exec()
}

const update = ({ filters , data }) => {
  return Item.findOneAndUpdate(filters, data).exec()
}
const ITEM = {
  add,
  get,
  find,
  update,
  count,
  ItemModel: Item,
}

module.exports = ITEM