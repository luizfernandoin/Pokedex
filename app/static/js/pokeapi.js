const pokeapi = 'https://pokeapi.co/api/v2/pokemon';

async function getAllPokemons() {
    const response = await fetch(pokeapi);
    const data = await response.json();
    const { results } = data;

    results.map(async (pokemon) => {
        
    })
}

async function getMoreInfo(url) {
    const response = await fetch(url);
    const { name, abilities, types, species, height, weight, stats } = await response.json();

    return {
        name, abilities, types, species, height, weight, stats
    }
} 

getAllPokemons();