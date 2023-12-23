export const getCornerPoints = (points: number[][]): number[][] => {
  const getExtremes = (points: number[][], m: number, n: number, e: number) => {
    return points.sort((a, b) => m * b[e] + n * a[e])[0][e];
  };

  const xMax = getExtremes(points, 1, -1, 0);
  const xMin = getExtremes(points, -1, 1, 0);
  const yMax = getExtremes(points, 1, -1, 1);
  const yMin = getExtremes(points, -1, 1, 1);

  const cornerPoints = [
    [xMax + 1, yMax + 1],
    [xMax + 1, yMin - 1],
    [xMin - 1, yMin - 1],
    [xMin - 1, yMax + 1],
  ];

  return cornerPoints;
};
