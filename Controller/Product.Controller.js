const createError = require("http-errors");
const ProductService = require("../Services/Product");
const mongoose = require("mongoose");


exports.getAllProducts = async (req, res, next) => {
  try {
    let query = {};
    const { filter, category } = req.query;
    if(filter) {
      query.$or = [
        { name: { $regex: filter, $options: 'i' } },
        { sku: { $regex: filter, $options: 'i' } }
      ];
    }
    if(category && mongoose.Types.ObjectId.isValid(category)) {
      query.category = category;
    }

    const products = await ProductService.getAllProducts(query);
    res.status(200).json(products);
  } catch (err) {
    next(err)
  }
};

exports.createProduct = async (req, res, next) => {
    try {
      const { name, description, sku, brand, qtn, category, supplier, selling_price, purchase_price, discount, tax } = req.body
      const file = req.file
      await ProductService.createProduct({
          name, description, sku, brand, qtn, category, supplier, selling_price, purchase_price, discount, tax, 
          image: file.filename,
      });
      res.status(201).json({ message: "Product Added Successfully" });
    } catch (err) {
        next(err)
    }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    if(!product) throw createError.NotFound()
    res.status(200).json(product);
  } catch (err) {
    next(err)
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, sku, brand, qtn, unit, unit_value, category, supplier, selling_price, purchase_price, discount, tax } = req.body
    const file = req.file
    const updateFields = {};
    if (name) updateFields.name = name;
    if (sku) updateFields.sku = sku;
    if (brand) updateFields.brand = brand;
    if (qtn) updateFields.qtn = qtn;
    if (unit) updateFields.unit = unit;
    if (unit_value) updateFields.unit_value = unit_value;
    if (category) updateFields.category = category;
    if (supplier) updateFields.supplier = supplier;
    if (selling_price) updateFields.selling_price = selling_price;
    if (purchase_price) updateFields.purchase_price = purchase_price;
    if (discount) updateFields.discount = discount;
    if (tax) updateFields.tax = tax;
    if (file) updateFields.image = file.filename;

    const product = await ProductService.updateProduct(req.params.id, updateFields);
    if(!product) throw createError.NotFound()
    res.status(202).json({ message: "Product Updated Successfully" });
  } catch (err) {
    next(err)
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await ProductService.deleteProduct(req.params.id);
    if(!product) throw createError.NotFound()
    res.status(202).json({ message: "Product Deleted Successfully" });
  } catch (err) {
    next(err)
  }
};
