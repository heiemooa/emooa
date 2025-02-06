import React from 'react';
import { Grid, Space } from '@emooa/ui';
import './index.less';

const { Row, Col } = Grid;

const App: React.FC = () => {
  return (
    <Space className="grid-demo-background" direction="vertical">
      <Row className="grid-demo">
        <Col xs={2} sm={4} md={6} lg={8} xl={10} xxl={8}>
          Col
        </Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={4} xxl={8}>
          Col
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10} xxl={8}>
          Col
        </Col>
      </Row>
    </Space>
  );
};

export default App;
