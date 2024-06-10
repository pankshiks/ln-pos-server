const express = require('express')
const multer = require('multer');
const { 
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
} = require('../Controller/Brand.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Make getAllRoleList accessible to anyone
// router.use(verifyAccessToken, authorizeRoles('admin', 'super_admin', 'manager', 'employee'))

router.post("/", upload.single('image'), createBrand);
router.put("/:id", upload.single('image'), updateBrand);

router.route("/").get(getAllBrands);
router.route("/:id").get(getBrandById).delete(deleteBrand);

module.exports = router
