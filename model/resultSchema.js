const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({"option":{type:String},"votes": { type: Number, default: 0 }},{collection:"results"
});

module.exports = mongoose.model("resultSchema",resultSchema);