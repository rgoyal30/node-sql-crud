const { QueryTypes } = require('sequelize')
const db = require('../databases/db')


const getUserByEmail = async (email) => {
    const user = await db.query('Select * from users where email = ?', {
        type: QueryTypes.SELECT,
        replacements: [email]
    })

    if(user?.length) {
        return true;
    }
    else {
        return false;
    }

}

const getUserByID = async (id) => {
    const user = await db.query('Select * from users where rollno = ?', {
        type: QueryTypes.SELECT,
        replacements: [id]
    })

    if(user?.length) {
        return true;
    }
    else {
        return false;
    }

}



module.exports = { getUserByEmail, getUserByID }