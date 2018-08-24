const mongoose = require('../db/mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  opendid: String,
  user_name: String,
  user_phone: String,
  porvince: String,
  city: String,
  country: String,
  street: String,
  raw_info: String,
  remark: String,
  express_name: String,
  express_no: String,
  express_image: [String],
  state: String,
  items: {
    type: Array,
    default: [],
  },
});

const Order = mongoose.model('Order', OrderSchema);

const add = data => {
  return new Order(data).save()
}

const get =  id => {
  return Order.findById(id).exec()
}

const find =  ({ filters = {}, sort = { id: -1 }, skip = 0, limit = 10 }) => {
  return Order.find(filters).sort(sort).skip(skip).limit(limit).exec()
}

const count = filters => {
  return Order.count(filters).exec()
}

const update = ({ filters , data }) => {
  return Order.findOneAndUpdate(filters, data).exec()
}
const ORDER = {
  add,
  get,
  find,
  update,
  count,
  OrderModel: Order,
}

module.exports = ORDER