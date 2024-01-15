import React, { useEffect, useState } from 'react';
import { FeatureCollection, GeoJSON } from '@emooa/ui';
import axios from 'axios';

function getRandomColor(alpha = 1) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = `rgb(${r}, ${g}, ${b}, ${alpha})`;
  return color;
}

const App = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data }: { data: FeatureCollection } = await axios.get(
      'https://cdn.emooa.com/geojson/100000.json',
    );
    setLoading(false);
    setData({
      ...data,
      features: data.features.map(feature => ({
        ...feature,
        properties: Object.assign(
          {},
          {
            fillStyle: getRandomColor(),
          },
        ),
      })),
    });
  };
  return loading ? (
    'Loading'
  ) : (
    <GeoJSON style={{ width: '100%' }} data={data as FeatureCollection} />
  );
};

export default App;
