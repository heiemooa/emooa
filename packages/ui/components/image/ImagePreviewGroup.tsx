import React, { forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import ImagePreview, { ImagePreviewHandle } from './ImagePreview';
import { ImagePreviewGroupProps, ImagePreviewProps } from './interface';
import { PreviewGroupContext, PreviewUrlMap } from './previewGroupContext';
import useValue from '@/_utils/hooks/useValue';
import useIsFirstRender from '@/_utils/hooks/useFirstRender';
import { isArray, isPlainObject, isUndefined } from 'lodash';

export interface ImagePreviewGroupHandle {
  reset: () => void;
}

function PreviewGroup(props: PropsWithChildren<ImagePreviewGroupProps>, ref) {
  const {
    children,
    items,
    loop,
    current: propCurrentIndex,
    defaultCurrent,
    onChange,
    visible: propVisible,
    defaultVisible,
    forceRender,
    onVisibleChange,
    ...restProps
  } = props;

  const [visible, setVisible] = useValue(false, {
    value: propVisible,
    defaultValue: defaultVisible,
  });

  const propPreviewUrlMap: PreviewUrlMap | null = useMemo(
    () => (items ? new Map(items.map((url, index) => [index, { url, preview: true }])) : null),
    [items],
  );

  const isFirstRender = useIsFirstRender();
  const getPreviewUrlMap = () => (propPreviewUrlMap ? new Map(propPreviewUrlMap) : new Map());
  const [previewUrlMap, setPreviewUrlMap] = useState<PreviewUrlMap>(getPreviewUrlMap());

  const previewPropsMapRef = useRef<Map<number, Partial<ImagePreviewProps>>>();
  const previewPropsMap = previewPropsMapRef.current || new Map();

  const setPreviewPropsMap = (
    cb: (prev: Map<number, Partial<ImagePreviewProps>>) => Map<number, Partial<ImagePreviewProps>>,
  ) => {
    previewPropsMapRef.current = cb(previewPropsMapRef.current);
  };

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>();

  useEffect(() => {
    if (isFirstRender) return;
    setPreviewUrlMap(getPreviewUrlMap());
  }, [propPreviewUrlMap]);

  const canPreviewUrlMap = new Map(
    Array.from(previewUrlMap)
      .filter(([, { preview }]) => preview)
      .map(([id, { url }]) => [id, url]),
  );

  const [currentIndex, setCurrentIndex] = useValue(0, {
    value: propCurrentIndex,
    defaultValue: defaultCurrent,
  });

  function registerPreviewUrl(id: number, url: string, preview: boolean) {
    if (!propPreviewUrlMap) {
      setPreviewUrlMap(pre =>
        new Map(pre).set(id, {
          url,
          preview,
        }),
      );
    }

    return function unRegisterPreviewUrl() {
      if (!propPreviewUrlMap) {
        setPreviewUrlMap(pre => {
          const cloneMap = new Map(pre);
          const hasDelete = cloneMap.delete(id);
          return hasDelete ? cloneMap : pre;
        });
      }
    };
  }

  function registerPreviewProps(id: number, previewProps?: Partial<ImagePreviewProps>) {
    setPreviewPropsMap(pre => new Map(pre).set(id, isPlainObject(previewProps) ? previewProps : {}));

    return function unRegisterPreviewProps() {
      setPreviewPropsMap(pre => {
        const cloneMap = new Map(pre);
        const hasDelete = cloneMap.delete(id);
        return hasDelete ? cloneMap : pre;
      });
    };
  }

  const refPreview = useRef<ImagePreviewHandle>();

  useImperativeHandle<any, ImagePreviewGroupHandle>(ref, () => ({
    reset: () => {
      refPreview.current && refPreview.current.reset();
    },
  }));

  const handleVisibleChange = (newVisible, preVisible) => {
    const _preVisible = isUndefined(preVisible) ? visible : preVisible;
    onVisibleChange?.(newVisible, _preVisible);
    setVisible(newVisible);
  };

  const handleSwitch = (index: number) => {
    onChange?.(index);
    setCurrentIndex(index);
  };

  const loopImageIndex = children => {
    let index = 0;

    const loop = children => {
      const result = React.Children.map(children, child => {
        if (child && child.props && child.type) {
          const displayName = child.type.displayName;
          if (displayName === 'Image') {
            return React.cloneElement(child, { _index: index++ });
          }
        }

        if (child && child.props && child.props.children) {
          return React.cloneElement(child, {
            children: loop(child.props.children),
          });
        }

        return child;
      });
      // 避免单个子节点 <div></div> 被处理为  [<div></div>] 格式
      if (!isArray(children) && React.Children.count(children) === 1) {
        return result[0];
      }
      return result;
    };

    return loop(children);
  };

  const renderList = () => {
    const array = Array.from(canPreviewUrlMap.values());
    if (array.length > 0) {
      return (
        <div style={{ display: 'none' }}>
          {array.map(src => (
            <img key={src} src={src} />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <PreviewGroupContext.Provider
      value={{
        previewGroup: true,
        previewUrlMap: canPreviewUrlMap,
        previewPropsMap,
        loop,
        currentIndex,
        setCurrentIndex: handleSwitch,
        setPreviewUrlMap,
        registerPreviewUrl,
        registerPreviewProps,
        visible,
        handleVisibleChange,
        setMousePosition,
      }}
    >
      {loopImageIndex(children)}
      <ImagePreview
        ref={refPreview}
        src=""
        mousePosition={mousePosition}
        visible={visible}
        onVisibleChange={handleVisibleChange}
        {...restProps}
      />
      {/* {forceRender && renderList()} */}
    </PreviewGroupContext.Provider>
  );
}

const PreviewGroupComponent = forwardRef<ImagePreviewGroupHandle, PropsWithChildren<ImagePreviewGroupProps>>(
  PreviewGroup,
);

PreviewGroupComponent.displayName = 'ImagePreviewGroup';

export default PreviewGroupComponent;
