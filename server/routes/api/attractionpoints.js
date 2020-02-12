const express = require("express");
const router = express.Router();
// const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const AttractionPoint = require("../../models/AttractionPoint");
router.get("/test", (req, res) =>
    res.json({
        msg: "attractionpoint Works"
    })
);

router.post(
    "/add",
    /*passport.authenticate("jwt", {
        session: false

    }),*/
    (req, res) => {
        const newAtr = new AttractionPoint(
            {
                id: req.body.id,
                AttractionName: req.body.AttractionName,
                City: req.body.City,
                Type: req.body.Type,
                Price: req.body.Price,
                Priority: req.body.Priority,
                Time: req.body.Time,
                travelDistance: req.body.travelDistance,
                travelTime: req.body.travelTime,
                Description: req.body.Description,
                timeSlots: req.body.timeSlots,

            }
        );

        newAtr.save()
            .then(attractionpoint => res.json(attractionpoint))

    }
);
router.get("/getAllAttraction",
    /*passport.authenticate("jwt", {
        session: false
    }),*/

    (req, res) => {
        AttractionPoint.find()
            .then(attraction => {
                if (!attraction) {
                    return res.status(404).json(errors);
                }
                res.json(attraction);
            })
            .catch(err => res.status(404).json({
                attraction: 'There are no attraction points'
            }));

    });

router.get("/getAttractionPoint/:id",
    /* passport.authenticate("jwt", {
         session: false
     }),*/
    (req, res) => {
        console.log(req.param.id)
        AttractionPoint.findOne({ '_id': (req.params.id) })
            .then(attraction => res.json(attraction))
            .catch(err =>
                res.status(404).json({
                    noattractionfound: "no attraction found with that id"
                })
            );
    });


router.get("/getDealer/:name", passport.authenticate("jwt", {
    session: false
}),
    (req, res) => {
        Dealer.findOne({ name: req.params.name })
            .then(dealer => res.json(dealer))
            .catch(err =>
                res.status(404).json({
                    nodealerfound: "no dealer found with that id"
                })
            );
    })


router.post("/edit/:id",

    /*passport.authenticate("jwt", {
        session: false
    }),*/
    (req, res) => {
        let id = req.params.id;
        AttractionPoint.findById(id)
            .then(attraction => res.json(attraction))
            .catch(err =>
                res.status(404).json({
                    noattractionfound: "no attraction found with that id"
                }));
    })

router.post("/update/:id",
    /* passport.authenticate("jwt", {
        session: false
    }),*/

    (req, res) => {
        AttractionPoint.findById(req.params.id)
            .then(attraction => {

                attraction.id = req.body.id,
                    attraction.AttractionName = req.body.AttractionName,
                    attraction.City = req.body.City,
                    attraction.Type = req.body.Type,
                    attraction.Price = req.body.Price,
                    attraction.Priority = req.body.Priority,
                    attraction.Time = req.body.Time,
                    attraction.travelDistance = req.body.travelDistance,
                    attraction.travelTime = req.body.travelTime,
                    attraction.Description = req.body.Description,
                    attraction.timeSlots = req.body.timeSlots,


                    attraction.save()
                        .then(attraction => {
                            res.json('Update complete');

                        })
                        .catch(err =>
                            res.status(404).json({
                                noattractionfound: "no attractionPoint found with that id"
                            }));


            })
    });
router.delete("/delete/:id",

    /*passport.authenticate("jwt", {
        session: false
    }),*/
    (req, res) => {
        AttractionPoint.findOneAndDelete({ '_id': req.params.id })
            .then(attraction => {
                res.json("Deleted Successfully");
                //return res.json({ error: "username already exists" });
            })
            .catch(err =>
                res.json({
                    noattractionfound: "no attractionPoint found with that id"
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