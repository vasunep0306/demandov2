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
        if (!classrooms || req.user.userType === "student") {
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
    Classroom.findById(req.params.classroomid)
      .then(classroom => {
        if (!classroom || req.user.userType === "student") {
          errors.noclassroom = "sorry, this classroom doesnt exist";
          return res.status(404).json(errors);
        }
        res.json(classroom);
      })
      .catch(err =>
        res.status(404).json({ classroom: "There is no classrooms" })
      );
  }
);

// @route   Get api/classrooms/:crn
// @desc    Get one classroom by crn
// @access  Private but universal to both teachers and students
router.get(
  "/:crn",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Classroom.findOne({ crn: req.params.crn }).then(classroom => {
      if (!classroom) {
        errors.noclass = "there is no classroom under that crn";
        return res.status(400).json(errors);
      }
      res.json(classroom);
    });
  }
);

// @route   Post api/classrooms/
// @desc    Create a classroom
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateClassroomInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    if (req.user.userType === "student") {
      return res.status(400).json({ error: "You are not allowed to do this" });
    }

    //Get fields
    const classData = {};
    classData.crn = req.body.crn;
    classData.classcode = req.body.classcode;
    classData.classtitle = req.body.classtitle;

    Classroom.findOne({ crn: req.body.crn }).then(classroom => {
      if (classroom) {
        // Check if crn exists
        errors.crn = "That crn already exists";
        res.status(400).json(errors);
      }
      // Save Profile
      new Classroom(classroomFields)
        .save()
        .then(classroom => res.json(classroom));
    });
  }
);

// @route   Post api/classrooms/register
// @desc    Create a classroom
// @access  Private

module.exports = router;
