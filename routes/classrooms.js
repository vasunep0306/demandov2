const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({});

module.exports = Classroom = mongoose.model("classroom", ClassroomSchema);
