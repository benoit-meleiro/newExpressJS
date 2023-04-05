const express = require('express')
const morgan = require('morgan')
const serveFavicon = require('serve-favicon')
const { Sequelize, DataTypes } = require('sequelize');
const CoworkingModel = require('./models/coworking')
const app = express()
const port = 3000

const sequelize = new Sequelize('lapiscine_coworking', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

const Coworking = CoworkingModel(sequelize, DataTypes)

sequelize.sync({force : true})
    .then(() => {
        Coworking.create({
        name: "Locomotiv'",
        price: { "hour": null, "day": 40, "month": 300 },
        address: { "number": "4", "street": "cours de l'Intendance", "postCode": 33000, "city": "Bordeaux" },
        picture: "",
        superficy: 600,
        capacity: 136,
        })
            .then(() => {console.log('la base est bien synchro') })
            .catch(error => console.log('il manque'));
      })
    



sequelize.authenticate()
 .then(() => { console.log('INFO - Data connected.') })
 .catch(err => console.log('ERROR - Unable to connect to the database:', err));

app
    .use(morgan('dev'))
    .use(serveFavicon(__dirname + '/logo.ico'))
    .use(express.json())

const coworkingRouter = require('./routes/coworkingRoutes')

app.use('/api/coworkings', coworkingRouter)

app.listen(port, () => {
    console.log(`L'app sur le port ${port}`)
})