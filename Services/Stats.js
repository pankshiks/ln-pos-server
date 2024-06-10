const Customer = require('../Models/Customer.model')
const Order = require('../Models/Order.model')
const Shop = require('../Models/Shop.model')

exports.getStats = async (limit, skip) => {
  const totalCustomerCount = await Customer.countDocuments();
  const totalOrderCount = await Order.countDocuments();
  const totalSale = await Order.find({}, { paid_amount: 1})
  const currency = await Shop.findOne({}, { currency: 1})
  const sale = totalSale.reduce((acc, item) => acc + item.paid_amount, 0);
 
  return {
    customer: totalCustomerCount,
    order: totalOrderCount,
    sale: sale,
    currency: currency.currency
  }
};
