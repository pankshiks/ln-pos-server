const Brand = require('../Models/Brand.model')

exports.getAllBrands = async (limit, skip) => {
  const totalCount = await Brand.countDocuments();
  let query = Brand.find().sort({createdAt: -1});
  if (limit !== 'null') {
    query = query.limit(limit);
  }

  if (skip !== 'null') {
    query = query.skip(skip);
  }
  let brands = await query;
  return {
    brands: brands, 
    pagination: { 
      limit: limit || totalCount,
      skip: skip || 0,
      total: totalCount
    }
  }
};
exports.createBrand = async (data) => {
  return await Brand.create(data);
};
exports.getBrandById = async (id) => {
  return await Brand.findById(id);
};
 
exports.updateBrand = async (id, data) => {
  return await Brand.findByIdAndUpdate(id, data);
};
 
exports.deleteBrand= async (id) => {
  return await Brand.findByIdAndDelete(id);
};
