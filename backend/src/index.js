import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js"
dotenv.config();
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log(error);
        throw error;
        
    });
    const PORT=process.env.PORT||3000;
    app.listen(PORT,()=>{
        console.log(`server is running at port :${PORT}`);
    })
}
)
.catch((err)=>{
    console.log("MongoDb connection error",err);
}
)
