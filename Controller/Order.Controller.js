const createError = require("http-errors");
const OrderService = require("../Services/Order");
const ProductService = require("../Services/Product");
const CustomerService = require("../Services/Customer");
const InvoiceService = require("../Services/Invoice");
const { calculateOrderDeatils, generatePDF } = require("../helpers/utils");
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
    const { product_ids, customer, payment_method } = req.body;

    // Fetch products concurrently using Promise.all
    const products = await Promise.all(
      product_ids.map(async ({ id, qtn }) => {
        const itemDoc = await ProductService.getProductById(id);
        const item = itemDoc.toObject();
        return { ...item, qtn };
      })
    );

    // Calculate order details
    const { order_amount, total_tax, discount, paid_amount, product } = await calculateOrderDeatils(products);

    // Create customer and order concurrently
    const customerRes = await CustomerService.createCustomer(customer);
    if (!customerRes) throw new Error('Customer creation failed');

    // Create invoice first
    const invoice = await InvoiceService.createInvoice({ customer_details: customer, cart_items: products });
    if (!invoice) throw new Error('Invoice creation failed');

    const invoiceExists = await generatePDF({ customer, products, filename:`${invoice.invoice_id}.pdf`, invoice: invoice.invoice_id })
    if(invoiceExists) {
      await InvoiceService.updatInvoice(invoice._id, { invoice_pdf: invoiceExists })
    }
    await OrderService.createOrder({ order_amount, total_tax, discount, paid_amount, product, customer: customerRes._id, payment_method, invoice: invoice._id})

    res.status(201).json({invoice: invoice.invoice_id, message: "Order created successfully" });
  } catch (err) {
    next(err);
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
