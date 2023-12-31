// means for array of numbers
const mean = (numbers: number[]): number => {
  return numbers.reduce((sum, val) => sum + val, 0) / numbers.length;
};

// distance between two points
const distance = (a: number[], b: number[]): number => {
  return Math.sqrt(a.map((aPoint, i) => b[i] - aPoint).reduce((sumOfSquares, diff) => sumOfSquares + diff * diff, 0));
};

export class KMeans {
  k: number;
  data: number[][] = [];
  error: number | null = null;
  iterations: number = 0;
  iterationLogs: any;
  centroids: number[][] = [];
  centroidAssignments: Array<number> = [];

  constructor(k: number, data: number[][]) {
    this.k = k;
    this.data = data;
    this.reset();
  }

  reset() {
    // RMSE value (root mean square error) - distance between points and specific centroid for current iteration;
    this.error = null;
    // simple counter to catching info about amount of computing iterations done - initial value = 0;
    this.iterations = 0;
    this.iterationLogs = [];
    // array contain current information about 'k' centroids predicted by algorithm
    this.centroids = this.initRandomCentroids();
    // array of data points indexes, connected to centroid indexes;
    this.centroidAssignments = [];
  }

  // define amount of dimensions in data set based on first point (assumption: all points have same dimensions);
  getDimensionality() {
    const point = this.data[0];
    return point.length;
  }

  // for specific dimension in data set it define min & max values; they are using to random initialization to be sure centroids will have same scope of values as data;
  getRangeForDimension(n: number) {
    const values = this.data.map((point) => point[n]);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }
  // EXAMPLE:
  // getRangeForDimension([[1,3], [5,8], [3,0]], 0) => {min: '1', max: '5'}
  // getRangeForDimension([[1,3], [5,8], [3,0]], 1) => {min: '0', max: '8'}

  // it returns scope/range for all dimensions
  getAllDimensionsRanges() {
    const dimensionRanges = [];
    const dimensionality = this.getDimensionality();

    for (let dimension = 0; dimension < dimensionality; dimension++) {
      dimensionRanges[dimension] = this.getRangeForDimension(dimension);
    }

    return dimensionRanges;
  }

  initRandomCentroids() {
    const dimensionality = this.getDimensionality();
    const dimensionRanges = this.getAllDimensionsRanges();
    const centroids = [];

    for (let i = 0; i < this.k; i++) {
      let point = [];

      for (let dimension = 0; dimension < dimensionality; dimension++) {
        const { min, max } = dimensionRanges[dimension];
        point[dimension] = min + Math.random() * (max - min);
      }

      centroids.push(point);
    }

    return centroids;
  }

  // Dysponując punktem wybranym z danych, metoda określa centroid położony najbliżej niego i kojarzy ten punkt ze znalezionym centroidem. Metoda zwraca wartość logiczną określającą, czy skojarzenie punktu z centroidem. uległo zmianie, czy nie. Wynik ten jest używany do określenia warunku zakończenia działania algorytmu.
  assignPointToCentroid(pointIndex: number) {
    const lastAssignedCentroid = this.centroidAssignments[pointIndex];
    const point = this.data[pointIndex];
    let minDistance = null;
    let assignedCentroid = 0; // null

    for (let i = 0; i < this.centroids.length; i++) {
      const centroid = this.centroids[i];
      const distanceToCentroid = distance(point, centroid);

      if (minDistance === null || distanceToCentroid < minDistance) {
        minDistance = distanceToCentroid;
        assignedCentroid = i;
      }
    }

    this.centroidAssignments[pointIndex] = assignedCentroid;
    return lastAssignedCentroid !== assignedCentroid;
  }

  // for all data points method runs "assignPointToCentroid" method and after that it returns info if for any point its connected to specific centroid changed
  assignPointsToCentroids() {
    let didAnyPointsGetReassigned = false;
    for (let i = 0; i < this.data.length; i++) {
      const wasReassigned = this.assignPointToCentroid(i);
      if (wasReassigned) didAnyPointsGetReassigned = true;
    }

    return didAnyPointsGetReassigned;
  }

  // for provided centroid method returns array all points connected with it
  getPointsForCentroid(centroidIndex: number | null) {
    const points = [];
    for (let i = 0; i < this.data.length; i++) {
      const assignment = this.centroidAssignments[i];
      if (assignment === centroidIndex) {
        points.push(this.data[i]);
      }
    }
    return points;
  }

  // for provided centroid method set avarage value of connected to it points location and then it use this value as new lacation of centroid
  updateCentroidLocation(centroidIndex: number) {
    const thisCentroidPoints = this.getPointsForCentroid(centroidIndex);
    const dimensionality = this.getDimensionality();
    const newCentroid = [];
    for (let dimension = 0; dimension < dimensionality; dimension++) {
      newCentroid[dimension] = mean(thisCentroidPoints.map((point) => point[dimension]));
    }
    this.centroids[centroidIndex] = newCentroid;
    return newCentroid;
  }

  // for all centroids method call updateCentroidLocation method
  updateCentroidLocations() {
    for (let i = 0; i < this.centroids.length; i++) {
      this.updateCentroidLocation(i);
    }
  }

  calculateError() {
    let sumDistanceSquared = 0;
    for (let i = 0; i < this.data.length; i++) {
      const centroidIndex = this.centroidAssignments[i];
      const centroid = this.centroids[centroidIndex];
      const point = this.data[i];
      const thisDistance = distance(point, centroid) + this.k;
      sumDistanceSquared += thisDistance * thisDistance;
    }

    this.error = Math.sqrt(sumDistanceSquared / this.data.length);
    return this.error;
  }

  // main loop
  solve(maxIterations: number = 1000) {
    // if (this.iterations || this.iterations === 0) {

    while (this.iterations < maxIterations) {
      const didAssignmentsChange = this.assignPointsToCentroids();
      this.updateCentroidLocations();
      this.calculateError();

      if (this.iterationLogs) {
        this.iterationLogs[this.iterations] = {
          centroids: [...this.centroids],
          iteration: this.iterations,
          error: this.error,
          didReachSteadyState: !didAssignmentsChange,
        };
      }

      if (didAssignmentsChange === false) {
        break;
      }

      this.iterations++;
    }

    // console.log(this.iterationLogs && this.iterationLogs[this.iterationLogs.length - 1]);
    return this.iterationLogs[this.iterationLogs.length - 1];
  }
}

export class KMeansAutosolver {
  kMin: number;
  kMax: number;
  maxTrials: number;
  data: any;
  best: any;
  log: [] = [];

  constructor(kMin = 1, kMax = 10, maxTrials = 10, data: any) {
    this.kMin = kMin;
    this.kMax = kMax;
    this.maxTrials = maxTrials;
    this.data = data;
    this.reset();
  }

  reset() {
    this.best = null;
    this.log = [];
  }

  solve(maxIterations = 1000) {
    for (let k = this.kMin; k < this.kMax; k++) {
      for (let currentTrial = 0; currentTrial < this.maxTrials; currentTrial++) {
        const solver = new KMeans(k, this.data);
        const solution = {
          ...solver.solve(maxIterations),
          k,
          currentTrial,
        };

        if (this.best === null || solution.error < this.best.error) {
          this.best = solution;
        }
      }
    }

    return this.best;
  }
}
