const createError = require("http-errors");
const RoleListService = require("../Services/RoleList");
// const RoleName = require('../Models/RoleNames.model')
const jwt = require('jsonwebtoken');
const RoleName = require("../Models/RoleNames.model");

const fetchRolesWithNames = async (roles) => {
  return Promise.all(roles.map(async (role) => {
    const rolesWithNames = await Promise.all(role.roles.map(async (itemId) => {
      const roleDetails = await RoleName.findById(itemId);
      return  roleDetails.name;
    }));
    return {_id: role._id, name: role.name, roles_name: rolesWithNames, roles: role.roles, status: role.status};
  }));
};
exports.getAllRoleList = async (req, res, next) => {
  try {
    let roles = await RoleListService.getAllRoleList();
    roles = roles.filter(item => item.name !== 'super_admin')
    fetchRolesWithNames(roles).then(result => {
      res.json({ data: result, status: "success" });
    }).catch(error => {
      next(error)
    });
  } catch (err) {
    next(err)
  }
};

exports.createRoleList = async (req, res, next) => {
    try {
        const doesExists = await RoleListService.getRoleListByName(req.body)
        if(doesExists.length > 0) throw createError.Conflict(`${req.body.name} already exixts`)
        const roles = await RoleListService.createRoleList(req.body);
        res.json({ message: "Role Added Successfully", status: "success" });
    } catch (err) {
        next(err)
    }
};

exports.getRoleListById = async (req, res, next) => {
  try {
    const role = await RoleListService.getRoleListById(req.params.id);
    if(!role) throw createError.NotFound()
    res.json({ data: role, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.updateRoleList = async (req, res, next) => {
  try {
    const role = await RoleListService.updateRoleList(req.params.id, req.body);
    if(!role) throw createError.NotFound()
    res.json({ message: "Role Updated Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.deleteRoleList = async (req, res, next) => {
  try {
    const role = await RoleListService.deleteRoleList(req.params.id);
    if(!role) throw createError.NotFound()
    res.json({ message: "Role Deleted Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.getSpecificRole = async (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);
    
    const roleName = decodedToken.role;
    const roles = await RoleListService.getAllRoleList();
    
    // Filter to get only the roles matching the role name in the token
    const specificRole = roles.filter(role => role.name === roleName);

    const fetchRoleNamesByIds = async (roleIds) => {
      const role = await RoleName.find({
        '_id': { $in: roleIds }
      });
      return role ? role.map(item => item.name) : null;
    };

    const filteredData = await Promise.all(specificRole.map(async item => {
      return {
        roles: await fetchRoleNamesByIds(item.roles),
        _id: item._id,
        name: item.name,
        status: item.status
      };
    }));
    res.json({ data: filteredData, status: "success" });
  } catch (err) {
    next(err)
  }
}