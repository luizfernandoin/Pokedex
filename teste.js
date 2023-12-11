const pokeapi = 'https://pokeapi.co/api/v2/pokemon';

async function getAllPokemons(limit = 20, offset = 0) {
    const response = await fetch(`${pokeapi}?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    const { results } = data;

    await Promise.all(results.map(async (pokemon) => {
        const { name, abilities, types, species, height, weight, stats } = await getMoreInfo(pokemon.url);
        
        createPokemonCard({ name, abilities, types, species, height, weight, stats });
    }));
}

async function getMoreInfo(url) {
    const response = await fetch(url);
    const data = await response.json();

    const {
        name,
        abilities,
        types, // Types é um array de objetos
        species,
        height,
        weight,
        stats,
    } = data;

    // Extrai os nomes dos tipos
    const typeNames = types.map(type => type.type.name);
    console.log(typeNames)

    return {
        name, abilities, types: typeNames, species, height, weight, stats
    };
}


function createPokemonCard(pokemon) {
    // Crie o elemento do card
    const card = document.createElement('div');
    card.classList.add('card');

    // Crie o cabeçalho do card
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    const nameElement = document.createElement('h3');
    nameElement.textContent = pokemon.name;

    const typeClassElement = document.createElement('div');
    typeClassElement.classList.add('type-class');

    // Adicione classes de tipo ao elemento
    pokemon.types.forEach((type, index) => {
        const typeSpan = document.createElement('span');
        typeSpan.id = `id${index + 1}`;
        typeSpan.classList.add('type-icon', type.toLowerCase());
        typeSpan.innerHTML = `<i class="fas fa-${type.toLowerCase()}"></i>${type}`;
        typeClassElement.appendChild(typeSpan);
    });

    // Adicione elementos ao cabeçalho do card
    cardHeader.appendChild(nameElement);
    cardHeader.appendChild(typeClassElement);

    // Crie o corpo do card
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const imgElement = document.createElement('img');
    imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    imgElement.alt = 'pokemon';

    // Adicione a imagem ao corpo do card
    cardBody.appendChild(imgElement);

    // Adicione o cabeçalho e o corpo ao card
    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    // Crie o link
    const linkElement = document.createElement('a');
    linkElement.href = '{{ url_for("detail") }}';
    linkElement.appendChild(card);

    // Adicione o card ao contêiner
    const cardContainer = document.getElementById('pokemon-container');
    cardContainer.appendChild(linkElement);
}


// Adicione botões ou outras formas de controle para a paginação no HTML
document.getElementById('next-button').addEventListener('click', () => {
    // Ajuste os valores de limit e offset conforme necessário
    getAllPokemons(10, 10);
});

document.getElementById('prev-button').addEventListener('click', () => {
    // Ajuste os valores de limit e offset conforme necessário
    getAllPokemons(10, 0);
});

// Carregue os primeiros Pokémon ao iniciar a página
getAllPokemons();
