import React from 'react';
import './App.css';

import Title from './components/title/Title';
import KMeansComponent from './algorithms/kMeans/K_Means';
import KNNComponent from './algorithms/KNN/KNN';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Title txt={'kmeans'}/>
        <KMeansComponent />
        <Title txt={'knn'}/>
        <KNNComponent />
      </header>
    </div>
  );
}

export default App;
