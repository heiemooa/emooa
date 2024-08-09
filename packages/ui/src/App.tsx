import React, { useEffect } from 'react';
import Image from './containers/Image';
import './App.css';
// import Watermark from './containers/Watermark';
// import Spin from './containers/Spin';
import Modal from './containers/Modal';
import Drawer from './containers/Drawer';
import APP from './containers/App';
import Backtop from './containers/Backtop';
import * as http from './utils';

const instance = http.create();

function App() {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await instance.get('/api/login');
    console.log(data);
  };

  return (
    <>
      <Drawer />
    </>
  );
}

export default App;
