"""Get information on all opposing Pokemon"""

from bs4 import BeautifulSoup
import pandas as pd
import requests

r = requests.get("https://www.serebii.net/scarletviolet/academyacetournament.shtml")
soup = BeautifulSoup(r.content, "html.parser")

section_header = soup.find("a", attrs={"name": "opponentsr2"}).parent.parent
trainer_tables = section_header.find_next_siblings("table")

trainer_list = list()
for table in trainer_tables:
    rows = table.find_all("tr")
    trainer_and_pokemon_row = rows[1].find_all("td")
    levels_row = rows[2].find_all("td")
    abilities_row = rows[5].find_all("td")

    trainer_name = trainer_and_pokemon_row[0].text
    pokemon_names = [x.text for x in trainer_and_pokemon_row[-6:]]
    levels = [int(x.text[-2:]) for x in levels_row[-6:]]
    abilities = [x.find_all("a")[-1].text for x in abilities_row[-6:]]
    is_last_pokemon = [False] * 5 + [True]

    trainer = {
        "trainer_name": trainer_name,
        "pokemon": [
            {
                "pokemon_name": name,
                "level": level,
                "ability": ability,
                "is_last_pokemon": is_last,
            }
            for name, level, ability, is_last in zip(
                pokemon_names, levels, abilities, is_last_pokemon
            )
        ],
    }

    trainer_list.append(trainer)

trainer_data = pd.DataFrame(trainer_list)
trainer_data = trainer_data.explode("pokemon", ignore_index=True)
pokemon_df = pd.json_normalize(trainer_data["pokemon"])
trainer_data = pd.concat(
    [trainer_data[["trainer_name"]], pokemon_df],
    axis=1,
)

trainer_data.to_csv("./data/academy-ace-pokemon.csv", index=False)
