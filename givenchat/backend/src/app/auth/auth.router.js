const router = require('express').Router();
const UserModel = require('./user.model');
const authCtrl = require('./auth.controller')
const checkAuthentication = require("../../middlewares/auth.middleware")

const checkPermission = require("../../middlewares/rbac.middleware")



router.post("/login", authCtrl.login)
router.get('/me',checkAuthentication,authCtrl.profile)
router.get('/admin',checkAuthentication,checkPermission('admin'), authCtrl.adminPage);

module.exports = router;