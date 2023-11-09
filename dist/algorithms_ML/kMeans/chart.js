export const convertPoints = (pointsArr) => {
    const pointsCoords = pointsArr.map(point => {
        return {
            x: point[0],
            y: point[1]
        };
    });
    console.log({ pointsCoords });
    return pointsCoords;
};
export const showChart = (points, centroids, chartNo) => {
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
//# sourceMappingURL=chart.js.map