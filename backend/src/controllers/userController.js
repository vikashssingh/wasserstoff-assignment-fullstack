const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');



const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}



//############################################ Create User ###################################################//

const userSignIn = async (req, res) => {
    try {
        let userData = req.body
        let { userName, password } = userData

        //----------------------------- Validating body -----------------------------//
        if (Object.keys(userData).length === 0) {
            return res.status(400).send({ status: false, message: "Request Cannot Be Empty" })
        }

        //----------------------------- Validating userName -----------------------------//
        if (!isValid(userName)) {
            return res.status(400).send({ status: false, message: "userName is required" });
        }

        //----------------------------- Validating Password -----------------------------//
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "password is required" })
        }

        if (!/^[A-Za-z\W0-9]{8,15}$/.test(password)) {
            return res.status(400).send({ status: false, message: "password should be 8 to 15 character long" })
        }

        //----------------------------- Checking Duplicate userName -----------------------------//
        let user = await userModel.findOne({ userName })
        if (user) {
            return res.status(409).send({ status: false, message: "This userName already exist, Please try another one" })
        }

        const userCreated = await userModel.create(userData);
        return res.status(201).send({ status: true, message: 'Registration Successfull', data: userCreated });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};





//############################################ User Login ###################################################//

const userLogin = async function (req, res) {
    try {
        const data = req.body

        //----------------------------- Validating body -----------------------------//
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please Enter Login Credentials..." })
        }

        const { userName, password } = data

        //----------------------------- Validating userName -----------------------------//
        if (!isValid(userName)) {
            return res.status(400).send({ status: false, message: "Please enter userName" })
        }

        //----------------------------- Validating Password -----------------------------//
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Please enter Password" })
        }
        if (!/^[A-Za-z\W0-9]{8,15}$/.test(password)) {
            return res.status(400).send({ status: false, message: "password should be between 8 to 15" })
        }

        //----------------------------- Checking Credential -----------------------------//
        const user = await userModel.findOne({ userName, password })
        if (!user) {
            return res.status(401).send({ status: false, message: "Invalid Credential" });
        }

        //----------------------------- Token Generation -----------------------------//
        const token = jwt.sign({
            userId: user._id.toString(),
            project: "feynman-board",
        }, "doneByAnil")

        res.setHeader("Authorization", token);
        const output = {
            userId: user._id,
            token: token
        }
        return res.status(200).send({ status: true, message: "User login successfull", data: output })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
};


module.exports = { userSignIn, userLogin }