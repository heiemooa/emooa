import React, { useEffect } from 'react';
import Image from './containers/Image';
import './App.css';
// import Watermark from './containers/Watermark';
// import Spin from './containers/Spin';
import Modal from './containers/Modal';
import Drawer from './containers/Drawer';
import APP from './containers/App';
import Backtop from './containers/Backtop';

function App() {
  return (
    <>
      <Drawer />
      <Drawer />
      <Modal />
      <Modal />
    </>
  );
}

export default App;
