const mongoose = require("mongoose");
const pollSchema = new mongoose.Schema({"option":{type:String}},{collection:"options"
});

module.exports = mongoose.model("pollSchema",pollSchema);
