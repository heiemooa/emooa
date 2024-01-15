import React from 'react';
import { Image } from '@emooa/ui';

export default () => (
  <div style={{ display: 'flex', textAlign: 'center' }}>
    <div style={{ marginRight: 10 }}>
      <Image
        src="https://api.emooa.com/aimg?idx=3"
        placeholder="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRQBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIAAkAEAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOC+Kktwul6VNamROXMcxYbyhzgZBPHJ79+3Sv5+yipzylSqO/Klp0X5H3+Oco04uP39Sj8LLiUXGrSX7vcJDZtIvmNuO4fMMZ/i4Na5ukowVPS8kjDASac5Td7Rf9ep6F4G/wCRJ0f/AK5D+Qr5DMP9+q+p7+Xf7vH0IPFX/INtP+un/srV3YT45en6onH/AMJev+Z//9k="
        height={150}
      />
      <p>修改占位符</p>
    </div>
    <div>
      <Image
        src="https://api.emooa.com/aimg?idx=3"
        placeholder={false}
        height={150}
      />
      <p>无占位符</p>
    </div>
  </div>
);
