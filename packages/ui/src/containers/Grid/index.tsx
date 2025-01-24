import React, { CSSProperties } from 'react';
import { ConfigProvider, Divider, Grid, Space } from '../../../components';

const { Row, Col } = Grid;

const style = {
  background: '#ddd',
  textAlign: 'center',
  paddingBlock: 4,
} as CSSProperties;

const App: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <div style={style}>24 - 100%</div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div style={style}>12 - 50%</div>
        </Col>
        <Col span={12}>
          <div style={style}>12 - 50%</div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div style={style}>8 - 33.33%</div>
        </Col>
        <Col span={8}>
          <div style={style}>8 - 33.33%</div>
        </Col>
        <Col span={8}>
          <div style={style}>8 - 33.33%</div>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <div style={style}>6 - 25%</div>
        </Col>
        <Col span={6}>
          <div style={style}>6 - 25%</div>
        </Col>
        <Col span={6}>
          <div style={style}>6 - 25%</div>
        </Col>
        <Col span={6}>
          <div style={style}>6 - 25%</div>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <div style={style}>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div style={style}>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div style={style}>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div style={style}>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div style={style}>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div style={style}>4 - 16.66%</div>
        </Col>
      </Row>
      <Row gutter={[24, 12]}>
        <Col span={4}>
          <div style={style}>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div style={style}>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div style={style}>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div style={style}>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div style={style}>4 - 16.66%</div>
        </Col>
        <Col span={4}>
          <div style={style}>4 - 16.66%</div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>col - 8</Col>
        <Col span={8} offset={8}>
          col - 8 | offset - 8
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={8}>
          col - 6 | offset - 8
        </Col>
        <Col span={6} offset={4}>
          col - 6 | offset - 4
        </Col>
      </Row>
      <Row style={{ backgroundColor: 'var(--color-fill-2)' }}>
        <Col span={12} offset={8}>
          col - 12 | offset - 8
        </Col>
      </Row>
      <Row>
        <Col span={18} push={6}>
          col-18 col-push-6
        </Col>
        <Col span={6} pull={18}>
          col-6 col-pull-18
        </Col>
      </Row>
      <p>容器左排列</p>
      <Row justify="start">
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
      </Row>
      <p>容器居中排列</p>
      <Row justify="center">
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
      </Row>
      <p>
        <>容器右排列</>
      </p>
      <Row justify="end">
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
      </Row>
      <p>
        <>容器分散排列</>
      </p>
      <Row justify="space-around">
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
      </Row>
      <p>
        <>容器等距排列</>
      </p>
      <Row justify="space-between">
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
        <Col span={4}>
          <div style={style}>col - 4</div>
        </Col>
      </Row>
      <Divider orientation="left">Horizontal</Divider>

      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
      <Divider orientation="left">Responsive</Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
      <Divider orientation="left">Vertical</Divider>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
      <Row className="grid-demo">
        <Col span={6} order={4}>
          <div style={style}>1 col-order-4</div>
        </Col>
        <Col span={6} order={3}>
          <div style={style}>2 col-order-3</div>
        </Col>
        <Col span={6} order={2}>
          <div style={style}>3 col-order-2</div>
        </Col>
        <Col span={6} order={1}>
          <div style={style}>4 col-order-1</div>
        </Col>
      </Row>
      <Row className="grid-demo">
        <Col style={style} xs={2} sm={4} md={6} lg={8} xl={10} xxl={8}>
          Col
        </Col>
        <Col style={{ ...style, background: '#999' }} xs={20} sm={16} md={12} lg={8} xl={4} xxl={8}>
          Col
        </Col>
        <Col style={style} xs={2} sm={4} md={6} lg={8} xl={10} xxl={8}>
          Col
        </Col>
      </Row>
      <Row className="grid-demo">
        <Col flex="100px">
          <div style={style}>100px</div>
        </Col>
        <Col flex="auto">
          <div style={{ ...style, background: '#999' }}>auto</div>
        </Col>
      </Row>
      <Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Col flex="100px">
          <div style={style}>100px</div>
        </Col>
        <Col flex="auto">
          <div style={{ ...style, background: '#999' }}>auto</div>
        </Col>
        <Col flex="100px">
          <div style={style}>100px</div>
        </Col>
      </Row>
      <Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Col flex={3}>
          <div style={style}>3 / 12</div>
        </Col>
        <Col flex={4}>
          <div style={{ ...style, background: '#999' }}>4 / 12</div>
        </Col>
        <Col flex={5}>
          <div style={style}> 5 / 12</div>
        </Col>
      </Row>
      <p>
        <>垂直顶部对齐</>
      </p>
      <Row className="grid-demo" align="start">
        <Col span={6} style={{ height: 90, lineHeight: '90px' }}>
          <div style={style}>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 48, lineHeight: '48px' }}>
          <div style={style}>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 120, lineHeight: '120px' }}>
          <div style={style}>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 60, lineHeight: '60px' }}>
          <div style={style}>col - 6</div>
        </Col>
      </Row>
      <p>
        <>垂直居中对齐</>
      </p>
      <Row className="grid-demo" align="center">
        <Col span={6} style={{ height: 90, lineHeight: '90px' }}>
          <div style={style}>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 48, lineHeight: '48px' }}>
          <div style={style}>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 120, lineHeight: '120px' }}>
          <div style={style}>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 60, lineHeight: '60px' }}>
          <div style={style}>col - 6</div>
        </Col>
      </Row>
      <p>
        <>垂直底部对齐</>
      </p>
      <Row className="grid-demo" align="end">
        <Col span={6} style={{ height: 90, lineHeight: '90px' }}>
          <div style={style}>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 48, lineHeight: '48px' }}>
          <div style={style}>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 120, lineHeight: '120px' }}>
          <div style={style}>col - 6</div>
        </Col>
        <Col span={6} style={{ height: 60, lineHeight: '60px' }}>
          <div style={style}>col - 6</div>
        </Col>
      </Row>
    </Space>
  );
};

export default App;
