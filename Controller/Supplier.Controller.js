const createError = require("http-errors");
const SupplierService = require("../Services/Supplier");

exports.getAllSuppliers = async (req, res, next) => {
  try {
    let limit = req.query.limit; 
    let skip = req.query.skip; 
    const suppliers = await SupplierService.getAllSuppliers(limit, skip);
    res.json({ data: suppliers, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.createSupplier = async (req, res, next) => {
  try {
    await SupplierService.createSupplier(req.body);
    res.json({ message: "Supplier Added Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const supplier = await SupplierService.getSupplierById(req.params.id);
    if(!supplier) throw createError.NotFound()
    res.json({ data: supplier, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.updateSupplier = async (req, res, next) => {
  try {
    const supplier = await SupplierService.updateSupplier(req.params.id, req.body);
    if(!supplier) throw createError.NotFound()
    res.json({ message: "Supplier Updated Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.deleteSupplier = async (req, res, next) => {
  try {
    const supplier = await SupplierService.deleteSupplier(req.params.id);
    if(!supplier) throw createError.NotFound()
    res.json({ message: "Supplier Deleted Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};
