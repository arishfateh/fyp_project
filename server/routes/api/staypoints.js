const express = require("express");
const router = express.Router();
// const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const StayPoint = require("../../models/StayPoint");

router.get("/test", (req, res) =>
    res.json({
        msg: "staypoint Works"
    })
);

router.post(
    "/add",
    /*passport.authenticate("jwt", {
        session: false

    }),*/
    (req, res) => {
        const newAtr = new StayPoint(
            {
                id: req.body.id,
                DepartureCity: req.body.DepartureCity,
                DestinationCity: req.body.DestinationCity,
                StopOverCity: req.body.StopOverCity,

                Priority: req.body.Priority,

            }
        );

        newAtr.save()
            .then(staypoint => res.json(staypoint))

    }
);
router.get("/getAllStayPoints",
    /*passport.authenticate("jwt", {
        session: false
    }),*/

    (req, res) => {
        StayPoint.find()
            .then(stay => {
                if (!stay) {
                    return res.status(404).json(errors);
                }
                res.json(stay);
            })
            .catch(err => res.status(404).json({
                stay: 'There are no stay points'
            }));

    });

router.get("/getStayPoint/:id",
    /* passport.authenticate("jwt", {
         session: false
     }),*/
    (req, res) => {
        console.log(req.param.id)
        StayPoint.findOne({ '_id': (req.params.id) })
            .then(stay => res.json(stay))
            .catch(err =>
                res.status(404).json({
                    nostayfound: "no stay found with that id"
                })
            );
    });



router.post("/edit/:id",

    /*passport.authenticate("jwt", {
        session: false
    }),*/
    (req, res) => {
        let id = req.params.id;
        StayPoint.findById(id)
            .then(stay => res.json(stay))
            .catch(err =>
                res.status(404).json({
                    nostayfound: "no stay found with that id"
                }));
    })

router.post("/update/:id",
    /* passport.authenticate("jwt", {
        session: false
    }),*/

    (req, res) => {
        StayPoint.findById(req.params.id)
            .then(stay => {

                stay.id = req.body.id,
                    stay.DepartureCity = req.body.DepartureCity,
                    stay.DestinationCity = req.body.DestinationCity,
                    stay.StopOverCity = req.body.StopOverCity,

                    stay.Priority = req.body.Priority,



                    stay.save()
                        .then(stay => {
                            res.json('Update complete');

                        })
                        .catch(err =>
                            res.status(404).json({
                                nostayfound: "no staypoint found with that id"
                            }));


            })
    });
router.delete("/delete/:id",

    /*passport.authenticate("jwt", {
        session: false
    }),*/
    (req, res) => {
        StayPoint.findOneAndDelete({ '_id': req.params.id })
            .then(stay => {
                res.json("Deleted Successfully");
                //return res.json({ error: "username already exists" });
            })
            .catch(err =>
                res.json({
                    nostayfound: "no stayPoint found with that id"
                    //id: req.params.id
                })
            );
    });
/*
router.delete('/delete/:id', (req, res) => {
    Dealer.findByIdAndRemove({ _id: req.params.id }, function (err, dealer) {
        if (err) res.json(err);
        else res.json('Successfully removed');

    })
});
*/
module.exports = router;