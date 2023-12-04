const pokeapi = 'https://pokeapi.co/api/v2/pokemon';

async function getAllPokemons() {
    const response = await fetch(pokeapi);
    const data = await response.json();
    const { results } = data;

    results.map(async (pokemon) => {

    })
}

getAllPokemons();