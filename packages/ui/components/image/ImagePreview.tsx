import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ImagePreviewProps } from './interface';
import { ConfigProviderProps } from '@/config-provider/interface';
import { ConfigContext } from '@/config-provider';
import useValue from '@/_utils/hooks/useValue';
import Portal from '@/portal';
import classNames from 'classnames';
import useImageStatus from './utils/hooks/useImageStatus';
import useToken from '@/_theme/useToken';
import { off, on } from '@/_utils/dom';
import { WheelEvent } from 'react';
import PreviewScales, { defaultScales } from './utils/getScale';
import getFixTranslate from './utils/getFixTranslate';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Esc } from '@/_utils/keycode';
import { isEmptyObject } from '@/_utils/is';
import {
  IconFullscreen,
  IconRotateRight,
  IconRotateLeft,
  IconZoomIn,
  IconZoomOut,
  IconOriginalSize,
  IconLoading,
  IconClose,
} from '@emooa/icon';
import ImagePreviewTools from './ImagePreviewTools';
import useStyle from './style';
import ImagePreviewArrow from './ImagePreviewArrow';
import { PreviewGroupContext } from './previewGroupContext';
import useOverflowHidden from '@/_utils/hooks/useOverflowHidden';
import EuiCSSTransition from '@/_utils/css-trasition';
import { isUndefined } from 'lodash';

/** 选择角度90度 */
const ROTATE_STEP = 90;

export type ImagePreviewHandle = {
  reset: () => void;
};

const useCSSVarCls = (prefixCls: string) => {
  const [, , , , cssVar] = useToken();
  return cssVar ? `${prefixCls}-css-var` : '';
};

