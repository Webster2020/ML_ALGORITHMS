export const example_randomCentroids = [
  [1, 3], [5, 8], [3, 0]
];

export const example_2d3k = [
  [1,2], [2,3], [2,5], [1,6], [4,6], 
  [3,5], [2,4], [4,3], [5,2], [6,9], 
  [4,4], [3,3], [8,6], [7,5], [9,6]
];

export const getCornerPoints = (points: number[][]) => {
  const getExtremes = (points: number[][], m: number, n: number, e: number) => {
    return points.sort((a, b) => m*b[e] + n*a[e])[0][e]
  };
  
  const xMax = getExtremes(points, 1, -1, 0);
  const xMin = getExtremes(points, -1, 1, 0);
  const yMax = getExtremes(points, 1, -1, 1);
  const yMin = getExtremes(points, -1, 1, 1);

  console.log({xMax, xMin, yMax, yMin});
  
  const cornerPoints = [
    [xMax+1, yMax+1], [xMax+1, yMin-1], [xMin-1, yMin-1], [xMin-1, yMax+1]
  ]

  return cornerPoints
}