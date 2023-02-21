const express = require('express');
const { getUsers, createUser, deleteUser, updateUser } = require('../controllers/users');
const { checkUser } = require('../middlewares/user');
const router = express.Router();

router.get('/', checkUser, getUsers);
router.post('/create', createUser);
router.delete('/delete/:id', deleteUser);
router.put('/update/:id', updateUser);


module.exports = router;