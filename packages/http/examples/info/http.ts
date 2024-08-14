import Http from '@emooa/http';

const axios = new Http({
  modal: {
    onOk: () => {
      console.log('click', 'other code');
    },
    info: {
      401: {
        style: { top: 140 },
        onOk: () => {
          console.log('click', '401 ok');
        },
      },
      403: {
        style: { top: 200 },
        content: 'This is custom content, and sorry, you have no permission.',
        onOk: () => {
          console.log('click', '403 ok');
        },
      },
    },
  },
});

const http = axios.create();

export default http;
