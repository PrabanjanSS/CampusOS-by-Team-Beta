const Event =
require("../models/Event");

const createEvent = async(req,res)=>{


    try{


        const{

            title,
            description,
            venue,
            date,
            registrationLink

        } = req.body;



        const event = await Event.create({


            title,
            description,
            venue,
            date,
            registrationLink,

            createdBy:req.user._id


        });


        return res.status(201).json({

            success:true,

            message:"Event Created.",

            event

        });


    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

const getAllEvents = async(req,res)=>{


    try{


        const events = await Event.find();


        return res.status(200).json({

            success:true,

            events

        });


    }

    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });

    }


};

const getSingleEvent = async(req,res)=>{


    try{


        const event = await Event.findById(

            req.params.id

        );


        if(!event){

            return res.status(404).json({

                success:false,

                message:"Event not found."

            });

        }


        return res.status(200).json({

            success:true,

            event

        });


    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

const updateEvent = async(req,res)=>{


    try{


        const event = await Event.findById(

            req.params.id

        );


        if(!event){

            return res.status(404).json({

                success:false,

                message:"Event not found."

            });

        }


        const updatedEvent =

        await Event.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new:true

            }

        );


        return res.status(200).json({

            success:true,

            message:"Event Updated.",

            updatedEvent

        });


    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

const deleteEvent = async(req,res)=>{


    try{


        const event = await Event.findById(

            req.params.id

        );


        if(!event){

            return res.status(404).json({

                success:false,

                message:"Event not found."

            });

        }


        await Event.findByIdAndDelete(

            req.params.id

        );


        return res.status(200).json({

            success:true,

            message:"Event Deleted."

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

    createEvent,
    getAllEvents,
    getSingleEvent,
    updateEvent,
    deleteEvent

};