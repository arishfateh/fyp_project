const express = require("express");
const router = express.Router();
// const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const Hotel = require("../../models/Hotel");

router.get("/test", (req, res) =>
    res.json({
        msg: "hotel Works"
    })
);

router.post(
    "/add",
    /*passport.authenticate("jwt", {
        session: false

    }),*/

    (req, res) => {
        const cit = new Hotel(
            {

                id: req.body.id,
                City: req.body.City,
                HotelName: req.body.HotelName,
                NoOfRooms: req.body.NoOfRooms,
                VendorName: req.body.VendorName,
                VendorPhoneNo: req.body.VendorPhoneNo,
                roomTypes: req.body.roomTypes,
                HotelServices: req.body.HotelServices,
            }
        );

        cit.save()
            .then(cit => res.json(cit))

    }
);
router.get("/getAllHotel",
    /*   
    passport.authenticate("jwt", {
            session: false
        }),
        */
    (req, res) => {
        Hotel.find()
            .then(cit => {
                if (!cit) {
                    return res.status(404).json(errors);
                }
                res.json(cit);
            })
            .catch(err => res.status(404).json({
                cit: 'There is no hotel'
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


router.post("/edit/:id",
    /*passport.authenticate("jwt", {
        session: false
    }),*/
    (req, res) => {
        let id = req.params.id;
        Hotel.findById(id)
            .then(cit => res.json(cit))
            .catch(err =>
                res.status(404).json({
                    nohotelfound: "no hotel found with that id"
                }));
    })

router.post("/update/:id",
    /*passport.authenticate("jwt", {
        session: false
    }),*/
    (req, res) => {
        Hotel.findById(req.params.id)
            .then(cit => {




                cit.id = req.body.id,
                    cit.City = req.body.City,
                    cit.HotelName = req.body.HotelName,
                    cit.NoOfRooms = req.body.NoOfRooms,
                    cit.VendorName = req.body.VendorName,
                    cit.VendorPhoneNo = req.body.VendorPhoneNo,
                    cit.roomTypes = req.body.roomTypes,
                    cit.HotelServices = req.body.HotelServices,

                    cit.save()
                        .then(cit => {
                            res.json('Update complete');

                        })
                        .catch(err =>
                            res.status(404).json({
                                nohotelfound: "no hotel found with that id"
                            }));


            })
    });
router.delete("/delete/:id",
    /*passport.authenticate("jwt", {
        session: false
    }),*/
    (req, res) => {
        Hotel.findOneAndDelete({ '_id': req.params.id })
            .then(city => {
                res.json("Deleted Successfully");
                //return res.json({ error: "username already exists" });
            })
            .catch(err =>
                res.json({
                    nohotelfound: "no hotel found with that id"
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