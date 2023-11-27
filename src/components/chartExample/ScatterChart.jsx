// DOCS: https://react-chartjs-2.js.org/examples/scatter-chart/

import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

// converting Points
export const convertPoints = (pointsArr) => {
  const pointsCoords = pointsArr.map(point => {
    return {
      x: point[0],
      y: point[1]
    } 
  });
  return pointsCoords;
}

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  // elements: {
  //   point: {
  //     radius: 10
  //   }
  // }
};

export const ScatterChart = ({data}) => {
  return (
    // <div className={'centroidChart'}>
      <Scatter options={options} data={data} />
    // </div>
  )
}

ScatterChart.prototypes = {
  options: PropTypes.object,
  data: PropTypes.object
}