const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({"id":{type:Number},"email":{type:String},"password":{type:String}},{collection:"Admin"
});

module.exports = mongoose.model("adminSchema",adminSchema);
