import { KMeans } from "./algorithm";
import { getCornerPoints } from "./utils";
import { example_2d3k, example_3d3k } from "./data";
import { ScatterChart, convertPoints } from '../../components/chartExample/ScatterChart';

const someData = example_2d3k;

export const generateCentroidsData = () => {
  const clasters = 3;

  for (let j = 0; j <= 6; j++) {  
    const ex_randomCentroids_solver = new KMeans(clasters, someData);
    console.log(ex_randomCentroids_solver.solve());
    j += 1;
  }
  
  // --- Preparing points, centroids and display them on chart ---
  const points = convertPoints(someData);
  const centroids = convertPoints((new KMeans(clasters, someData)).centroids);
  const cornerPoints = convertPoints(getCornerPoints(someData));
  
  return {points, centroids, cornerPoints};
}

const ex_1_solver = new KMeans(3, example_2d3k);
const ex_1_centroids = ex_1_solver.solve().centroids;
const chartData = generateCentroidsData()

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

const ex_2_solver = new KMeans(3, example_3d3k);
const ex_2_centroids = ex_2_solver.solve().centroids;
console.log({ex_2_centroids});

const KMeansComponent = () => {
  return (
    <div>
      <ScatterChart data={data}/>
    </div>
  );
}

export default KMeansComponent;
