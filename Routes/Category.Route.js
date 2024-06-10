const express = require('express')
const { 
    getAllCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../Controller/Category.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()
// router.use(verifyAccessToken, authorizeRoles('admin', 'super_admin', 'manager', 'employee'))

router.route("/").get(getAllCategories).post(createCategory);
router.route("/:id").get(getCategoryById).put(updateCategory).delete(deleteCategory);

module.exports = router
