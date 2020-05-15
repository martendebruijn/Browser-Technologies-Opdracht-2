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

<details><summary>Opslaan in query</summary>
<p>
In de orginele versie regelde ik het opslaan en het terughalen van de antwoorden in zijn geheel op de server. Voor de aanvulling heb ik dit veranderd naar de antwoorden op te slaan in de query van de url. Het opslaan en terug halen van de antwoorden op de server was vrij complex, waardoor ik veel ingewikkelde JavaScript moest schrijven met veel POST en GET requests. Hier had ik bij de orginele versie dan ook mijn meeste tijd ingestopt. Het opslaan in de query is eenvoudiger, wat ervoor zorgt dat de enquête veel minder buggy is en beter werkt.
```js
app.get('/save', (req, res) => {
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  let destination = fullUrl.replace('save', 'v2/enquete');
  res.render('save', {
    style: '../css/styles-v2.0.css',
    script: '../js/main-v2.0.js',
    destination,
  });
```
</p>
</details>
<details><summary>Automatisch opslaan in local storage</summary></details>

#### Vraag headers

<details><summary>Gebruikers naam invullen</summary></details>
<details><summary>Geboortejaar uitrekenen</summary></details>
    
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
