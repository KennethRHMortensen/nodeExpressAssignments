"use strict";
import {$} from "./modules/nQuery.js";
import {Ajax} from "./modules/Ajax.js";

/*
 * Event handler for button - create ajax object and get data
 */
const getContinents = function(ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/continents", showContinents);
};
const getCountries = function(ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/countries/${ev.target.value}`, showCountries);
};
const getCities = function(ev) {
    console.log('test');
    let req = Object.create(Ajax);
    req.init();
    console.log(ev.target.textContent);
    req.getFile(`/country/${ev.target.textContent}`, showCities);
};
const getWeather = function(ev) {
    console.log('weather test');
    let req = Object.create(Ajax);
    req.init();
    console.log(ev.target.textContent);
    req.getFile(`http://api.openweathermap.org/data/2.5/weather?q=${ev.target.textContent}&appid=818105d2f232ae11a90fe3f295d523cc`, showWeather);
};

/*
 * callback function for the above AJaX
 */
const showContinents = function(e) {
    /*
     * here you put the ajax response onto your page DOM
     */
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("contdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let h3 = document.createElement('h3');
    let txt = document.createTextNode('The Continents');
    h3.appendChild(txt);
    div.appendChild(h3);
    let continents = JSON.parse(e.target.responseText);
    let sel = document.createElement('select');
    sel.setAttribute('id', 'chooseContinent');
    sel.addEventListener('change', getCountries);
    continents.forEach(function(continent) {
        let opt = document.createElement('option');
        let opttext = document.createTextNode(continent.name);
        opt.appendChild(opttext);
        sel.appendChild(opt);
    });
    div.appendChild(sel);
    $("contdata").appendChild(div);
}

const showCountries = function (e) {
    /*
     * here you put the ajax response onto your page DOM
     */
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("countdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let h3 = document.createElement('h3');
    let txt = document.createTextNode('The Countries');
    h3.appendChild(txt);
    div.appendChild(h3);
    let countries = JSON.parse(e.target.responseText);
    let ul = document.createElement('ul');
    ul.setAttribute('id', 'chooseCountry');
    
    countries.forEach(function(country) {
        let countrybutton = document.createElement('button');        
        countrybutton.setAttribute('id', 'countrybtn');
        countrybutton.addEventListener('click', getCities);
        let btnText = document.createTextNode(country.code);
        
        countrybutton.appendChild(btnText);
        ul.appendChild(countrybutton);
    });
    div.appendChild(ul);
    $("countdata").appendChild(div);
    console.log('her er jeg');
    
};



const showCities = function (e) {
    /*
     * here you put the ajax response onto your page DOM
     */
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("citydata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let h3 = document.createElement('h3');
    let txt = document.createTextNode('The Cities');
    h3.appendChild(txt);
    div.appendChild(h3);
    let cities = JSON.parse(e.target.responseText);
    let ul = document.createElement('ul');
    ul.setAttribute('id', 'chooseCity');
    
    cities.forEach(function(city) {
        let citybutton = document.createElement('button');
        citybutton.setAttribute('id', 'citybtn')
        citybutton.addEventListener('click', getWeather);
        let btnText = document.createTextNode(city.name);
        citybutton.appendChild(btnText);
        ul.appendChild(citybutton);
    });
    div.appendChild(ul);
    $("citydata").appendChild(div);
    
};


const showWeather = function (e) {
    /*
     * here you put the ajax response onto your page DOM
     */
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("weather");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let txt = document.createTextNode('The weather');
    let weather = JSON.parse(e.target.responseText);
    console.log(weather);
    let para = document.createTextNode(`The temperature is ` + (parseInt(weather.main.temp)-273.15).toFixed(2)  + ` degree Celcius`);
    console.log(parseInt(weather.main.temp));
    h3.appendChild(txt);
    $('weather').appendChild(h3);

    p.appendChild(para);
    
    $("weather").appendChild(p);
};

const showStarter = function () {
    $('gcont').addEventListener('click', getContinents);
    
    
}

window.addEventListener("load", showStarter);                       // kick off JS
