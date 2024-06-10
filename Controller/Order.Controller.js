const createError = require("http-errors");
const OrderService = require("../Services/Order");
const Product = require('../Models/Product.model');
const { calculateOrderDeatils } = require("../helpers/utils");

exports.getAllOrders = async (req, res, next) => {
  try {
    const limit = req.query.limit; 
    const skip = req.query.skip; 
    const orders = await OrderService.getAllOrders(limit ,skip);
    res.json({ data: orders, status: 200});
  } catch (err) {
    next(err)
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { product_ids, customer, payment_method} = req.body
    const products = await Promise.all(product_ids.map(async (element) => {
        return await Product.findById(element.id);
    }));
    const { order_amount, total_tax, discount, paid_amount, product} = await calculateOrderDeatils (products, product_ids)
    const order = await OrderService.createOrder({order_amount, total_tax, discount, paid_amount, product, customer, payment_method});
    res.json({ data: order, message: "Order created Successfully", status: 201 });
  } catch (err) {
    next(err)
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await OrderService.getOrderById(req.params.id);
    if(!order) throw createError.NotFound()
    res.json({ data: order, status: 200 });
  } catch (err) {
    next(err)
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await OrderService.updateOrder(req.params.id, req.body);
    if(!order) throw createError.NotFound()
    res.json({ message: "Order Updated Successfully", status: 202 });
  } catch (err) {
    next(err)
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await OrderService.deleteOrder(req.params.id);
    if(!order) throw createError.NotFound()
    res.json({ message: "Order Deleted Successfully", status: 202 });
  } catch (err) {
    next(err)
  }
};
