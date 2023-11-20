
const express = require("express")
const mongoose = require("mongoose");
const studentRoute = require("./controller/studentRoute")
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
mongoose.set("strictQuery",true);
mongoose.connect("mongodb+srv://voters:12345@cluster0.k30c5ct.mongodb.net/votersdb");
var db = mongoose.connection;

db.on("open",()=>console.log("connected to DB"));
db.on("error",()=>console.log("Error"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use("/studentRoute",studentRoute)
app.listen(4000,()=>{console.log("server started")})