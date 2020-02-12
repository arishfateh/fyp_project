const express = require("express");
const router = express.Router();
//const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load Input Validation
//const validateRegisterInput = require("../../validation/register");
//const validateLoginInput = require("../../validation/login");
//Load User Model
const User = require("../../models/User");


//@route    GET api/users/test
//@desc     Tests users route
//@access   Public
router.get("/test", (req, res) =>
    res.json({
        msg: "User Works"
    })
);

//@route    GET api/users/register
//@desc     Register user route
//@access   Public
router.post("/signup", (req, res) => {

    User.findOne({
        username: req.body.username
    }).then(user => {
        if (user) {
            //errors.username = "username already exists";
            return res.json({ error: "username already exists" });
            //return res.json({ error: "Password incorrect" });
        } else {

            console.log(req.body);
            const newUser = new User({
                //name: req.body.name,
                username: req.body.username,
                //avatar,
                password: req.body.password,

                perm: req.body.permissions

            });
            //console.log(newUser.perm);

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

//@route    GET api/users/login
//@desc     Login user / Return JWT token
//@access   Public
router.post("/login", (req, res) => {


    const username = req.body.username;
    const password = req.body.password;

    console.log(username, password);
    //find user by username
    User.findOne({
        username
    }).then(user => {
        //Check for user
        if (!user) {
            //errors.username = "User not found";
            return res.json({ error: "Password incorrect" });
        }

        // Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //User Matched

                const payload = {
                    id: user.id,

                    //name: user.name,
                    //avatar: user.avatar
                    perm: user.perm
                }; // Create Jwt payload

                //Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 3600 * 4
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token

                        });
                    }
                );
            } else {
                //errors.password = "Password incorrect";
                return res.json({ error: "Password incorrect" });
            }
        });
    });
});

//@route    GET api/users/current
//@desc     Return Current user
//@access   Private
router.get(
    "/current",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        res.json({
            //id: req.user.id,
            //name: req.user.name,
            username: req.user.username,
            permission: req.user.permission
        });
    }
);

router.get("/getAllUsers",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        User.find()
            .then(users => {
                if (!users) {
                    return res.status(404).json(errors);
                }
                res.json(users);
            })
            //return res.json({ error: "Password incorrect" });
            .catch(err => res.json({
                user: 'There are no users'
            }));

    });

router.get("/getAll",
    // passport.authenticate("jwt", {
    //     session: false
    // }),
    (req, res) => {
        User.find()
            .then(users => {
                if (!users) {
                    return res.status(404).json(errors);
                }
                res.json(users);
            })
            //return res.json({ error: "Password incorrect" });
            .catch(err => res.json({
                user: 'There are no users'
            }));

    });

router.delete("/delete/:id", passport.authenticate("jwt", {
    session: false
}),
    (req, res) => {
        User.findOneAndDelete({ '_id': req.params.id })
            .then(user => {
                res.json("Deleted Successfully");
            })
            .catch(err =>
                res.status(404).json({
                    nouserfound: "no user found with that id",
                    id: req.params.id
                })
            );
    });


router.get("/getUser/:id",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        console.log(req.param.id)
        User.findOne({ '_id': (req.params.id) })
            .then(user => res.json(user))
            .catch(err =>
                res.status(404).json({
                    nouserfound: "no user found with that id"
                })
            );
    });

router.post("/update/:id", passport.authenticate("jwt", {
    session: false
}),
    (req, res) => {
        User.findById(req.params.id)
            .then(user => {
                user.username = req.body.username;
                user.perm = req.body.permissions;
                user.password = req.body.password

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user
                            .save()
                            .then(user => {
                                res.json('Update complete')
                                    .catch(err =>
                                        res.status(404).json({
                                            nouserfound: "no user found with that id"
                                        })
                                    );
                            });



                    })
                });
            })
    })

module.exports = router;
