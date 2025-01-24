import React from 'react';
import { Divider, Grid, Space } from '@emooa/ui';
import './index.less';

const { Row, Col } = Grid;

const App: React.FC = () => {
  return (
    <Space className="grid-demo-background" direction="vertical">
      <Divider>垂直顶部对齐</Divider>
      <Row className="grid-demo" align="start">
        <Col span={6} style={{ height: 90, lineHeight: '90px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 48, lineHeight: '48px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 120, lineHeight: '120px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 60, lineHeight: '60px' }}>
          <div>col - 6</div>
        </Col>
      </Row>
      <Divider>垂直居中对齐</Divider>
      <Row className="grid-demo" align="center">
        <Col span={6} style={{ height: 90, lineHeight: '90px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 48, lineHeight: '48px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 120, lineHeight: '120px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 60, lineHeight: '60px' }}>
          <div>col - 6</div>
        </Col>
      </Row>
      <Divider>垂直底部对齐</Divider>
      <Row className="grid-demo" align="end">
        <Col span={6} style={{ height: 90, lineHeight: '90px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 48, lineHeight: '48px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 120, lineHeight: '120px' }}>
          <div>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 60, lineHeight: '60px' }}>
          <div>col - 6</div>
        </Col>
      </Row>
    </Space>
  );
};

export default App;
