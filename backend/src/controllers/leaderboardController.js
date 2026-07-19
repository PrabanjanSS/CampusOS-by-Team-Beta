const Leaderboard = require("../models/Leaderboard");


const createLeaderboard = async(req,res)=>{

    try{

        const leaderboard = await Leaderboard.create(

            req.body

        );


        return res.status(201).json({

            success:true,
            leaderboard

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const getLeaderboard = async(req,res)=>{

    try{

        const leaderboard = await Leaderboard.find();


        return res.status(200).json({

            success:true,
            leaderboard

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const updateLeaderboard = async(req,res)=>{

    try{

        const leaderboard =
        await Leaderboard.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );


        return res.status(200).json({

            success:true,
            leaderboard

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



module.exports={

    createLeaderboard,
    getLeaderboard,
    updateLeaderboard,
    

};