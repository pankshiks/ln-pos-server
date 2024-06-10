const RoleList = require('../Models/RoleList.model')

exports.getAllRoleList = async () => {
    return await RoleList.find();
};
exports.createRoleList = async (data) => {
  return await RoleList.create(data);
};
exports.getRoleListById = async (id) => {
  return await RoleList.findById(id);
};
 
exports.updateRoleList = async (id, data) => {
  return await RoleList.findByIdAndUpdate(id, data);
};
 
exports.deleteRoleList = async (id) => {
  return await RoleList.findByIdAndDelete(id);
};
exports.getRoleListByName = async (data) => {
    return await RoleList.find({name: data.name});
};
