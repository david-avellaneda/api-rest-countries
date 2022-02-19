export function APICountries() {
    const $countries = document.getElementById('countries'),
        API = 'https://restcountries.com/v3.1';
    (async () => {
        try {
            /* INYECTAR LOS RESULTADOS DE LA RESPUESTA */
            const ALL_COUNTRIES_RESPONSE = await fetch(`${API}/all`),
                ALL_COUNTRIES_JSON = await ALL_COUNTRIES_RESPONSE.json();
            // console.log(ALL_COUNTRIES_RESPONSE);
            // console.log(ALL_COUNTRIES_JSON);
            if (ALL_COUNTRIES_JSON.url === `${API}/region/All`) {
                const ALL_COUNTRIES_RESPONSE = await fetch(`${API}/all`),
                    ALL_COUNTRIES_JSON = await ALL_COUNTRIES_RESPONSE.json();
                countriesFound(ALL_COUNTRIES_JSON);
            };
            const countriesFound = data => { // Esta función va a pintar los países que encuentre
                let elements = '';
                data.forEach(e => {
                    function thousandsSeparator(n) {
                        let parter = n.toString().split('.');
                        parter[0] = parter[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        return parter.join('.');
                    };
                    elements += `
                    <article class="card">
                        <a href="./country.html?country=${e.name.official}">
                            <img src="${e.flags.svg}" alt="Flag ${e.name.official}" class="card-image" />
                            <div class="card-content">
                                <h2 class="ji">${e.name.common}</h2>
                                <div class="card-content-text">
                                    <p>Population: <span>${thousandsSeparator(e.population)}</span></p>
                                    <p>Region: <span>${e.region}</span></p>
                                    <p>Capital: <span>${e.capital}</span></p>
                                </div>
                            </div>
                        </a>
                    </article>
                    `;
                });
                $countries.innerHTML = elements;
            };
            countriesFound(ALL_COUNTRIES_JSON); // Aquí pintamos todos los países
            /* BUSCAR POR MEDIO DEL INPUT */
            const $form = document.getElementById('search-form'),
                $input = document.getElementById('input-search');
            $form.insertAdjacentHTML('afterbegin', `
                <svg aria-label="Magnifying glass icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                        <path d="M1851,5109c-657-74-1219-432-1555-989c-138-229-223-463-273-745c-26-151-23-500,5-655c120-657,508-1187,1087-1487   c310-160,591-228,945-227c431,0,785,107,1145,345l119,79l696-693c469-468,708-700,735-713c54-25,167-25,215,0   c120,63,175,193,135,317c-17,51-54,91-717,755l-699,701l77,114c371,548,453,1234,222,1869c-75,208-219,450-375,631   c-260,300-628,533-1005,634C2378,5107,2066,5134,1851,5109z M2208,4599c380-41,677-182,943-448c271-271,415-579,451-963   c32-343-60-693-263-998c-84-127-282-325-409-409c-512-341-1143-359-1664-47c-376,224-641,602-728,1039c-32,160-32,414,0,574   c90,451,367,835,767,1062C1572,4561,1909,4632,2208,4599z"/>
                    </g>
                </svg>
            `);
            $form.addEventListener('submit', e => e.preventDefault());
            $form.addEventListener('keyup', async e => {
                if (/^[A-Za-zÑñÁÉÍÓÚÜáéíóúü\s]+$/g.test($input.value)) { // Por si escribe o presiona teclas diferentes a letras
                    if ($input.value.length > 0) {
                        // console.log($input.value);
                        const COUNTRIES_FOUND_RESPONSE = await fetch(`${API}/name/${$input.value.toLowerCase()}`), 
                            COUNTRIES_FOUND_JSON = await COUNTRIES_FOUND_RESPONSE.json();
                        // console.log(COUNTRIES_FOUND_RESPONSE);
                        if (COUNTRIES_FOUND_RESPONSE.status === 404) {
                            $countries.classList.add('no-results-found');
                            $countries.innerHTML = `<p>I'm sorry I couldn't find the country named <span>"${$input.value}</span>".</p>`;
                        } else {
                            $countries.classList.remove('no-results-found');
                        };
                        if (e.key === 'Escape') {
                            $countries.innerHTML = '';
                            // Se coloca este setTimeOut para que primero limpie el HTML de $countries, despúes si invocamos a función countriesFound(ALL_COUNTRIES_JSON); que es la que pinta los países en $countries
                            setTimeout(() => {
                                $input.value = '';
                                $countries.classList.remove('no-results-found');
                                countriesFound(ALL_COUNTRIES_JSON);
                            }, 100);
                        };
                        if (e.keyCode === 8 && $input.value === '') {
                            $countries.innerHTML = '';
                            // Se coloca este setTimeOut para que primero limpie el HTML de $countries, despúes si invocamos a función countriesFound(ALL_COUNTRIES_JSON); que es la que pinta los países en $countries
                            setTimeout(() => {
                                $countries.classList.remove('no-results-found');
                                countriesFound(ALL_COUNTRIES_JSON);
                            }, 300);
                        }
                        countriesFound(COUNTRIES_FOUND_JSON); // Solo se pintan los países que coincidan con lo que se escriba en el input
                    } else {
                        countriesFound(ALL_COUNTRIES_JSON);
                    };
                } else {
                    $countries.classList.remove('no-results-found'); // Cuando borra muy rápido lo que tiene el input le quita esta clase
                    $input.value = '';
                    countriesFound(ALL_COUNTRIES_JSON);
                };
            });
            /* CLASIFICAR PAÍSES POR CONTINENTE O CATEGORIA */
            document.querySelectorAll('.select-items div').forEach(option => {
                option.addEventListener('click', async e => {
                    if (e.target.textContent == 'All') {
                        countriesFound(ALL_COUNTRIES_JSON);
                    } else {
                        if ($countries.classList.contains('no-results-found')) $countries.classList.remove('no-results-found');
                        $input.value = '';
                        const REGION_FOUND_RESPONSE = await fetch(`${API}/region/${option.textContent}`),
                            REGION_FOUND_JSON = await REGION_FOUND_RESPONSE.json();
                        countriesFound(REGION_FOUND_JSON);
                    };
                });
            });
        } catch (err) {
            console.error(err);
            $countries.innerHTML = `<p style="font-size: 2rem;">An error occurred, sorry :(.</p>`;
        };
    })();
};