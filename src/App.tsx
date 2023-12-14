import React from 'react';
import './App.css';

import Title from './components/title/Title';
import KMeansComponent from './algorithms/kMeans/K_Means';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Title />
        <KMeansComponent />
      </header>
    </div>
  );
}

export default App;
