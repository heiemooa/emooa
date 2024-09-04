import { useEffect, useState } from 'react';
import http from './http';
import React from 'react';
import { get, orderBy, chunk, map, size } from 'lodash';
import { Button, ConfigProvider, Image } from '@emooa/ui';

const Component: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [bing, setBing] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await http.get('https://cdn.emooa.com/output.json', { ignoreError: true });
    const _data = chunk(orderBy(get(data, 'image.bing', []), ['key'], ['desc']), 12);
    setBing(_data);
    setList(_data[current]);
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {map(list, (item, index) => (
          <Image
            key={index}
            style={{ aspectRatio: 279 / 157 }}
            lazy
            motion
            width={'100%'}
            src={`https://cdn.emooa.com/${item?.url?.uhd}`}
            placeholder={item.base64}
            title={
              <span style={{ background: item.color.Vibrant }} className="p-1 rounded">
                {item.time}
              </span>
            }
            description={
              <div style={{ background: item.color.Muted }} className="rounded mt-1">
                {item.title}
              </div>
            }
          />
        ))}
      </div>
      {current < size(list) && (
        <div className="text-center">
          <Button
            className="mt-8"
            onClick={() => {
              setCurrent(preNumber => {
                console.log(bing[preNumber + 1]);
                setList(pre => [...pre, ...bing[preNumber + 1]]);
                return preNumber + 1;
              });
            }}
          >
            再来点图
          </Button>
        </div>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            motions: {
              base: 0.5,
              unit: 0.1,
            },
          },
        }}
      >
        <Component />
      </ConfigProvider>
    </>
  );
};

export default App;
