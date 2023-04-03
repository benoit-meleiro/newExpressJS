// je crée une variable qui utilise la méthode require pour importer le fichier mock-coworkings.js
const express = require('express')
const app = express()
const port = 3000

const coworkings = require('./mock-coworkings')


app.get('/api/coworkings', (req, res) => {
 
    let sentence = ''
    coworkings.map((data) => {        
        sentence += data.name 
        sentence += ' - '        
    })

    console.log(sentence);
    
//   res.send(`Nombre de coworkings : ${coworkings.length}`);
    res.send(sentence)
})
app.get('/api/coworkings/:id', (req, res) => {

    console.log(req.params.id);
    let myCoworking = coworkings.find((coworking) => {return coworking.id === parseInt (req.params.id)})
    res.send(`Nom du coworking :  ${myCoworking.name} !`)
    })
  


app.listen(port, () => {
  console.log(`elle écoute suur le port ${port}`)
})
