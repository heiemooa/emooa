import { useEffect, useRef, useState } from 'react';
import { WatermarkProps } from '@/watermark/interface';
import { isNumber } from '@/_utils/is';
import { getPixelRatio } from '@/_utils/pixel';
import { isServerRendering } from '@/_utils/dom';

/**
 * WatermarkReturnType
 */
export type WatermarkReturnType = {
  /**
   *
   * @zh 销毁水印
   * @en destroy watermark
   */
  destroy: () => void;
  /**
   * @zh 显示/更新水印
   * @en show/set Watermark
   */
  setWatermark: (options: WatermarkProps) => void;
};

const toNumber = (value: string | number, defaultValue: number) => {
  if (isNumber(value)) {
    return value;
  }
  const numberVal = parseFloat(value);
  return isNumber(numberVal) ? numberVal : defaultValue;
};

const defaultOptions = {
  rotate: -20,
  zIndex: 1,
  width: 100,
  gap: [100, 100],
  font: {
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.15)',
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
  },
  getContainer: () => document.body,
};

// 计量文本宽度和高度。
const measureTextSize = (
  ctx,
  contents: string[],
  rotate,
): { lineSize: { width: number; height: number }[] } & {
  [key in 'width' | 'height' | 'originWidth' | 'originHeight']: number;
} => {
  let width = 0;
  let height = 0;
  const lineSize = [];

  contents.forEach(content => {
    const { width: textWidth, fontBoundingBoxAscent, fontBoundingBoxDescent } = ctx.measureText(content);
    const textHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;

    if (textWidth > width) {
      width = textWidth;
    }

    height += textHeight;
    lineSize.push({ height: textHeight, width: textWidth });
  });

  const angle = (rotate * Math.PI) / 180;

  return {
    originWidth: width, // 原始宽度
    originHeight: height, // 原始高度
    // rotate 旋转后的实际占位宽度
    width: Math.ceil(Math.abs(Math.sin(angle) * height) + Math.abs(Math.cos(angle) * width)),
    // rotate 旋转后的实际占位高度
    height: Math.ceil(Math.abs(Math.sin(angle) * width) + Math.abs(height * Math.cos(angle))),
    lineSize,
  };
};

// 画布绘制转为base64url
const getCanvasData = async (
  options: Pick<WatermarkProps, 'gap' | 'rotate' | 'image' | 'content' | 'font'> & {
    width: number;
    height: number;
  },
): Promise<{ width: number; height: number; base64Url: string }> => {
  const { rotate, image, content, font, gap } = options;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const ratio = getPixelRatio(ctx);
  const contents = [].concat(content || '');

  const setCanvas = ({ height, width }) => {
    const canvasWidth = gap[0] + width;
    const canvasHeight = gap[1] + height;

    canvas.setAttribute('width', `${canvasWidth * ratio}px`);
    canvas.setAttribute('height', `${canvasHeight * ratio}px`);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.translate((canvasWidth * ratio) / 2, (canvasHeight * ratio) / 2);
    ctx.scale(ratio, ratio);

    const RotateAngle = (rotate * Math.PI) / 180;
    ctx.rotate(RotateAngle);
  };

  // 渲染文本
  const renderContent = () => {
    const { fontSize, color, fontWeight, fontFamily } = font;
    const realFontSize = toNumber(fontSize, 0);

    // font, scale 需参与文本尺寸计量
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    const measureSize = measureTextSize(ctx, contents, rotate);

    const width = options.width || measureSize.width;
    const height = options.height || measureSize.height;

    setCanvas({ width, height });

    ctx.fillStyle = color;
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    // 如果不设置，会导致旋转后的部分文字被遮盖
    ctx.textBaseline = 'top';

    contents.forEach((content, index) => {
      const { height: lineHeight, width: lineWidth } = measureSize.lineSize[index];

      const xStartPoint = -lineWidth / 2;
      const yStartPoint = -(options.height || measureSize.originHeight) / 2 + lineHeight * index;

      ctx.fillText(content as string, xStartPoint, yStartPoint, options.width || measureSize.originWidth);
    });
    return { base64Url: canvas.toDataURL(), height, width };
  };

  if (image) {
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';
      img.src = image;
      img.onload = () => {
        let { width, height } = options;
        if (!width || !height) {
          if (width) {
            height = (img.height / img.width) * width;
          } else {
            width = (img.width / img.height) * height;
          }
        }
        setCanvas({ width, height });

        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        return resolve({ base64Url: canvas.toDataURL(), width, height });
      };
      img.onerror = () => {
        return renderContent();
      };
    });
  }

  return renderContent();
};

