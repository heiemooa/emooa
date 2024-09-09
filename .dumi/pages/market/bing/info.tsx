import React, { useEffect } from 'react';
import { isEmpty, forEach } from 'lodash';

export default () => {
  useEffect(() => {
    hideFunc();

    return () => {
      showFunc();
    };
  }, []);

  const hideFunc = () => {
    const siderbar = document.getElementsByClassName('dumi-default-sidebar');
    if (!isEmpty(siderbar)) {
      forEach(siderbar, element => {
        element.style.display = 'none';
      });
    }
  };

  const showFunc = () => {
    const siderbar = document.getElementsByClassName('dumi-default-sidebar');
    if (!isEmpty(siderbar)) {
      forEach(siderbar, element => {
        element.style.display = 'initial';
      });
    }
  };

  return <>12</>;
};
