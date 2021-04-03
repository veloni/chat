import React, { useState } from 'react';

import Body from './components/Body/Body';
import Autorization  from './components/Autorization';

import './App.scss';

const App = () => {
	const [autorizaton, setAutorizaton] = useState(false);
  
  return (
    <section className="main-section">
      {autorizaton && <Body/>}

      {!autorizaton && (
        <Autorization
          autorizaton={autorizaton}
          setAutorizaton={setAutorizaton}
        />
      )}
    </section>
  );
};

export default App;