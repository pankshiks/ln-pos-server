const createError = require("http-errors");
const InvoiceService = require("../Services/Invoice");

exports.getAllInvoice = async (req, res, next) => {
  try {
    let limit = req.query.limit; 
    let skip = req.query.skip; 
    const invoice = await InvoiceService.getAllInvoice(limit, skip);
    res.json({ data: invoice });
  } catch (err) {
    next(err)
  }
};

exports.createInvoice = async (req, res, next) => {
    try {
      const invoice = await InvoiceService.createInvoice(req.body);
      res.json({ invoice: invoice._id });
    } catch (err) {
        next(err)
    }
};

exports.getInvoiceById = async (req, res, next) => {
  try {
    const invoice = await InvoiceService.getInvoiceById(req.params.id);
    if(!invoice) throw createError.NotFound()
    res.json({ data: invoice });
  } catch (err) {
    next(err)
  }
};

exports.updatInvoice = async (req, res, next) => {
  try {
    const invoice = await InvoiceService.updatInvoice(req.params.id, req.body);
    if(!invoice) throw createError.NotFound()
    res.json({ message: "Invoice Updated Successfully" });
  } catch (err) {
    next(err)
  }
};

exports.deleteInvoice = async (req, res, next) => {
  try {
    const invoice = await InvoiceService.deleteInvoice(req.params.id);
    if(!invoice) throw createError.NotFound()
    res.json({ message: "Invoice Deleted Successfully" });
  } catch (err) {
    next(err)
  }
};