const ImagePreview = forwardRef<ImagePreviewHandle, ImagePreviewProps & { mousePosition?: { x: number; y: number } }>(
  (props, ref) => {
    const { getPrefixCls, components, rtl, locale }: ConfigProviderProps = useContext(ConfigContext);

    const { previewGroup, previewUrlMap, currentIndex, setCurrentIndex, loop, previewPropsMap } =
      useContext(PreviewGroupContext);

    const mergedPreviewProps = previewGroup ? previewPropsMap.get(currentIndex) : {};

    const prefixCls = getPrefixCls('image');
    const rootPrefixCls = getPrefixCls();
    const previewPrefixCls = `${prefixCls}-preview`;

    const rootCls = useCSSVarCls(prefixCls);
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

    const [moving, setMoving] = useState(false);
    const { isLoading, isLoaded, setStatus } = useImageStatus('loading');
    const refMoveData = useRef({
      pageX: 0,
      pageY: 0,
      originX: 0,
      originY: 0,
    });

    const refRootWrapper = useRef<HTMLDivElement>();
    const refWrapper = useRef<HTMLDivElement>();
    const refImage = useRef<HTMLImageElement>();
    const keyboardEventOn = useRef<boolean>(false);
    const scaleValueTimer = useRef(null);

    const {
      className,
      style,
      src,
      defaultVisible,
      visible: _visible,
      onVisibleChange,
      scales = defaultScales,
      maskClosable = true,
      closable = true,
      actions,
      actionsLayout = ['fullScreen', 'rotateLeft', 'rotateRight', 'zoomIn', 'zoomOut', 'originalSize', 'extra'],
      getPopupContainer = () => document.body,
      escToExit = true,
      imageRender,
      zIndex = 1000,
      extra = {},
      mousePosition,
      ...rest
    }: ImagePreviewProps & { mousePosition?: { x: number; y: number } } = Object.assign(
      {},
      components?.Image?.preview,
      props,
      mergedPreviewProps,
    );

    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [scaleValueVisible, setScaleValueVisible] = useState(false);
    const mergedSrc = previewGroup ? previewUrlMap.get(currentIndex) : src;
    const [previewImgSrc, setPreviewImgSrc] = useState(mergedSrc);

    const [visible, setVisible] = useValue(false, {
      defaultValue: defaultVisible,
      value: _visible,
    });

    const previewScales = useMemo(() => {
      return new PreviewScales(scales);
    }, []);

    const { onLoad, onError, onMouseDown, style: imgStyle, className: imgClassName, ...restImg } = extra;

    useEffect(() => {
      if (visible && moving) {
        on(document, 'mousemove', onMoving, false);
        on(document, 'mouseup', onMoveEnd, false);
      }
      return () => {
        off(document, 'mousemove', onMoving, false);
        off(document, 'mouseup', onMoveEnd, false);
      };
    }, [visible, moving]);

    useImperativeHandle<ImagePreviewHandle, ImagePreviewHandle>(ref, () => ({
      reset,
      getRootNode: () => refRootWrapper.current,
    }));

    const [container, setContainer] = useState<HTMLElement>();

    const getContainer = useCallback(() => container, [container]);

    const isCustomPopup = useMemo(() => container === document.body, [container]);

    const classnames = classNames(
      hashId,
      previewPrefixCls,
      {
        [`${previewPrefixCls}-hide`]: !_visible,
        [`${previewPrefixCls}-custom-popup`]: !isCustomPopup,
        [`${previewPrefixCls}-rtl`]: rtl,
      },
      className,
      cssVarCls,
    );

    useEffect(() => {
      const container = getPopupContainer?.();
      const containerDom = container || document.body;
      setContainer(containerDom);
    }, [getPopupContainer]);

    useEffect(() => {
      if (!moving) {
        checkAndFixTranslate();
      }
    }, [moving, translate]);

    // Correct translate when scale changes
    useEffect(() => {
      checkAndFixTranslate();
    }, [scale]);

    // Reset when preview is opened
    useEffect(() => {
      if (visible) {
        reset();
      }
    }, [visible]);

    // Reset image params
    function reset() {
      setTranslate({ x: 0, y: 0 });
      setScale(1);
      setRotate(0);
    }

    // Close when pressing esc
    useEffect(() => {
      const onKeyDown = e => {
        if (e) {
          switch (e.key) {
            case Esc.key:
              if (escToExit) {
                close();
              }
              break;
            case ArrowRight.key:
              onNext();
              break;
            case ArrowLeft.key:
              onPrev();
              break;
            case ArrowUp.key:
              onZoomIn();
              break;
            case ArrowDown.key:
              onZoomOut();
              break;
            default:
          }
        }
      };

      if (visible && !moving && !keyboardEventOn.current) {
        keyboardEventOn.current = true;
        on(document, 'keydown', onKeyDown);
      }

      return () => {
        keyboardEventOn.current = false;
        off(document, 'keydown', onKeyDown);
      };
    }, [visible, escToExit, moving, currentIndex, scale]);

    useOverflowHidden(getContainer, { hidden: visible });

    // Jump to image at the specified index
    function jumpTo(index: number) {
      const previewListLen = previewUrlMap.size;
      if (loop) {
        index %= previewListLen;
        if (index < 0) index = previewListLen - Math.abs(index);
      }
      if (index !== currentIndex && index >= 0 && index <= previewListLen - 1) {
        setCurrentIndex(index);
      }
    }

    function onPrev() {
      jumpTo(currentIndex - 1);
    }

    function onNext() {
      jumpTo(currentIndex + 1);
    }

    // Anticlockwise rotation
    function onRotateLeft() {
      setRotate(rotate - ROTATE_STEP);
    }

    // Clockwise rotation
    function onRotateRight() {
      setRotate(rotate + ROTATE_STEP);
    }

    // Scale
    const showScaleValue = () => {
      !scaleValueVisible && setScaleValueVisible(true);
      scaleValueTimer.current && clearTimeout(scaleValueTimer.current);
      scaleValueTimer.current = setTimeout(() => {
        setScaleValueVisible(false);
      }, 1000);
    };
    const onScaleChange = newScale => {
      if (scale !== newScale) {
        setScale(newScale);
        showScaleValue();
      }
    };

    function onZoomIn() {
      const newScale = previewScales.getNextScale(scale, 'zoomIn');
      onScaleChange(newScale);
    }

    function onZoomOut() {
      const newScale = previewScales.getNextScale(scale, 'zoomOut');
      onScaleChange(newScale);
    }

    function onWheelZoom(e: WheelEvent<HTMLImageElement>) {
      if (e.deltaY > 0) {
        // 缩小
        if (scale >= previewScales.minScale) {
          onZoomOut();
        }
      } else if (scale <= previewScales.maxScale) {
        onZoomIn();
      }
    }

    function onResetScale() {
      onScaleChange(1);
    }

    function onFullScreen() {
      const wrapperRect = refWrapper.current.getBoundingClientRect();
      const imgRect = refImage.current.getBoundingClientRect();
      const newHeightScale = wrapperRect.height / (imgRect.height / scale);
      const newWidthScale = wrapperRect.width / (imgRect.width / scale);
      const newScale = Math.max(newHeightScale, newWidthScale);
      onScaleChange(newScale);
    }

    // Image container is clicked
    function onOutsideImgClick(e) {
      if (e.target === e.currentTarget && maskClosable) {
        close();
      }
    }

    // Close button is clicked.
    function onCloseClick() {
      close();
    }

    function close() {
      if (visible) {
        onVisibleChange?.(false, visible);
        isUndefined(_visible) && setVisible(false);
      }
    }

    // Check the translate and correct it if needed
    const checkAndFixTranslate = () => {
      if (!refWrapper.current || !refImage.current) return;
      const wrapperRect = refWrapper.current.getBoundingClientRect();
      const imgRect = refImage.current.getBoundingClientRect();
      const [x, y] = getFixTranslate(wrapperRect, imgRect, translate.x, translate.y, scale);
      if (x !== translate.x || y !== translate.y) {
        setTranslate({
          x: x < 0 ? 0 : x,
          y: y < 0 ? 0 : y,
        });
      }
    };

    // Update position on moving if needed
    const onMoving = e => {
      if (visible && moving) {
        e.preventDefault && e.preventDefault();
        const { originX, originY, pageX, pageY } = refMoveData.current;
        const nextX = originX + (e.pageX - pageX) / scale;
        const nextY = originY + (e.pageY - pageY) / scale;
        setTranslate({
          x: nextX,
          y: nextY,
        });
      }
    };

    const onMoveEnd = e => {
      e.preventDefault && e.preventDefault();
      setMoving(false);
    };

    function onImgLoaded(e) {
      setStatus('loaded');
      onLoad && onLoad(e);
    }

    function onImgLoadError(e) {
      setStatus('error');
      onError && onError(e);
    }

    // Record position data on move start
    const onMoveStart = e => {
      e.preventDefault?.();
      setMoving(true);

      const ev = e.type === 'touchstart' ? e.touches[0] : e;
      refMoveData.current.pageX = ev.pageX;
      refMoveData.current.pageY = ev.pageY;
      refMoveData.current.originX = translate.x;
      refMoveData.current.originY = translate.y;
      onMouseDown?.(e);
    };

    // Reset on first mount or image switches
    useEffect(() => {
      setPreviewImgSrc(mergedSrc);
      setStatus(mergedSrc ? 'loading' : 'loaded');
      reset();
    }, [mergedSrc]);

    const defaultActions = [
      {
        key: 'fullScreen',
        name: locale.Image.fullScreen,
        content: <IconFullscreen />,
        onClick: onFullScreen,
      },
      {
        key: 'rotateRight',
        name: locale.Image.rotateRight,
        content: <IconRotateRight />,
        onClick: onRotateRight,
      },
      {
        key: 'rotateLeft',
        name: locale.Image.rotateLeft,
        content: <IconRotateLeft />,
        onClick: onRotateLeft,
      },
      {
        key: 'zoomIn',
        name: locale.Image.zoomIn,
        content: <IconZoomIn />,
        onClick: onZoomIn,
        disabled: scale === previewScales.maxScale,
      },
      {
        key: 'zoomOut',
        name: locale.Image.zoomOut,
        content: <IconZoomOut />,
        onClick: onZoomOut,
        disabled: scale === previewScales.minScale,
      },
      {
        key: 'originalSize',
        name: locale.Image.originalSize,
        content: <IconOriginalSize />,
        onClick: onResetScale,
      },
    ];

    const renderImage = () => {
      const image = (
        <img
          onWheel={onWheelZoom}
          ref={refImage}
          className={classNames(imgClassName, `${previewPrefixCls}-img`, {
            [`${previewPrefixCls}-img-moving`]: moving,
          })}
          style={{
            ...imgStyle,
            transform: `translate(${translate.x}px, ${translate.y}px) rotate(${rotate}deg)`,
          }}
          key={previewImgSrc}
          src={previewImgSrc}
          {...restImg}
          onLoad={onImgLoaded}
          onError={onImgLoadError}
          onMouseDown={event => {
            // 左键单击、拖拽时进行移动
            event.button === 0 && onMoveStart(event);
          }}
        />
      );

      return imageRender?.(image) ?? image;
    };

    const transformStyle = useMemo(() => {
      if (mousePosition)
        return isEmptyObject(mousePosition) ? {} : { transformOrigin: `${mousePosition.x}px ${mousePosition.y}px` };

      return {};
    }, [mousePosition]);

    return wrapCSSVar(
      <Portal visible={visible} getContainer={getContainer}>
        <div className={classnames} ref={refRootWrapper} style={style} {...rest}>
          <EuiCSSTransition
            in={visible}
            timeout={200}
            classNames={`${rootPrefixCls}-fade`}
            appear
            mountOnEnter
            unmountOnExit={false}
            onEnter={e => {
              if (!e) return;
              e.parentNode.style.display = 'block';
            }}
            onExited={e => {
              if (!e) return;
              e.parentNode.style.display = '';
            }}
          >
            <div className={`${previewPrefixCls}-mask`} />
          </EuiCSSTransition>
          <EuiCSSTransition in={visible} timeout={300} classNames={`${rootPrefixCls}-zoom`} appear unmountOnExit>
            <div
              className={`${previewPrefixCls}-wrapper`}
              ref={refWrapper}
              onClick={onOutsideImgClick}
              style={transformStyle}
            >
              <div
                className={`${previewPrefixCls}-img-container`}
                onClick={onOutsideImgClick}
                style={{ transform: `scale(${scale}, ${scale})` }}
              >
                {renderImage()}
                {isLoading && (
                  <div className={`${previewPrefixCls}-loading`}>
                    <IconLoading />
                  </div>
                )}
              </div>
              <EuiCSSTransition
                in={scaleValueVisible}
                timeout={300}
                classNames={`${rootPrefixCls}-fade`}
                appear
                unmountOnExit
              >
                <div className={`${previewPrefixCls}-scale-value`}>{(scale * 100).toFixed(0)}%</div>
              </EuiCSSTransition>
              {isLoaded && (
                <ImagePreviewTools
                  prefixCls={prefixCls}
                  previewPrefixCls={previewPrefixCls}
                  actions={actions}
                  actionsLayout={actionsLayout}
                  defaultActions={defaultActions}
                />
              )}
              {closable && (
                <div className={`${previewPrefixCls}-close`} onClick={onCloseClick}>
                  <IconClose />
                </div>
              )}
              {previewGroup && (
                <ImagePreviewArrow
                  previewCount={previewUrlMap.size}
                  current={currentIndex}
                  loop={loop}
                  onPrev={onPrev}
                  onNext={onNext}
                />
              )}
            </div>
          </EuiCSSTransition>
        </div>
      </Portal>,
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  ImagePreview.displayName = 'ImagePreview';
}

export default ImagePreview;
