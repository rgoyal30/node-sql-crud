const { QueryTypes } = require("sequelize");
const db = require("../databases/db");

const getUserByEmail = async (email) => {
  const user = await db.query("Select * from users where email = ?", {
    type: QueryTypes.SELECT,
    replacements: [email],
  });

  if (user?.length) {
    return true;
  } else {
    return false;
  }
};

const getUserByID = async (id) => {
  const user = await db.query("Select * from users where rollno = ?", {
    type: QueryTypes.SELECT,
    replacements: [id],
  });

  if (user?.length) {
    return true;
  } else {
    return false;
  }
};

const checkUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const users = await db.query("Select * from users where guid = ?", {
      type: QueryTypes.SELECT,
      replacements: [authorization],
    });

    if (!users?.length) {
      return res.status(401).json({ message: "Invalid authorization" });
    }

    next();
  } else {
    res.status(401).json({ message: "Unauthorized user" });
  }
};

module.exports = { getUserByEmail, getUserByID, checkUser };
