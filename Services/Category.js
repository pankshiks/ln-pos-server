const Category = require('../Models/Category.model')

exports.getAllCategories = async (limit, skip) => {
  const totalCount = await Category.countDocuments();
  let query = Category.find().sort({createdAt: -1});
  if (limit !== 'null') {
    query = query.limit(limit);
  }

  if (skip !== 'null') {
    query = query.skip(skip);
  }
  let categories = await query;
  return {
    categories: categories, 
    pagination: { 
      limit: limit || totalCount,
      skip: skip || 0,
      total: totalCount
    }
  }
};
exports.createCategory = async (data) => {
  return await Category.create(data);
};
exports.getCategoryById = async (id) => {
  return await Category.findById(id);
};
 
exports.updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data);
};
 
exports.deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};
