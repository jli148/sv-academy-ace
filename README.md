# Setting Up Clone of Repo
```sh
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
nodeenv -p
npm install @smogon/calc
```

# Refreshing Trainer Data
Likely not needed, but in the event that [`data/academy-ace-pokemon.json`](./data/academy-ace-pokemon.json) is outdated, [`scrape_trainer_pokemon.py`](./src/scrape_trainer_pokemon.py) will fetch and save the trainer data in JSON format.

```sh
python ./src/scrape_trainer_pokemon.py
```

# Running a Pokemon Against Trainers
## Finding Minimum Speed Investment
[`find-speed-investment.js`](./src/find-speed-investment.js) helps find the minimum Speed EV investment required to outspeed all trainers' Pokemon.

```sh
node ./src/find-speed-investment.js Fluttermane
node ./src/find-speed-investment.js Pikachu
node ./src/find-speed-investment.js Sylveon
```

```
Fluttermane outspeeds all trainers' Pokemon with no Speed investment (306 > 260)
Pikachu needs 180 Speed EVs to outspeed all trainers' Pokemon (261 > 260)
Sylveon cannot outspeed all trainers' Pokemon even with max Speed investment (240 < 260)
```

The Pokemon's nature can be "locked in," in which case the script does not change the nature even if doing so would allow the Pokemon to outpseed all trainers' Pokemon. This may be useful if a specific nature is required to guarantee KOs.

```sh
node ./src/find-speed-investment.js Dragonite
node ./src/find-speed-investment.js Dragonite Adamant
```

```
Dragonite needs a Speed increasing nature and 168 Speed EVs to outspeed all trainers' Pokemon (261 > 260)
Dragonite with Adamant nature cannot outspeed all trainers' Pokemon even with max Speed investment (259 < 260)
```

## Summarizing Matchups
[`calc-matchups.js`](./src/calc-matchups.js) summarizes a Pokemon's KO chances against all trainers' Pokemon. The script reads information about the Pokemon to test from `data/test-pokemon.json`, with the following schema:
```json
{
    "name": "Pikachu",
    "evs": {
        "spa": 252
    },
    "nature": "Modest",
    "move": "Thunderbolt"
}
```

```sh
node ./src/calc-matchups.js
```

Matchup summaries are saved to `data/matchup-summary.csv`.
