"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kMeans_1 = __importDefault(require("./algorithms_ML/kMeans/kMeans"));
const chart_1 = require("./algorithms_ML/kMeans/chart");
const data_1 = require("./algorithms_ML/kMeans/data");
for (let j = 0; j <= 6; j++) {
    const ex_randomCentroids_solver = new kMeans_1.default(2, data_1.example_randomCentroids);
    console.log(ex_randomCentroids_solver.centroids);
    j += 1;
}
const points = (0, chart_1.convertPoints)(data_1.example_randomCentroids);
const centroids = (0, chart_1.convertPoints)((new kMeans_1.default(2, data_1.example_randomCentroids)).centroids);
(0, chart_1.showChart)(points, centroids, 1);
//# sourceMappingURL=app.js.map