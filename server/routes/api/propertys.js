const express = require("express");
const router = express.Router();
// const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const property = require("../../models/property");
router.get("/test", (req, res) =>
    res.json({
        msg: "property Works"
    })
);
router.post(
    "/add",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const newproperty = new Property(
            {
                title: req.body.title,
                PropertyCatagory: req.body.PropertyCatagory,
                BuyRent: req.body.BuyRent,
                description: req.body.description,
                SocietyName: req.body.SocietyName,
                propertyName: req.body.propertyName,
                consultantname: req.body.consultantname,
                ownername: req.body.ownername,
                address: req.body.address,
                society: req.body.society,
                propertyType: req.body.propertyType,
                imgsrcs: req.body.imgsrcs,
                tags: req.body.tags

            }
        );

        newproperty.save()
            .then(property => res.json(property))

    }
);
router.get("/getAllpropertys", passport.authenticate("jwt", {
    session: false
}),
    (req, res) => {
        Property.find()
            .then(propertys => {
                if (!propertys) {
                    return res.status(404).json(errors);
                }
                res.json(propertys);
            })
            .catch(err => res.status(404).json({
                property: 'There are no propertys'
            }));

    });

router.get("/getproperty/:id", passport.authenticate("jwt", {
    session: false
}),
    (req, res) => {
        Property.findById(req.params.id)
            .then(property => res.json(property))
            .catch(err =>
                res.status(404).json({
                    nopropertyfound: "no property found with that id"
                })
            );
    });


router.get("/getproperty/:name", passport.authenticate("jwt", {
    session: false
}),
    (req, res) => {
        property.findOne({ name: req.params.name })
            .then(property => res.json(property))
            .catch(err =>
                res.status(404).json({
                    nopropertyfound: "no property found with that id"
                })
            );
    })


router.post("/edit/:id", passport.authenticate("jwt", {
    session: false
}),
    (req, res) => {
        let id = req.params.id;
        property.findById(id)
            .then(property => res.json(property))
            .catch(err =>
                res.status(404).json({
                    nopropertyfound: "no property found with that id"
                }));
    })

router.post("/update/:id", passport.authenticate("jwt", {
    session: false
}),
    (req, res) => {
        Property.findById(req.params.id)
            .then(property => {
                property.title = req.body.title;
                property.PropertyCatagory = req.body.PropertyCatagory;
                property.BuyRent = req.body.BuyRent;
                property.description = req.body.description;
                property.SocietyName = req.body.SocietyName;
                property.propertyName = req.body.propertyName;
                property.society = req.body.society;
                property.propertyType = req.body.propertyType;
                property.imgsrcs = req.body.imgsrcs;
                property.tags = req.body.tags;
                property.consultantname = req.body.consultantname;
                property.ownername = req.body.ownername;
                property.address = req.body.address;



                property.save()
                    .then(property => {
                        res.json('Update complete');

                    })
                    .catch(err =>
                        res.status(404).json({
                            nopropertyfound: "no property found with that id"
                        }));


            })
    });
router.delete("/delete/:id", passport.authenticate("jwt", {
    session: false
}),
    (req, res) => {
        Property.findOneAndDelete({ '_id': req.params.id })
            .then(property => {
                res.json("Deleted Successfully");
            })
            .catch(err =>
                res.status(404).json({
                    nopropertyfound: "no Property found with that id",
                    id: req.params.id
                })
            );
    });
module.exports = router;