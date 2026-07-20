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



const User = require("../models/User");

const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find()
            .select("fullName email club role points department")
            .sort({ points: -1 })
            .limit(50);

        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            name: user.fullName,
            clubName: user.department || user.club || "N/A",
            points: user.points || 0,
            category: user.role
        }));

        return res.status(200).json({
            success: true,
            leaderboard
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
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