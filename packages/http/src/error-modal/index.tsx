import { IconCheck, IconCloseCircleFill, IconCopy, IconDown, IconInfoCircleFill, IconRight } from '@emooa/icon';
import { ConfigProvider, Modal, App, ModalProps, Copy, Link, Theme } from '@emooa/ui';
import { render as ReactDOMRender } from '@emooa/ui/esm/_utils/react-dom';
import React from 'react';
import { useState } from 'react';
import { ErrorModalOption, Options } from '../interface';
import { Locale } from '../_locale/interface';
import * as locales from '../_locale';

const { useToken } = Theme;

const Comp = ({
  msg,
  code,
  config,
  locale,
}: {
  msg: string;
  code: string | number;
  locale: Locale;
  config: ErrorModalOption['config'];
}) => {
  const { message } = App.useApp();
  const { token } = useToken();
  const [show, setShow] = useState(false);
  console.log('token', token);

  return (
    <>
      <p style={{ marginBottom: 4, paddingTop: 0 }}>{msg}</p>
      <div
        style={{ fontSize: token.fonts.fontSizeSM, color: token.colorText, marginBottom: token.margins.XS }}
        onClick={() => setShow(!show)}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: locale.detail(code, token?.colorPrimary),
          }}
        />
        <span
          style={{
            cursor: 'pointer',
            marginRight: token.margins.SM,
          }}
        >
          {show ? <IconDown /> : <IconRight />}
        </span>
        <Copy
          text={JSON.stringify(config, null, 2)}
          onClick={e => {
            e.stopPropagation();
          }}
          style={{ display: 'inline-block' }}
          icon={[
            <Link icon={<IconCopy />}>{locale.copy}</Link>,
            <Link status="success" icon={<IconCheck />}>
              {locale.copy}
            </Link>,
          ]}
          onCopy={() => {
            message.success(locale.copy_success);
          }}
        />
      </div>
      {show && (
        <div
          style={{
            background: token.colorBgContainer,
            padding: 10,
            maxHeight: 200,
            overflow: 'scroll',
            wordBreak: 'break-all',
          }}
        >
          <code
            style={{
              color: token.colorTextTertiary,
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

export default (options: Options) => {
  const { locale: _locale, colorPrimary, modal, scheme } = options;

  let root;
  const div = document.createElement('div');

  function render(props) {
    const { content, ...rest } = props;
    const dom = (
      <ConfigProvider theme={{ token: { colorPrimary } }} scheme={scheme}>
        <Modal {...rest}>
          <App>{content}</App>
        </Modal>
      </ConfigProvider>
    );
    if (root) {
      root.render(dom);
    } else {
      root = ReactDOMRender(dom, div);
    }
  }

  function destroy() {
    root = root?._unmount();

    if (div.parentNode) {
      div.parentNode.removeChild(div);
    }
    root = null;
  }

  return ({ message, title, code, config }) => {
    if (root) return;

    const locale: Locale = locales[_locale];

    const { onOk, info, style, styles, ...rest } = modal;

    const modalConfig: ModalProps = {
      open: true,
      style: Object.assign({}, { width: 420 }, style),
      styles: Object.assign({}, { content: { paddingBlock: 0, marginLeft: '1.625rem' } }, styles),
      autoFocus: false,
      closeIcon: false,
    };

    function close() {
      modalConfig.open = false;
      modalConfig.afterClose = () => {
        destroy();
      };
      render(modalConfig);
    }

    if (info?.[code]) {
      const { onOk: onOkInfo, style: styleInfo, styles: stylesInfo, ...restInfo } = info[code];
      render(
        Object.assign(
          modalConfig,
          {
            title: (
              <span>
                <IconInfoCircleFill />
                {locale.title.hint}
              </span>
            ),
            style: Object.assign({}, modalConfig.style, styleInfo),
            styles: Object.assign({}, modalConfig.styles, stylesInfo),
            content: message,
            onOk: e => {
              onOkInfo?.(e);
              close();
            },
            okText: locale.ok,
            footer: (cancelButtonNode, okButtonNode) => {
              return [React.cloneElement(okButtonNode, { key: 1 })];
            },
          },
          restInfo,
        ),
      );
    } else {
      render(
        Object.assign(
          modalConfig,
          {
            title: (
              <span>
                <IconCloseCircleFill />
                {title}
              </span>
            ),
            content: <Comp code={code} msg={message} config={config} locale={locale} />,
            onOk: e => {
              onOk?.(e);
              close();
            },
            okText: locale.ok,
            footer: (cancelButtonNode, okButtonNode) => {
              return [React.cloneElement(okButtonNode, { key: 1 })];
            },
          },
          rest,
        ),
      );
    }
  };
};
