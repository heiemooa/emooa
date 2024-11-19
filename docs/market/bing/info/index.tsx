import { useEffect, useReducer, useState } from 'react';
import React from 'react';
import { ConfigProvider, Image, Space } from '@emooa/ui';
import { useLocation } from 'dumi';
import http from '../http';
import { history, useLocale } from 'dumi';
import { IconArrowLeft } from '@emooa/icon';
import { isEmpty, chunk, orderBy, get, flatten, find } from 'lodash';
import { getLocalstorage, setLocalstorage } from '../local-storage';
import './index.less';

const lang = {
  'en-US': {
    back: 'Go Back',
    greyscale: 'Greyscale',
    gaussian: 'Gaussian',
  },
  'zh-CN': {
    back: '返回必应首页',
    greyscale: '灰度',
    gaussian: '高斯',
  },
};

const Component: React.FC = () => {
  const locale = useLocale();
  const locales = lang[locale.id] || lang['zh-CN'];
  const location = useLocation();
  const [bing, setBing] = useState<any>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchList = async () => {
    const storage = getLocalstorage('emooa-bing');
    if (!isEmpty(storage)) {
      return storage;
    } else {
      const data = await http.get('https://cdn.emooa.com/output.json', { ignoreError: true });
      const bings = chunk(orderBy(get(data, 'image.bing', []), ['key'], ['desc']), 12);
      setLocalstorage('emooa-bing', bings);
      return bings;
    }
  };

  const fetchData = async () => {
    const searchs = new URLSearchParams(location.search);
    const idx = searchs.get('idx');
    if (!idx) {
      if (locale.id === 'en-US') {
        history.push(`/en-US/market/bing`);
      } else {
        history.push(`/market/bing`);
      }
      return;
    }
    const bings = flatten(await fetchList());
    const found = find(bings, { key: Number(idx) });
    if (!isEmpty(found)) {
      setBing(found);
    }
  };

  return (
    <>
      <h1
        className="text-2xl mb-4 cursor-pointer hover:text-blue-400	"
        onClick={() => {
          if (locale.id === 'en-US') {
            history.push(`/en-US/market/bing`);
          } else {
            history.push(`/market/bing`);
          }
        }}
      >
        <IconArrowLeft className="mr-2" />
        {locales.back}
      </h1>
      {!isEmpty(bing) && (
        <>
          <Image
            className="rounded"
            style={{ aspectRatio: 279 / 157 }}
            lazy
            motion
            width={'100%'}
            src={`https://cdn.emooa.com/${bing?.url?.hd}`}
            placeholder={bing?.base64}
            preview={false}
          />
          <div className="mt-10 flex">
            <div className="w-28 rounded overflow-hidden">
              <div className="h-4 text-xs text-white" style={{ background: bing?.color?.Vibrant }}>
                <p className="scale-50">Vibrant</p>
              </div>
              <div className="h-4 text-xs text-white" style={{ background: bing?.color?.DarkVibrant }}>
                <p className="scale-50">DarkVibrant</p>
              </div>
              <div className="h-4 text-xs text-white" style={{ background: bing?.color?.LightVibrant }}>
                <p className="scale-50">LightVibrant</p>
              </div>
              <div className="h-4 text-xs text-white" style={{ background: bing?.color?.Muted }}>
                <p className="scale-50">Muted</p>
              </div>
              <div className="h-4 text-xs text-white" style={{ background: bing?.color?.DarkMuted }}>
                <p className="scale-50">DarkMuted</p>
              </div>
              <div className="h-4 text-xs text-white" style={{ background: bing?.color?.LightMuted }}>
                <p className="scale-50">LightMuted</p>
              </div>
            </div>
            <div className="ml-6">
              <h1 className="text-xl md:text-2xl lg:text-3xl border-b-4 pb-2 rounded">{bing?.title}</h1>
              <p className="mt-2">{bing?.copyright}</p>
            </div>
          </div>
          <div>
            <Space wrap size={24} className="mt-10 max-w-full">
              <div className="mt-2">
                <h1 className="text-xl mb-2 border-b-4 table">{locales.greyscale}</h1>
                <Image
                  src={`https://cdn.emooa.com/${bing?.url?.greyscale}`}
                  placeholder={bing?.base64}
                  height={200}
                  style={{ aspectRatio: 16 / 9, maxWidth: '100%' }}
                />
              </div>
              <div className="mt-2">
                <h1 className="text-xl mb-2 border-b-4 table">{locales.gaussian}</h1>
                <Image
                  src={`https://cdn.emooa.com/${bing?.url?.gaussian}`}
                  placeholder={bing?.base64}
                  height={200}
                  style={{ aspectRatio: 16 / 9, maxWidth: '100%' }}
                />
              </div>
              <div className="mt-2">
                <h1 className="text-xl mb-2 border-b-4 table">HD</h1>
                <Image
                  src={`https://cdn.emooa.com/${bing?.url?.hd}`}
                  placeholder={bing?.base64}
                  height={200}
                  style={{ aspectRatio: 16 / 9, maxWidth: '100%' }}
                />
              </div>
              <div className="mt-2">
                <h1 className="text-xl mb-2 border-b-4 table">UHD</h1>
                <Image
                  src={`https://cdn.emooa.com/${bing?.url?.uhd}`}
                  placeholder={true}
                  height={200}
                  style={{ aspectRatio: 16 / 9, maxWidth: '100%' }}
                />
              </div>
            </Space>
          </div>
        </>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <>
      <ConfigProvider
        prefixCls="bing"
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
