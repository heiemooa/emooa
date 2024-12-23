import { IconCheck, IconCloseCircleFill, IconCopy, IconDown, IconInfoCircleFill, IconRight } from '@emooa/icon';
import { ConfigProvider, Modal, App, ModalProps, Copy, Link } from '@emooa/ui';
import { render as ReactDOMRender } from '@emooa/ui/esm/_utils/react-dom';
import React, { useContext } from 'react';
import { useState } from 'react';
import { ErrorModalOption, Options } from '../interface';
import { Locale } from '../_locale/interface';
import * as locales from '../_locale';
import { ConfigContext } from '@emooa/ui/esm/config-provider/context';

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
  const [show, setShow] = useState(false);

  const { theme } = useContext(ConfigContext);

  const colorPrimary = theme?.token?.colorPrimary || '#1677ff';

  return (
    <>
      <p style={{ marginBottom: 4, paddingTop: 0 }}>{msg}</p>
      <p style={{ fontSize: 12, color: '#555', marginBottom: 8 }} onClick={() => setShow(!show)}>
        <span
          dangerouslySetInnerHTML={{
            __html: locale.detail(code, colorPrimary),
          }}
        />
        <span
          style={{
            cursor: 'pointer',
            marginRight: 10,
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
          icon={[<Link icon={<IconCopy />}>{locale.copy}</Link>, <Link icon={<IconCheck />}>{locale.copy}</Link>]}
          onCopy={() => {
            message.success(locale.copy_success);
          }}
        />
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

export default (options: Options) => {
  const { locale: _locale, colorPrimary, modal } = options;

  let root;
  const div = document.createElement('div');

  function render(props) {
    const { content, ...rest } = props;
    const dom = (
      <ConfigProvider theme={{ token: { colorPrimary } }}>
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
