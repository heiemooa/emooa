import React, { useRef, useState } from 'react';
import { Backtop, Button, Space } from '../../../components';

type Animation = 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom';

const App: React.FC = () => {
  const ref = useRef(null);
  const [animation, setAnimation] = useState<Animation>('fade');
  const [location, setLocation] = useState('rightBottom');

  const styles = {
    rightBottom: {
      top: 'auto',
      left: 'auto',
      right: 30,
      bottom: 30,
    },
    leftBottom: {
      top: 'auto',
      right: 'auto',
      left: 30,
      bottom: 30,
    },
    rightTop: {
      bottom: 'auto',
      left: 'auto',
      right: 30,
      top: 30,
    },
    leftTop: {
      bottom: 'auto',
      right: 'auto',
      left: 30,
      top: 30,
    },
  };

  const getRender = () => {
    const elements: JSX.Element[] = [];
    for (let i = 1; i < 50; i++) {
      elements.push(<p key={i}>This is Backtop Content</p>);
    }
    return elements;
  };

  return (
    <div style={{ position: 'relative', padding: '8px 12px', background: '#fefefe', color: '#555' }}>
      <Space direction="vertical">
        <Space>
          动画：
          <Button.Group>
            <Button onClick={() => setAnimation('fade')} type={animation === 'fade' ? 'primary' : 'dashed'}>
              Fade
            </Button>
            <Button onClick={() => setAnimation('fade-up')} type={animation === 'fade-up' ? 'primary' : 'dashed'}>
              Fade Up
            </Button>
            <Button onClick={() => setAnimation('fade-down')} type={animation === 'fade-down' ? 'primary' : 'dashed'}>
              Fade Down
            </Button>
            <Button onClick={() => setAnimation('fade-left')} type={animation === 'fade-left' ? 'primary' : 'dashed'}>
              Fade Left
            </Button>
            <Button onClick={() => setAnimation('fade-right')} type={animation === 'fade-right' ? 'primary' : 'dashed'}>
              Fade Right
            </Button>
            <Button onClick={() => setAnimation('zoom')} type={animation === 'zoom' ? 'primary' : 'dashed'}>
              Zoom
            </Button>
          </Button.Group>
        </Space>
        <Space>
          位置：
          <Button.Group>
            <Button onClick={() => setLocation('rightBottom')} type={location === 'rightBottom' ? 'primary' : 'dashed'}>
              Right Bottom
            </Button>
            <Button onClick={() => setLocation('leftBottom')} type={location === 'leftBottom' ? 'primary' : 'dashed'}>
              Left Bottom
            </Button>
            <Button onClick={() => setLocation('rightTop')} type={location === 'rightTop' ? 'primary' : 'dashed'}>
              Right Top
            </Button>
            <Button onClick={() => setLocation('leftTop')} type={location === 'leftTop' ? 'primary' : 'dashed'}>
              Left Top
            </Button>
          </Button.Group>
        </Space>
      </Space>
      <Backtop style={{ position: 'absolute', ...styles[location] }} target={() => ref.current} animation={animation} />

      <div ref={ref} style={{ height: 300, overflow: 'auto' }}>
        {getRender()}
      </div>
    </div>
  );
};

export default App;
