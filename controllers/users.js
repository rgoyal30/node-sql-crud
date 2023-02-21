const { QueryTypes } = require('sequelize')
const bcrypt = require("bcrypt");
const { uuid } = require('uuidv4');

const db = require('../databases/db')
const { getUserByEmail, getUserByID } = require('../middlewares/user')

const getUsers = async (req, res) => {
    const users = await db.query('Select * from users', {
        type: QueryTypes.SELECT
    });

    res.status(200).json({ message: 'success', data: users });

}

const createUser = async(req, res) => {
    const user = req.body;

    const isExisting = await getUserByEmail(user.email);

    if(isExisting) {
        res.status(400).json({ message: 'user already exists with this email id' });
    }
    else {
        let hashedPassword = await bcrypt.hash(user.password, 10)
        let guid = uuid();
        const data = await db.query('Insert into users (name, email, password, mobileno, guid) values (?, ?, ?, ?, ?)', {
            replacements: [user.name, user.email, hashedPassword, user.mobileno, guid],
            type: QueryTypes.INSERT
        })
    
        res.status(200).json({ message: 'user created successfully', data: data });
    }

}

const deleteUser = async(req, res) => {
    const id = req.params.id;

    const isValid = await getUserByID(id);

    if(isValid) {
        const data = await db.query('Delete from users where rollno = ?', {
            type: QueryTypes.DELETE,
            replacements: [id]
        })

        res.status(200).json({ message: 'user deleted successfully', data: data });

    }
    else {
        res.status(400).json({ message: 'Wrong user id' });
    }


}

const updateUser = async(req, res) => {
    const id = req.params.id;
    const isValid = getUserByID(id);

    const user = req.body;

    if(isValid) {
        let query = "update users set ";
        const fields = [];
        for(const key in user) {
            if(key == 'password') {
                const hashedPassword = await bcrypt.hash(user[key], 10);
                user[key] = hashedPassword;
            }
            fields.push(`${key} = "${user[key]}"`);
        }
        query += fields.join(", ");
        query += ' where rollno = ?';
        const data = await db.query(query, {
            type: QueryTypes.UPDATE,
            replacements: [id]
        })

        res.status(200).json({ message: 'user updated successfully', data: data });

    }
    else {
        res.status(400).json({ message: 'Wrong user id' });
    }


}


module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
}
