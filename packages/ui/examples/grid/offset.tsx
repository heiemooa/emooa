import React from 'react';
import { Grid, Space } from '@emooa/ui';
import './index.less';

const { Row, Col } = Grid;

const App: React.FC = () => {
  return (
    <Space direction="vertical" className="grid-demo-background">
      <Row className="grid-demo">
        <Col span={8}>col - 8</Col>
        <Col span={8} offset={8}>
          col - 8 | offset - 8
        </Col>
      </Row>
      <Row className="grid-demo">
        <Col span={6} offset={8}>
          col - 6 | offset - 8
        </Col>
        <Col span={6} offset={4}>
          col - 6 | offset - 4
        </Col>
      </Row>
      <Row className="grid-demo">
        <Col span={12} offset={8}>
          col - 12 | offset - 8
        </Col>
      </Row>
    </Space>
  );
};

export default App;
