const Product = require('../Models/Product.model')

exports.getAllProducts = async (query) => {
    const projection = { name: 1, description: 1, selling_price: 1, image: 1, sku: 1, discount: 1, tax: 1 };
    return await Product.find(query).select(projection).sort({createdAt: -1});
};
exports.createProduct = async (data) => {
  return await Product.create(data);
};
exports.getProductById = async (id) => {
  return await Product.findById(id).select({ name: 1, description: 1, sku: 1, selling_price: 1, discount: 1, tax: 1, image: 1});
};
 
exports.updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data);
};
 
exports.deleteProduct= async (id) => {
  return await Product.findByIdAndDelete(id);
};
