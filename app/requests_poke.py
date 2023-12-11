import requests

def get_pokemon_details(pokemon_id):
    try:
        api_url = f'https://pokeapi.co/api/v2/pokemon/{pokemon_id}/'
        response = requests.get(api_url)
        pokemon_details = response.json()

        image_url = f'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{pokemon_id}.png'

        filtered_details = {
            'id': pokemon_details['id'],
            'name': pokemon_details['name'],
            'abilities': [ability['ability']['name'] for ability in pokemon_details['abilities']],
            'types': [type['type']['name'] for type in pokemon_details['types']],
            'species': pokemon_details['species']['name'],
            'height': pokemon_details['height'],
            'weight': pokemon_details['weight'],
            'stats': [{'name': stat['stat']['name'], 'value': stat['base_stat']} for stat in pokemon_details['stats']],
            'image_url': image_url
        }

        return filtered_details
    except Exception as e:
        print(f"Erro ao obter detalhes do Pokémon: {e}")
        return None


def get_evolution_chain(pokemon_id):
    url = f'https://pokeapi.co/api/v2/pokemon-species/{pokemon_id}/'
    response = requests.get(url)
    species_data = response.json()
    evolution_chain_url = species_data['evolution_chain']['url']

    evolution_response = requests.get(evolution_chain_url)
    evolution_data = evolution_response.json()

    return evolution_data

