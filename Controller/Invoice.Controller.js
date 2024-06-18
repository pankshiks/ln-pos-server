const createError = require("http-errors");
const InvoiceService = require("../Services/Invoice");
const { sendEmail, sendPhone } = require("../helpers/utils")

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

exports.sendInvoice = async (req, res, next) => {
  try {
    const invoice = await InvoiceService.getInvoiceByInvoiceId(req.params.id);
    if(!invoice) throw createError.NotFound(`Invoice doesn't exists`)
    // Send email notification
    let invoiceSent;
    if(invoice.customer_details.email) {
      invoiceSent = await sendEmail({
        to: invoice.customer_details.email,
        subject: `Invoice ${invoice.invoice_id}`,
        filename: invoice.invoice_id,
        invoice: invoice.invoice_pdf,
        customer: invoice.customer_details,
        date: invoice.createdAt
      });
    }
    invoiceSent = await sendPhone({
      pdfBuffer: invoice.invoice_pdf,
      fileName: invoice.invoice_id,
      to: invoice.customer_details.mobile_no
    })
    console.log({ invoiceSent });
    res.status(200).json({ message: "Invoice sent Successfully", invoice: invoiceSent });
  } catch (error) {
    next(error)
  }
}
