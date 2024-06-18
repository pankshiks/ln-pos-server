const Invoice = require('../Models/Invoice.model')

exports.getAllInvoice = async () => {
    return await Invoice.find();
};
exports.createInvoice= async (data) => {
  return await Invoice.create(data);
};
exports.getInvoiceById = async (id) => {
  return await Invoice.findById(id);
};
 
exports.updatInvoice = async (id, data) => {
  return await Invoice.findByIdAndUpdate(id, data);
};
 
exports.deleteInvoice = async (id) => {
  return await Invoice.findByIdAndDelete(id);
};

exports.getInvoiceByInvoiceId = async (id) => {
  return await Invoice.findOne({ invoice_id: id});
};
