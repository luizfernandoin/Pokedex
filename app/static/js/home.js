import { coresPokemon } from "./colors.js";
import { 
    iconsTypes, 
    getPokemonDetails, 
    getMoreInfo, 
    getTypes 
} from "./pokeapi.js";

const pokeapi = 'https://pokeapi.co/api/v2/pokemon';
var offset = 0;
var tot_cards = 0;


function isPokemonOnPage(pokemonId) {
    const existingPokemon = document.querySelector(`[data-pokemon-id="${pokemonId}"]`);
    return !!existingPokemon;
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

function createPokemonCard(pokemon) {
    if (isPokemonOnPage(pokemon.id)) {
        return;
    }

    const card = document.createElement('div');
    card.classList.add('card');

    card.style.backgroundColor = coresPokemon[pokemon.types[0].toLowerCase()].backCard

    //card.classList.add(pokemon.types[0].toLowerCase());

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    const nameElement = document.createElement('h3');
    nameElement.textContent = pokemon.name;

    const typeClassElement = document.createElement('div');
    typeClassElement.classList.add('type-class');

    pokemon.types.forEach((type, index) => {
        const typeSpan = document.createElement('span');
        typeSpan.style.backgroundColor = coresPokemon[type.toLowerCase()].backType
        typeSpan.id = `id${index + 1}`;
        typeSpan.classList.add('type-icon', type.toLowerCase());
        const iconUrl = iconsTypes(type.toLowerCase()); 
    
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

const searchInput = document.querySelector('.search-input');

searchInput.addEventListener("keydown", async function (event) {
    if (event.key === "Enter"){

        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm) {
            const cardContainer = document.querySelector('.container-cards');
            cardContainer.innerHTML = '';

            try {
                const { id, name, abilities, types, species, height, weight, stats } = await getMoreInfo(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);

                createPokemonCard({ id, name, abilities, types, species, height, weight, stats });
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        }

        searchInput.value = '';
    };
});


const buttonMais = document.querySelector('.btn-mais');
buttonMais.addEventListener('click', () => {
    offset += 1;
    getAllPokemons(20, offset);
})

getAllPokemons();

export { getPokemonDetails };