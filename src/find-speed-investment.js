// back into the required speed EV investment to outspeed all trainers' Pokemon
import { Generations, Pokemon } from '@smogon/calc';

import trainerData from '../data/academy-ace-pokemon.json' with { type: 'json' };
import * as pokeUtil from './poke-util.js';

const gen = Generations.get(9);
const name = process.argv[2];
const natureRequirement = process.argv[3];
const basePokemon = new Pokemon(gen, name, { nature: natureRequirement });
const speedMultiplier = pokeUtil.getNatureSpeedMultiplier(natureRequirement);

function getTrainerMaxSpe(trainer) {
    return trainer.pokemon
        .map(pokeUtil.initTrainerPokemon)
        .reduce((prev, current) => (prev && prev.stats.spe > current.stats.spe) ? prev : current)
        .stats.spe;
}

const highest_spe = Math.max(...trainerData.map(getTrainerMaxSpe));

var spe_diff = highest_spe - basePokemon.stats.spe;
if (spe_diff < 0) {
    console.log(
        '%s outspeeds all trainers\' Pokemon with no Speed investment (%d > %d)',
        name,
        basePokemon.stats.spe,
        highest_spe
    );
    process.exit();
}

var requiredEvs = Math.ceil((spe_diff + 1) / speedMultiplier) * 4;

if (requiredEvs <= 252) {
    console.log(
        '%s needs %d Speed EVs to outspeed all trainers\' Pokemon (%d > %d)',
        name,
        requiredEvs,
        pokeUtil.retrain(basePokemon, { spe: requiredEvs }).stats.spe,
        highest_spe
    );
    process.exit();
}

if (natureRequirement) {
    console.log(
        '%s with a %s nature cannot outspeed all trainers\' Pokemon even with max Speed investment (%d < %d)',
        name,
        natureRequirement,
        pokeUtil.retrain(basePokemon, { spe: 252 }).stats.spe,
        highest_spe
    );
    process.exit();
}

spe_diff = highest_spe - pokeUtil.retrain(basePokemon, undefined, 'Jolly').stats.spe;
requiredEvs = Math.ceil((spe_diff + 1) / speedMultiplier) * 4;

if (requiredEvs > 252) {
    console.log(
        '%s cannot outspeed all trainers\' Pokemon even with max Speed investment (%d < %d)',
        name,
        pokeUtil.retrain(basePokemon, { spe: 252 }, 'Jolly').stats.spe,
        highest_spe
    );
    process.exit();
}

console.log(
    '%s needs a Speed increasing nature and %d Speed EVs to outspeed all trainers\' Pokemon (%d > %d)',
    name,
    requiredEvs,
    pokeUtil.retrain(basePokemon, { spe: requiredEvs }, 'Jolly').stats.spe,
    highest_spe
);
