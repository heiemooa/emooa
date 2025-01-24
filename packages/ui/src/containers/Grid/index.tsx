import React from 'react';
import { ConfigProvider, Grid } from '../../../components';

const { Row, Col } = Grid;

const App: React.FC = () => {
  return (
    <Row gutter={24}>
      <Col span={24}>
        <div style={{ background: 'gray' }}>24 - 100%</div>
      </Col>
      <Col span={24}>
        <div style={{ background: 'gray' }}>24 - 100%</div>
      </Col>
    </Row>
  );
};

export default App;
