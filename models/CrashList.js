const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrashSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = CrashList = mongoose.model("crashlists", CrashSchema);
