const Customer = require('../Models/Customer.model')

exports.getAllCustomers = async (limit, skip) => {
  const totalCount = await Customer.countDocuments();
  let query = Customer.find().sort({createdAt: -1});
  if (limit !== 'null') {
    query = query.limit(limit);
  }

  if (skip !== 'null') {
    query = query.skip(skip);
  }
  let customer = await query;
  return {
    customer: customer, 
    pagination: { 
      limit: limit || totalCount,
      skip: skip || 0,
      total: totalCount
    }
  }
};
exports.createCustomer = async (data) => {
  return await Customer.create(data);
};
exports.getCustomerById = async (id) => {
  return await Customer.findById(id);
};
 
exports.updateCustomer = async (id, data) => {
  return await Customer.findByIdAndUpdate(id, data);
};
 
exports.deleteCustomer= async (id) => {
  return await Customer.findByIdAndDelete(id);
};
