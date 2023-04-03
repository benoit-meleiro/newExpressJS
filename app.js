// je crée une variable qui utilise la méthode require pour importer le fichier mock-coworkings.js
const express = require('express')
const app = express()
const port = 3000
// je crée une variable qui utilise la méthode require pour importer le fichier mock-coworkings.js
const coworkings = require('./mock-coworkings')

// j'utilise get pour récupérer les données de l'api
app.get('/api/coworkings', (req, res) => {
  // je crée une variable qui contient une chaine de caractère vide
    let sentence = ''
     // je crée une boucle qui va parcourir le tableau coworkings
    coworkings.map((data) => {        
        sentence += data.name 
        sentence += ' - '        
    })

    console.log(sentence);
    
//   res.send(`Nombre de coworkings : ${coworkings.length}`);
// je renvoie la variable sentence
    res.send(sentence)
})
//  j'utilise get pour récupérer les données de l'api
app.get('/api/coworkings/:id', (req, res) => {

    console.log(req.params.id);
    // je crée une variable qui va chercher dans le tableau coworkings l'id correspondant à l'id de l'url
    let myCoworking = coworkings.find((coworking) => {
         // je parse l'id de l'url en int pour pouvoir le comparer à l'id du tableau
    // le parseInt sert à convertir une chaine de caractère en nombre
    // le parseInt est nécessaire car l'id de l'url est une chaine de caractère
    return coworking.id === parseInt (req.params.id)})

    res.send(`Nom du coworking :  ${myCoworking.name} !`)
    })
  

app.listen(port, () => {
  console.log(`elle écoute suur le port ${port}`)
})
