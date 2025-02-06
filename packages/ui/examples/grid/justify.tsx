import React from 'react';
import { Divider, Grid, Space } from '@emooa/ui';
import './index.less';

const { Row, Col } = Grid;

const App: React.FC = () => {
  return (
    <Space className="grid-demo-background" direction="vertical">
      <Divider>容器左排列</Divider>

      <Row className="grid-demo" justify="start">
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
      </Row>
      <Divider>容器居中排列</Divider>
      <Row className="grid-demo" justify="center">
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
      </Row>
      <Divider>容器右排列</Divider>
      <Row className="grid-demo" justify="end">
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
      </Row>
      <Divider>容器分散排列</Divider>
      <Row className="grid-demo" justify="space-around">
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
      </Row>
      <Divider>容器等距排列</Divider>
      <Row className="grid-demo" justify="space-between">
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
        <Col span={4}>
          <div>col - 4</div>
        </Col>
      </Row>
    </Space>
  );
};

export default App;
