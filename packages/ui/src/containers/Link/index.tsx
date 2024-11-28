import React from 'react';
import { IconLink } from '@emooa/icon';
import { Link, Button, Space } from '../../../components';
import { map } from 'lodash';

const App: React.FC = () => {
  const obj = {
    blue: '#1677ff',
    purple: '#722ED1',
    cyan: '#13C2C2',
    green: '#52C41A',
    magenta: '#EB2F96',
    pink: '#eb2f96',
    red: '#ff4d4f',
    orange: '#FA8C16',
    yellow: '#FADB14',
    volcano: '#FA541C',
    geekblue: '#2F54EB',
    gold: '#FAAD14',
    lime: '#A0D911',
    blue1: '#e6f4ff',
    blue2: '#bae0ff',
    blue3: '#91caff',
    blue4: '#69b1ff',
    blue5: '#4096ff',
    blue6: '#1677ff',
    blue7: '#0958d9',
    blue8: '#003eb3',
    blue9: '#002c8c',
    blue10: '#001d66',
    purple1: '#f9f0ff',
    purple2: '#efdbff',
    purple3: '#d3adf7',
    purple4: '#b37feb',
    purple5: '#9254de',
    purple6: '#722ed1',
    purple7: '#531dab',
    purple8: '#391085',
    purple9: '#22075e',
    purple10: '#120338',
    cyan1: '#e6fffb',
    cyan2: '#b5f5ec',
    cyan3: '#87e8de',
    cyan4: '#5cdbd3',
    cyan5: '#36cfc9',
    cyan6: '#13c2c2',
    cyan7: '#08979c',
    cyan8: '#006d75',
    cyan9: '#00474f',
    cyan10: '#002329',
    green1: '#f6ffed',
    green2: '#d9f7be',
    green3: '#b7eb8f',
    green4: '#95de64',
    green5: '#73d13d',
    green6: '#52c41a',
    green7: '#389e0d',
    green8: '#237804',
    green9: '#135200',
    green10: '#092b00',
    magenta1: '#fff0f6',
    magenta2: '#ffd6e7',
    magenta3: '#ffadd2',
    magenta4: '#ff85c0',
    magenta5: '#f759ab',
    magenta6: '#eb2f96',
    magenta7: '#c41d7f',
    magenta8: '#9e1068',
    magenta9: '#780650',
    magenta10: '#520339',
    pink1: '#fff0f6',
    pink2: '#ffd6e7',
    pink3: '#ffadd2',
    pink4: '#ff85c0',
    pink5: '#f759ab',
    pink6: '#eb2f96',
    pink7: '#c41d7f',
    pink8: '#9e1068',
    pink9: '#780650',
    pink10: '#520339',
    red1: '#fff2f0',
    red2: '#fff1f0',
    red3: '#ffccc7',
    red4: '#ffa39e',
    red5: '#ff7875',
    red6: '#ff4d4f',
    red7: '#d9363e',
    red8: '#b32430',
    red9: '#8c1523',
    red10: '#660e1b',
    orange1: '#fff7e6',
    orange2: '#ffe7ba',
    orange3: '#ffd591',
    orange4: '#ffc069',
    orange5: '#ffa940',
    orange6: '#fa8c16',
    orange7: '#d46b08',
    orange8: '#ad4e00',
    orange9: '#873800',
    orange10: '#612500',
    yellow1: '#feffe6',
    yellow2: '#ffffb8',
    yellow3: '#fffb8f',
    yellow4: '#fff566',
    yellow5: '#ffec3d',
    yellow6: '#fadb14',
    yellow7: '#d4b106',
    yellow8: '#ad8b00',
    yellow9: '#876800',
    yellow10: '#614700',
    volcano1: '#fff2e8',
    volcano2: '#ffd8bf',
    volcano3: '#ffbb96',
    volcano4: '#ff9c6e',
    volcano5: '#ff7a45',
    volcano6: '#fa541c',
    volcano7: '#d4380d',
    volcano8: '#ad2102',
    volcano9: '#871400',
    volcano10: '#610b00',
    geekblue1: '#f0f5ff',
    geekblue2: '#d6e4ff',
    geekblue3: '#adc6ff',
    geekblue4: '#85a5ff',
    geekblue5: '#597ef7',
    geekblue6: '#2f54eb',
    geekblue7: '#1d39c4',
    geekblue8: '#10239e',
    geekblue9: '#061178',
    geekblue10: '#030852',
    gold1: '#fffbe6',
    gold2: '#fff1b8',
    gold3: '#ffe58f',
    gold4: '#ffd666',
    gold5: '#ffc53d',
    gold6: '#faad14',
    gold7: '#d48806',
    gold8: '#ad6800',
    gold9: '#874d00',
    gold10: '#613400',
    lime1: '#fcffe6',
    lime2: '#f4ffb8',
    lime3: '#eaff8f',
    lime4: '#d3f261',
    lime5: '#bae637',
    lime6: '#a0d911',
    lime7: '#7cb305',
    lime8: '#5b8c00',
    lime9: '#3f6600',
    lime10: '#254000',
  };
  return (
    <Space direction="vertical">
      <Space direction="vertical">
        <Space>
          <Link href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} hoverable={false} />
          <Link href="https://github.com/heiemooa" target="_blank">
            Link
          </Link>
          <Link href="https://github.com/heiemooa" target="_blank" icon={<IconLink />}>
            Link
          </Link>
          <Link href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} disabled>
            Disabled Link
          </Link>
        </Space>
        <Space>
          <Link status="danger" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} />
          <Link status="danger" href="https://github.com/heiemooa" target="_blank">
            Link
          </Link>
          <Link status="danger" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />}>
            Link
          </Link>
          <Link status="danger" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} disabled>
            Disabled Link
          </Link>
        </Space>
        <Space>
          <Link status="success" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} />
          <Link status="success" href="https://github.com/heiemooa" target="_blank">
            Link
          </Link>
          <Link status="success" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />}>
            Link
          </Link>
          <Link status="success" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} disabled>
            Disabled Link
          </Link>
        </Space>
        <Space>
          <Link status="warning" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} />
          <Link status="warning" href="https://github.com/heiemooa" target="_blank">
            Link
          </Link>
          <Link status="warning" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />}>
            Link
          </Link>
          <Link status="warning" href="https://github.com/heiemooa" target="_blank" icon={<IconLink />} disabled>
            Disabled Link
          </Link>
        </Space>
      </Space>
      <Space direction="vertical">
        {map(
          ['purple', 'cyan', 'green', 'magenta', 'pink', 'red', 'orange', 'yellow', 'volcano', 'geekblue'],
          (item, index) => (
            <Space key={index}>
              <div style={{ width: 80, height: 50, background: obj[item] }}>
                <div>{item}</div>
                {obj[item]}
              </div>
              {map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], i => (
                <div key={i} style={{ width: 80, height: 50, background: obj[`${item}${i}`] }}>
                  {obj[`${item}${i}`]}
                </div>
              ))}
            </Space>
          ),
        )}
      </Space>
    </Space>
  );
};

export default App;
