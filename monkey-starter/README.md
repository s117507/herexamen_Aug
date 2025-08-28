# Monkey Researcher App

In deze opdracht ga je een applicatie maken voor de ondersteuning van het onderzoek naar apen soorten. De applicatie maakt gebruik van een mongodb database om de gegevens van de apen (monkeys), soorten en users op te slaan. We gaan gebruik maken van Express, TypeScript en EJS om de applicatie te bouwen.

## 🗃️ Startbestanden

Je begint van een file [starter.zip](./starter.zip). Deze bevat al een basis structuur van de applicatie. Alle HTML bestanden zijn al omgezet naar EJS templates en de nodige dependencies zijn al toegevoegd aan het project. Je vindt een aantal screenshots in de `screenshots` map.

Unzip alle bestanden van de zip file en installeer de nodige dependencies met `npm install`. Lees eerst de code goed door zodat je de volledige structuur van de applicatie begrijpt.

## 🛠️ Opdracht

Je begint met een start project waarin de basis van de applicatie is uitgewerkt. 

### Algemene vereisten

Hier een aantal algemene vereisten die je moet volgen. Doe je dit niet dan krijg je minpunten:

- [ ] Gebruik overal de juiste interfaces/types. Dus geen `any` gebruiken.
- [ ] Gebruik de juiste array methodes indien dit gevraagd wordt. Als er geen specifieke methode wordt gevraagd, mag je zelf kiezen welke methode je gebruikt.
- [ ] node_modules folder mag niet geüpload worden.

### Routers (1pt)

Er staan in dit project een aantal routers die al voor jou zijn aangemaakt. Momenteel bevatten deze al wel alle routes die gaan gebruikt worden, maar zijn deze nog niet geïmplementeerd. Zorg dat de volgende routers beschikbaar zijn op de volgende routes:
- [ ] `authRouter` op `/`. 
- [ ] `homeRouter` op `/`. 
- [ ] `monkeyRouter` op `/monkeys`. 
- [ ] `speciesRouter` op `/species`.
- [ ] `userRouter` op `/users`.

Als je dit gedaan hebt kan je de applicatie starten met `npm start` en zou je de home pagina moeten kunnen zien op `http://localhost:3000/`.

### Database setup (5pt)

Je koppelt de applicatie aan een eigen lege MongoDB Atlas database.

In dit project is er al een `database.ts` bestand aangemaakt. Het bevat al een aantal functies die je kan gebruiken om de database te benaderen. Er is al een `seedDatabase` functie aangemaakt die op zijn beurt de `seedUsers`, `seedSpecies` en `seedMonkeys` functies aanroept. Deze functies zijn nog niet geïmplementeerd, maar je kan deze wel al zien in het bestand.

#### Users

