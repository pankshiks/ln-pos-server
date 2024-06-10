const express = require('express')
const { 
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
} = require('../Controller/Supplier.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()
// router.use(verifyAccessToken, authorizeRoles('admin', 'super_admin', 'manager', 'employee'))

router.route("/").get(getAllSuppliers).post(createSupplier);
router.route("/:id").get(getSupplierById).put(updateSupplier).delete(deleteSupplier);

module.exports = router
