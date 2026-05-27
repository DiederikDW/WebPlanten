//node server.js om te starten

import express from 'express'; // voor import export syntax package.json type veranderd naar module
import cors from 'cors'; //cors is middelman om toestemming te geven aan vite om data op te vragen(poort)
import fs from 'fs'; // ingebouwde module om bestanden te lezen en schrijven

const app = express();
const port = 3000;
const dataBestand = './planten.json'; // hier gaan we de data opslaan

app.use(cors());
app.use(express.json());

// controleer of het bestand al bestaat bij het opstarten.
// als het niet bestaat maak het aan met de standaard lijst.
if (!fs.existsSync(dataBestand)) {
    const standaardPlanten = [
        {id: 1, naam: "Monstera", extra: "Gatenplant", water: "1x per week", categorie: "kamer"},
        {id: 2, naam: "Pilea", extra: "Pannenkoekenplant", water: "2x per week", categorie: "kamer"}
    ];
    // schrijf de array als JSON tekst naar het bestand
    fs.writeFileSync(dataBestand, JSON.stringify(standaardPlanten, null, 2));
}

// get route haal de lijst uit het bestand en stuur naar de frontend
app.get('/api/planten', (req, res) => {
    console.log("Lijst met planten opgevraagd");
    // lees de tekst uit het bestand
    const data = fs.readFileSync(dataBestand, 'utf8');
    // zet de tekst om naar een JavaScript array en stuur terug
    res.json(JSON.parse(data));
});

// post route voeg nieuwe plant toe aan het bestand
app.post('/api/planten', (req, res) => {
    const nieuwePlant = req.body;
    
    // lees de huidige lijst uit het bestand
    const data = fs.readFileSync(dataBestand, 'utf8');
    let plantenLijst = JSON.parse(data);

    //geef de nieuwe plant een uniek ID op basis van het laatste item in de array
    nieuwePlant.id = plantenLijst.length > 0 ? plantenLijst[plantenLijst.length - 1].id + 1 : 1;
    
    // voeg de nieuwe plant toe aan de lijst
    plantenLijst.push(nieuwePlant);

    // overschrijf het bestand met de nieuwe, bijgewerkte lijst
    fs.writeFileSync(dataBestand, JSON.stringify(plantenLijst, null, 2));

    console.log("Nieuwe plant toegevoegd:", nieuwePlant);
    res.json({message: "Plant is toegevoegd"});
});

// server starten
app.listen(port, () => {

    console.log(`Plantenserver draait op http://localhost:${port}`);
});