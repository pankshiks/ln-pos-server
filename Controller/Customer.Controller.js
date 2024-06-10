const createError = require("http-errors");
const CustomerService = require("../Services/Customer");
const jwt = require('jsonwebtoken');

exports.getAllCustomers = async (req, res, next) => {
  try {
    let limit = req.query.limit; 
    let skip = req.query.skip; 
    const customer = await CustomerService.getAllCustomers(limit, skip);
    res.json({ data: customer, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.createCustomer = async (req, res, next) => {
    try {
        await CustomerService.createCustomer(req.body);
        res.json({ message: "Customer Added Successfully", status: "success" });
    } catch (err) {
        next(err)
    }
};

exports.getCustomerById = async (req, res, next) => {
  try {
    const customer = await CustomerService.getCustomerById(req.params.id);
    if(!customer) throw createError.NotFound()
    res.json({ data: customer, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const customer = await CustomerService.updateCustomer(req.params.id, req.body);
    if(!customer) throw createError.NotFound()
    res.json({ message: "Customer Updated Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const customer = await CustomerService.deleteCustomer(req.params.id);
    if(!customer) throw createError.NotFound()
    res.json({ message: "Customer Deleted Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};
