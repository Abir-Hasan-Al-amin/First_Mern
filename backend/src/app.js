import express from "express";
import cors from "cors";

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGINS,
    credentials:true,
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({limit:"16kb",extended:true}));
app.use(express.static("public"))

import todoRouter from "./routes/todo.routes.js"
app.use("/api/v1/todo",todoRouter);

export {app};