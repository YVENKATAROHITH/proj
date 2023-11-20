const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({"name":{type:String},"email":{type:String},"message":{type:String}},{collection:"contact"
});

module.exports = mongoose.model("contactSchema",contactSchema);