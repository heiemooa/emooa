import { IconCopy, IconDown, IconRight } from '@emooa/icon';
import { Modal } from '@emooa/ui';
import React from 'react';
import { useState } from 'react';

const Comp = ({ errorMsg, code, config }) => {
  const [show, setShow] = useState(false);
  const copy = e => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    // message.success(formatMessage({ id: 'common.copy.successful' }));
  };

  return (
    <div className="pt-20 pb-10">
      <p className="mb-4">{errorMsg}</p>
      <p style={{ fontSize: 12, color: '#555', marginBottom: 4 }} onClick={() => setShow(!show)}>
        <span
          dangerouslySetInnerHTML={{
            __html: `错误详情（错误码：<span class="color-primary">${code}</span>)`,
          }}
        />
        <span className="cursor-pointer mr-20">{show ? <IconDown /> : <IconRight />}</span>
        <span className="color-primary cursor-pointer " onClick={copy}>
          <span>复制</span>
          <IconCopy />
        </span>
      </p>
      {show && (
        <div
          style={{
            background: '#eee',
            padding: 10,
            maxHeight: 200,
            overflow: 'scroll',
            wordBreak: 'break-all',
          }}
        >
          <code
            style={{
              color: '#777',
              whiteSpace: 'break-spaces',
            }}
          >
            {JSON.stringify(config, null, 2)}
          </code>
        </div>
      )}
    </div>
  );
};
class ErrorDialog {
  instance;
  constructor() {}

  show({ message, title, code, config }) {
    if (this.instance) return;

    this.instance = Modal.error({
      title,
      style: { top: 140 },
      content: <Comp code={code} errorMsg={message} config={config} />,
      onOk: () => {
        this.instance = null;
      },
      okText: '确定',
    });
  }
}

export default ErrorDialog;