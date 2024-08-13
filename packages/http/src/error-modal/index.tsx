import { IconCopy, IconDown, IconRight } from '@emooa/icon';
import { ConfigProvider, Modal } from '@emooa/ui';
import React from 'react';
import { useState } from 'react';
import { ErrorModalOption, Options } from '@/interface';
import { Locale } from '@/_locale/interface';

const Comp = ({
  message,
  code,
  config,
  colorPrimary,
  locale,
}: {
  message: string;
  code: string | number;
  colorPrimary: string;
  locale: Locale;
  config: ErrorModalOption['config'];
}) => {
  const [show, setShow] = useState(false);
  const copy = e => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    // message.success(formatMessage({ id: 'common.copy.successful' }));
  };

  return (
    <>
      <p style={{ marginBottom: 4, paddingTop: 0 }}>{message}</p>
      <p style={{ fontSize: 12, color: '#555', marginBottom: 4 }} onClick={() => setShow(!show)}>
        <span
          dangerouslySetInnerHTML={{
            __html: locale.detail(code, colorPrimary),
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
          style={{
            cursor: 'pointer',
            color: colorPrimary,
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
    </>
  );
};

class ErrorDialog {
  instance;
  locale: Locale;
  theme: Options['theme'];
  constructor(locale: Locale, theme: Options['theme']) {
    this.locale = locale;
    this.theme = theme;
  }

  show({ message, title, code, config }: ErrorModalOption) {
    if (this.instance) return;
    const { colorPrimary, ...style } = this.theme;

    this.instance = Modal.error({
      title,
      style,
      content: <Comp code={code} message={message} config={config} colorPrimary={colorPrimary} locale={this.locale} />,
      onOk: () => {
        this.instance = null;
      },
      okText: this.locale.ok,
      footer: (cancelButtonNode, okButtonNode) => {
        return [
          <ConfigProvider
            theme={{
              token: {
                colorPrimary,
              },
            }}
          >
            {okButtonNode}
          </ConfigProvider>,
        ];
      },
    });
  }
}

export default ErrorDialog;
