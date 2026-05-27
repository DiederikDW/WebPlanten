//basis class export omdat we de class in main.js ook willen gebruiken

class Plant{
    constructor(naam, water){
        this.naam = naam;
        this.water = water;
    }
}

//subklasse(erft van plant)
export class Kamerplant extends Plant{
    constructor(naam,water,soort){
        //super roept constructor van plant aan
        super(naam,water);
        this.soort = soort;
    }
    //dynamische html aanmaken
    maakHTML(){
        //`backticks` om makkelijk variabelen in html te zetten
        return `
        <div class="plant" style="border: 2px solid red; padding: 10px; margin-bottom: 10px;">
        <h2>${this.naam}</h2>
        <p><strong>Soort:</strong> ${this.soort}</p>
        <p><strong>Water:</strong> ${this.water}</p>
        </div>
        `;
    }
}
export class Tuinplant extends Plant {
    constructor(naam, water, snoeien) {
        super(naam, water);
        this.snoeien = snoeien; // aantal keer snoeien per jaar
    }
    maakHTML() {
        // tuinplanten krijgen een groene rand in plaats van rood
        return `
        <div class="plant" style="border: 2px solid green; padding: 10px; margin-bottom: 10px;">
            <h3>${this.naam}</h3>
            <p><strong>Aantal keer snoeien per jaar:</strong> ${this.snoeien}</p>
            <p><strong>Water:</strong> ${this.water}</p>
        </div>
        `;
    }
}
