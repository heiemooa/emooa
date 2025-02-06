import React from 'react';
import { Grid, Space } from '@emooa/ui';
import './index.less';

const { Row, Col } = Grid;

const App: React.FC = () => {
  return (
    <Space className="grid-demo-background" direction="vertical">
      <Row className="grid-demo">
        <Col span={24}>
          <div>24 - 100%</div>
        </Col>
      </Row>
      <Row className="grid-demo">
        <Col span={12}>
          <div>12 - 50%</div>
        </Col>
        <Col span={12}>
          <div>12 - 50%</div>
        </Col>
      </Row>
      <Row className="grid-demo">
        <Col span={8}>
          <div>8 - 33.33%</div>
        </Col>
        <Col span={8}>
          <div>8 - 33.33%</div>
        </Col>
        <Col span={8}>
          <div>8 - 33.33%</div>
        </Col>
      </Row>
      <Row className="grid-demo">
        <Col span={6}>
          <div>6 - 25%</div>
        </Col>
        <Col span={6}>
          <div>6 - 25%</div>
        </Col>
        <Col span={6}>
          <div>6 - 25%</div>
        </Col>
        <Col span={6}>
          <div>6 - 25%</div>
        </Col>
      </Row>
      <Row className="grid-demo">
        <Col span={4}>
          <div>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div>4 - 16.66%</div>
        </Col>
      </Row>
    </Space>
  );
};

export default App;
