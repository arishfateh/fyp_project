const express = require("express");
const router = express.Router();
// const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const Hotel = require("../../models/Itinerary");

router.get("/test", (req, res) =>
    res.json({
        msg: "itinerary Works"
    })
);

router.post(
    "/add",
    /*passport.authenticate("jwt", {
        session: false

    }),*/
    (req, res) => {
        const cit = new Itinerary(
            {



                id: req.body.id,
                NoOfDays: req.body.NoOfDays,
                Destination: req.body.Destination,
                PriceBracket: req.body.PriceBracket,
                GroupType: req.body.GroupType,
                NoOfPeople: req.body.NoOfPeople,
                TotalCost: req.body.TotalCost,
                todo: req.body.todo,
                scores: req.body.scores,



            }
        );

        cit.save()
            .then(cit => res.json(cit))

    }
);
router.get("/getAllItinerary",
    /*   
    passport.authenticate("jwt", {
            session: false
        }),
        */

    (req, res) => {
        console.log("in get")
        Itinerary.find()
            .then(cit => {
                if (!cit) {
                    return res.status(404).json(errors);
                }
                console.log(cit);
                res.json(cit);
            })
            .catch(err => res.status(404).json({
                cit: 'There is no itinerary'

            }));

    });


// router.get("/getTransport/:id",
//     /*passport.authenticate("jwt", {
//         session: false
//     }),*/
//     (req, res) => {
//         console.log(req.param.id)
//         Transport.findOne({ '_id': (req.params.id) })
//             .then(cit => res.json(cit))
//             .catch(err =>
//                 res.status(404).json({
//                     nocityfound: "no transport found with that id"
//                 })
//             );
//     });


// router.post("/edit/:id",
//     /*passport.authenticate("jwt", {
//         session: false
//     }),*/
//     (req, res) => {
//         let id = req.params.id;
//         Transport.findById(id)
//             .then(cit => res.json(cit))
//             .catch(err =>
//                 res.status(404).json({
//                     notransportfound: "no tansport found with that id"
//                 }));
//     })

// router.post("/update/:id",
//     /*passport.authenticate("jwt", {
//         session: false
//     }),*/
//     (req, res) => {
//         Transport.findById(req.params.id)
//             .then(cit => {

//                 cit.id = req.body.id,
//                     cit.NoOfVehicles = req.body.NoOfVehicles,
//                     cit.VendorName = req.body.VendorName,
//                     cit.VendorPhoneNo = req.body.VendorPhoneNo,
//                     cit.TransportType = req.body.TransportType,
//                     cit.City = req.body.City,

//                     cit.save()
//                         .then(cit => {
//                             res.json('Update complete');

//                         })
//                         .catch(err =>
//                             res.status(404).json({
//                                 notransportfound: "no transport found with that id"
//                             }));


//             })
//     });
// router.delete("/delete/:id",
//     /*passport.authenticate("jwt", {
//         session: false
//     }),*/
//     (req, res) => {
//         Transport.findOneAndDelete({ '_id': req.params.id })
//             .then(city => {
//                 res.json("Deleted Successfully");
//                 //return res.json({ error: "username already exists" });
//             })
//             .catch(err =>
//                 res.json({
//                     nocityfound: "no transport found with that id"
//                     //id: req.params.id
//                 })
//             );
//     });

//     /*
// router.delete('/delete/:id', (req, res) => {
//     Dealer.findByIdAndRemove({ _id: req.params.id }, function (err, dealer) {
//         if (err) res.json(err);
//         else res.json('Successfully removed');

//     })
// });
// */
module.exports = router;