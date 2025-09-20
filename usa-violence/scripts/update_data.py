import sqlite3
import pandas as pd
import requests
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), 'violence_data.sqlite')

# Example data update function (replace with real data sources)
def update_hate_crime():
    # Simulate fetching data
    years = list(range(2018, 2024))
    total_incidents = [8180, 8389, 8263, 8577, 11500, 11288]
    race = [4500, 4600, 4700, 4800, 6400, 6212]
    religion = [1800, 1750, 1725, 1700, 2400, 2290]
    sexual_orientation = [1350, 1375, 1400, 1425, 1850, 1860]
    df = pd.DataFrame({
        'year': years,
        'total': total_incidents,
        'race': race,
        'religion': religion,
        'sexual_orientation': sexual_orientation
    })
    conn = sqlite3.connect(DB_PATH)
    df.to_sql('hate_crime', conn, if_exists='replace', index=False)
    conn.close()

def update_all():
    update_hate_crime()
    # Add other update functions here
    print(f"Data updated: {datetime.now()}")

if __name__ == "__main__":
    update_all()
