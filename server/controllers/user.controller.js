const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {

    register: (req, res)=>{
        const user = new User(req.body);

        user.save()
            .then((newUser)=>{
                console.log(newUser);
                console.log("Successfully Registered");
                res.json({
                    successMessage: "Thank you for registering",
                    user: newUser
                });
            })
            .catch((err)=>{
                console.log("register not successfull!")
                res.status(400).json(err);
            })
    },

    login: (req, res)=>{
        User.findOne({username: req.body.username})
            .then((userRecord)=>{
            //check if this returned obj is null
                if(userRecord === null){
                // email not found
                res.status(400).json({message: "Invalid Login Attempt"})
                }
                else{
                    //email is found
                    bcrypt.compare(req.body.password, userRecord.password) 
                        .then((isPasswordValid)=>{
                            if(isPasswordValid){
                                console.log("password is valid");
                                res.cookie(
                                    "usertoken",
                                    jwt.sign(
                                        {
                                            id: userRecord._id,
                                            username: userRecord.username
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 9000000)
                                    },
                                ).json({
                                    message: "Succesfully",
                                    userLoggedIn: userRecord.username,
                                    userId: userRecord._id
                                });
                            }
                            else{
                                res.status(400).json({
                                    message: "Login and/or Email Invalid"
                                })
                            }
                            
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.status(400).json({ message: "Invalid Attempt" });
                        })
                }
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json({ message: "Invalid Attempt" });
            })

    },

    logout: (req, res) => {
        console.log("logging out");
        res.clearCookie("usertoken");
        res.json({
            message: "You have successfully logged out!",
        });
    },


    getLoggedInUser: (req, res) => {
        User.findOne({ _id: req.jwtpayload.id })
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },

    findAllUsers: (req, res) => {
        User.find()
            .then((allUsers) => {
                res.json(allUsers);
            })
            .catch((err) => {
                console.log("Find All Users failed");
                res.json({ message: "Something went wrong in findAll", error: err })
            })
    },



}


