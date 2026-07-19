require("dotenv").config();

const app = require("./app");

const connectDB = require("./config/db");


const PORT = process.env.PORT || 5001;


// Connect Database

connectDB();


// Start Server

app.listen(PORT, () => {

    console.log(
        `🚀 Server running on Port ${PORT}`
    );

});