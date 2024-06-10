const express = require('express')
const { 
    getAllUnits,
    getUnitById,
    createUnit,
    updateUnit,
    deleteUnit
} = require('../Controller/Unit.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()

// Make getAllRoleList accessible to anyone
router.use(verifyAccessToken, authorizeRoles('admin', 'super_admin', 'manager', 'employee'))

router.route("/").get(getAllUnits).post(createUnit);
router.route("/:id").get(getUnitById).put(updateUnit).delete(deleteUnit);

module.exports = router
