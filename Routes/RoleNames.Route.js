const express = require('express')
const { 
    getAllRoleNames,
    createRoleName,
    getRoleNameById,
    updateRoleName,
    deleteRoleName
} = require('../Controller/RoleNames.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()
router.use(verifyAccessToken, authorizeRoles('admin', 'super_admin'))

router.route("/").get(getAllRoleNames).post(createRoleName);
router.route("/:id").get(getRoleNameById).put(updateRoleName).delete(deleteRoleName);

module.exports = router
