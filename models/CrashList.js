const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrashSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  crashMessage: {
    type: String,
    required: true
  }
});

module.exports = CrashList = mongoose.model("crashlists", CrashSchema);
