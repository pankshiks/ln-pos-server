const express = require('express')
const multer = require('multer');
const { 
    getAllShops,
    getShopById,
    createShop,
    updateShop,
    deleteShop,
    getShopLogo
} = require('../Controller/Shop.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Make getAllRoleList accessible to anyone

router.route("/get-shop-logo").get(getShopLogo);

router.use(verifyAccessToken, authorizeRoles('admin', 'super_admin', 'manager', 'employee'))

router.post("/", upload.single('image'), createShop);
router.put("/:id", upload.single('image'), updateShop);

router.route("/").get(getAllShops);
router.route("/:id").get(getShopById).delete(deleteShop);

module.exports = router
