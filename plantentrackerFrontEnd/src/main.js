//npm run dev om te starten
// importeer beide klassen
import { Kamerplant, Tuinplant } from '../plant.js';

// zoek de twee containers in de HTML
const kamerContainer = document.getElementById('kamerContainer');
const tuinContainer = document.getElementById('tuinContainer');
const formulier = document.getElementById('plantenFormulier');

// zoek het keuzemenu en het invoerveld in de HTML
const categorieSelect = document.getElementById('inputCategorie');
const extraInput = document.getElementById('inputExtra');

// stel de standaard tekst in voor als de pagina laad Kamerplant is standaard geselecteerd
extraInput.placeholder = "Soort (bijv. Gatenplant)";

//functie
async function haalPlantenOp() {
  try {
    const response = await fetch('http://localhost:3000/api/planten');
    const plantenData = await response.json();

    // maak beide containers leeg voordat we ze vullen
    kamerContainer.innerHTML = '';
    tuinContainer.innerHTML = '';

    plantenData.forEach(plantInfo => {
      // check of het een tuinplant is
      if (plantInfo.categorie === 'tuin') {
        const nieuweTuinplant = new Tuinplant(
          plantInfo.naam, 
          plantInfo.water, 
          plantInfo.extra // tuinplant is snoeien per jaar
        );
        tuinContainer.innerHTML += nieuweTuinplant.maakHTML();
      
      // Als het kamerplant is
      } else {
        const nieuweKamerplant = new Kamerplant(
          plantInfo.naam, 
          plantInfo.water, 
          plantInfo.extra 
        );
        kamerContainer.innerHTML += nieuweKamerplant.maakHTML();
      }
    });

  } catch(error) {
    console.error("fout bij het ophalen van de planten", error);
    kamerContainer.innerHTML = `<p style="color:red;">Kan de planten niet laden. Draait express?</p>`;
  }
}

//events

// luister naar een change in het keuzemenu
categorieSelect.addEventListener('change', () => {
  // controleer welke waarde nu is geselecteerd
  if (categorieSelect.value === 'tuin') {
    // verander de tijdelijke tekst in het vak
    extraInput.placeholder = "Snoeien per jaar";
  } else {
    // verander het weer terug als kamer is gekozen
    extraInput.placeholder = "Soort (bijv. Gatenplant)";
  }
});

formulier.addEventListener('submit', async (event) => {
  event.preventDefault(); // zorgt ervoor dat je pagina niet herlaad ander kan dit code/api call onderbreken

  // haal waardes op en de categorie
  const nieuwePlantData = {
    categorie: document.getElementById('inputCategorie').value,
    naam: document.getElementById('inputNaam').value,
    extra: document.getElementById('inputExtra').value, // Dit kan soort of snoeien zijn
    water: document.getElementById('inputWater').value
  };

  try {
    await fetch('http://localhost:3000/api/planten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nieuwePlantData)
    });
    //formulier resetten
    formulier.reset();
    //reset zet categorie op kamerplaant dus hier terug placeholder naar soort zetten
    extraInput.placeholder = "Soort (bijv. Gatenplant)";
    //planten ophalen
    haalPlantenOp();
  } catch(error) {
    console.error("Fout bij het toevoegen van de plant:", error);
  }
});

// roep aan als pagina laadt
haalPlantenOp();