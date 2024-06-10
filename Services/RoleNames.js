const RoleName = require('../Models/RoleNames.model')

exports.getAllRoleNames = async () => {
    return await RoleName.find();
};
exports.createRoleName = async (data) => {
  return await RoleName.create(data);
};
exports.getRoleNameById = async (id) => {
  return await RoleName.findById(id);
};
 
exports.updateRoleName = async (id, data) => {
  return await RoleName.findByIdAndUpdate(id, data);
};
 
exports.deleteRoleName = async (id) => {
  return await RoleName.findByIdAndDelete(id);
};
