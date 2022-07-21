// const express = require("express");
// const router = express.Router();
// const Office = require("../models/Office");


// router.post("/", async (req, res) => {
//     try {
//         const office = await Office.create(req.body);
//         res.status(201).send(office);
//     }
//     catch (err) {
//         res.status(500).send(err);
//     }
// }
// );



// //create route to get all offices with their desks
// router.get("/", async (req, res) => {
//     try {
//         const offices = await Office.find({});
//         res.status(200).send(offices);
//     }
//     catch (err) {
//         res.status(500).send(err);
//     }
// }
// );






// router.get("/", async (req, res) => {
//     try {   
//         const offices = await Office.find({});
//         res.status(200).send(offices);
//     }
//     catch (err) {
//         res.status(500).send(err);
//     }
// }
// );

// router.get( "/", (req, res) => {
//     console.log("req", req);
//         Office.findOne({OfficeId: req.body.OfficeId})
//         .populate("desks")
//         .exec((err, offices) => {    
//             console.log(offices);
//             res.status(200).send(offices);
//         })
// });


// const offices = await Office.find({}).populate("desks");
// res.json(offices);

// module.exports = router;