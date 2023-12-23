import { KMeans, KMeansAutosolver } from './algorithm';
import { getCornerPoints } from '../../utils/utils';
import { example_2d3k, example_2dnk, example_3d3k } from './data';
import { ScatterChart, convertPoints } from '../../components/chartExample/ScatterChart';

const exampleData = example_2d3k;
const exampleData2 = example_2dnk;

export const generateCentroidsData = (checkedData: any, knownCluster: boolean | number, maxClusters: number) => {
  // --- Preparing points, centroids and display them on chart ---
  const points = convertPoints(checkedData);
  let centroids;
  if (knownCluster && typeof knownCluster === 'number') {
    centroids = convertPoints(new KMeans(knownCluster, checkedData).centroids);
  } else {
    centroids = convertPoints(new KMeansAutosolver(1, maxClusters + 1, maxClusters + 1, checkedData).solve().centroids);
  }
  const cornerPoints = convertPoints(getCornerPoints(checkedData));

  return { points, centroids, cornerPoints };
};

const generateData = (checkedData: any, knownCluster: boolean | number, maxClusters: number) => {
  let ex_solver;
  if (knownCluster && typeof knownCluster === 'number') {
    ex_solver = new KMeans(knownCluster, checkedData);
  } else {
    ex_solver = new KMeansAutosolver(1, maxClusters + 1, maxClusters + 1, checkedData);
  }

  const ex_centroids = ex_solver.solve().centroids;
  const chartData = generateCentroidsData(checkedData, knownCluster, 6);

  const data = {
    datasets: [
      {
        label: 'Random Centroids',
        data: convertPoints(ex_centroids),
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

  return data;
};

// ======================================================
// 3d example - not rendered on chart
const ex_2_solver = new KMeans(3, example_3d3k);
const ex_2_centroids = ex_2_solver.solve().centroids;
console.log(ex_2_centroids);
// ======================================================

const KMeansComponent = () => {
  return (
    <>
      <div>
        <h3>3 known clusters</h3>
        <ScatterChart data={generateData(exampleData, 3, 3)} />
      </div>
      <div>
        <h3>Unknown amount of clusters</h3>
        <ScatterChart data={generateData(exampleData2, false, 6)} />
      </div>
    </>
  );
};

export default KMeansComponent;
