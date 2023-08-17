const express = require('express')
const jsonWebToken = require('jsonwebtoken')
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
const connectDB = require('./db/serverDB')
const PORT = process.env.PORT || 5000
const JWT_CODE = process.env.JWT_CODE
require("dotenv").config();
const app = express()
const ObjectId = require('mongoose').Types.ObjectId;
app.use(express.json())
app.use(bodyParser.json())
const mongoose = require("mongoose");
const {User} = require('./db/models/user.js')
const {Offer} = require('./db/models/offer')
connectDB();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jsonWebToken.verify(token, JWT_CODE);
        return decodedToken;
    } catch (error) {
        // console.error('Błąd weryfikacji tokenu JWT:', error);
        return null;
    }
};
app.get("/users", (req, res) => {
    res.json({
        "users": [{
            id: 1,
            teacher: true,
            name: "Monika",
            surname: "Jacek",
            mail: "monika.jacek@gmail.com",
            phone: 606755136,
            subjects: [
                {price: 30, subject: "matematyka"},
                {price: 40, subject: "polski"},
            ],
            about: "Umiem dużo uczyć i jestem zajebistą nauczycielką",
            img: "https://media.istockphoto.com/id/1080232656/photo/female-teacher-pointing-with-finger-at-mathematical-equation-on-chalkboard-in-class.jpg?s=612x612&w=0&k=20&c=F3T62Mo1lj0n0vP44gAPDuv52h2ZrB4ggNAFdGnA2M0=",
        },
            {
                id: 2,
                teacher: true,
                name: "Adam",
                surname: "Matuszek",
                mail: "adam.matuszek@gmail.com",
                phone: 721119082,
                subjects: [
                    {price: 30, subject: "historia"},
                    {price: 40, subject: "polski"},
                ],
                about: "W sumie to huan, dlatego muszę dorabiać na korkach",
                img: "https://dobienews.scuc.txed.net/wp-content/uploads/2018/04/immerqi-img-1189-1459239738.jpg",
            },]

    })
})

app.post('/register', async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.name) {
        res.json({success: false, result: "Send needed params"})
        return
    }
    // const {name, email, password} = req.body;
    // res.json({name,email,password})
    User.create({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10),
    }).then((user) => {
        const token = jsonWebToken.sign({id: user._id, email: user.email}, JWT_CODE)
        res.json({success: true, result: token})
    }).catch(err => {
        res.json({success: false, result: "Podany e-mail jest już zajęty"})
    })
})

app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, result: "Send needed params"})
        return
    }
    // const {email, password} = req.body;
    // res.json({email, password})
    User.findOne({email: req.body.email}).then(user => {
        if (!user) {
            res.json({success: false, result: "Użytkownik o podanym e-mailu nie istnieje"})
        } else {
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                res.json({success: false, result: "Nieprawidłowy e-mail lub hasło"})
            } else {
                const token = jsonWebToken.sign({id: user._id, email: user.email}, JWT_CODE)
                res.json({success: true, result: token})
            }
        }
    }).catch((err) => {
        res.json({success: false, result: "Coś poszło nie tak, spróbuj jeszcze raz"})
    })
})

app.post('/offer', async (req, res) => {
    if (!req.body.price || !req.body.theme || !req.body.token || !req.body.description || !req.body.title || !req.body.city || !req.body.email) {
        res.json({success: false, result: "Missing params"})
        return
    }
    const decodedToken = getUserIdFromToken(req.body.token)
    if (decodedToken) {
        const user = await User.findById(decodedToken.id)
        if (user) {
            Offer.create({
                title: req.body.title,
                theme: req.body.theme,
                description: req.body.description,
                price: req.body.price,
                city: req.body.city,
                email: req.body.email,
                phone: req.body.phone,
                name: user.name,
                userId: user._id
            }).then((offer) => {
                res.json({success: true, result: offer})
            }).catch(err => {
                res.json({success: false, result: "Error occured while creating object"})
            })
        } else {
            res.json({success: false, result: "Invalid user token"})
        }
    } else {
        res.status(500).json({success: false, result: "Invalid user token"})
    }
})
app.get('/offer/:id', async (req, res) => {
    Offer.findOne({_id: req.params.id})
        .then((data) => {
            res.json({offer: data})
        })
        .catch ((err) => {
            res.status(404).json({success: false, result: "No existing object with given offer ID"})
        })
})
app.patch('/offer/:id', async (req, res) => {
    if (!req.body.price || !req.body.theme || !req.body.token || !req.body.description || !req.body.title || !req.body.city || !req.body.email) {
        res.json({success: false, result: "Missing params"})
        return
    }
    const decodedToken = getUserIdFromToken(req.body.token)
    if (decodedToken) {
        const user = await User.findById(decodedToken.id)
        if (user) {
            try {
                let updatedOffer = await Offer.findOneAndUpdate({_id: req.params.id}, {
                    title: req.body.title,
                    theme: req.body.theme,
                    description: req.body.description,
                    price: req.body.price,
                    city: req.body.city,
                    email: req.body.email,
                    phone: req.body.phone,
                }, {new: true})
                if (updatedOffer) {
                    res.json({success: true, offer: updatedOffer})
                } else {
                    res.status(404).json({success: false, result: "No existing object with given offer ID"})
                }
            } catch (e) {
                console.log(e)
                res.status(500).json({success: false, result: "No existing object with given offer ID"})
            }
        } else {
            res.json({success: false, result: "Invalid user token"})
        }
    } else {
        res.status(500).json({success: false, result: "Invalid user token"})
    }

})


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log('server started on port 5000')
    })
})

