import React, { useState } from 'react';

import Body from './components/Body/Body';
import Autorization  from './components/Autorization';

import './App.css';

const App = () => {
	const [autorizaton, setAutorizaton] = useState(false);

  return (
    <section className="main-section">
      {!autorizaton && (
        <Autorization
          autorizaton={autorizaton}
          setAutorizaton={setAutorizaton}
        />
      )}
      {autorizaton && <Body/>}
    </section>
  );
};

export default App;