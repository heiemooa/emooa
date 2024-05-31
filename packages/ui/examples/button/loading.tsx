import React, { useState } from 'react';
import { Space, Button } from '@emooa/ui';
import { IconPlus } from '@emooa/icon';

const App: React.FC = () => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);

  function onClickBtn1() {
    setLoading1(true);
    setTimeout(() => {
      setLoading1(false);
    }, 4000);
  }

  function onClickBtn2() {
    setLoading2(true);
    setTimeout(() => {
      setLoading2(false);
    }, 4000);
  }

  function onClickBtn3() {
    setLoading3(true);
    setTimeout(() => {
      setLoading3(false);
    }, 4000);
  }

  function onClickBtn4() {
    setLoading4(true);
    setTimeout(() => {
      setLoading4(false);
    }, 4000);
  }

  function onClickBtn5() {
    setLoading5(true);
    setTimeout(() => {
      setLoading5(false);
    }, 4000);
  }

  function onClickBtn6() {
    setLoading6(true);
    setTimeout(() => {
      setLoading6(false);
    }, 4000);
  }

  return (
    <Space direction="vertical">
      <Space>
        <Button type="primary" loading>
          Primary
        </Button>
        <Button type="text" loading>
          Text
        </Button>
        <Button type="primary" icon={<IconPlus />} loading />
        <Button type="text" icon={<IconPlus />} loading />
      </Space>
      <Space>
        <Button type="primary" loading={loading1} onClick={onClickBtn1}>
          Primary
        </Button>
        <Button type="text" loading={loading2} onClick={onClickBtn2}>
          Text
        </Button>
        <Button type="primary" icon={<IconPlus />} loading={loading3} onClick={onClickBtn3} />
        <Button type="text" loading={loading6} onClick={onClickBtn6} icon={<IconPlus />} />
      </Space>
      <Space>
        <Button type="primary" loading={loading4} onClick={onClickBtn4} icon={<IconPlus />}>
          Primary
        </Button>
        <Button type="text" loading={loading5} onClick={onClickBtn5} icon={<IconPlus />}>
          Text
        </Button>
      </Space>
    </Space>
  );
};

export default App;
