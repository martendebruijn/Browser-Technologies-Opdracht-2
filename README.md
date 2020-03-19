# Browser Technologies Opdracht 2

## Inhoud

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

## Enquete

#### Vraag 1: Wat is je naam?

Gebruiker moet zijn naam kunnen typen.

#### Vraag 2: Hoe oud ben je?

- [ ] 18 of jonger
- [ ] 19
- [ ] 20
- [ ] 21
- [ ] 22
- [ ] 23
- [ ] 24
- [ ] 25 of ouder

#### Vraag 3: Welke opleiding doe je?

- [ ] Communicatie Multimedia Design
- [ ] ICT
- [ ] Anders: ...

#### Vraag 4: Wie is je favoriete docent?

- [ ] Koop
- [ ] Joost
- [ ] Vassilis
- [ ] Laurens
- [ ] Anders: ...

#### Vraag 5: Wat was je niveau voor het begin van de minor?

- [ ] beginner
- [ ] intermide
- [ ] advanced
- [ ] expert

#### Vraag 6: Hoe moeilijk vind je het tot nu toe?

- [ ] Erg makkelijk
- [ ] Makkelijk - Neutraal
- [ ] Neutraal - Moeilijk
- [ ] Erg moeilijk

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
- [Postman](https://www.postman.com/)

## All Sources

1. [Form Field Validation without JavaScript - Fionna Chan - Medium](https://medium.com/@fionnachan/form-field-validation-without-javascript-2e40696ba999)
1. [Use Expressjs to get url and post parameters - Scotch.io](https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters)
   Bovenstaande source maakt gebruik van een bodyparser, echter is dit niet meer nodig omdat expressjs dit zelf ook kan i.v.m. nieuwere versie (én heeft security issues).
1. [Expressjs documentation - app.post + req.body](https://expressjs.com/en/api.html#req.body)

<!-- www.browserstack.com -->
<!-- hamburger menu onderaan de pagina en dan met een a link in het top menu naar de onderkant -->
<!-- als je op ios chrome test dan test je op een versie van safari (chrome moet je testen op een android telefoon, op ios is het niet mogelijk om een andere webview te installeren dan safari) -->
