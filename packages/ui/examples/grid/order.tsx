import React from 'react';
import { Grid, Space } from '@emooa/ui';
import './index.less';

const { Row, Col } = Grid;

const App: React.FC = () => {
  return (
    <Space className="grid-demo-background" direction="vertical">
      <Row className="grid-demo">
        <Col span={6} order={4}>
          <div>1 col-order-4</div>
        </Col>
        <Col span={6} order={3}>
          <div>2 col-order-3</div>
        </Col>
        <Col span={6} order={2}>
          <div>3 col-order-2</div>
        </Col>
        <Col span={6} order={1}>
          <div>4 col-order-1</div>
        </Col>
      </Row>
    </Space>
  );
};

export default App;
