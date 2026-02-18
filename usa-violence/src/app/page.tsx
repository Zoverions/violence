
"use client";

import React from 'react';
import { violenceData } from '@/data/violenceData';
import ChartWrapper from '@/components/ChartWrapper';
import DashboardGrid from '@/components/DashboardGrid';
import { darkLayout, lightLayout } from '@/utils/chartConfig';
import { useEffect, useState } from 'react';
import { Data } from 'plotly.js';

export default function Home() {
  const [layoutTheme, setLayoutTheme] = useState(lightLayout);

  useEffect(() => {
    // Check initial preference and listen for changes
    const checkTheme = () => {
      if (document.documentElement.classList.contains('dark')) {
        setLayoutTheme(darkLayout);
      } else {
        setLayoutTheme(lightLayout);
      }
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Hate Crime Trends
  const hateCrimeChart = {
    data: [
      { x: violenceData.hateCrime.years, y: violenceData.hateCrime.total, name: 'Total Hate Crime Incidents', type: 'scatter', line: { color: 'black', width: 2 } },
      { x: violenceData.hateCrime.years, y: violenceData.hateCrime.race, name: 'Race/Ethnicity/Ancestry', type: 'scatter', line: { dash: 'dash' } },
      { x: violenceData.hateCrime.years, y: violenceData.hateCrime.religion, name: 'Religion', type: 'scatter', line: { dash: 'dash' } },
      { x: violenceData.hateCrime.years, y: violenceData.hateCrime.sexual_orientation, name: 'Sexual Orientation', type: 'scatter', line: { dash: 'dash' } },
    ] as Data[],
    layout: {
      ...layoutTheme,
      title: { text: 'FBI Hate Crime Incidents by Motivation (2018–2023)' },
      xaxis: { title: { text: 'Year' }, ...layoutTheme.xaxis },
      yaxis: { title: { text: 'Incidents Reported' }, ...layoutTheme.yaxis },
    }
  };

  // NCVS vs FBI
  const ncvsFbiChart = {
    data: [
      { x: violenceData.ncvsFbi.years, y: violenceData.ncvsFbi.ncvs, name: 'NCVS (Victimization, per 1,000)', type: 'scatter', mode: 'lines+markers' },
      { x: violenceData.ncvsFbi.years, y: violenceData.ncvsFbi.fbi.map(x => x/100), name: 'FBI CDE (Reported, per 1,000)', type: 'scatter', mode: 'lines+markers' },
    ] as Data[],
    layout: {
      ...layoutTheme,
      title: { text: 'Reported vs Experienced Violent Crime (NCVS vs FBI, 2019–2023)' },
      xaxis: { title: { text: 'Year' }, ...layoutTheme.xaxis },
      yaxis: { title: { text: 'Rate per 1,000 persons (age 12+)' }, ...layoutTheme.yaxis },
    }
  };

  // LEOKA
  const leokaChart = {
    data: [
      { x: violenceData.leoka.years, y: violenceData.leoka.assaults, name: 'Officer Assaults', type: 'bar', marker: { color: 'rgba(0,0,255,0.6)' } },
      { x: violenceData.leoka.years, y: violenceData.leoka.felonious, name: 'Felonious Deaths', type: 'scatter', mode: 'lines+markers', marker: { color: 'red' }, yaxis: 'y2' },
      { x: violenceData.leoka.years, y: violenceData.leoka.ambush, name: 'Ambush Deaths', type: 'scatter', mode: 'lines+markers', marker: { color: 'darkred' }, line: { dash: 'dash' }, yaxis: 'y2' },
    ] as Data[],
    layout: {
      ...layoutTheme,
      title: { text: 'LEOKA: Violence Against Law Enforcement (2019–2023)' },
      xaxis: { title: { text: 'Year' }, ...layoutTheme.xaxis },
      yaxis: { title: { text: 'Assaults' }, ...layoutTheme.yaxis },
      yaxis2: {
        title: { text: 'Deaths' },
        overlaying: 'y' as const,
        side: 'right' as const,
        ...layoutTheme.yaxis // reusing grid styles
      },
      legend: { ...layoutTheme.legend, x: 0, y: 1.1 }
    }
  };

  // Gun Violence Archive
  const gunViolenceChart = {
    data: [
      { x: violenceData.gunViolence.years, y: violenceData.gunViolence.suicides, name: 'Suicides', type: 'bar', marker: { color: 'orange' } },
      { x: violenceData.gunViolence.years, y: violenceData.gunViolence.homicides, name: 'Homicides', type: 'bar', marker: { color: 'red' } },
      { x: violenceData.gunViolence.years, y: violenceData.gunViolence.other, name: 'Other', type: 'bar', marker: { color: 'gray' } },
    ] as Data[],
    layout: {
      ...layoutTheme,
      title: { text: 'Gun Violence Deaths by Category (2020–2024)' },
      xaxis: { title: { text: 'Year' }, ...layoutTheme.xaxis },
      yaxis: { title: { text: 'Deaths' }, ...layoutTheme.yaxis },
      barmode: 'stack' as const,
      annotations: violenceData.gunViolence.massShootings.map((ms, i) => ({
        x: violenceData.gunViolence.years[i],
        y: violenceData.gunViolence.suicides[i] + violenceData.gunViolence.homicides[i] + violenceData.gunViolence.other[i] + 1000,
        text: `MS:${ms}`,
        showarrow: false,
        font: { color: layoutTheme.font?.color }
      }))
    }
  };

  // Extremist vs Structural Violence
  const scaleChart = {
    data: [
      { x: violenceData.scale.categories, y: violenceData.scale.values, type: 'bar', marker: { color: ['blue','red','orange'] }, text: violenceData.scale.values.map(String), textposition: 'outside' },
    ] as Data[],
    layout: {
      ...layoutTheme,
      title: { text: 'Scale of Violence: Extremist vs Structural (2023)' },
      yaxis: { title: { text: 'Deaths' }, ...layoutTheme.yaxis },
      xaxis: { ...layoutTheme.xaxis }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
          Violence Statistics Dashboard
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Comprehensive data visualization of violence trends in the United States, covering hate crimes, law enforcement incidents, and gun violence.
        </p>
      </div>

      <DashboardGrid>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
          <ChartWrapper id="violence-hc" data={hateCrimeChart.data} layout={hateCrimeChart.layout} />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
            FBI Hate Crime Statistics showing total incidents and breakdowns by bias motivation. Note the significant increase in reported incidents in recent years.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
          <ChartWrapper id="violence-ncvs" data={ncvsFbiChart.data} layout={ncvsFbiChart.layout} />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
            Comparison between the National Crime Victimization Survey (NCVS) and FBI reported data. Shows the gap between experienced and reported violent crime.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
          <ChartWrapper id="violence-leoka" data={leokaChart.data} layout={leokaChart.layout} />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
            Law Enforcement Officers Killed and Assaulted (LEOKA) data. Illustrates trends in assaults against officers and line-of-duty deaths.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
          <ChartWrapper id="violence-gva" data={gunViolenceChart.data} layout={gunViolenceChart.layout} />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
            Gun Violence Archive data categorized by suicides, homicides, and other gun deaths. &quot;MS&quot; indicates Mass Shootings count for each year.
          </p>
        </div>
      </DashboardGrid>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
        <ChartWrapper id="violence-scale" data={scaleChart.data} layout={scaleChart.layout} className="h-[500px]" />
         <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic text-center">
            Contextual scale comparing deaths from ideological extremism to broader structural violence (homicides and suicides).
          </p>
      </div>
    </div>
  );
}
