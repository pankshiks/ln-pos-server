const express = require('express');
const router = express.Router()
const createError = require('http-errors')
const Employee = require('../Models/Employee.model')
const {authSchema} = require('../helpers/validation_schema')
const { signAccessToken, verifyAccessToken } = require('../helpers/jwt_helpers');
const { getRoleListById } = require('../Services/RoleList');
const { getEmployeeById } = require('../Services/Employee');

router.post('/login',async (req, res, next) => {
    try {
        const { email, password, signIn} = req.body
        // const result = await authSchema.validateAsync(req.body)

        const user = await Employee.findOne({email: email})
        if(!user) throw createError.NotFound("Invalid Username/Passowrd")

        const isMatch = await user.isValidPassword(password)
        if(!isMatch) throw createError.Unauthorized("Invalid Username/Passowrd")
      
        
        const role = await getRoleListById(user.role_id)
        if(!role) throw createError.NotFound("Invalid Username/Passowrd")
        
        const accessToken = await signAccessToken(user.id, role.name, signIn)

        res.send({token: accessToken, role: role.name, user: {
            first_name: user.first_name,
            last_name: user.last_name,
            profile: user.profile_picture_id,
            email: user.email,
            role: role.name,
            picture: user.image
        }})
    } catch (error) {
        if(error.isJoi === true) return next(createError.BadRequest('Invalid Username/Passowrd'))
        next(error)
    }
})
router.get('/verify-user', verifyAccessToken, async (req, res, next) => {
    try {
        const user_id = req.payload.userId;
        const user = await getEmployeeById(user_id);

        if (!user) {
            throw createError(404, "User not found");
        }

        res.send({
            first_name: user.first_name,
            last_name: user.last_name,
            profile: user.profile_picture_id,
            email: user.email,
            role: req.payload.role,
            picture: user.image
        });
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete('/logout',async (req, res, next) => {
    res.send('Logout route')
})

router.post('/refresh-token',async (req, res, next) => {
    res.send('Refresh Token route')
})

module.exports = router