const express = require("express");
const router = express.Router();
// const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const Dealer = require("../../models/Dealer");
router.get("/test", (req, res) =>
    res.json({
        msg: "dealer Works"
    })
);

router.post(
    "/add",
    passport.authenticate("jwt", {
        session: false

    }),
    (req, res) => {
        const newDealer = new Dealer(
            {

                id: req.body.id,
                name: req.body.name,
                contact_no: req.body.contact_no,
                contact_no2: req.body.contact_no2,
                contact_no3: req.body.contact_no3,
                contact_no4: req.body.contact_no4,
                contact_no5: req.body.contact_no5
            }
        );

        newDealer.save()
            .then(dealer => res.json(dealer))

    }
);
router.get("/getAllDealers",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        Dealer.find()
            .then(dealers => {
                if (!dealers) {
                    return res.status(404).json(errors);
                }
                res.json(dealers);
            })
            .catch(err => res.status(404).json({
                dealer: 'There are no dealers'
            }));

    });

router.get("/getDealer/:id",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        console.log(req.param.id)
        Dealer.findOne({ '_id': (req.params.id) })
            .then(dealer => res.json(dealer))
            .catch(err =>
                res.status(404).json({
                    nodealerfound: "no dealer found with that id"
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


router.post("/edit/:id", passport.authenticate("jwt", {
    session: false
}),
    (req, res) => {
        let id = req.params.id;
        Dealer.findById(id)
            .then(dealer => res.json(dealer))
            .catch(err =>
                res.status(404).json({
                    nodealerfound: "no dealer found with that id"
                }));
    })

router.post("/update/:id", passport.authenticate("jwt", {
    session: false
}),
    (req, res) => {
        Dealer.findById(req.params.id)
            .then(dealer => {
                dealer.name = req.body.name;
                dealer.contact_no = req.body.contact_no;
                dealer.contact_no2 = req.body.contact_no2;
                dealer.contact_no3 = req.body.contact_no3;
                dealer.contact_no4 = req.body.contact_no4;
                dealer.contact_no5 = req.body.contact_no5;

                dealer.save()
                    .then(dealer => {
                        res.json('Update complete');

                    })
                    .catch(err =>
                        res.status(404).json({
                            nodealerfound: "no dealer found with that id"
                        }));


            })
    });
router.delete("/delete/:id", passport.authenticate("jwt", {
    session: false
}),
    (req, res) => {
        Dealer.findOneAndDelete({ '_id': req.params.id })
            .then(dealer => {
                res.json("Deleted Successfully");
                //return res.json({ error: "username already exists" });
            })
            .catch(err =>
                res.json({
                    nodealerfound: "no dealer found with that id"
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