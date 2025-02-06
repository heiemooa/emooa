import React from 'react';
import { Grid, Space } from '@emooa/ui';
import './index.less';

const { Row, Col } = Grid;

const App: React.FC = () => {
  return (
    <Space className="grid-demo-background" direction="vertical">
      <Row className="grid-demo">
        <Col flex="100px">
          <div>100px</div>
        </Col>
        <Col flex="auto">
          <div>auto</div>
        </Col>
      </Row>
      <Row className="grid-demo">
        <Col flex="100px">
          <div>100px</div>
        </Col>
        <Col flex="auto">
          <div>auto</div>
        </Col>
        <Col flex="100px">
          <div>100px</div>
        </Col>
      </Row>
      <Row className="grid-demo">
        <Col flex={3}>
          <div>3 / 12</div>
        </Col>
        <Col flex={4}>
          <div>4 / 12</div>
        </Col>
        <Col flex={5}>
          <div>5 / 12</div>
        </Col>
      </Row>
    </Space>
  );
};

export default App;
