const iconsTypes = (type) => {
    return `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${type}.svg`
}

// Objeto para armazenar as cores dos tipos de pokémon



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

export { iconsTypes, getPokemonDetails, getMoreInfo, getTypes };