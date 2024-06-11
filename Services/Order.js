const Order = require('../Models/Order.model')
const Customer = require('../Models/Customer.model')
const Product = require('../Models/Product.model')

exports.getAllOrders = async (query, limit, skip) => {
  const totalCount = await Order.countDocuments();
  const fields = {order: 1, payment_method: 1, total_tax: 1, order_amount: 1, discount: 1, paid_amount: 1, createdAt: 1, invoice: 1}
  let userQuery = Order.find(query).select(fields).populate("invoice").sort({createdAt: -1});
  // if (limit !== 'null') {
  //   query = query.limit(limit);
  // }

  // if (skip !== 'null') {
  //   query = query.skip(skip);
  // }
  let brands = await userQuery;
  return {
    orders: brands, 
    pagination: { 
      limit: limit || totalCount,
      skip: skip || 0,
      total: totalCount
    }
  }
};
exports.createOrder = async (data) => {
  return await Order.create(data);
};
exports.getOrderById = async (id) => {
  return await Order.findById(id).populate("customer");
};
 
exports.updateOrder = async (id, data) => {
  return await Order.findByIdAndUpdate(id, data);
};
 
exports.deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};
