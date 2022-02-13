const Collector = require('../models/collector.model');
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');

module.exports = {

    findAllCollector: (req, res) =>{
        Collector.find()
            .populate("createdBy", "username email")
            .then((allGames)=>{
                res.json(allGames);
            })
            .catch((err)=>{
                console.log("Find All failed");
                res.json({message: "Something went wrong", error: err})
            })
    },

    createNewCollector: (req, res)=>{

        const newCollector = new Collector(req.body);


        newCollector.createdBy = req.jwtpayload.id;



        newCollector.save()
            .then((newCollect)=>{
                console.log(newCollect);
                res.json(newCollect)
            })
            .catch((err)=>{
                console.log("Something went wrong");
                res.status(400).json(err);
            })
    },

    findOneCollector: (req, res)=>{
        Collector.findOne({_id: req.params.id}) 
            .then((oneCollect)=>{
                console.log(oneCollect);
                res.json(oneCollect)
            })
            .catch((err)=>{
                console.log("Find One failed");
                res.json({message: "Something went wrong", error: err})
            })
    },

    deleteCollector: (req, res)=>{
        Collector.deleteOne({_id: req.params.id})
            .then((deletedCollect)=>{
                console.log(deletedCollect);
                res.json(deletedCollect)
            })
            .catch((err)=>{
                console.log("Delete one failed");
                res.json({message: "Something went wrong", error: err})
            })
    },

    updateCollector: (req, res)=>{
        Collector.findOneAndUpdate({_id: req.params.id},
            req.body,
            {new: true, runValidators: true} 
            )
            .then((updatedCollect)=>{
                console.log(updatedCollect);
                res.json(updatedCollect)
            })
            .catch((err)=>{
                console.log("Something went wrong");
                res.status(400).json(err); 
            })
    },


    findAllCollectorsByUser: (req, res)=>{

        console.log("req.jwtpayload.username :", req.jwtpayload.username )
        console.log(" req.params.username:", req.params.username)

        if(req.jwtpayload.username !== req.params.username){
            console.log("not user")
            User.findOne({username: req.params.username})
                .then((userNotLoggedIn)=>{
                    Game.find({createdBy: userNotLoggedIn._id})
                        .populate("createdBy", "username")
                        .then((allGamesFromUser)=>{
                            console.log(allGamesFromUser);
                            res.json(allGamesFromUser);
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.status(400).json(err);
                        })
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
        }
        else{
            console.log("current user")
            console.log("req.jwtpayload.id:", req.jwtpayload.id);
            Game.find({createdBy: req.jwtpayload.id})
                .populate("createdBy", "username")
                .then((allGamesFromLoggedInUser)=>{
                    console.log(allGamesFromLoggedInUser);
                    res.json(allGamesFromLoggedInUser);
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })

        }
    } 

}


