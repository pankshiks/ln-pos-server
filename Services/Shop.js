const Shop = require('../Models/Shop.model')

exports.getAllShops = async () => {
    return await Shop.find();
};
exports.createShop = async (data) => {
  return await Shop.create(data);
};
exports.getShopById = async (id) => {
  return await Shop.findById(id);
};
 
exports.updateShop = async (id, data) => {
  return await Shop.findByIdAndUpdate(id, data);
};
 
exports.deleteShop= async (id) => {
  return await Shop.findByIdAndDelete(id);
};
