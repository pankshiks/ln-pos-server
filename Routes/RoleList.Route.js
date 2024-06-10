const express = require('express')
const { 
    getAllRoleList,
    createRoleList,
    getRoleListById,
    updateRoleList,
    deleteRoleList,
    getSpecificRole
} = require('../Controller/RoleList.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()

// Make getAllRoleList accessible to anyone
router.use(verifyAccessToken)
router.route("/role-items").get(getSpecificRole);

router.use(authorizeRoles('admin', 'super_admin'))

router.route("/").get(getAllRoleList).post(createRoleList);
router.route("/:id").get(getRoleListById).put(updateRoleList).delete(deleteRoleList);

module.exports = router
