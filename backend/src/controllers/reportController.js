const Report = require("../models/Report");


const createReport = async(req,res)=>{

    try{

        const report = await Report.create({

            ...req.body,

            submittedBy:req.user._id

        });


        return res.status(201).json({

            success:true,

            report

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



const getAllReports = async(req,res)=>{

    try{

        const reports = await Report.find();


        return res.status(200).json({

            success:true,

            reports

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



const getSingleReport = async(req,res)=>{

    try{

        const report = await Report.findById(

            req.params.id

        );


        return res.status(200).json({

            success:true,

            report

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



const getPendingReports = async(req,res)=>{

    try{

        const reports = await Report.find({

            status:"Pending"

        });


        return res.status(200).json({

            success:true,

            reports

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



const approveReport = async(req,res)=>{

    try{

        const report = await Report.findById(

            req.params.id

        );


        if(!report){

            return res.status(404).json({

                success:false,

                message:"Report not found."

            });

        }


        report.status = "Approved";


        report.approvedBy =

        req.user._id;


        report.facultyRemarks =

        req.body.facultyRemarks || "";


        await report.save();


        return res.status(200).json({

            success:true,

            message:"Report Approved.",

            report

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



const rejectReport = async(req,res)=>{

    try{

        const report = await Report.findById(

            req.params.id

        );


        if(!report){

            return res.status(404).json({

                success:false,

                message:"Report not found."

            });

        }


        report.status = "Rejected";


        report.approvedBy =

        req.user._id;


        report.facultyRemarks =

        req.body.facultyRemarks || "";


        await report.save();


        return res.status(200).json({

            success:true,

            message:"Report Rejected.",

            report

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

    createReport,
    getAllReports,
    getSingleReport,
    getPendingReports,
    approveReport,
    rejectReport

};