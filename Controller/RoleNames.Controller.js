const createError = require("http-errors");
const RoleNameService = require("../Services/RoleNames");

exports.getAllRoleNames = async (req, res, next) => {
  try {
    const roles = await RoleNameService.getAllRoleNames();
    res.json({ data: roles, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.createRoleName = async (req, res, next) => {
  try {
    const roles = await RoleNameService.createRoleName(req.body);
    res.json({ message: "Role Name Added Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.getRoleNameById = async (req, res, next) => {
  try {
    const role = await RoleNameService.getRoleNameById(req.params.id);
    if(!role) throw createError.NotFound()
    res.json({ data: role, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.updateRoleName = async (req, res, next) => {
  try {
    const role = await RoleNameService.updateRoleName(req.params.id, req.body);
    if(!role) throw createError.NotFound()
    res.json({ message: "Role Name Updated Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.deleteRoleName = async (req, res, next) => {
  try {
    const role = await RoleNameService.deleteRoleName(req.params.id);
    if(!role) throw createError.NotFound()
    res.json({ message: "Role name Deleted Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};
