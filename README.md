# WebPlanten
Installatie:
Dit project werkt met NodeJS zorg er voor dat je dit hebt geinstalleerd via: https://nodejs.org/en/download

Dit project is opgesplits in frontend(plantentrackerFrontEnd) en backend hierdoor moeten we in elke folder de nodige pakketten installeren

1. Download de code of clone dit project naar je eigen computer.
2. Open je terminal in de hoofdmap van het project(via Visual Studio Code of een andere code-editor).
3. Installeer de backend pakketten met commando's
   cd backend
   npm install
4. Installeer de frontend pakketten:
   navigeer terug naar de hoofmap in je terminal met commando
   cd ..
   ga naar de frontend map in je terminal met commando
   cd plantentrackerFrontEnd
   installeer hier ook de pakketten met commando
   npm install
   
Starten:
Dit project is gemaakt met Vite
Om de applicatie te laten werken moeten we twee systemen tegelijk aanzetten.
Je hebt hiervoor twee aparte terminal-vensters nodig in je code-editor

1.Start de backend server(express) in je eerste terminal venster
  navigeer in je terminal terug naar de folder backend met commando:
  cd backend
  en start de server met commando
  node server.js
  als het gelukt is zie je in de terminaal de boodschap: Plantenserver draait op http://localhost:3000
  laat dit terminal venster open
2.Start de frontend in je tweede terminal venster
  navigeer hier in je terminal naar de frontend map met commando:
  cd plantentrackerFrontEnd
  start nu vite met commando:
  npm run dev
  
In je terminal verschijnt nu een link (meestal http://localhost:5173) hier kan je de website terug vinden in je browser
