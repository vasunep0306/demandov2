//basic constants and require statements
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const detect = require("detect-csv");
const validateClassroomInput = require("../../validation/classroom");
const validateNewQuestion = require("../../validation/questions");
const validateAnswer = require("../../validation/answer");
const User = require("../../models/User"); // Load User model
const Classroom = require("../../models/Classroom"); // Load Classroom model
const Question = require("../../models/Question"); // Load Question model

//SECTION FOR THE FIRST TEST ROUTE
/**
 * @route   GET api/classrooms/test
 * @desc    Tests users route
 * @access  Public
 * */
router.get("/test", (req, res) => res.json({ msg: "Classroom Works" }));
//END SECTION

//SECTION FOR THE ROOT ROUTE AS WELL AS ROUTES THAT GET THE CLASSROOM BY ID
/** @route   Get api/classrooms/
 * @desc    Get all classrooms
 * @access  Private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Classroom.find({})
      .populate("user", ["name", "email"])
      .then(classrooms => {
        if (!classrooms) {
          errors.noClassrooms = "There are no classrooms";
          return res.status(404).json(errors);
        }
        if (classrooms.length === 0) {
          errors.noClassrooms = "There are 0 classrooms";
          return res.status(400).json(errors);
        }
        return res.json(classrooms);
      })
      .catch(err => {
        return res.status(404).json({ classrooms: "There are no classrooms" });
      });
  }
);
/** @route   Get api/classrooms/:id
 * @desc    Get one classroom by mongoose id
 * @access  Private
 */
router.get(
  "/:classroomid/classroom",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Classroom.findById(req.params.classroomid)
      .then(classroom => {
        if (!classroom) {
          errors.noclassroom = "sorry, this classroom doesnt exist";
          return res.status(404).json(errors);
        }
        return res.json(classroom);
      })
      .catch(err => {
        return res.status(404).json({ classroom: err });
      });
  }
);

//END SECTION

//SECTION FOR ADDING NEW CLASSROOMS AND REGISTERING STUDENTS
/** @route   Post api/classrooms/
 * @desc    Create a classroom
 * @access  Private
 */
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
    classData.classcode = req.body.classcode;
    classData.classtitle = req.body.classtitle;
    classData.registeration_pin = req.body.registeration_pin;
    classData.currentQuestion = null;

    Classroom.findOne({ classcode: req.body.classcode }).then(classroom => {
      if (classroom) {
        // Check if cid exists
        errors.cid = "That class already exists";
        return res.status(400).json(errors);
      }
      // Save classroom
      new Classroom(classData).save().then(classroom => res.json(classroom));
    });
  }
);
/** @route   Post api/classrooms/:classroomid/changepin
 * @desc    Get students to register for class
 * @access  Private
 */
router.post(
  "/:classroomid/changepin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Classroom.findById(req.params.classroomid).then(classroom => {
      if (!classroom) {
        return res
          .status(400)
          .json({ "no classroom": "classroom doesnt exist" });
      }
      let keys = Object.keys(req.body);
      classroom.registeration_pin = keys[0];
      classroom.save().then(classroom => res.json(classroom));
    });
  }
);
/** @route   Post api/classrooms/register
 * @desc    Get students to register for class
 * @access  Private
 */
router.post(
  "/register/:classid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Register student for classroom
    User.findById(req.user._id)
      .then(user => {
        if (!user) {
          errors.nouser = "there is no user";
          return res.status(400).json(errors);
        }
        Classroom.findById(req.params.classid)
          .then(classroom => {
            // Find classroom
            if (!classroom) {
              errors.noclass = "there is no classroom under that id";
              return res.status(400).json(errors);
            }
            let key = Object.keys(req.body);
            let input_registeration_pin = key[0];
            // the pin they typed in is correct
            if (classroom.registeration_pin === input_registeration_pin) {
              //if the classroom contains the student
              if (classroom.students.indexOf(user._id) > -1) {
                errors.exists =
                  "there already is a user enrolled in this classroom";
                return res.status(400).json(errors);
              } else {
                classroom.students.unshift(user._id);
                classroom.save();
              }

              // if the student is already enrolled in the course
              if (user.classrooms.indexOf(classroom._id) > -1) {
                errors.exists = "there already is a classroom under this user";
                return res.status(400).json(errors);
              } else {
                user.classrooms.unshift(classroom._id);
                user.save();
                return res.status(200).json(classroom);
              }
            } else {
              errors.noclass = "wrong registeration pin";
              return res.status(400).json(errors);
            }
          })
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  }
);

/** @route   GET api/classrooms/myclassrooms
 * @desc    Get all the classrooms for the specific user
 * @access  Private: only students can use it.
 */
router.get(
  "/:userid/myclasses",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    User.findById(req.params.userid)
      .populate("classrooms")
      .then(user => {
        if (!user) {
          errors.nouser = "there is no user";
          return res.status(400).json(errors);
        }
        if (user.classrooms.length === 0) {
          errors.noClassrooms = "there are no classes for you yet";
          return res.status(400).json(errors);
        }
        return res.status(200).json(user.classrooms);
      });
  }
);

