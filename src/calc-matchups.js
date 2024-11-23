// calculate matchup summaries against all trainers' Pokemon
import * as fs from 'fs';
import { Generations, Pokemon, Move, calculate } from '@smogon/calc';

import pkmnConfig from '../data/test-pokemon.json' with { type: 'json' };
import trainerData from '../data/academy-ace-pokemon.json' with { type: 'json' };
import * as pokeUtil from './poke-util.js';

const gen = Generations.get(9);
const testPokemon = new Pokemon(gen, pkmnConfig.name, {
    evs: pkmnConfig.evs,
    nature: pkmnConfig.nature
})
const testMove = new Move(gen, pkmnConfig.move);

var summary_csv = 'trainer,pokemon,min_moves,ko_chance,summary\n';
trainerData.forEach((trainer) => {
    trainer.pokemon.forEach((trainerPkmn) => {
        const result = calculate(
            gen,
            testPokemon,
            pokeUtil.initTrainerPokemon(trainerPkmn),
            testMove
        );
        const ko_chance = result.kochance();
        summary_csv += (
            trainer.trainer_name + ','
            + trainerPkmn.pokemon_name + ','
            + ko_chance.n + ','
            + ko_chance.chance + ','
            + result.desc() + '\n'
        );
    });
});

fs.writeFile('./data/matchup-summary.csv', summary_csv, err => {
    if (err) {
        console.error(err);
    }
});
