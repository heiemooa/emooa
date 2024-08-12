import { IconCopy, IconDown, IconRight } from '@emooa/icon';
import { Modal } from '@emooa/ui';
import React from 'react';
import { useState } from 'react';
import locale from '@/_locale';

const Comp = ({ errorMsg, code, config }) => {
  const [show, setShow] = useState(false);
  const copy = e => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    // message.success(formatMessage({ id: 'common.copy.successful' }));
  };

  return (
    <div style={{ paddingTop: 20, paddingBottom: 10 }}>
      <p style={{ marginBottom: 4, paddingTop: 0 }}>{errorMsg}</p>
      <p style={{ fontSize: 12, color: '#555', marginBottom: 4 }} onClick={() => setShow(!show)}>
        <span
          dangerouslySetInnerHTML={{
            __html: locale.detail(code),
          }}
        />
        <span
          style={{
            cursor: 'pointer',
            marginRight: 16,
          }}
        >
          {show ? <IconDown /> : <IconRight />}
        </span>
        <span
          className="text-primary"
          style={{
            cursor: 'pointer',
          }}
          onClick={copy}
        >
          <span>{locale.copy}</span>
          <IconCopy style={{ marginLeft: 4 }} />
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
    });
  }
}

export default ErrorDialog;
