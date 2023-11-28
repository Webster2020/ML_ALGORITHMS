import { KMeans } from "./algorithm";
import { convertPoints } from "../../components/chartExample/ScatterChart";
import { example_randomCentroids, getCornerPoints, example_2d3k } from "./data";

const someData = example_2d3k;

export const generateCentroidsData = () => {
  for (let j = 0; j <= 6; j++) {  
    const ex_randomCentroids_solver = new KMeans(2, someData);
    console.log(ex_randomCentroids_solver.centroids);
    j += 1;
  }
  
  // --- Preparing points, centroids and display them on chart ---
  const points = convertPoints(someData);
  const centroids = convertPoints((new KMeans(2, someData)).centroids);
  const cornerPoints = convertPoints(getCornerPoints(someData));
  
  return {points, centroids, cornerPoints};
}