const getOptions = (options: Partial<WatermarkProps & { getContainer?: () => HTMLElement }> = {}) => {
  const _options = Object.assign({}, defaultOptions, options, {
    font: Object.assign({}, defaultOptions.font, options.font),
    width: toNumber(options.width, options.image ? defaultOptions.width : undefined),
    height: toNumber(options.height, undefined),
    getContainer: options.getContainer || defaultOptions.getContainer,
    gap: [
      toNumber(options.gap?.[0], defaultOptions.gap[0]),
      toNumber(options.gap?.[1] || options.gap?.[0], defaultOptions.gap[1]),
    ],
  });

  const offset = [
    toNumber(_options.offset?.[0], _options.gap[0] / 2),
    toNumber(_options.offset?.[1] || _options.offset?.[0], _options.gap[0] / 2),
  ];

  _options.offset = [offset[0] - offset[0], offset[1] - offset[1]];
  return _options;
};

export default function useWatermark(
  params: WatermarkProps & { getContainer?: () => HTMLElement },
): WatermarkReturnType {
  const [options, setOptions] = useState(params || {});
  const watermarkDiv = useRef<HTMLDivElement>();
  const mutationObserver = useRef<MutationObserver>();
  const mergeOptions = getOptions(options);
  const { zIndex, gap, offset, getContainer } = mergeOptions;
  const container = isServerRendering ? null : getContainer?.();

  const setOrResetContainer = (dom: HTMLDivElement, type: 'set' | 'reset') => {
    if (!container || !dom) {
      return;
    }
    if (type === 'set') {
      container.append(dom);
    } else {
      dom.parentNode?.removeChild(dom);
    }
  };

  const clearMutationObserver = () => {
    if (mutationObserver.current) {
      mutationObserver.current.disconnect();
    }
    mutationObserver.current = null;
  };

  const createWatermarkElement = () => {
    if (container) {
      const div = document.createElement('div');
      watermarkDiv.current = div;
      setOrResetContainer(watermarkDiv.current, 'set');

      return div;
    }
  };

  // 清除元素和监听等
  const clearEffect = () => {
    clearMutationObserver();

    const dom = watermarkDiv.current;
    watermarkDiv.current = null;
    setOrResetContainer(dom, 'reset');
  };

  const setWaterMark = () => {
    if (!container) {
      return;
    }

    getCanvasData(mergeOptions).then(({ base64Url, width, height }) => {
      clearMutationObserver();

      const styles = `
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        pointer-events: none;
        z-index:${zIndex};
        background-position: ${offset[0]}px ${offset[1]}px;
        background-size:${gap[0] + width}px ${gap[1] + height}px;
        background-repeat: repeat;
        background-image:url(${base64Url})`;

      if (!watermarkDiv.current) {
        createWatermarkElement();
      }

      watermarkDiv.current?.setAttribute('style', styles.trim());

      if (container) {
        // 监听 dom 变动，包含 attributes监视属性，childList子节点，subtree整个子树
        mutationObserver.current = new MutationObserver(mutations => {
          const isChanged = mutations.some(record => {
            const target = record.target;

            if (target) {
              // watermarkDiv 被删除时会触发
              if (target.isSameNode(container)) {
                const changedNodes = [].slice
                  .call(record.removedNodes)
                  .concat([].slice.call(record.addedNodes).map(x => x.parentNode));

                return changedNodes.some((x: Node) => x === watermarkDiv.current);
              }
              if (target.isSameNode(watermarkDiv.current) && record.type === 'attributes') {
                return true;
              }
            }
          });
          if (isChanged) {
            clearEffect();
            setWaterMark();
          }
        });

        mutationObserver.current.observe(container, {
          attributes: true,
          subtree: true,
          childList: true,
        });
      }
    });
  };

  useEffect(() => {
    setWaterMark();
  }, [options]);

  useEffect(() => {
    clearEffect();
    // 销毁重建
    setWaterMark();

    return () => {
      clearEffect();
    };
  }, [container]);

  return {
    setWatermark: (newOptions: Partial<WatermarkProps>) => {
      setOptions(newOptions);
    },
    destroy: () => {
      clearEffect();
    },
  };
}
