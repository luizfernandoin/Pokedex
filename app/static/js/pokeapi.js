const pokeapi = 'https://pokeapi.co/api/v2/pokemon';
const offset = 0;

const iconsTypes = {
    water: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/water.svg',
    normal: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/normal.svg',
    fire: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fire.svg',
    grass: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/grass.svg',
    flying: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/flying.svg',
    fighting: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fighting.svg',
    poison: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/poison.svg',
    electric: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/electric.svg',
    ground: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ground.svg',
    rock: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/rock.svg',
    psychic: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/psychic.svg',
    ice: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ice.svg',
    bug: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/bug.svg',
    ghost: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ghost.svg',
    steel: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/steel.svg',
    dragon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dragon.svg',
    dark: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dark.svg',
    fairy: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fairy.svg'
}

async function getAllPokemons(limit = 20, offset = 0) {
    try {
        const response = await fetch(`${pokeapi}?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        const { results } = data;
        await Promise.all(results.map(async (pokemon) => {
            const { id, name, abilities, types, species, height, weight, stats } = await getMoreInfo(pokemon.url);
            
            createPokemonCard({ id, name, abilities, types, species, height, weight, stats });
        }));    
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

async function getPokemonDetails(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();

    const { id, name, abilities, types, species, height, weight, stats } = data;

    return {
        id, name, abilities, types: getTypes(types), species, height, weight, stats
    };
}

async function getMoreInfo(url) {
    const response = await fetch(url);
    const data = await response.json();

    const {
        id,
        name,
        abilities,
        types,
        species,
        height,
        weight,
        stats,
    } = data;

    return {
        id, name, abilities, types: getTypes(types), species, height, weight, stats
    };
}

function getTypes(types) {
    const typeNames = types.map(type => type.type.name);

    return typeNames;
}

function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    const nameElement = document.createElement('h3');
    nameElement.textContent = pokemon.name;

    const typeClassElement = document.createElement('div');
    typeClassElement.classList.add('type-class');

    pokemon.types.forEach((type, index) => {
        const typeSpan = document.createElement('span');
        typeSpan.id = `id${index + 1}`;
        typeSpan.classList.add('type-icon', type.toLowerCase());
        const iconUrl = iconsTypes[type.toLowerCase()]; 
    
        const imgElement = document.createElement('img');
        imgElement.src = iconUrl;
        imgElement.alt = type;
        imgElement.style.width = '20px';
        imgElement.style.height = '20px';
    
        typeSpan.appendChild(imgElement);
        typeSpan.innerHTML += ` ${type}`;

        typeClassElement.appendChild(typeSpan);
    });
    cardHeader.appendChild(nameElement);
    cardHeader.appendChild(typeClassElement);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const imgElement = document.createElement('img');
    imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    imgElement.alt = 'pokemon';
    cardBody.appendChild(imgElement);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    const linkElement = document.createElement('a');
    linkElement.href = '{{ url_for("detail") }}';
    linkElement.dataset.pokemonId = pokemon.id;
    linkElement.appendChild(card);

    const cardContainer = document.querySelector('.container-cards');
    cardContainer.appendChild(linkElement);

    linkElement.addEventListener('click', handlePokemonClick);
}

function handlePokemonClick(event) {
    event.preventDefault();

    const pokemonId = event.currentTarget.dataset.pokemonId;
    getPokemonDetails(pokemonId)
        .then(() => {
            return fetch(`/detail?id=${pokemonId}`);
        })
        .then((response) => {
            if (response.ok) {
                window.location.href = `/detail?id=${pokemonId}`;
            } else {
                console.error(`Erro na requisição: ${response.status}`);
            }
        })
        .catch(error => console.error('Erro ao obter detalhes do Pokémon:', error));
}

const buttonMais = document.querySelector('.btn-mais');
buttonMais.addEventListener('click', () => {
    
})

getAllPokemons();
