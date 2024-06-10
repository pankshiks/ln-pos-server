const Supplier = require('../Models/Supplier.model')

exports.getAllSuppliers = async (limit, skip) => {
  const totalCount = await Supplier.countDocuments();
  let query = Supplier.find().sort({createdAt: -1});
  if (limit !== 'null') {
    query = query.limit(limit);
  }

  if (skip !== 'null') {
    query = query.skip(skip);
  }
  let suppliers = await query;
  return {
    suppliers: suppliers, 
    pagination: { 
      limit: limit || totalCount,
      skip: skip || 0,
      total: totalCount
    }
  }
};
exports.createSupplier = async (data) => {
  return await Supplier.create(data);
};
exports.getSupplierById = async (id) => {
  return await Supplier.findById(id);
};
 
exports.updateSupplier = async (id, data) => {
  return await Supplier.findByIdAndUpdate(id, data);
};
 
exports.deleteSupplier = async (id) => {
  return await Supplier.findByIdAndDelete(id);
};
