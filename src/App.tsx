import React from 'react';
import './App.css';

import Title from './components/title/Title';
import { ScatterChart, convertPoints } from './components/chartExample/ScatterChart';
import { generateCentroidsData } from './algorithms/kMeans/K_Means';

const data = {
  datasets: [
    {
      label: 'Random Centroids',
      data: generateCentroidsData().centroids,
      backgroundColor: 'rgba(255, 99, 132, 1)',
      pointRadius: 10,
    },
    {
      label: 'Points',
      data: generateCentroidsData().points,
      backgroundColor: 'rgba(255, 199, 132, 1)',
      pointRadius: 5,
    },
  ],
};

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Title />
        <ScatterChart data={data}/>
      </header>
    </div>
  );
}

export default App;
