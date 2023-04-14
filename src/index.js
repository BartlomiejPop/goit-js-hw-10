import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');

// const matchCountries = () => {
//   fetchCountries().then(
//     data => data.forEach(el => console.log(el.name))
//     .filter(el => el.toLowerCase().includes(inputEl.value.toLowerCase()))
//     .forEach(el => (listEl.innerHTML += `<li>${el}</li>`))
//   );
//   listEl.innerHTML = '';
// };
// inputEl.addEventListener('input', debounce(matchCountries, DEBOUNCE_DELAY));

function renderCountriesList(countries) {
  if (inputEl.value.trim() !== '') {
    const markup = countries
      .filter(el =>
        el.name.official
          .toLowerCase()
          .includes(inputEl.value.trim().toLowerCase())
      )
      .map(country => {
        return `<li ><img src=${country.flags.svg} width="26px" height="20px" alt="${country.name.official} flag" >    ${country.name.official}</li>`;
      })
      .join('');
    listEl.innerHTML = markup;

    if (listEl.children.length > 10) {
      listEl.innerHTML = '';
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (listEl.children.length === 1) {
      listEl.innerHTML = countries
        .filter(el =>
          el.name.official
            .toLowerCase()
            .includes(inputEl.value.trim().toLowerCase())
        )
        .map(country => {
          return `<li style="display:flex;gap:10px; align-items:center; padding:12px; font-weight:bold; font-size:22px;"><img src="${
            country.flags.svg
          }" width="50" height="30" alt="${country.name.official} flag">  ${
            country.name.official
          }</li><li><strong>Capital</strong> : ${
            country.capital
          }</li><li><strong>Population</strong> : ${
            country.population
          }</li><li><strong>Languages</strong> : ${Object.values(
            country.languages
          )}</li>`;
        })
        .join('');
    } else if (listEl.children.length === 0) {
      Notify.failure('Oops, there is no country with that name');
    }
  } else {
    listEl.innerHTML = '';
  }
}

const fetchingCountries = () => {
  fetchCountries().then(countries => renderCountriesList(countries));
};

inputEl.addEventListener('input', debounce(fetchingCountries, DEBOUNCE_DELAY));
