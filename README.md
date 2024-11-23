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
[`find-speed-investment.js`](./src/find-speed-investment.js) helps find the minimum Speed EV investment required to outspeed all trainers' Pokemon.

```sh
node ./src/find-speed-investment.js Pikachu
```
