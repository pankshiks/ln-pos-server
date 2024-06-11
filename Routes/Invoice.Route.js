const express = require('express')
const { 
    getAllInvoice,
    createInvoice,
    getInvoiceById,
    updatInvoice,
    deleteInvoice
} = require('../Controller/Invoice.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()
// router.use(verifyAccessToken, authorizeRoles('admin', 'super_admin', 'manager', 'employee'))

router.route("/").get(getAllInvoice).post(createInvoice);
router.route("/:id").get(getInvoiceById).put(updatInvoice).delete(deleteInvoice);

module.exports = router
