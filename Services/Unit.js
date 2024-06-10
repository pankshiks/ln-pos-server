const Unit = require('../Models/Unit.model')

exports.getAllUnits = async (limit, skip) => {
  const totalCount = await Unit.countDocuments();
  let query = Unit.find().sort({createdAt: -1});
  if (limit !== 'null') {
    query = query.limit(limit);
  }

  if (skip !== 'null') {
    query = query.skip(skip);
  }
  let units = await query;
  return {
    units: units, 
    pagination: { 
      limit: limit || totalCount,
      skip: skip || 0,
      total: totalCount
    }
  }
    return await Unit.find();
};
exports.createUnit = async (data) => {
  return await Unit.create(data);
};
exports.getUnitById = async (id) => {
  return await Unit.findById(id);
};
 
exports.updateUnit = async (id, data) => {
  return await Unit.findByIdAndUpdate(id, data);
};
 
exports.deleteUnit= async (id) => {
  return await Unit.findByIdAndDelete(id);
};
