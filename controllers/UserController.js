const validator = require("../helpers/validate");
const db = require("../models/index");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const User = db.user;
const BusSeat = db.busSeat;



const createUser = (req, res) => {
    let jsonData = req.body;
    let validationRule = {
        name: 'required',
        email: 'required',
        password: 'required|min:8',
        confirmPassword: 'required|same:password',
    };
    let customMessages = {
        'required.name': 'The Name field is required.',
        'required.email': 'The Email field is required.',
        'required.password': 'The Email field is required.',
        'min.password': 'Password Length Should Be More Than 7 Character'
    };
    validator(jsonData, validationRule, customMessages, async (err, status) => {
        if (!status) {
            res.status(200).json({ status: false, message: "Invalid Request Data.", error: err.errors });
        }
        else {
            try {
                    let getUserDataViaEmail = await User.findOne({ where: { email: jsonData.email } });
                    if (getUserDataViaEmail == null) {
                        const salt = genSaltSync(10);
                        jsonData.password = hashSync(jsonData.password, salt);
                        let createUserObject = { name: jsonData.name, email: jsonData.email, password: jsonData.password};
                        var createdUser = await User.create(createUserObject);
                        const accessToken = sign({ userID: createdUser.id }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY });
                        let createTokenData = {id: createdUser.id, password:createdUser.password, name:createdUser.name,email:createdUser.email};

                        const refreshToken = sign({ result: createTokenData }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY });
                        res.status(200).json({ status: true, message: "user created.", error: '', accessToken: accessToken, refreshToken: refreshToken, data: createdUser });
                    }
                    else {
                        res.status(200).json({ status: false, message: 'This email is already registered.', error: { 'email': ['This email is already registered.'] } });
                    }
            } catch (error) {
                res.status(200).json({ status: false, message: error.message, error: error.message });
            }
        }
    })
}

const login = (req, res) => {
    let jsonData = req.body;
    let validationRule = {
        email: 'required|min:3',
        password: 'required',
    };
    let customMessages = {
        'required.email': 'The email field is required.',
        'required.password': 'The password field is required.',
    };
    validator(jsonData, validationRule, customMessages, async (err, status) => {
        if (!status) {
            res.status(200).json({ status: false, message: "Invalid Request Data.", error: err.errors });
        }
        else {
            let getUserData = await User.findOne({
                where: {
                    email: jsonData.email
                }
            });
            if (getUserData == null) {
                res.status(200).json({ status: false, message: "Invalid Email.", error: "invalid Email.", data: [] });
            }
            else {
                let isMatched = compareSync(jsonData.password, getUserData.password);
                if (isMatched) {
                    let createTokenData = {id: getUserData.id, password:getUserData.password,name:getUserData.name, email:getUserData.email}
                        const jsonwebtoken = sign({ result: createTokenData }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY });
                    return res.status(200).json({ status: true, message: "Login Success.", error: '', data: { token: jsonwebtoken, userData: getUserData } });
                }
                else {
                    res.status(200).json({ status: false, message: "Invalid Password.", error: "Invalid Password.", data: {} });
                }

            }
        }
    });
}
const getProfile = async (req, res) => {
    if (req.User) {
        var getUserData = await User.findOne({where: { id: req.User.id } });
        res.status(200).json({ status: true, message: "User Profile.", error: '', data: getUserData });
    }
}
const getBusSeats = async (req,res)=>{
    var getData = await BusSeat.findAll({where: { busID: 1 } });
    res.status(200).json({ status: true, message: "Bus Seats", error: '', data: getData });
}
const bookBusSeat = (req,res)=>{
    let jsonData = req.body;
    let validationRule = {
        seatID: 'required|numeric'
    };
    let customMessages = {
        'required.seatID': 'The seatID field is required.'
    };
    validator(jsonData, validationRule, customMessages, async (err, status) => {
        if (!status) {
            return res.status(200).json({ status: false, message: "Invalid Request Data.", error: err.errors });
        }
        else {
            var getData = await BusSeat.findOne({where: { id: jsonData.seatID } });
            if(getData){
                if(getData.status==0){
                    var [row,getData] = await BusSeat.update({status:1,reserveBy:req.User.id,reserveAt:Date.now()},{where: { id: jsonData.seatID } });
                    return res.status(200).json({ status: true, message: "Seat  booked successfully.", error: '', data: {row,getData} });
                }
                else{
                    return res.status(200).json({ status: false, message: "already Booked seat no "+jsonData.seatID, error: "already Booked seat no "+jsonData.seatID });
                }
            }
            else{
                return res.status(200).json({ status: false, message: "Invalid seat ID.", error: "Invalid seat ID." });
            }
        }
    });
}
const resetBusSeat = (req,res)=>{
    let jsonData = req.body;
    let validationRule = {
        seatID: 'required|numeric'
    };
    let customMessages = {
        'required.seatID': 'The seatID field is required.'
    };
    validator(jsonData, validationRule, customMessages, async (err, status) => {
        if (!status) {
            return res.status(200).json({ status: false, message: "Invalid Request Data.", error: err.errors });
        }
        else {
            var getData = await BusSeat.findOne({where: { id: jsonData.seatID } });
            if(getData){
                if(getData.status==1){
                    var [row,getData] = await BusSeat.update({status:0,reserveBy:null,reserveAt:null},{where: { id: jsonData.seatID } });
                    return res.status(200).json({ status: true, message: "Seat  reset successfully.", error: '', data: {row,getData} });
                }
                else{
                    return res.status(200).json({ status: false, message: "already available seat no "+jsonData.seatID, error: "already available seat no "+jsonData.seatID });
                }
            }
            else{
                return res.status(200).json({ status: false, message: "Invalid seat ID.", error: "Invalid seat ID." });
            }
        }
    });
}
module.exports = {
    createUser, login, getProfile,
    getBusSeats, bookBusSeat,resetBusSeat
}
