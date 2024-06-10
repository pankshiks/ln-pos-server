const Product = require('../Models/Product.model')
const Supplier = require('../Models/Supplier.model')

exports.getAllProducts = async (query, limit ,skip) => {
    const totalCount = await Product.countDocuments();
    const projection = { name: 1, description: 1, selling_price: 1, image: 1, sku: 1, discount: 1, tax: 1 };
    let product_query = Product.find(query).select(projection).sort({createdAt: -1});
    if (limit !== 'null') {
      product_query = product_query.limit(limit);
    }

    if (skip !== 'null') {
      product_query = product_query.skip(skip);
    }
    let products = await product_query;
   
    return {
      products: products, 
      pagination: { 
        limit: limit || totalCount,
        skip: skip || 0,
        total: totalCount
      }
    }
};
exports.createProduct = async (data) => {
  return await Product.create(data);
};
exports.getProductById = async (id) => {
  return await Product.findById(id);
};
 
exports.updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data);
};
 
exports.deleteProduct= async (id) => {
  return await Product.findByIdAndDelete(id);
};
