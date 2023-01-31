const express = require('express');
const { getUsers, createUser, deleteUser, updateUser } = require('../controllers/users');
const router = express.Router();

router.get('/', getUsers);
router.post('/create', createUser);
router.delete('/delete/:id', deleteUser);
router.put('/update/:id', updateUser);


module.exports = router;