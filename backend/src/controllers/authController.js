const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken =
require("../utils/generateToken");


const registerUser = async (req,res)=>{


    try{


        const {

            fullName,
            email,
            password,
            club,
            year

        } = req.body;

        const existingUser = await User.findOne({

    email

});


if(existingUser){

    return res.status(400).json({

        success:false,

        message:"Email already exists."

    });

}

const hashedPassword = await bcrypt.hash(

    password,

    10

);


        const user = await User.create({

    fullName,
    email,
    password:hashedPassword,
    club,
    year

});


        res.status(201).json({

            success:true,

            message:
            "User Registered Successfully",

            user

        });


    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }


};

const loginUser = async(req,res)=>{


    try{


        const {

            email,
            password

        } = req.body;


        const user = await User.findOne({

            email

        });


        if(!user){

            return res.status(404).json({

                success:false,

                message:"User not found."

            });

        }


        const isMatch = await bcrypt.compare(

    password,

    user.password

);


if(!isMatch){

    return res.status(400).json({

        success:false,

        message:"Incorrect Password."

    });

}


const token = generateToken(

    user._id

);

return res.status(200).json({

    success:true,

    message:"Login Successful.",

    token,

    user

});


    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }


};

const getProfile = async(req,res)=>{


    try{


        const user = await User.findById(

            req.user.id

        ).select("-password");


        return res.status(200).json({

            success:true,

            user

        });


    }

    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });

    }


};

const updateProfile = async(req,res)=>{


    try{


        const{

            fullName,
            club,
            year

        } = req.body;


        const user = await User.findById(

            req.user.id

        );


        if(!user){

            return res.status(404).json({

                success:false,

                message:"User not found."

            });

        }


        user.fullName =
        fullName || user.fullName;


        user.club =
        club || user.club;


        user.year =
        year || user.year;


        await user.save();


        return res.status(200).json({

            success:true,

            message:"Profile Updated.",

            user

        });


    }

    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });

    }


};

const getCurrentUser = async(req,res)=>{

    try{

        const user = await User.findById(

            req.user._id

        ).select("-password");


        return res.status(200).json({

            success:true,

            user

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

const changePassword = async(req,res)=>{


    try{


        const{

            oldPassword,

            newPassword

        } = req.body;


        const user =
        await User.findById(

            req.user._id

        );


        const isMatch =
        await bcrypt.compare(

            oldPassword,

            user.password

        );


        if(!isMatch){

            return res.status(400).json({

                success:false,

                message:"Incorrect Password."

            });

        }


        user.password =
        await bcrypt.hash(

            newPassword,

            10

        );


        await user.save();


        return res.status(200).json({

            success:true,

            message:"Password Updated."

        });


    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};


module.exports = {

    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    getCurrentUser,
    changePassword

};