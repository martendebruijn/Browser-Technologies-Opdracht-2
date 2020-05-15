# Browser Technologies Opdracht 2

![Screenshot of app](./img/screenshot.png)

## Aanvulling

PE

Features

- changed opslaan op de server naar opslaan in url
- meer focus op de vraag

FD

- input color fallback
- input range fallback
- input date fallback

* conclusie

* links naar wiki
* js: range feedback (zet deze ff iets meer naar rechts)

![Screenshot van de applicatie](/img/screenshot-web-design.png)
![GIF van de applicatie](/img/web-design-eind-product.gif)

<!-- <details><summary>CLICK ME</summary></details> -->

## 👾 Introductie

Korte enquête voor de minor web development met de mogelijkheid om verder te gaan waar men gebleven was. Op basis van Progressive Enhancement en Feature Detection. Zie de wiki voor uitgebreidere uitleg.

## ✏️ Concept

- [Use Case](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki#Use-case)
- [Core Functionaliteit](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki#core-functionaliteit)
- [Wireflow](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki/wireflow)
- [Enquête vragen](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki/enquete)

## 🕹 Live Demo

[Bekijk hier de live demo 😃](https://enquete-minor-webdev.herokuapp.com/)

## 👨‍🦯 Usage

```zsh
git clone https://github.com/martendebruijn/Browser-Technologies-Opdracht-2.git
cd browser-technologies-opdracht-2
npm install
npm start
```

## 📍 Table of Contents

- [Progressive Enhancements](#Progressive-Enhancements)
- [Features](#Features)
- [Feature Detection](#Feature-Detection)
- [Accessibility](#Accessibility)
- [Conclusie](#Conclusie)
- [Artikelen](#Artikelen)
- [Opdrachten](#Opdrachten)
- [✨ Whishlist](#-Whishlist)
- [🙌 Credits](#-Credits)
- [📚 Sources](#-Sources)

## Progressive Enhancements

### Orginele versie

- [CSS Selectors](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki/css-selectors)
- [CSS Flexbox](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki/flexbox)
- [Progress Bar](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki/progress-bar)
- [Overig CSS](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki/overig-css)
- [CSS Checkbox Hack](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki/checkbox-hack)
<!-- <details><summary></summary></details> -->

### Aanvulling

#### Enquete opslaan

##### Opslaan in query

In de orginele versie regelde ik het opslaan en het terughalen van de antwoorden in zijn geheel op de server. Voor de aanvulling heb ik dit veranderd naar de antwoorden op te slaan in de query van de url. Het opslaan en terug halen van de antwoorden op de server was vrij complex, waardoor ik veel ingewikkelde JavaScript moest schrijven met veel POST en GET requests. Hier had ik bij de orginele versie dan ook mijn meeste tijd ingestopt. Het opslaan in de query is eenvoudiger, wat ervoor zorgt dat de enquête veel minder buggy is en beter werkt.
</br>
Als men op `opslaan` drukt, wordt hij doorgestuurd naar `/save`. Hier wordt de link gegenereerd en weergegeven. Als men later naar deze link gaat worden de antwoorden meegestuurd d.m.v. `req.query`.

<details><summary>Code index.js (server)</summary>

```js
app.get('/v2/enquete', (req, res) => {
  res.render('enquetev2', {
    style: '../css/styles-v2.0.css',
    script: '../js/main-v2.0.js',
    query: req.query,
  });
});
app.get('/save', (req, res) => {
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  let destination = fullUrl.replace('save', 'v2/enquete');
  res.render('save', {
    style: '../css/styles-v2.0.css',
    script: '../js/main-v2.0.js',
    destination,
  });
  });
```
</details>

<details><summary>Antwoord meegeven met value</summary>

```html
    <input id="input1" autofocus name="name" type="text" autocomplete="off" placeholder="Marten de Bruijn" required pattern="^[A-Za-z -]+" value="<%= query.name %>" />
```
</details>
<details><summary>Antwoord meegeven bij een select</summary>

```html
     <select id="color" name="kleur" required>
        <option value="">Kies een kleur</option>
        <% if (query.kleur == '#ff0000') { %>
            <option selected value="#ff0000">Rood</option>
        <% } else { %>
            <option value="#ff0000">Rood</option>
        <% } %>
        <% if (query.kleur == '#008000') { %>
            <option selected value="#008000">Groen</option>
        <% } else { %>
            <option value="#008000">Groen</option>
        <% } %>
        <!-- etc... -->
    </select>
```
</details>
<details><summary>Antwoord meegeven bij radio buttons</summary>

```html
    <fieldset>
        <legend id="js-ageHeader" tabindex="-1">Hoe oud ben je?</legend>
        <% if (query.leeftijd == '18') { %>
            <input type="radio" name="leeftijd" id="18jaar" value="18" required checked />
        <% } else { %>
            <input type="radio" name="leeftijd" id="18jaar" value="18" required />
        <% } %>
        <label for="18jaar">18 jaar of jonger</label>
        <% if (query.leeftijd == '19') { %>
            <input type="radio" name="leeftijd" id="19jaar" value="19" required checked />
        <% } else { %>
            <input type="radio" name="leeftijd" id="19jaar" value="19" required />
        <% } %>
        <!-- etc... -->
    </fieldset>
```
</details>

##### Antwoorden automatisch opslaan in LocalStorage
Wanneer men beschikt over JavaScript, worden de antwoorden automatisch opgeslagen in `LocalStorage`. Als de pagina herladen wordt, worden de antwoorden automatisch ingevuld en gaat de gebruiker naar de laatste vraag die hij nog niet heeft ingevuld.


#### Vraag headers
Wanneer men beschikt over JavaScript én zijn of haar naam heeft ingevuld worden de vragen aangepast naar `naam + vraag`. Zodra men zijn of haar leeftijd heeft ingevuld wordt bij de geboortedatum vraag berekent in welk jaar hij of zij waarschijnlijk geboren is.
<details><summary>Gebruikers naam invullen</summary>

```js
function changeHeaders() {
  const name = getLS('name');
  if (name) {
    ageHeader.innerText = `${name}, hoe oud ben je?`;
    if (checkInput('color') && qnr < 2) {
      colorHeader.innerHTML = `${name}, wat is je favoriete kleur?
    <span id="js-dotThree" class="progress-dot dot-three white-dot" tabindex="1"></span> `;
      dotThree = document.getElementById('js-dotThree');
    } else if (checkInput('color') && qnr >= 2) {
      colorHeader.innerHTML = `${name}, wat is je favoriete kleur?
    <span id="js-dotThree" class="progress-dot dot-three" tabindex="1"></span> `;
      dotThree = document.getElementById('js-dotThree');
    } else {
      colorHeader.innerHTML = `${name}, wat is je favoriete kleur?`;
    }
    if (checkInput('range') && qnr < 4) {
      gradeHeader.innerHTML = `${name}, welk cijfer zou jij deze minor geven?
          <span id="js-dotFive" class="progress-dot dot-five white-dot" tabindex="1"></span> 
          <ul class="hints">
              <p>Toegestane tekens:</p>
              <li>1 t/m 9</li>
              <li>10</li>
          </ul>`;
      dotFive = document.getElementById('js-dotFive');
      gradeHeader = document.getElementById('js-gradeHeader');
    } else if (checkInput('range') && qnr >= 4) {
      gradeHeader.innerHTML = `${name}, welk cijfer zou jij deze minor geven?
          <span id="js-dotFive" class="progress-dot dot-five white-dot" tabindex="1"></span> 
          <ul class="hints">
              <p>Toegestane tekens:</p>
              <li>1 t/m 9</li>
              <li>10</li>
          </ul>`;
      dotFive = document.getElementById('js-dotFive');
      gradeHeader = document.getElementById('js-gradeHeader');
    } else {
      gradeHeader.innerText = `${name}, welk cijfer zou jij deze minor geven?`;
      gradeHeader = document.getElementById('js-gradeHeader');
    }
  }
}
```
</details>
<details><summary>Geboortejaar uitrekenen</summary>

```js
function checkedRadioBtn(name) {
  radios.forEach(function (radio) {
    if (radio.checked) {
      const age = radio.value,
        today = new Date(),
        date = today.getFullYear();
      addToLS('age', age);
      const birthYear = date - age;
      birthHeader.innerHTML = `${name} je bent waarschijnlijk in ${birthYear} geboren.
      <h3>Vul hieronder je geboortedatum in:</h3>
      <span class="progress-dot dot-four" tabindex="1"></span> 
      <div class="hints">
          <p>Toegestaan formaat:</p>
          <p>DD-MM-YYYY</p>
      </div>`;
    }
  });
}
```
</details>
    
#### Voortgangs cirkels
<details><summary>Voortgangs cirkels</summary></details>

#### Per vraag laten zien

<details><summary>Per vraag laten zien</summary></details>

## Features

### Orginele versie

<ul>
    <li>[Data opslaan op de server](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki/save-on-server)</li>
    <li>[Thema's](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki/themes)</li>
    <li>[Form Validatie](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki/form-validation)</li>
</ul>

### Aanvulling

## Feature Detection

### Orginele versie

<ul>
    <li>[Date Input](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki/date-input)</li>
    <li>[Local Storage](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki/local-storage)</li>
    <li>[Custom Properties](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki/custom-properties)</li>
</ul>

### Aanvulling

## Accessibility

- [Tests en toegankelijkheid](https://github.com/martendebruijn/Browser-Technologies-Opdracht-2/wiki/tests)

## Conclusie

## Artikelen

## Opdrachten

## ✨ Whishlist

- [ ] Laatste pagina met wat er is ingevuld en de mogelijkheid om terug te gaan of te submitten

## 🙌 Credits

- [Meyerweb: CSS Reset](http://meyerweb.com/eric/tools/css/reset/)
- [Choerd - Basis van antwoorden opslaan op de server en het gebruik van een persoonlijke code](https://github.com/Choerd/browser-technologies-1920)

## 📚 Sources

📖 Artikel & Documentation **|** ⚙️ Code **|** 📹 Video **|** 🛠 Tools **|** 📓 Has notes in the wiki of this repo

- 🛠 [Can I Use](https://caniuse.com/)
- 🛠 [Colorable](https://colorable.jxnblk.com/)
- 🛠 [Colorblinding Chrome Extentie](https://chrome.google.com/webstore/detail/colorblinding/dgbgleaofjainknadoffbjkclicbbgaa)
- 🛠 [Regex patronen](https://regexr.com/)
- 📖 [Form Field Validation without JavaScript - Fionna Chan - medium.com](https://medium.com/@fionnachan/form-field-validation-without-javascript-2e40696ba999)
- 📖 [Input types test](https://quirksmode.org/html5/inputs/tests/inputs_js.html)
- 📖 [Check if localstorage is available](https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available)
- 📖 [Improving Color Accessibility for color blind users - Smashing Magazine](https://www.smashingmagazine.com/2016/06/improving-color-accessibility-for-color-blind-users/)

❤️ Thanks for reading ❤️<br/>
❤️ Marten de Bruijn ❤️
