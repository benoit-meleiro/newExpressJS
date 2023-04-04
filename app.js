// je crée une variable qui utilise la méthode require pour importer le fichier mock-coworkings.js
const express = require('express')
const morgan = require('morgan')
const serveFavicon = require('serve-favicon')
const app = express()
const port = 3000
// je crée une variable qui utilise la méthode require pour importer le fichier mock-coworkings.js
const coworkings = require('./mock-coworkings')

//* MIDDLEWARE
const myLogger = function (req, res, next) {
  console.log(`URL: ${req.url}`);
  console.log(__dirname + `/favicon.ico`)
  next();
};

app.use(myLogger);
//* MIDDLEWARE FOURNI PAR EXPRESS 
app
  .use(morgan('dev'))
  .use(serveFavicon(__dirname + '/logo.ico'))
  .use(express.json());
console.log(__dirname)

//j'utilise get pour récupérer les données de l'api

//* ON RECUPERE TOUS LES NAME DE LA BASE DE DONNEES EN JSON (SEND EN FORMAT TEXTE)

app.get('/api/coworkings', (req, res) => {
  // je crée une variable qui contient une chaine de caractère vide
    let sentence = ''
     // je crée une boucle qui va parcourir le tableau coworkings
    coworkings.map((data) => {        
        sentence += data.name 
        sentence += ' -- '
    })
    const msg = `eh c'est bon j'ai toutes les infos  !!!`
    res.json({message: msg, data: sentence})
    

    // console.log(sentence);

    
    
//   res.send(`Nombre de coworkings : ${coworkings.length}`);
// //je renvoie la variable sentence
//     res.send(sentence)
//    // renvoie tous les coworkings en json
//     res.json(coworkings)
//     let superficycowo = coworkings.filter(a => a.superficy >= 1800)
//     res.json(superficycowo)
})
 //j'utilise get pour récupérer les données de l'api

 //* ON MET UN PARAMETRE ID (un nombre) DANS L'URL

app.get('/api/coworkings/:id', (req, res) => {

    console.log(req.params.id);
    // je crée une variable qui va chercher dans le tableau coworkings l'id correspondant à l'id de l'url
    const myCoworking = coworkings.find((coworking) => {
      // ! SI ON MET DES ACCOLADES ON DOIT METTRE RETURN !
    // je parse l'id de l'url en int pour pouvoir le comparer à l'id du tableau
    // on peut faire
    // const coworkingFound = coworkings.find(element => element.id == req.params.id)
    // le parseInt sert à convertir une chaine de caractère en nombre
    // le parseInt est nécessaire car l'id de l'url est une chaine de caractère
    return coworking.id === parseInt (req.params.id)})

    // res.send(`Nom du coworking :  ${myCoworking.name} !`);
    const msg = `le coworking n° ${myCoworking.id} a bien été trouvé`
    res.json({message : msg, data: myCoworking})

    })

// *  ON MET UN PARAMETRE DERRIERE UN ?

    app.get('/api/coworkings/', (req, res) => {
      // query récupère tout ce qu'il y a après le ? dans l'url
      const minimum = req.query.capacityMin || 50
      const myCapacityCoWork = coworkings.filter (el => el.capacity > minimum)

      const msg = `la liste est bien retournée`
      res.json({message : msg, data: myCapacityCoWork})
    })

//* appel avec un POST

app.post('/api/coworkings', (req, res) => {
  let newCoworking = req.body;
  coworkings.push(newCoworking);
  res.json(coworkings)

})




//* ON ECOUTE SUR LE PORT 3000

app.listen(port, () => {
  console.log(`elle écoute suur le port ${port}`)
})
