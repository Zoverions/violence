
"use client";

import { useEffect, useRef, useState } from 'react';
import { Layout, Data } from 'plotly.js';

interface ChartWrapperProps {
  id: string;
  data: Data[];
  layout: Partial<Layout>;
  className?: string;
  style?: React.CSSProperties;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ id, data, layout, className, style }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Plotly, setPlotly] = useState<any>(null);

  useEffect(() => {
    const loadPlotly = async () => {
      if (typeof window !== 'undefined') {
        const PlotlyDist = await import('plotly.js-dist-min');
        setPlotly(PlotlyDist.default || PlotlyDist);
      }
    };
    loadPlotly();
  }, []);

  useEffect(() => {
    const chartElement = chartRef.current;
    if (Plotly && chartElement) {
      Plotly.newPlot(id, data, layout, { responsive: true });
    }

    return () => {
      if (Plotly && chartElement) {
         // Plotly.purge(id);
      }
    };
  }, [Plotly, id, data, layout]);

  return (
    <div
      id={id}
      ref={chartRef}
      className={`w-full h-full min-h-[400px] ${className || ''}`}
      style={style}
    />
  );
};

export default ChartWrapper;
