const jwt = require("jsonwebtoken");

const User =
require("../models/User");


const protect = async(req,res,next)=>{


    try{


        const authHeader =

        req.headers.authorization;


        if(!authHeader){

            return res.status(401).json({

                success:false,

                message:"Unauthorized Access"

            });

        }


        const token =

        authHeader.split(" ")[1];


        if(!token){

            return res.status(401).json({

                success:false,

                message:"Unauthorized Access"

            });

        }



        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );


        const user = await User.findById(

            decoded.id

        );


        req.user = user;


        next();


    }

    catch(error){


        return res.status(401).json({

            success:false,

            message:"Invalid Token"

        });

    }

};


module.exports = protect;