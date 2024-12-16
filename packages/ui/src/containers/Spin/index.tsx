import Button from '@/button';
import Image from '@/image';
import Space from '@/space';
import Theme from '@/_theme';
import Spin from '@/spin';

import { IconDownload, IconEye } from '@emooa/icon';
import React, { useState } from 'react';

const token = Theme.getToken();
console.log(token);

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      <div>
        <Button onClick={() => setLoading(!loading)} style={{ marginBottom: 10 }}>
          Loading: {`${loading}`}
        </Button>
      </div>
      <Space>
        <Spin loading={loading} />
        <Spin loading={loading} dot tip="tip" />
      </Space>

      <Spin tip="Loading" loading={loading} size="mini" dot>
        <Space direction="horizontal">
          <Image
            height={200}
            width={300}
            src="https://api.emooa.com/aimg?idx=1"
            title="A user’s avatar"
            description="Click me to preview image"
            actions={[
              <Button
                key="1"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('visible');
                }}
                type="text"
                style={{ color: '#fff' }}
                icon={<IconEye />}
              />,
              <Button
                key="2"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('download');
                }}
                style={{ color: '#fff' }}
                type="text"
                icon={<IconDownload />}
              />,
            ]}
          />
          <Image
            height={200}
            width={300}
            src="https://api.emooa.com/aimg?idx=1"
            preview={false}
            title="A user’s avatar"
            actions={[
              <Button
                key="2"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('download');
                }}
                style={{ color: '#fff' }}
                type="text"
                icon={<IconDownload />}
              />,
            ]}
          />
        </Space>
      </Spin>
      <Spin tip="Loading" loading={loading} size="small" dot>
        <Space direction="horizontal">
          <Image
            height={200}
            width={300}
            src="https://api.emooa.com/aimg?idx=1"
            title="A user’s avatar"
            description="Click me to preview image"
            actions={[
              <Button
                key="1"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('visible');
                }}
                type="text"
                style={{ color: '#fff' }}
                icon={<IconEye />}
              />,
              <Button
                key="2"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('download');
                }}
                style={{ color: '#fff' }}
                type="text"
                icon={<IconDownload />}
              />,
            ]}
          />
          <Image
            height={200}
            width={300}
            src="https://api.emooa.com/aimg?idx=1"
            preview={false}
            title="A user’s avatar"
            actions={[
              <Button
                key="2"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('download');
                }}
                style={{ color: '#fff' }}
                type="text"
                icon={<IconDownload />}
              />,
            ]}
          />
        </Space>
      </Spin>
      <Spin tip="Loading" loading={loading} size="medium" dot>
        <Space direction="horizontal">
          <Image
            height={200}
            width={300}
            src="https://api.emooa.com/aimg?idx=1"
            title="A user’s avatar"
            description="Click me to preview image"
            actions={[
              <Button
                key="1"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('visible');
                }}
                type="text"
                style={{ color: '#fff' }}
                icon={<IconEye />}
              />,
              <Button
                key="2"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('download');
                }}
                style={{ color: '#fff' }}
                type="text"
                icon={<IconDownload />}
              />,
            ]}
          />
          <Image
            height={200}
            width={300}
            src="https://api.emooa.com/aimg?idx=1"
            preview={false}
            title="A user’s avatar"
            actions={[
              <Button
                key="2"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('download');
                }}
                style={{ color: '#fff' }}
                type="text"
                icon={<IconDownload />}
              />,
            ]}
          />
        </Space>
      </Spin>
      <Spin tip="Loading" loading={loading} size="large" dot>
        <Space direction="horizontal">
          <Image
            height={200}
            width={300}
            src="https://api.emooa.com/aimg?idx=1"
            title="A user’s avatar"
            description="Click me to preview image"
            actions={[
              <Button
                key="1"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('visible');
                }}
                type="text"
                style={{ color: '#fff' }}
                icon={<IconEye />}
              />,
              <Button
                key="2"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('download');
                }}
                style={{ color: '#fff' }}
                type="text"
                icon={<IconDownload />}
              />,
            ]}
          />
          <Image
            height={200}
            width={300}
            src="https://api.emooa.com/aimg?idx=1"
            preview={false}
            title="A user’s avatar"
            actions={[
              <Button
                key="2"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('download');
                }}
                style={{ color: '#fff' }}
                type="text"
                icon={<IconDownload />}
              />,
            ]}
          />
        </Space>
      </Spin>
      {/* <Space direction="horizontal">
        <Spin tip="loading" loading={loading}>
          <Image
            height={200}
            width={300}
            src="https://api.emooa.com/aimg?idx=1"
            title="A user’s avatar"
            description="Click me to preview image"
            actions={[
              <Button
                key="1"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('visible');
                }}
                type="text"
                style={{ color: '#fff' }}
                icon={<IconEye />}
              />,
              <Button
                key="2"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('download');
                }}
                style={{ color: '#fff' }}
                type="text"
                icon={<IconDownload />}
              />,
            ]}
          />
        </Spin>
        <Spin tip="loading" loading={loading}>
          <Image
            height={200}
            width={300}
            src="https://api.emooa.com/aimg?idx=1"
            preview={false}
            title="A user’s avatar"
            actions={[
              <Button
                key="2"
                size="small"
                className="image-demo-action-item"
                onClick={e => {
                  console.log('download');
                }}
                style={{ color: '#fff' }}
                type="text"
                icon={<IconDownload />}
              />,
            ]}
          />
        </Spin>
      </Space> */}
    </>
  );
}

export default App;
