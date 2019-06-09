const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrashSchema = new Schema({});

module.exports = CrashList = mongoose.model("crashlists", CrashSchema);
