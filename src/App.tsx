import React from 'react';
import './App.css';

import Title from './components/title/Title';
import { ScatterChart, convertPoints } from './components/chartExample/ScatterChart';
import { generateCentroidsData } from './algorithms/kMeans/K_Means';
import { KMeans } from './algorithms/kMeans/algorithm';
import { example_2d3k } from "../src/algorithms/kMeans/data";

const ex_1_solver = new KMeans(3, example_2d3k);
const ex_1_centroids = ex_1_solver.solve().centroids;
const chartData = generateCentroidsData()
console.log({ex_1_centroids});
const data = {
  datasets: [
    {
      label: 'Random Centroids',
      data: convertPoints(ex_1_centroids),
      backgroundColor: 'rgba(255, 99, 132, 1)',
      pointRadius: 10,
    },
    {
      label: 'Points',
      data: chartData.points,
      backgroundColor: 'rgba(255, 199, 132, 1)',
      pointRadius: 5,
    },
    {
      label: 'corners',
      data: chartData.cornerPoints,
      backgroundColor: 'rgba(0, 199, 132, 1)',
      pointRadius: 2,
    },
  ],
};

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Title />
        <div>
          <ScatterChart data={data}/>
        </div>
      </header>
    </div>
  );
}

export default App;
