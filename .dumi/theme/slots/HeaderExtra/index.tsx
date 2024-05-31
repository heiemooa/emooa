import React, { type FC } from 'react';

const HeaderExtra: FC = () => {
  console.log(location);
  const pathname = location.pathname;
  return (
    <div
      style={{
        borderInlineStart: '1px solid #d0d5d8',
        marginInlineStart: 15,
        paddingInlineStart: 15,
      }}
    >
      <a
        href="https://emooa.com"
        target="_blank"
        style={{
          textDecoration: 'auto',
          color: '#1677FF',
        }}
      >
        {pathname?.indexOf('/en-US') > -1 ? 'Home Page' : '个人主页'}
      </a>
    </div>
  );
};

export default HeaderExtra;
