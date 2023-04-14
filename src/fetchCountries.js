const API_URL =
  'https://restcountries.com/v3.1/all?fields=name,capital,population,languages,flags';

export function fetchCountries() {
  return fetch(`${API_URL}`).then(response => {
    if (!response.ok) {
      throw new Error(console.log('Oops, there is no country with that name'));
    }
    return response.json();
  });

  // .then(data => data.map(el => el.name.official));
}
