const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register"); // Load Input Validation
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User"); // Load User model
const CrashList = require("../../models/CrashList"); // Load CrashList model
const Classroom = require("../../models/Classroom"); // Load Classroom model

/** @route   POST api/users/getErrors
 * @desc    Get errors from user and post them to the Mongo Schema.
 * @access  Public
 */

router.post("/getErrors", (req, res) => {
  const errorObject = req.body.errorObject;
  const message = {};
  if (!errorObject) {
    message.noerrors = "No errors found.";
    return res.status(404).json(message);
  }
  new CrashList({ crashObject: errorObject, isFixed: false })
    .save()
    .then(crashreport => {
      return res
        .status(200)
        .json({ success: "Successfully created crash report" });
    });
});

/** @route   GET api/users/test
 * @desc    Tests users route
 * @access  Public
 */
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

/** @route   POST api/users/register
 * @desc    Register user
 * @access  Public
 */
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists. Consider using a different one";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/** @route   POST api/users/login
 * @desc    Login User / Returning JWT Token
 * @access  Public
 */
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          name: user.name,
          userType: user.userType,
          email: user.email
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

/** @route   GET api/users/current
 * @desc    Return current user
 * @access  Private
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      userType: req.user.userType,
      classrooms: req.user.classrooms
    });
  }
);

/** @route   GET api/users/:instructorid/classrooms
 * @desc    Return current user
 * @access  Private Teacher
 */
router.get(
  "/:instructorid/classrooms",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.instructorid)
      .then(user => {
        const errors = {};
        if (!user) {
          errors.noUser = "There is no user";
          return res.status(400).json(errors);
        } else if (user.userType === "student") {
          errors.invalidUser = "You are not allowed to do this";
          return res.status(400).json(errors);
        } else {
          Classroom.find({ instructor: user._id }).then(classrooms => {
            if (classrooms.length === 0) {
              return res.json({
                noclasses:
                  "you don't have any classrooms at the moment, please consider adding some"
              });
            } else {
              res.json(classrooms);
            }
          });
        }
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;
