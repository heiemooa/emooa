import React from 'react';
import { IconFontProps, createScriptUrlElements } from './custom';

createScriptUrlElements([
  'https://at.alicdn.com/t/c/font_4218892_xxgw44ykptf.js',
]);

const Icon = (props: IconFontProps) => {
  const { icon, className, ...rest } = props;

  return (
    <span
      className={`icon ${className}`}
      {...rest}
      tab-index={!!rest.onClick ? '1' : '-1'}
    >
      <svg height="1em" width="1em" aria-hidden="true">
        <use xlinkHref={`#${icon}`}></use>
      </svg>
    </span>
  );
};

export default Icon;
