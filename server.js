const express = require('express')
const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/users", (req, res) => {
    res.json({ "users": [    {
            id: 1,
            teacher: true,
            name: "Monika",
            surname: "Jacek",
            mail: "monika.jacek@gmail.com",
            phone: 606755136,
            subjects: [
                { price: 30, subject: "matematyka" },
                { price: 40, subject: "polski" },
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
                    { price: 30, subject: "historia" },
                    { price: 40, subject: "polski" },
                ],
                about: "W sumie to huan, dlatego muszę dorabiać na korkach",
                img: "https://dobienews.scuc.txed.net/wp-content/uploads/2018/04/immerqi-img-1189-1459239738.jpg",
            },]

    })
})

app.post('/register', (req, res) =>{
    const {name, email, password} = req.body;
    res.json({name,email,password})
})
app.get('/test', (req, res) =>{
    res.json("test")
})

app.listen(5000, () => {console.log('server started on port 5000')})
