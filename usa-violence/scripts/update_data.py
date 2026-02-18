
import sqlite3
import json
import os
from datetime import datetime

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(os.path.dirname(__file__), 'violence_data.sqlite')
JSON_PATH = os.path.join(BASE_DIR, 'public', 'data', 'violence_data.json')

def update_hate_crime():
    # Simulate fetching data
    years = [2018, 2019, 2020, 2021, 2022, 2023]
    total = [8180, 8389, 8263, 8577, 11500, 11288]
    race = [4500, 4600, 4700, 4800, 6400, 6212]
    religion = [1800, 1750, 1725, 1700, 2400, 2290]
    sexual_orientation = [1350, 1375, 1400, 1425, 1850, 1860]

    return {
        "years": years,
        "total": total,
        "race": race,
        "religion": religion,
        "sexual_orientation": sexual_orientation
    }

def update_ncvs_fbi():
    years = [2019, 2020, 2021, 2022, 2023]
    ncvs = [20.1, 21.5, 19.7, 20.3, 19.4]
    fbi = [379, 398, 387, 381, 364]
    return {
        "years": years,
        "ncvs": ncvs,
        "fbi": fbi
    }

def update_leoka():
    years = [2019, 2020, 2021, 2022, 2023]
    assaults = [60000, 65000, 70000, 78000, 79936]
    felonious = [48, 46, 73, 71, 60]
    ambush = [7, 9, 12, 14, 11]
    return {
        "years": years,
        "assaults": assaults,
        "felonious": felonious,
        "ambush": ambush
    }

def update_gun_violence():
    years = [2020, 2021, 2022, 2023, 2024]
    suicides = [24000, 24600, 24800, 24185, 16162]
    homicides = [19300, 20900, 20000, 18874, 12988]
    other = [2000, 2100, 2050, 2000, 1000]
    mass_shootings = [611, 690, 647, 656, 488]
    return {
        "years": years,
        "suicides": suicides,
        "homicides": homicides,
        "other": other,
        "massShootings": mass_shootings
    }

def update_scale():
    categories = [
      'Ideological Murders (CSIS/ADL)',
      'Homicides (FBI 2023)',
      'Firearm Suicides (GVA 2023)'
    ]
    values = [20, 18874, 24185]
    return {
        "categories": categories,
        "values": values
    }

def update_all():
    data = {
        "hateCrime": update_hate_crime(),
        "ncvsFbi": update_ncvs_fbi(),
        "leoka": update_leoka(),
        "gunViolence": update_gun_violence(),
        "scale": update_scale(),
        "lastUpdated": datetime.now().isoformat()
    }

    # Save to JSON
    with open(JSON_PATH, 'w') as f:
        json.dump(data, f, indent=2)

    print(f"Data updated and saved to {JSON_PATH}")

    # Also save to SQLite (legacy support if needed)
    try:
        import pandas as pd
        conn = sqlite3.connect(DB_PATH)
        # Example: just saving hate crime to show it works
        df = pd.DataFrame(data['hateCrime'])
        df.to_sql('hate_crime', conn, if_exists='replace', index=False)
        conn.close()
        print(f"Data also saved to SQLite: {DB_PATH}")
    except ImportError:
        print("Pandas not found, skipping SQLite update.")
    except Exception as e:
        print(f"Could not save to SQLite: {e}")

if __name__ == "__main__":
    update_all()
