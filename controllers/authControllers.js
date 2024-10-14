const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const adminEmail = "admin@codesfortomorrow.com";
const adminPassword = "Admin123!@#"; 

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)

    if (email !== adminEmail || password !== adminPassword) {
        return res.status(401).send('Invalid credentials');
    }

   
    const token = jwt.sign({ id: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ auth: true, token });
};
