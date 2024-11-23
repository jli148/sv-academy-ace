import { Generations, Pokemon } from '@smogon/calc';

const gen = Generations.get(9)
export function initTrainerPokemon(pokemon) {
    // create a Pokemon instance using an element from academy-ace-pokemon.json

    const iv = (pokemon.is_last_pokemon ? 25 : 20)
    return new Pokemon(gen, pokemon.pokemon_name, {
        level: pokemon.level,
        ivs: { hp: iv, atk: iv, def: iv, spa: iv, spd: iv, spe: iv },
        evs: { hp: (pokemon.is_last_pokemon ? 252 : 0) }
    });
}

export function retrain(pokemon, evs = undefined, nature = undefined) {
    // return a copy of an existing Pokemon instance,
    // after changing the EV spread (and nature if desired)

    const original_evs = pokemon.evs
    const original_nature = pokemon.nature

    if (evs) pokemon.evs = evs;
    if (nature) pokemon.nature = nature;
    const newPokemon = pokemon.clone()
    
    pokemon.evs = original_evs
    pokemon.nature = original_nature

    return newPokemon
}

const speedIncreasingNatures = ['Hasty', 'Jolly', 'Naive', 'Timid'];
const speedDecreasingNatures = ['Brave', 'Quiet', 'Relaxed', 'Sassy'];
export function getNatureSpeedMultiplier(nature) {
    if (nature === undefined) {
        return undefined;
    }

    var speedMultiplier;
    if (speedIncreasingNatures.includes(nature)) {
        speedMultiplier = 1.1;
    } else if (speedDecreasingNatures.includes(nature)) {
        speedMultiplier = 0.9;
    } else {
        speedMultiplier = 1.0;
    }

    return speedMultiplier
}
