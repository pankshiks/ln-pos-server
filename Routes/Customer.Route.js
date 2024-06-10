const express = require('express')
const { 
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require('../Controller/Customer.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()

// Make getAllRoleList accessible to anyone
// router.use(verifyAccessToken, authorizeRoles('admin', 'super_admin', 'manager', 'employee'))

router.route("/").get(getAllCustomers).post(createCustomer);
router.route("/:id").get(getCustomerById).put(updateCustomer).delete(deleteCustomer);

module.exports = router
