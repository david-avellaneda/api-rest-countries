export function countryInfo() {
    const $iconArrowLeft = document.querySelector('.back-content a').innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                <path d="M1115.6,3729.8C1071.8,3709.5,25.3,2657.7,10.4,2620.3c-14.9-42.7-13.9-99.3,4.3-133.5c8.5-16,259.5-272.3,558.5-570.2   c457-456,548.9-542.5,585.2-553.1c142-41.6,262.7,119.6,189,250.9c-6.4,11.7-180.5,190.1-385.5,395.1L587,2383.2l2214.7,5.3   l2215.8,5.3l28.8,22.4c56.6,41.6,73.7,75.8,73.7,143.1c0,67.3-17.1,101.4-73.7,143.1l-28.8,22.4l-2217.9,3.2l-2216.8,2.1   l380.2,382.3c331,332.1,381.2,386.6,387.6,421.8C1377.2,3675.3,1242.7,3787.5,1115.6,3729.8z"/>
            </g>
        </svg>
        Back
    `;
    const $country = document.getElementById('country'),
        QUERY = new URLSearchParams(window.location.search), // Con esto SE definen métodos útiles para trabajar con los parámetros de búsqueda de una URL, es decir nos permite leer los parámetros de una URL. Accedemos a toda la URL y obtenemos los valores que está buscando .html?
        PARAMS = QUERY.get('country'), // Obtenemos el valor que está buscando que está almacenado en la variable country
        API = 'https://restcountries.com/v3.1';
        // console.log(PARAMS);
    (async () => {
        try {
            /* INYECTAR LOS RESULTADOS DE LA RESPUESTA */
            const ALL_COUNTRIES_RESPONSE = await fetch(`${API}/name/${PARAMS}?fullText=true`),
                ALL_COUNTRIES_JSON = await ALL_COUNTRIES_RESPONSE.json();
            // console.log(ALL_COUNTRIES_RESPONSE);
            // console.log(ALL_COUNTRIES_JSON);
            const countriesFound = data => { // Esta función va a pintar los países que encuentre
                let elements = '',
                    borders = '',
                    languages = '';
                function thousandsSeparator(n) {
                    let parter = n.toString().split('.');
                    parter[0] = parter[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    return parter.join('.');
                };
                data.forEach(e => {
                    document.head.querySelector('title').innerText = `${e.name.common}`;
                    elements += `
                    <img src="${e.flags.svg}" alt="Flag ${e.name.official}" />
                    <div class="country-content">
                        <h2>${e.name.common}</h2>
                        <div class="country-text">
                            <div class="country-text-one">
                                <p>Native Name: <span>${e.name.official}</span></p>
                                <p>Population: <span>${thousandsSeparator(e.population)}</span></p>
                                <p>Region: <span>${e.region}</span></p>
                                <p>Sub Region: <span>${e.subregion}</span></p>
                                <p>Capital: <span>${e.capital}</span></p>
                            </div>
                            <div class="country-text-two">
                                <p>Top Level Domain: <span>${e.tld}</span></p>
                                <p>Currencies: <span>${Object.values(e.currencies)[0].name}</span></p>
                                <p class="languages">Languages: <span></span></p>
                            </div>
                        </div>
                        <div class="borders-container">
                            <h3>Border Countries:</h3>
                            <div class="borders-countries"></div>
                        </div>
                    </div>
                    `;
                    // Languages
                    Object.values(e.languages).forEach(language => languages += `<span>${language}</span>`);
                    setTimeout(() => document.querySelector('.languages span').innerHTML = languages, 500);
                    $country.classList.add('add-country');
                    if (e.borders) { // Algunos países no tiene fronteras entonces se valida si tiene o no
                        $country.classList.add('add-borders');
                        e.borders.forEach(async e => {
                            // console.log(e);
                            try {
                                const BORDERS_COUNTRIES_RESPONSE = await fetch(`${API}/alpha?codes=${e}`),
                                    BORDERS_COUNTRIES_JSON = await BORDERS_COUNTRIES_RESPONSE.json();
                                // console.log(BORDERS_COUNTRIES_JSON);
                                // Por cada elemento se genera una etiqueta <a></a>
                                BORDERS_COUNTRIES_JSON.forEach(e => borders += `<a href="./country.html?country=${e.name.official}">${e.name.common}</a>`);
                                // console.log(borders);
                            } catch (error) {
                                console.error(err);
                                $country.innerHTML = `<p style="font-size: 2rem;">An error occurred, sorry :(.</p>`;
                            };
                        });
                    } else {
                        setTimeout(() => document.querySelector('.borders-countries').innerHTML = `<p>There are no borders</p>`, 500);
                    };
                });
                if ($country.classList.contains('add-country')) {
                    $country.innerHTML = elements;
                };
                // $country tenga esta clase significa que ya se pintó el HTML ya que esta clase se añade después de pintar el HTML
                if ($country.classList.contains('add-country') && $country.classList.contains('add-borders')) {
                    // esperamos medio segundo para que pueda cargar todo el HTML y encuentre la clase .borders-countries
                    setTimeout(() => document.querySelector('.borders-countries').innerHTML = borders, 1000);
                };
            };
            countriesFound(ALL_COUNTRIES_JSON); // Aquí pintamos todos los países
        } catch (err) {
            console.error(err);
            $country.innerHTML = `<p style="font-size: 2rem;">An error occurred, sorry :(.</p>`;
        };
    })();
};