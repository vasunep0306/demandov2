const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const detect = require("detect-csv");

const validateClassroomInput = require("../../validation/classroom");
const validateCourseRegisterationInput = require("../../validation/registerForCourse");
const validateNewQuestion = require("../../validation/questions");
const validateAnswer = require("../../validation/answer");

// Load User model
const User = require("../../models/User");
// Load Classroom model
const Classroom = require("../../models/Classroom");
// Load Question model
const Question = require("../../models/Question");

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
    classData.instructor = req.user._id;
    classData.crn = req.body.crn;
    classData.classcode = req.body.classcode;
    classData.classtitle = req.body.classtitle;

    Classroom.findOne({ crn: req.body.crn }).then(classroom => {
      if (classroom) {
        // Check if crn exists
        errors.crn = "That crn already exists";
        return res.status(400).json(errors);
      }
      // Save classroom
      new Classroom(classData).save().then(classroom => res.json(classroom));
    });
  }
);

// @route   Post api/classrooms/register
// @desc    Get students to register for class
// @access  Private

router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCourseRegisterationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Register student for classroom
    User.findById(req.user._id)
      .then(user => {
        if (!user) {
          errors.nouser = "there is no user";
          return res.status(400).json(errors);
        }
        Classroom.findOne({ crn: req.body.crn })
          .then(classroom => {
            // Find classroom
            if (!classroom) {
              errors.noclass = "there is no classroom under that crn";
              return res.status(400).json(errors);
            }
            classroom.students.unshift(user._id);
            classroom.save();
            console.log(classroom);
            if (!user.classrooms.includes(classroom._id)) {
              user.classrooms.unshift(classroom._id);
              user.save();
              return res.status(200).json(classroom);
            } else {
              errors.exists = "there already is a classroom under this user";
              return res.status(400).json(errors);
            }
          })
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route   GET api/classrooms/:classroomid/questions
// @desc    Get all the questions for that specific classroom
// @access  Private: only teachers can use it.

router.get(
  "/:classroomid/questions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Classroom.findById(req.params.classroomid)
      .populate("questions")
      .then(classroom => {
        if (!classroom || req.user.userType === "student") {
          errors.noclass = "No classroom available";
          return res.status(404).json(errors);
        }
        if (classroom.questions.length === 0) {
          errors.noquestions = "No questions available";
          return res.status(404).json(errors);
        }
        const questions = classroom.questions;
        res.status(200).json(questions);
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route   POST api/classrooms/:classroomid/newquestion
// @desc    Post a new question given a classroom
// @access  Private: only teachers can use it.

router.post(
  "/:classroomid/newquestion",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNewQuestion(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Create a new question
    Classroom.findById(req.params.classroomid).then(classroom => {
      Question.findOne({ questionbody: req.body.questionbody }).then(
        question => {
          if (question) {
            return res.status(500).json({
              alreadyCreatedQuestion: "You have already created that question"
            });
          }
          const newquestion = {
            questionbody: req.body.questionbody,
            questiontype: req.body.questiontype,
            correctanswer: req.body.correctanswer,
            classroom: classroom._id,
            classtitle: classroom.classtitle
          };
          if (req.body.answerchoices) {
            newquestion.answerchoices = req.body.answerchoices.split(",");
          }
          // save new question
          new Question(newquestion).save().then(question => {
            classroom.questions.unshift(question);
            classroom.save();
            res.json(classroom);
          });
        }
      );
    });
  }
);

// @route   POST api/classrooms/:classroomid/setcurrentquestion/:questionid
// @desc    Post the current question
// @access  Private: only teachers can use it.
router.post(
  "/:classroomid/setcurrentquestion/:questionid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Question.findById(req.params.questionid).then(question => {
      Classroom.findById(req.params.classroomid).then(classroom => {
        classroom.currentQuestion = question;
        classroom.save();
      });
    });
  }
);

// @route   POST api/classrooms/:classroomid/unsetcurrentquestion/:questionid
// @desc    Hide the current question
// @access  Private: only teachers can use it.
router.post(
  "/:classroomid/unsetcurrentquestion",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Classroom.findById(req.params.classroomid).then(classroom => {
      classroom.currentQuestion = {};
    });
  }
);

// @route   GET api/classrooms/:classroomid/getcurrentquestion
// @desc    Post a new question given a classroom
// @access  Private: students will recieve their questions using this route

router.get(
  "/:classroomid/getcurrentquestion",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Classroom.findById(req.params.classroomid)
      .populate("currentQuestion")
      .then(classroom => {
        if (!classroom.currentQuestion) {
          return res.status(500).json({
            noCurrentQuestion: "No question is set"
          });
        }
        res.status(200).json(classroom.currentQuestion);
      });
  }
);

// @route   GET api/classrooms/:questionid/answerquestion
// @desc    Post a new question given a classroom
// @access  Private: students will use this to answer questions.

router.post(
  "/:questionid/answerquestion",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAnswer(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Question.findById(req.params.questionid).then(question => {
      if (!question) {
        return res.json({ noQuestion: "There is no question" });
      }
      const responsedata = {
        student: {
          email: req.user.email,
          name: req.user.name
        },
        responsebody: req.body.answer,
        correctness: req.body.answer === question.correctanswer
      };

      responsedata.correctness = req.body.answer === question.correctanswer;
      question.responses.unshift(responsedata);
      question
        .save()
        .then(question => res.json(question))
        .catch(err => res.json(err));
    });
  }
);
module.exports = router;
