const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const validateClassroomInput = require("../../validation/classroom");

// Load User model
const User = require("../../models/User");
// Load Classroom model
const Classroom = require("../../models/Classroom");

// @route   GET api/classrooms/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Classroom Works" }));

// @route   Get api/classrooms/
// @desc    Get all classrooms
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Classroom.find()
      .populate("user", ["name", "email"])
      .then(classrooms => {
        if (!classrooms) {
          errors.noClassrooms = "There are no classrooms";
          return res.status(404).json(errors);
        }
        res.json(profiles);
      })
      .catch(err =>
        res.status(404).json({ classrooms: "There are no classrooms" })
      );
  }
);
// @route   Get api/classrooms/:id
// @desc    Get one classroom by mongoose id
// @access  Private
router.get(
  "/:classroomid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Classroom.findById(req.params.classroomid).then(classroom => {
      if (!classroom) {
        errors.noclassroom = "sorry, this classroom doesnt exist";
        return res.status(404).json(errors);
      }
    });
  }
);

module.exports = router;
