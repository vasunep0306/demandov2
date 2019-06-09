const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrashSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  crashObject: {
    type: Object,
    required: true
  }
});

module.exports = CrashList = mongoose.model("crashlists", CrashSchema);
