const pokeapi = 'https://pokeapi.co/api/v2/pokemon';
var offset = 0;
var tot_cards = 0;

const iconsTypes = (type) => {
    return `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${type}.svg`
}

// Objeto para armazenar as cores dos tipos de pokémon
var coresPokemon = {
    fire: {
        backCard: "rgb(255, 167, 86)",
        backType: "#FD7D24"
    },
    flying: {
        backCard: "rgb(131, 162, 227)",
        backType: "#748FC9"
    },
    water: {
        backCard: "rgb(88, 171, 246)",
        backType: "#4A90DA",
    }, 
    
    bug: {
        backCard: "rgb(139, 214, 116)",
        backType: "#8CB230"
    },
    normal: {
        backCard: "rgb(131, 162, 227)",
        backType: "#9DA0AA"
    },
    poison: {
        backCard: "rgb(159, 110, 151)",
        backType: "#A552CC"
    },
    electric: {
        backCard: "rgb(242, 203, 85)",
        backType: "#EED535"
    },
    ground: {
        backCard: "rgb(247, 133, 81)",
        backType: "#DD7748"
    },
    grass: {
        backCard: "rgb(139, 190, 138)",
        backType: "#62B957",
    },
    fairy: {
        backCard: "rgb(235, 168, 195)",
        backType: "#ED6EC7"
    },
    fighting: {
        backCard: "rgb(235, 73, 113)",
        backType: "#D04164"
    },
    psychic: {
        backCard: "rgb(255, 101, 104)",
        backType: "#EA5D60",
    },
    rock: {
        backCard: "rgb(212, 194, 148)",
        backType: "#BAAB82",
    },
    ghost: {
        backCard: "rgb(133, 113, 190)",
        backType: "#556AAE",
    },
    dark: {
        backCard: "rgb(111, 110, 120)",
        backType: "#58575F",
    },
    dragon: {
        backCard: "rgb(115, 131, 185)",
        backType: "#0F6AC0"
    },
    ice: {
        backCard: "rgb(145, 216, 223)",
        backType: "#61CEC0",
    },
    steel: {
        backCard: "rgb(76, 145, 178)",
        backType: "#417D9A",
    },
};

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

function isPokemonOnPage(pokemonId) {
    const existingPokemon = document.querySelector(`[data-pokemon-id="${pokemonId}"]`);
    return !!existingPokemon;
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
