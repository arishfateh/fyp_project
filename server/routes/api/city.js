const express = require("express");
const router = express.Router();
// const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const City = require("../../models/City");
router.get("/test", (req, res) =>
    res.json({
        msg: "city Works"
    })
);

router.post(
    "/add",
    /*passport.authenticate("jwt", {
        session: false

    }),*/
    (req, res) => {
        const cit = new City(
            {
                id: req.body.id,
                CityName: req.body.CityName,
                StayPriority: req.body.StayPriority,
                Latitude: req.body.Latitude,
                Longitude: req.body.Longitude,
                MaximumStop: req.body.MaximumStop,


            }
        );

        cit.save()
            .then(cit => res.json(cit))

    }
);
router.get("/getAllCity",
    /*   
    passport.authenticate("jwt", {
            session: false
        }),
        */
    (req, res) => {
        City.find()
            .then(cit => {
                if (!cit) {
                    return res.status(404).json(errors);
                }
                res.json(cit);
            })
            .catch(err => res.status(404).json({
                cit: 'There are no cities'
            }));

    });

router.get("/getCity/:id",
    /*passport.authenticate("jwt", {
        session: false
    }),*/
    (req, res) => {
        console.log(req.param.id)
        City.findOne({ '_id': (req.params.id) })
            .then(cit => res.json(cit))
            .catch(err =>
                res.status(404).json({
                    nocityfound: "no city found with that id"
                })
            );
    });


router.post("/edit/:id",
    /*passport.authenticate("jwt", {
        session: false
    }),*/
    (req, res) => {
        let id = req.params.id;
        City.findById(id)
            .then(cit => res.json(cit))
            .catch(err =>
                res.status(404).json({
                    nocityfound: "no City found with that id"
                }));
    })

router.post("/update/:id",
    /*passport.authenticate("jwt", {
        session: false
    }),*/
    (req, res) => {
        City.findById(req.params.id)
            .then(cit => {

                cit.id = req.body.id,
                    cit.CityName = req.body.CityName,
                    cit.StayPriority = req.body.StayPriority,
                    cit.Latitude = req.body.Latitude,
                    cit.Longitude = req.body.Longitude,
                    cit.MaximumStop = req.body.MaximumStop,


                    cit.save()
                        .then(cit => {
                            res.json('Update complete');

                        })
                        .catch(err =>
                            res.status(404).json({
                                nocityfound: "no city found with that id"
                            }));


            })
    });
router.delete("/delete/:id",
    /*passport.authenticate("jwt", {
        session: false
    }),*/
    (req, res) => {
        City.findOneAndDelete({ '_id': req.params.id })
            .then(city => {
                res.json("Deleted Successfully");
                //return res.json({ error: "username already exists" });
            })
            .catch(err =>
                res.json({
                    nocityfound: "no city found with that id"
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