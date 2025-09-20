
"use client";
import { useEffect } from 'react';

const loadPlotly = async () => {
  if (typeof window !== 'undefined') {
    return await import('plotly.js-dist-min');
  }
  return null;
};

const violenceData = {
  hateCrime: {
    years: [2018, 2019, 2020, 2021, 2022, 2023],
    total: [8180, 8389, 8263, 8577, 11500, 11288],
    race: [4500, 4600, 4700, 4800, 6400, 6212],
    religion: [1800, 1750, 1725, 1700, 2400, 2290],
    sexual_orientation: [1350, 1375, 1400, 1425, 1850, 1860],
  },
  ncvsFbi: {
    years: [2019, 2020, 2021, 2022, 2023],
    ncvs: [20.1, 21.5, 19.7, 20.3, 19.4],
    fbi: [379, 398, 387, 381, 364],
  },
  leoka: {
    years: [2019, 2020, 2021, 2022, 2023],
    assaults: [60000, 65000, 70000, 78000, 79936],
    felonious: [48, 46, 73, 71, 60],
    ambush: [7, 9, 12, 14, 11],
  },
  gunViolence: {
    years: [2020, 2021, 2022, 2023, 2024],
    suicides: [24000, 24600, 24800, 24185, 16162],
    homicides: [19300, 20900, 20000, 18874, 12988],
    other: [2000, 2100, 2050, 2000, 1000],
    massShootings: [611, 690, 647, 656, 488],
  },
  scale: {
    categories: [
      'Ideological Murders (CSIS/ADL)',
      'Homicides (FBI 2023)',
      'Firearm Suicides (GVA 2023)'
    ],
    values: [20, 18874, 24185],
  }
};
export default function Home() {
  useEffect(() => {
    loadPlotly().then((Plotly) => {
      if (!Plotly) return;
      // Hate Crime Trends
      Plotly.newPlot('violence-hc', [
        { x: violenceData.hateCrime.years, y: violenceData.hateCrime.total, name: 'Total Hate Crime Incidents', type: 'scatter', line: { color: 'black', width: 2 } },
        { x: violenceData.hateCrime.years, y: violenceData.hateCrime.race, name: 'Race/Ethnicity/Ancestry', type: 'scatter', line: { dash: 'dash' } },
        { x: violenceData.hateCrime.years, y: violenceData.hateCrime.religion, name: 'Religion', type: 'scatter', line: { dash: 'dash' } },
        { x: violenceData.hateCrime.years, y: violenceData.hateCrime.sexual_orientation, name: 'Sexual Orientation', type: 'scatter', line: { dash: 'dash' } },
      ], {
        title: 'FBI Hate Crime Incidents by Motivation (2018–2023)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Incidents Reported' },
        legend: { orientation: 'h' },
      });

      // NCVS vs FBI
      Plotly.newPlot('violence-ncvs', [
        { x: violenceData.ncvsFbi.years, y: violenceData.ncvsFbi.ncvs, name: 'NCVS (Victimization, per 1,000)', type: 'scatter', mode: 'lines+markers' },
        { x: violenceData.ncvsFbi.years, y: violenceData.ncvsFbi.fbi.map(x => x/100), name: 'FBI CDE (Reported, per 1,000)', type: 'scatter', mode: 'lines+markers' },
      ], {
        title: 'Reported vs Experienced Violent Crime (NCVS vs FBI, 2019–2023)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Rate per 1,000 persons (age 12+)' },
        legend: { orientation: 'h' },
      });

      // LEOKA
      Plotly.newPlot('violence-leoka', [
        { x: violenceData.leoka.years, y: violenceData.leoka.assaults, name: 'Officer Assaults', type: 'bar', marker: { color: 'rgba(0,0,255,0.6)' } },
        { x: violenceData.leoka.years, y: violenceData.leoka.felonious, name: 'Felonious Deaths', type: 'scatter', mode: 'lines+markers', marker: { color: 'red' } },
        { x: violenceData.leoka.years, y: violenceData.leoka.ambush, name: 'Ambush Deaths', type: 'scatter', mode: 'lines+markers', marker: { color: 'darkred' }, line: { dash: 'dash' } },
      ], {
        title: 'LEOKA: Violence Against Law Enforcement (2019–2023)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Incidents/Deaths' },
        legend: { orientation: 'h' },
      });

      // Gun Violence Archive
      Plotly.newPlot('violence-gva', [
        { x: violenceData.gunViolence.years, y: violenceData.gunViolence.suicides, name: 'Suicides', type: 'bar', marker: { color: 'orange' } },
        { x: violenceData.gunViolence.years, y: violenceData.gunViolence.homicides, name: 'Homicides', type: 'bar', marker: { color: 'red' } },
        { x: violenceData.gunViolence.years, y: violenceData.gunViolence.other, name: 'Other', type: 'bar', marker: { color: 'gray' } },
      ], {
        title: 'Gun Violence Deaths by Category (2020–2024)',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Deaths' },
        legend: { orientation: 'h' },
        annotations: violenceData.gunViolence.massShootings.map((ms, i) => ({
          x: violenceData.gunViolence.years[i],
          y: violenceData.gunViolence.suicides[i] + violenceData.gunViolence.homicides[i] + violenceData.gunViolence.other[i] + 500,
          text: `MS:${ms}`,
          showarrow: false,
        }))
      });

      // Extremist vs Structural Violence
      Plotly.newPlot('violence-scale', [
        { x: violenceData.scale.categories, y: violenceData.scale.values, type: 'bar', marker: { color: ['blue','red','orange'] }, text: violenceData.scale.values.map(String), textposition: 'outside' },
      ], {
        title: 'Scale of Violence: Extremist vs Structural (2023)',
        yaxis: { title: 'Deaths' },
      });
    });
  }, []);
  return (
    <div className="space-y-12 p-4">
      <h1 className="text-3xl font-bold mb-4">Violence Statistics Dashboard</h1>
      <div id="violence-hc" style={{height:400}}></div>
      <div id="violence-ncvs" style={{height:400}}></div>
      <div id="violence-leoka" style={{height:400}}></div>
      <div id="violence-gva" style={{height:400}}></div>
      <div id="violence-scale" style={{height:400}}></div>
    </div>
  );
}
