const mongoose = require('mongoose');
require('dotenv').config()

mongoose.set("strictQuery", false);
const mongoDB=`mongodb+srv://akash24may:${process.env.DB_PASSWORD}@akashcluster.vspmret.mongodb.net/main-data?retryWrites=true&w=majority`



const connectDB=async()=>{
    main().catch((err) => console.log(err));
        async function main() {
            try{
                await mongoose.connect(mongoDB);
                console.log("Database Connected!");
            }
            catch{
                console.log("Database Connection Error");
            }
        
        }
}

module.exports =connectDB;