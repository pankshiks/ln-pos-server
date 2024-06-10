const express = require('express')
const { 
    getAllStats,
} = require('../Controller/Stats.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()

// Make getAllRoleList accessible to anyone
router.use(verifyAccessToken, authorizeRoles('admin', 'super_admin', 'manager', 'employee'))

router.route("/").get(getAllStats);

module.exports = router
