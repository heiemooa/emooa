import { useEffect, useState } from 'react';
import { filter, map, find } from 'lodash';

function getId(noticeProps) {
  if (noticeProps?.id) {
    return noticeProps?.id;
  }
  return `eui_notice_id_${Math.random().toFixed(10).slice(2)}`;
}

function useNotice() {
  const [notices, setNotices] = useState([]);
  const [position, setPosition] = useState('top');

  const add = noticeProps => {
    const id: string = getId(noticeProps);

    const found = find(notices, { id });
    if (found) {
      this.update(found);
    } else {
      setNotices(prevList => {
        return [...prevList, { ...noticeProps, id }];
      });
      setPosition(noticeProps.position);
    }
    return id;
  };

  const update = newNotice => {
    setNotices(prevList =>
      map(prevList, item => {
        if (item.id === newNotice.id) {
          return newNotice;
        } else {
          return item;
        }
      }),
    );
    return newNotice.id;
  };

  const remove = (id: string) => {
    setNotices(prevList => filter(prevList, notice => notice.id !== id));
  };

  const clear = () => {
    setNotices([]);
  };

  return { notices, position, add, update, remove, clear };
}

export default useNotice;
