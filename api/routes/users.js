const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const secret = require("./secret.json");
const ReservationsSchema = require("../models/Reservations")

router.post("/register", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((users) => {
      if (users.length >= 1) {
        return res.status(409).json({
          message: "El mail ya existe",
        });
      } else {
        bcrypt.hash(req.body.password, 10, function(err, hash){
            if (err) {key
                return res.status(500).json({
                    error: err
                });
            } else {
            const user = new User({
                name: req.body.name,
                surname: req.body.surname,
                position: req.body.position,
                mainOffice: req.body.mainOffice,
                email: req.body.email,
                admin: req.body.admin,
                password: hash,
            })
            user
              .save()
                .then((result) => {
                    res.status(201).json({
                        message: "Usuario creado correctamente",
                        user: result,
                    });
                }).catch((err) => res.status(500).json({ error: err }));
          }
        });
      }
    });
});


router.post("/login", (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(users => {
            if (users.length < 1) {
                return res.status(401).json({
                    message: "Autentificación fallida"
                });
            }
            bcrypt.compare(req.body.password, users[0].password, (err, isEqual) => {
                if (err) return res.status(401).json({message: "Autenticación fallida"});
                if (isEqual) {
                    const token = jwt.sign(
                        {
                            email: users[0].email,
                            userId: users[0]._id,
                        },
                        secret.key,
                        {
                            expiresIn: "1h",
                        }
                    );

                    let userToSend = users[0]
                    userToSend = {
                      email: userToSend.email,
                      favorites: userToSend.favorites,
                      friends: userToSend.friends,
                      imgUrl: userToSend.imgUrl,
                      mainOffice: userToSend.mainOffice,
                      name: userToSend.name,
                      surname: userToSend.surname,
                      position: userToSend.position,
                      reservations: userToSend.reservations,
                      _id: userToSend._id,
                    }
                    if(users[0].admin) userToSend = {...userToSend,admin:true} 
                    return res.status(200).json({
                        message: "Autenticación correcta",
                        token: token,
                        user: userToSend
                    });
                }
                return res.status(401).json({
                    message: "Autenticación fallida",
                });
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        }
);
});


router.post("/foto", (req, res) => {
  User
} )



router.get("/", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users).status(200);
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send(user).status(200);
    })
    .catch((err) => console.log(err));
});

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
      res.send(user).status(200);
    })
    .catch((err) => console.log(err));
});

router.post("/logout", function (req, res, next) {
  res.send("Logout");
});



module.exports = router;