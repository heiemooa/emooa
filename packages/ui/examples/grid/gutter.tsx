import React from 'react';
import { Divider, Grid, Space } from '@emooa/ui';
import './index.less';

const { Row, Col } = Grid;

const App: React.FC = () => {
  return (
    <Space direction="vertical" className="grid-demo-background">
      <Divider orientation="left">Horizontal</Divider>
      <Row gutter={24}>
        <Col span={12} className="grid-demo">
          <div>col - 12</div>
        </Col>
        <Col span={12} className="grid-demo">
          <div>col - 12</div>
        </Col>
      </Row>
      <Divider orientation="left">Responsive</Divider>
      <Row gutter={{ md: 8, lg: 24, xl: 32 }}>
        <Col span={6} className="grid-demo">
          <div>col - 6</div>
        </Col>
        <Col span={6} className="grid-demo">
          <div>col - 6</div>
        </Col>
        <Col span={6} className="grid-demo">
          <div>col - 6</div>
        </Col>
        <Col span={6} className="grid-demo">
          <div>col - 6</div>
        </Col>
      </Row>
      <Divider orientation="left">Horizontal and Vertical</Divider>
      <Row gutter={[24, 12]}>
        <Col span={6} className="grid-demo">
          <div>col - 6</div>
        </Col>
        <Col span={6} className="grid-demo">
          <div>col - 6</div>
        </Col>
        <Col span={6} className="grid-demo">
          <div>col - 6</div>
        </Col>
        <Col span={6} className="grid-demo">
          <div>col - 6</div>
        </Col>
        <Col span={6} className="grid-demo">
          <div>col - 6</div>
        </Col>
        <Col span={6} className="grid-demo">
          <div>col - 6</div>
        </Col>
        <Col span={6} className="grid-demo">
          <div>col - 6</div>
        </Col>
        <Col span={6} className="grid-demo">
          <div>col - 6</div>
        </Col>
      </Row>
    </Space>
  );
};

export default App;
