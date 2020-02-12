const express = require("express");
const router = express.Router();
// const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const routes = require("../../models/Routes");
router.get("/test", (req, res) =>
    res.json({
        msg: "routes Works"
    })
);

router.post(
    "/add",
    /*passport.authenticate("jwt", {
        session: false

    }),*/
    (req, res) => {
        const newroute = new routes(
            {


                id: req.body.id,
                StartPoint: req.body.StartPoint,
                EndPoint: req.body.EndPoint,
                isAvailable: req.body.isAvailable,
                roadConditon: req.body.roadConditon,
                Priority: req.body.Priority,
                Time: req.body.Time,
                Distance: req.body.Distance,


            }
        );

        newroute.save()
            .then(route => res.json(route))

    }
);
router.get("/getAllRoute",
    /*passport.authenticate("jwt", {
        session: false
    }),*/

    (req, res) => {
        routes.find()
            .then(rout => {
                if (!rout) {
                    return res.status(404).json(errors);
                }
                res.json(rout);
            })
            .catch(err => res.status(404).json({
                rout: 'There are no routes '
            }));

    });

router.get("/getRoute/:id",
    /* passport.authenticate("jwt", {
         session: false
     }),*/
    (req, res) => {
        console.log(req.param.id)
        routes.findOne({ '_id': (req.params.id) })
            .then(rout => res.json(rout))
            .catch(err =>
                res.status(404).json({
                    noroutefound: "no route found with that id"
                })
            );
    });





router.post("/update/:id",
    /* passport.authenticate("jwt", {
        session: false
    }),*/

    (req, res) => {
        routes.findById(req.params.id)
            .then(rout => {


                rout.id = req.body.id,
                    rout.StartPoint = req.body.StartPoint,
                    rout.EndPoint = req.body.EndPoint,
                    rout.isAvailable = req.body.isAvailable,
                    rout.roadConditon = req.body.roadConditon,
                    rout.Priority = req.body.Priority,
                    rout.Time = req.body.Time,
                    rout.Distance = req.body.Distance,



                    rout.save()
                        .then(rout => {
                            res.json('Update complete');

                        })
                        .catch(err =>
                            res.status(404).json({
                                noroutefound: "no route found with that id"
                            }));


            })
    });
router.delete("/delete/:id",

    /*passport.authenticate("jwt", {
        session: false
    }),*/
    (req, res) => {
        routes.findOneAndDelete({ '_id': req.params.id })
            .then(rout => {
                res.json("Deleted Successfully");
                //return res.json({ error: "username already exists" });
            })
            .catch(err =>
                res.json({
                    noroutefound: "no route found with that id"
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