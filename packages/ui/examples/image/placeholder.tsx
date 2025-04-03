import React from 'react';
import { Button, Divider, Image, Space } from '@emooa/ui';
import { IconLoading } from '@emooa/icon';

const App: React.FC = () => {
  const [timestamp, setTimestamp] = React.useState(0);

  return (
    <>
      <Button type="primary" onClick={() => setTimestamp(Date.now())}>
        Reload
      </Button>
      <Divider />
      <Space wrap>
        <Image
          motion
          src={`https://api.emooa.com/aimg?timestamp=${timestamp}`}
          height={120}
          width={200}
          placeholder
          description="默认占位符"
        />
        <Image
          motion
          src={`https://api.emooa.com/aimg?timestamp=${timestamp}`}
          placeholder="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRQBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIAAkAEAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AG6JYW2i6YLHTNBV9amiDzSyrxFnOWOegAyeor8Mk/bzcUmckMBi8XUjRpUneTSWm7ZkfFHwlaT6LdyJbR+VYhRLdxw4yxAPzAdDkn8q9CHtYS5d0j18+yDEZBWp4eo+ZSjzX6btNfK34o3Lf/kaNS/6+n/9DNctP+M/n+h/XeVf8inC/wCCH/ptFvw9/wAij8Q/+vK1/wDSe4r1sLs/Q/O/FD+BhvWf/pUD/9k="
          height={120}
          width={200}
          description="图片占位符"
        />
        <Image motion placeholder height={120} width={200} description="图片占位符" />
        <Image
          motion
          src={`https://api.emooa.com/aimg?timestamp=${timestamp}`}
          placeholder={
            <div className="eui-image-loader-spin">
              <IconLoading />
              <p>加载中..</p>
            </div>
          }
          height={120}
          width={200}
          description="节点占位符"
        />

        <Image
          motion
          src={`https://api.emooa.com/aimg?timestamp=${timestamp}`}
          placeholder={false}
          height={120}
          width={200}
          description="无占位符"
        />
      </Space>
    </>
  );
};

export default App;
