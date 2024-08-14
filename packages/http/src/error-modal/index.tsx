import { IconCopy, IconDown, IconRight } from '@emooa/icon';
import { ConfigProvider, Modal } from '@emooa/ui';
import React from 'react';
import { useState } from 'react';
import { ErrorModalOption, Options } from '../interface';
import { Locale } from '../_locale/interface';

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
      <p style={{ fontSize: 12, color: '#555', marginBottom: 8 }} onClick={() => setShow(!show)}>
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
  private instance;
  private locale: Locale;
  private colorPrimary: React.CSSProperties['color'];
  private modal: Options['modal'];
  constructor(locale: Locale, colorPrimary: React.CSSProperties['color'], modal: Options['modal'] = {}) {
    this.locale = locale;
    this.colorPrimary = colorPrimary;
    this.modal = modal;
  }

  show({ message, title, code, config }: ErrorModalOption) {
    if (this.instance) return;

    const { onOk, content, info, ...rest } = this.modal;

    if (info?.[code]) {
      const { onOk: onOkInfo, ...restInfo } = info[code];
      this.instance = Modal.info({
        title: this.locale.title.hint,
        autoFocus: false,
        content: info[code].content || message,
        onOk: e => {
          this.instance = null;
          onOkInfo?.(e);
        },
        okText: this.locale.ok,
        footer: (cancelButtonNode, okButtonNode) => {
          return [
            <ConfigProvider
              key={1}
              theme={{
                token: {
                  colorPrimary: this.colorPrimary,
                },
              }}
            >
              {okButtonNode}
            </ConfigProvider>,
          ];
        },
        ...restInfo,
      });
    } else {
      this.instance = Modal.error({
        title,
        autoFocus: false,
        content: content || (
          <Comp code={code} message={message} config={config} colorPrimary={this.colorPrimary} locale={this.locale} />
        ),
        onOk: e => {
          this.instance = null;
          onOk?.(e);
        },
        okText: this.locale.ok,
        footer: (cancelButtonNode, okButtonNode) => {
          return [
            <ConfigProvider
              key={1}
              theme={{
                token: {
                  colorPrimary: this.colorPrimary,
                },
              }}
            >
              {okButtonNode}
            </ConfigProvider>,
          ];
        },
        ...rest,
      });
    }
  }
}

export default ErrorDialog;
