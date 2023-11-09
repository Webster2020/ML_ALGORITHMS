"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showChart = exports.convertPoints = void 0;
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
exports.convertPoints = convertPoints;
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
exports.showChart = showChart;
//# sourceMappingURL=chart.js.map