// @route   Get api/classrooms/:classroomid/getstudents
// @desc    get all of the students from a given classroom
// @access  Private

router.get(
  "/:classroomid/getstudents",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Classroom.findById(req.params.classroomid)
      .populate("students")
      .then(classroom => {
        if (!classroom || req.user.userType === "student") {
          errors.noclass = "No students to show";
          return res.status(404).json(errors);
        }
        if (classroom.students.length === 0) {
          errors.nostudents = "No students are registered yet";
          return res.status(404).json(errors);
        }
        const students = classroom.students;
        res.status(200).json(students);
      })
      .catch(err => res.status(500).json(err));
  }
);
//END SECTION

// SECTION FOR QUESTIONS
/** @route   GET api/classrooms/:classroomid/questions
 * @desc    Get all the questions for that specific classroom
 * @access  Private: only teachers can use it.
 */

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

/** @route   POST api/classrooms/:classroomid/newquestion
 * @desc    Post a new question given a classroom
 * @access  Private: only teachers can use it.
 */

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

/** @route   POST api/classrooms/:classroomid/setcurrentquestion/:questionid
 * @desc    Post the current question
 * @access  Private: only teachers can use it.
 */
router.post(
  "/:classroomid/setcurrentquestion/:questionid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("reach");
    Question.findById(req.params.questionid).then(question => {
      console.log("reach");
      Classroom.findById(req.params.classroomid).then(classroom => {
        classroom.currentQuestion = question;
        classroom.save();
        console.log(classroom);
      });
    });
  }
);

/** @route   POST api/classrooms/:classroomid/unsetcurrentquestion/:questionid
 * @desc    Hide the current question
 * @access  Private: only teachers can use it.
 */
router.post(
  "/:classroomid/unsetcurrentquestion",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Classroom.findById(req.params.classroomid)
      .populate("currentQuestion")
      .then(classroom => {
        classroom.currentQuestion = null;
        classroom.save().then(classroom => {
          return res
            .status(200)
            .json({ success: "Successfully unset Question" });
        });
      });
  }
);

// @route   GET api/classrooms/:classroomid/getcurrentquestion
// @desc    Post a new question given a classroom
// @access  Private: students will receive their questions using this route

router.get(
  "/:classroomid/getcurrentquestion",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Classroom.findById(req.params.classroomid)
      .then(classroom => {
        if (classroom.currentQuestion == null) {
          return res.status(400).json({
            noCurrentQuestion: "No question is set"
          });
        }
        Question.findById(classroom.currentQuestion)
          .then(question => {
            if (!question) {
              return res.status(404).json({
                noCurrentQuestion: "No question found"
              });
            }
            return res.status(200).json(question);
          })
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  }
);

/** @route   GET api/classrooms/:questionid/answerquestion
 * @desc    Post a new question given a classroom
 * @access  Private: students will use this to answer questions.
 */

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

      // check to see if student has already answered question
      question.responses.forEach(response => {
        if (response.student.email === req.user.email) {
          return res
            .status(400)
            .json({ alreadyAnswered: "student has already answered question" });
        }
      });
      question.responses.unshift(req.body);
      question
        .save()
        .then(question => res.json(question))
        .catch(err => res.json(err));
    });
  }
);

/** @route   GET api/classrooms/:questionid/getresponses
 * @desc    Gives the teacher feedback if they ever want to reward
 * the first question answered successfully
 * @access  Private: teachers will use this to see the respones.
 */

/** @route   POST api/classrooms/:classroomid/removeStudent
 * @desc    Remove a student from a given classroom.
 * @access  Private: Teachers use this route to delete a given student from the classroom
 */

router.post(
  "/:classroomid/:studentid/removestudent",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.studentid)
      .populate("classrooms")
      .then(studentToRemove => {
        if (!studentToRemove) {
          return res.json({ noStudent: "There is no student under this id" });
        }
        Classroom.findById(req.params.classroomid)
          .populate("students")
          .then(classroom => {
            if (!classroom) {
              return res.json({
                noClassroom: "There is no classroom under this id"
              });
            }

            classroom.students.forEach(student => {
              if (student._id.toString() === studentToRemove._id.toString()) {
                classroom.students.splice(
                  classroom.students.indexOf(student),
                  1
                );
                classroom.save();
                student.classrooms.splice(
                  student.classrooms.indexOf(classroom),
                  1
                );
                student.save();
              }
            });
          });
      })
      .catch(err => res.status(500).json(err));
  }
);
//END SECTION
module.exports = router;
