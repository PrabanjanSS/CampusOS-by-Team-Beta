const Poll = require("../models/Poll");


const createPoll = async(req,res)=>{

    try{

        const poll = await Poll.create({

            ...req.body,

            createdBy:req.user._id

        });


        return res.status(201).json({

            success:true,

            poll

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



const getAllPolls = async(req,res)=>{

    try{

        const polls = await Poll.find();


        return res.status(200).json({

            success:true,

            polls

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



const getSinglePoll = async(req,res)=>{

    try{

        const poll = await Poll.findById(

            req.params.id

        );


        return res.status(200).json({

            success:true,

            poll

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



const votePoll = async(req,res)=>{

    try{

        const{

            optionIndex

        } = req.body;


        const poll = await Poll.findById(

            req.params.id

        );


        if(!poll){

            return res.status(404).json({

                success:false,

                message:"Poll not found."

            });

        }


        if(

            optionIndex < 0 ||

            optionIndex >= poll.options.length

        ){

            return res.status(400).json({

                success:false,

                message:"Invalid option."

            });

        }


        poll.options[optionIndex].votes += 1;


        await poll.save();


        return res.status(200).json({

            success:true,

            message:"Vote submitted successfully.",

            poll

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



const updatePoll = async(req,res)=>{

    try{

        const poll = await Poll.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new:true

            }

        );


        return res.status(200).json({

            success:true,

            poll

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



const deletePoll = async(req,res)=>{

    try{

        await Poll.findByIdAndDelete(

            req.params.id

        );


        return res.status(200).json({

            success:true,

            message:"Poll Deleted."

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

    createPoll,
    getAllPolls,
    getSinglePoll,
    votePoll,
    updatePoll,
    deletePoll

};