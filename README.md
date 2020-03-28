# Browser Technologies Opdracht 2

## Inhoud

- [Live Demo](#Live-Demo)
- [Tussentijdse beoordeling](#Tussentijdse-beoordeling)
- [Use Case](#Use-Case)
- [Core functionaliteit](#Core-functionaliteit)
- [Layers](#Layers)
  - [Functional Layer](#Functional-Layer)
  - [Usable Layer](#Usable-Layer)
  - [Pleasurable Layer](#Pleasurable-Layer)
- [Wireflow Sketch](#Wireflow-Sketch)
  - [First Sketch](#First-Sketch)
    - [Mobile Sketch](#Mobile-Sketch)
    - [Desktop Sketch](#Desktop-Sketch)
- [Enquete](#Enquete)
- [Features en browser technologies](#Features-en-browser-technologies)
  - [Form Validatie](#Form-Validatie)
    - [Required en pattern](#Required-en-pattern)
    - [Checken of een veld leeg is of niet](#Checken-of-een-veld-leeg-is-of-niet)
    - [Checken of een veld focused is of niet](#Checken-of-een-veld-focused-is-of-niet)
    - [Sources](#Sources)
- [Accessibility Issues](#Accessibility-Issues)
- [Tools Used](#Tools-Used)
- [All Sources](#All-Sources)
- [Feature Wishlist](#Future-Wishlist)

## Live Demo

[Live Demo](https://enquete-minor-webdev.herokuapp.com/)

## Tussentijdse beoordeling

1. Zijn er HTML 'hacks' om met alleen HTML je pagina toch een beetje te stylen?
1. Hoe kun je het beste testen als je zelf niet al te veel apparaten hebt (en alleen van Apple...)?
1. Dit vak gaat niet per se over wat je op de server doet, maar is hoe ik het (ervoor zorgen dat de gebruiker verder kan gaan, waar hij of zij gebleven is) nu heb gedaan (in mijn index.js) een handige manier? Het voelt niet zo... (en was er ook lang mee bezig, om het werkend te krijgen).

## To Do

- [x] Terug knop gaat nu naar de laatst beantwoorde pagina. -> Veranderen naar terug knop die daadwerkelijk terug gaat.
- [x] Ingevulde antwoorden laten renderen wanneer de gebruiker terug gaat.
- [ ] Home page maken
- [ ] Pattern toevoegen als form validatie
- [ ] CSS feedback geven bij form validatie
- [ ] CSS Sausje toevoegen
- [ ] JS toevoegen + animaties
- [ ] Testen op verschillende browsers
- [ ] Testen op mobiel
- [ ] Update README
- [ ] Feature dat de ingevulde data opgeslagen wordt.
- [ ] Change home btn url to heraku app url

## Use Case

Ik wil een enquete kunnen invullen over de minor Web Development, met verschillende antwoord mogelijkheden. Als ik de enquete niet afkrijg, wil ik later weer verder gaan met waar ik ben gebleven.

## Core functionaliteit

Het kunnen invullen van de enquete.

## Layers

### Functional Layer

Als er niets werkt moet het voor de gebruiker mogelijk zijn om de enquete in te vullen en hij moet kunnen opslaan waar hij gebleven was. Dit ga ik doen door per vraag een scherm te maken met een submit knop, waarbij de data tussentijds opgeslagen wordt op de server.

### Usable Layer

- Data opslaan in Local Storage.
- Progress bar

### Pleasurable Layer

Animaties en andere heftige dingen.

## Wireflow Sketch

### First Sketch

#### Mobile Sketch

![Mobile Sketch](/img/mobile.JPG)

#### Desktop Sketch

![Desktop Sketch](/img/desktop.JPG)

## Credits

Data opslaan op server:

2. `https://github.com/Choerd/browser-technologies-1920.git`

## Features en browser technologies

1. Local Storage / Data opslaan op de server
1. Form Validatie

### Form Validatie

#### Required en pattern

Door de attribute `required` toe te voegen aan `input` velden, kan men ervoor zorgen dat een form niet gesubmit kan worden wanneer de `input` velden leeg zijn. Dit zorgt er echter alleen voor dat men de input velden niet leeg mag laten. Maar als een gebruiker, bijvoorbeeld, 'xxx@y' zou invullen bij een `input` element voor het mail adres, wordt deze goedgekeurd. Dit kan verholpen worden door de `pattern` attribute te gebruiken. De `pattern` attribute maakt gebruik van regex patterns, en zorgt ervoor dat de gebruiker alleen een bepaald format kan invoeren. Wanneer de gebruiker een ander format heeft gebruikt en wilt submitten, krijgt hij de volgende error te zien:

> Please match the requested format.
> Men kan gebruik maken van de pseudo-class `:invalid` om feedback te geven aan de gebruiker.

#### Checken of een veld leeg is of niet

Men voegt `placeholder=" "` toe aan `input` element. Als de placeholder wordt getoond, is het veld leeg.

#### Checken of een veld focused is of niet

Use: `:focus`.

###### Sources

1. [Form validatie zonder JavaScript](https://medium.com/@fionnachan/form-field-validation-without-javascript-2e40696ba999)

## Accessibility Issues

## Tools Used

- [Nodejs](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/get-npm)
- [Express](https://www.npmjs.com/package/express)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [ejs](https://www.npmjs.com/package/ejs)
- [Nodejs File System](https://nodejs.org/api/fs.html)
- [Postman](https://www.postman.com/)
- [Heroku](https://www.heroku.com)

## All Sources

1. [Form Field Validation without JavaScript - Fionna Chan - Medium](https://medium.com/@fionnachan/form-field-validation-without-javascript-2e40696ba999)
1. [Use Expressjs to get url and post parameters - Scotch.io](https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters)
   Bovenstaande source maakt gebruik van een bodyparser, echter is dit niet meer nodig omdat expressjs dit zelf ook kan i.v.m. nieuwere versie (én heeft security issues).
1. [Expressjs documentation - app.post + req.body](https://expressjs.com/en/api.html#req.body)
1. [Writing files in node js - Stackoverflow](https://stackoverflow.com/questions/2496710/writing-files-in-node-js)
1. [Nodejs as filesystem - w3schools](https://www.w3schools.com/nodejs/nodejs_filesystem.asp)
1. [Nodejs filesystem documentation](https://nodejs.org/api/fs.html)
1. [Reading a JSON file - Nodejs Filesystem](https://stackabuse.com/reading-and-writing-json-files-with-node-js/)
1. [MDN - fieldset + legend](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset)
1. [Reading and writing files with nodejs](https://tutorialedge.net/nodejs/reading-writing-files-with-nodejs/)
1. [Heroku deployment guide Nodejs](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true)

## Feature Wishlist

- [ ] Laatste pagina met wat er is ingevuld en de mogelijkheid om terug te gaan of te submitten

<!-- www.browserstack.com -->
<!-- hamburger menu onderaan de pagina en dan met een a link in het top menu naar de onderkant -->
<!-- als je op ios chrome test dan test je op een versie van safari (chrome moet je testen op een android telefoon, op ios is het niet mogelijk om een andere webview te installeren dan safari) -->
