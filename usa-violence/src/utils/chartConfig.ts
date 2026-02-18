
import { Layout } from 'plotly.js';

export const commonLayout: Partial<Layout> = {
  font: { family: 'Inter, sans-serif' },
  showlegend: true,
  legend: { orientation: 'h', x: 0, y: -0.2 },
  margin: { t: 40, r: 10, l: 50, b: 50 },
  autosize: true,
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
};

export const darkLayout: Partial<Layout> = {
  ...commonLayout,
  font: { ...commonLayout.font, color: '#e5e7eb' }, // text-gray-200
  xaxis: { gridcolor: '#374151', zerolinecolor: '#374151' },
  yaxis: { gridcolor: '#374151', zerolinecolor: '#374151' },
};

export const lightLayout: Partial<Layout> = {
  ...commonLayout,
  font: { ...commonLayout.font, color: '#1f2937' }, // text-gray-800
  xaxis: { gridcolor: '#e5e7eb', zerolinecolor: '#e5e7eb' },
  yaxis: { gridcolor: '#e5e7eb', zerolinecolor: '#e5e7eb' },
};
