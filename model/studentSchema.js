const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({"name":{type:String},"email":{type:String},"password":{type:String}},{collection:"Voters"
});

module.exports = mongoose.model("studentSchema",studentSchema);
