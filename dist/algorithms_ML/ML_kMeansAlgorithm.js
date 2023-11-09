"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example_randomCentroids = void 0;
const convertPoints = (pointsArr) => {
    const pointsCoords = pointsArr.map(point => {
        return {
            x: point[0],
            y: point[1]
        };
    });
    console.log({ pointsCoords });
    return pointsCoords;
};
const showChart = (points, centroids, chartNo) => {
    const ctx = document.querySelector(`.myChart${chartNo}`);
    const data = {
        datasets: [
            {
                label: 'Points',
                data: [...points],
                backgroundColor: 'rgb(255, 99, 132)'
            },
            {
                label: 'Centroids',
                data: [...centroids],
                backgroundColor: 'rgb(0, 99, 132)'
            },
        ],
    };
    new Chart(ctx, {
        type: 'scatter',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });
};
exports.example_randomCentroids = [
    [1, 3], [5, 8], [3, 0]
];
const mean = (numbers) => {
    return numbers.reduce((sum, val) => sum + val, 0) / numbers.length;
};
const distance = (a, b) => {
    return Math.sqrt(a
        .map((aPoint, i) => b[i] - aPoint)
        .reduce((sumOfSquares, diff) => sumOfSquares + (diff * diff), 0));
};
class KMeans {
    constructor(k, data) {
        this.k = k;
        this.data = data;
        this.reset();
    }
    ;
    reset() {
        this.error = null;
        this.iterations = 0;
        this.iterationLogs = [];
        this.centroids = this.initRandomCentroids();
        this.centroidAssignments = [];
    }
    getDimensionality() {
        const point = this.data[0];
        return point.length;
    }
    getRangeForDimension(n) {
        const values = this.data.map(point => point[n]);
        return {
            min: Math.min(...values),
            max: Math.max(...values),
        };
    }
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
                point[dimension] = min + (Math.random() * (max - min));
            }
            centroids.push(point);
        }
        return centroids;
    }
    assignPointToCentroid(pointIndex) {
        const lastAssignedCentroid = this.centroidAssignments[pointIndex];
        const point = this.data[pointIndex];
        let minDistance = null;
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
    assignPointsToCentroids() {
        let didAnyPointsGetReassigned = false;
        for (let i = 0; i < this.data.length; i++) {
            const wasReassigned = this.assignPointToCentroid(i);
            if (wasReassigned)
                didAnyPointsGetReassigned = true;
        }
        return didAnyPointsGetReassigned;
    }
}
exports.default = KMeans;
const TRIGGER = 1;
for (let j = 0; j <= 6; j++) {
    const ex_randomCentroids_solver = new KMeans(2, exports.example_randomCentroids);
    console.log(ex_randomCentroids_solver.centroids);
    j += 1;
}
const points = convertPoints(exports.example_randomCentroids);
const centroids = convertPoints((new KMeans(2, exports.example_randomCentroids)).centroids);
showChart(points, centroids, 1);
//# sourceMappingURL=ML_kMeansAlgorithm.js.map