import { 
    iconsTypes, 
    getPokemonDetails, 
    getMoreInfo, 
    getTypes 
} from "./pokeapi.js";
import { coresPokemon } from "./colors.js";

const containerDetail = document.querySelector(".container-detail");

function getPokemonIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function stylePokemonDetail() {
    try {
        const idPokemon = getPokemonIdFromUrl();
        const pokeDetail = await getPokemonDetails(idPokemon);

        containerDetail.style.backgroundColor = coresPokemon[pokeDetail.types[0]].backCard;
        containerDetail.style.backgroundColor = coresPokemon[pokeDetail.types[0]].backCard;

        const typeSpans = document.querySelectorAll('.poke-class span');

        typeSpans.forEach((span, index) => {
            const type = span.textContent;
            span.style.backgroundColor = coresPokemon[type].backType;
        
            span.id = `id${index + 1}`;
            span.classList.add('type-icon', type.toLowerCase());
            const iconUrl = iconsTypes(type.toLowerCase()); 
        
            const imgElement = document.createElement('img');
            imgElement.src = iconUrl;
            imgElement.alt = type;
            imgElement.style.width = '20px';
            imgElement.style.height = '20px';
        
            // Insere o elemento de imagem antes do primeiro filho do span (que seria o texto)
            span.insertBefore(imgElement, span.firstChild);
        });
        
        

    } catch (error) {
        console.error('Erro ao estilizar os detalhes do Pokémon:', error);
    }
}

stylePokemonDetail();


