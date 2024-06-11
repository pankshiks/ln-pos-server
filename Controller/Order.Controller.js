const createError = require("http-errors");
const OrderService = require("../Services/Order");
const Product = require('../Models/Product.model');
const { calculateOrderDeatils, createInvoice } = require("../helpers/utils");
const moment = require('moment');

exports.getAllOrders = async (req, res, next) => {
  try {
    let query = {};
    const limit = req.query.limit; 
    const skip = req.query.skip; 
    const { filter } = req.query;
    
    if(filter) {
      query.$or = [
        { order: { $regex: filter, $options: 'i' } }
      ];
    }

    const orders = await OrderService.getAllOrders(query, limit ,skip);
    const result = orders.orders.map((item) => {
      return {
        ...item.toObject(),
        createdAt: moment(item.createdAt).format('YYYY-MM-DD')
      }
    })
    res.json({ data: { orders: result, pagination: orders.pagination} });
  } catch (err) {
    next(err)
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { product_ids, customer, payment_method, invoice} = req.body
    const products = await Promise.all(product_ids.map(async (element) => {
        return await Product.findById(element.id);
    }));
    const { order_amount, total_tax, discount, paid_amount, product} = await calculateOrderDeatils (products, product_ids)
    const order = await OrderService.createOrder({order_amount, total_tax, discount, paid_amount, product, customer, payment_method, invoice});
    res.json({ data: order, message: "Order created Successfully" });
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
    res.json({ message: "Order Updated Successfully" });
  } catch (err) {
    next(err)
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await OrderService.deleteOrder(req.params.id);
    if(!order) throw createError.NotFound()
    res.json({ message: "Order Deleted Successfully" });
  } catch (err) {
    next(err)
  }
};
