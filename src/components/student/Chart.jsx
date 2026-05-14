import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = {
  'Life Dream': '#e74c3c', // Red
  'Self-Awareness': '#5a67d8',
  'Cognitive Construction': '#38b2ac',
  'Coping': '#f56565',
  'Interpersonal Relationships': '#ecc94b',
};

const data = [
  {
    subject: 'Life Dream',
    B: 75,
    L: 60,
    S: 68,
  },
  {
    subject: 'Self-Awareness',
    B: 80,
    L: 68,
    S: 60,
  },
  {
    subject: 'Cognitive Construction',
    B: 55,
    L: 35,
    S: 48,
  },
  {
    subject: 'Coping',
    B: 55,
    L: 35,
    S: 48,
  },
  {
    subject: 'Interpersonal Relationships',
    B: 70,
    L: 50,
    S: 30,
  },
];

const CustomLegend = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '20px',
    flexWrap: 'wrap'
  }}>
    {data.map(d => (
      <div key={d.subject} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: 12,
          height: 12,
          backgroundColor: COLORS[d.subject],
          borderRadius: '50%',
        }} />
        <span>{d.subject}</span>
      </div>
    ))}
  </div>
);

const Chart = () => {
  return (
    <div style={{ width: '100%', height: 600, padding: 40 }}>
      <h3 style={{ textAlign: 'left', paddingLeft: 20 }}>📊 Subject Performance</h3>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" label={{ value: 'Activity Type', position: 'insideBottom', offset: -40 }} />
          <YAxis domain={[0, 100]} label={{ value: 'Subject Performance', angle: -90, position: 'insideLeft' }} />
          <Tooltip />

          {/* One Bar per Activity Type (B/L/S), colored based on subject */}
          <Bar
            dataKey="B"
            name="B"
            radius={[4, 4, 0, 0]}
            fillOpacity={1}
            fill={({ payload }) => COLORS[payload.subject]}
          />
          <Bar
            dataKey="L"
            name="L"
            radius={[4, 4, 0, 0]}
            fillOpacity={0.7}
            fill={({ payload }) => COLORS[payload.subject]}
          />
          <Bar
            dataKey="S"
            name="S"
            radius={[4, 4, 0, 0]}
            fillOpacity={0.5}
            fill={({ payload }) => COLORS[payload.subject]}
          />
        </BarChart>
      </ResponsiveContainer>
      <CustomLegend />
    </div>
  );
};

export default Chart;