De applicatie werkt met `Users`. Dit zijn de gebruikers die de apen (monkeys) onderzoeken. Ze kunnen inloggen aan de hand van hun username en password. De data van de users moet worden ingelezen vanuit een externe API (https://raw.githubusercontent.com/similonap/json/refs/heads/master/monkeys/users.json) en vervolgens worden opgeslagen in de database. Uiteraard moeten de passwords worden gehashed voordat deze worden opgeslagen.

- [ ] Lees de data van de users in vanuit de externe API in de `seedUsers` functie in `database.ts`.
- [ ] Zorg dat alle passwords van de users worden gehashed.
- [ ] Sla de users op in een `usersCollection` in de database.
- [ ] Zorg ervoor dat de users alleen worden opgeslagen als ze nog niet in de database staan. 

#### Species

Elke aap (monkey) hoort bij een soort. Deze soorten moeten ook worden ingelezen vanuit een externe API (https://raw.githubusercontent.com/similonap/json/refs/heads/master/monkeys/species.json) en vervolgens worden opgeslagen in de database.

- [ ] Lees de data van de species in vanuit de externe API in de `seedSpecies` functie in `database.ts`.
- [ ] Sla de species op in een `speciesCollection` in de database.
- [ ] Zorg ervoor dat de species alleen worden opgeslagen als ze nog niet in de database staan.

#### Monkeys

De apen (monkeys) moeten ook worden ingelezen vanuit een externe API (https://raw.githubusercontent.com/similonap/json/refs/heads/master/monkeys/monkeys.json) en vervolgens worden opgeslagen in de database. Elke aap (monkey) hoort bij een soort en heeft een user die deze heeft onderzocht. Deze informatie moet ook worden opgeslagen in de database.

- [ ] Lees de data van de monkeys in vanuit de externe API in de `seedMonkeys` functie in `database.ts`.
- [ ] Zoek voor elke aap (monkey) de soort op in de `speciesCollection` en sla deze op in de aap (monkey) als een sub object. Elke aap (monkey) moet dus een species object bevatten met de soort informatie.
- [ ] Sla de apen (monkeys) op in een `monkeysCollection` in de database.
- [ ] Zorg ervoor dat de apen (monkeys) alleen worden opgeslagen als ze nog niet in de database staan.

### Aap (monkey) overzicht (5pt)

Op de /monkeys pagina moet een overzicht komen van alle apen (monkeys). Momenteel is dit helemaal hard gecodeerd in HTML, maar dit moet natuurlijk dynamisch worden gemaakt. 

- [ ] Pas de `getAllMonkeys` functie aan in de `database.ts` zodat deze alle apen (monkeys) teruggeeft uit de database afhankelijk van de sortField, sortDirection en de q parameter. 
- [ ] Pas de router aan zodat deze de apen (monkeys) ophaalt uit de database en deze doorgeeft aan de view.
- [ ] Pas de view aan zodat de apen (monkeys) worden weergegeven in een tabel. 
- [ ] Geef de `calculateMonkeyAge` functie door aan de view zodat deze gebruikt kan worden om de leeftijd van de apen (monkeys) te berekenen. Deze functie is al aangemaakt in de `utils.ts` file.
- [ ] Zorg ervoor dat de apen (monkeys) kunnen worden gesorteerd op verschillende velden. De velden waarop je kan sorteren kan je vinden in de `SORT_FIELDS` constante. De sorteerrichting kan worden bepaald door de `sortDirection` query parameter op `asc` of `desc` te zetten. De standaard sortering is op `id` en `asc`.
- [ ] Zorg ervoor dat de apen (monkeys) kunnen worden gefilterd op basis van de `q` query parameter. Deze parameter kan worden gebruikt om te zoeken op de nickname van de aap (monkey). Er moet worden gezocht in de `nickname`, `description`, `species`, `island` en `likes` velden van de aap (monkey).
- [ ] Het aantal likes van een aap (monkey) moet worden weergegeven in de tabel. Er moet een knop komen om een aap (monkey) te liken. Deze knop moet een POST request sturen naar de `/monkeys/:id/like` route. Momenteel hoef je alleen nog maar een placeholder te maken voor deze knop, de functionaliteit komt later.
- [ ] Als je op de soort (species) van een aap (monkey) klikt, moet je naar de detail pagina van de soort gaan. Deze pagina moet nog worden gemaakt, maar je kan alvast de link al aanmaken naar de soort detail pagina. De link moet er als volgt uitzien: `/species/:id`, waarbij `id` de id van de soort is.

### Soort (species) detail pagina (5pt)

Op de soort detail pagina moet de informatie van de soort worden weergegeven. 

- [ ] Implementeer de `getSpeciesById` functie in de `database.ts` zodat deze de soort ophaalt uit de database op basis van de id.
- [ ] Implementeer de `getMonkeysBySpecies` functie in de `database.ts` zodat deze alle apen (monkeys) ophaalt die bij de soort horen.
- [ ] Pas de router aan zodat deze de soort ophaalt uit de database en deze doorgeeft aan de view.
- [ ] Als de species id niet bestaat, moet er een 404 error worden gegeven (mag gewoon de tekst "Species not found" zijn).
- [ ] Pas de view aan zodat de soort informatie wordt weergegeven. Het habitat type, de temperatuur tolerantie (de minimum en maximum temperatuur), het dieet en de endangerment status moeten worden weergegeven. Om de badge van de endangerment status te tonen, kan je de `status` class gebruiken. Deze class is al aangemaakt in de `styles.css` file. De class is de string `status-` gevolgd door de endangerment status van de soort. Bv `class="status status-NT"` voor de vulnerable status.
- [ ] Onderaan de pagina staat een tabel met alle apen (monkeys) die bij de soort horen. Dit is dezelfde tabel als op de `/monkeys` pagina. Zorg dat deze in een partial wordt gezet zodat je deze kan hergebruiken op de soort detail pagina.

### Login functionaliteit (5pt)

De user moet kunnen inloggen met zijn username en password. We gaan voor het login systeem gebruik maken van sessions.

- [ ] Implementeer de `login` functie in de `database.ts` zodat deze de user ophaalt uit de database op basis van de username en password. Het password moet worden gehashed voordat deze wordt vergeleken met het opgeslagen password. Als de user niet bestaat of het password incorrect is, moet er een error worden gegooid.
- [ ] Implementeer de `getAllUsers` functie in de `database.ts` zodat deze alle users ophaalt uit de database. 
- [ ] Implementeer de login functionaliteit in de `authRouter`. Op de login pagina vult de user zijn username en password in. Als de login succesvol is, moet de user worden opgeslagen in de session en moet er een success message worden weergegeven. Als de login niet succesvol is, moet er een error message worden weergegeven. Gebruik hiervoor flash messages.
- [ ] Implementeer de logout functionaliteit in de `authRouter`. Als de logout succesvol is, moet er een success message worden weergegeven. Gebruik hiervoor flash messages.
- [ ] Zorg ervoor dat de user moet ingelogd zijn om alle pagina's te kunnen bekijken. Als de user niet is ingelogd, moet hij worden doorgestuurd naar de login pagina. 
- [ ] Toon de naam van de ingelogde gebruiker in de home pagina.

### Aap (monkey) liken (4pt)

- [ ] Implementeer de `likeMonkey` functie in de `database.ts` zodat deze het aantal likes van een aap (monkey) verhoogt. De functie moet de aap (monkey) ophalen uit de database op basis van de id en vervolgens het aantal likes verhogen. Als de aap (monkey) niet bestaat, moet er een error worden gegooid (en moet er een 404 error worden getoond "Monkey not found").
- [ ] Implementeer de `/monkeys/:id/like` route in de `monkeyRouter`. Deze route moet de `likeMonkey` functie aanroepen en het aantal likes van de aap (monkey) verhogen.

### Doorsturen

Als je klaar bent dan verwijder je eerst de `node_modules` folder en maak je een zip van de volledige folder. Deze zip upload je naar toets.ap.be.

Opgepast: Als je de `node_modules` folder niet verwijderd, dan krijg je minpunten.