const express = require('express')
const { 
    getAllEmployees, 
    getEmployeeById, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee 
} = require('../Controller/Employee.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');
const multer = require('multer');

const router = express.Router()

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(verifyAccessToken, authorizeRoles('admin', 'super_admin', 'manager', 'employee'))

router.post("/", upload.single('image'), createEmployee);
router.put("/:id", upload.single('image'), updateEmployee);

router.route("/").get(getAllEmployees);
router.route("/:id").get(getEmployeeById).delete(deleteEmployee);

module.exports = router
