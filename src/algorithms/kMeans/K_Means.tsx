import React from "react";
import { KMeans } from "./algorithm";
import { convertPoints, showChart } from "./chart";
import { example_randomCentroids } from "./data";

export const showChartWithCentroids = () => {
  for (let j = 0; j <= 6; j++) {  
    const ex_randomCentroids_solver = new KMeans(2, example_randomCentroids);
    console.log(ex_randomCentroids_solver.centroids);
    j += 1;
  }
  
  // --- Preparing points, centroids and display them on chart ---
  const points = convertPoints(example_randomCentroids);
  const centroids = convertPoints((new KMeans(2, example_randomCentroids)).centroids);
  
  showChart(points, centroids, 1);
  
  return (
    <div>
    </div>
  )
}
