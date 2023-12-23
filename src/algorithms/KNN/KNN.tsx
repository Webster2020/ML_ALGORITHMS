import { KNN } from "./algorithm";
import { getCornerPoints } from "../../utils/utils";
import { weight_height } from "./data";
import { ScatterChart, convertPoints } from '../../components/chartExample/ScatterChart';

const generateData = (checkedData: any) => {

  const LABELS = {
    WOMAN: 'Kobieta', 
    MAN: 'Mężczyzna'
  };

  const chartData = {
    women: [checkedData.data[0]],
    men: [checkedData.data[checkedData.data.length - 1]],
    cornerPoints: []
  }

  const selectDataByLabel = (data: number[][], labels: string[]) => {
    data.forEach((dataPoint: number[], index: number) => {
      if(labels[index] === LABELS.WOMAN) {
        chartData.women.push(dataPoint);
      };
      if(labels[index] === LABELS.MAN) {
        chartData.men.push(dataPoint);
      };
    })
  }

  selectDataByLabel(checkedData.data, checkedData.labels)
  chartData.cornerPoints = convertPoints(getCornerPoints(checkedData.data));

  const data = {
    datasets: [
      {
        label: 'Men',
        data: convertPoints(chartData.men),
        backgroundColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 3,
      },
      {
        label: 'Women',
        data: convertPoints(chartData.women),
        backgroundColor: 'rgba(255, 199, 132, 1)',
        pointRadius: 3,
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

const testResults = (checkedData: any) => {
  console.log('Testowanie wzrostu i wagi dla k=5')
  console.log('==========================')
  
  const solver1 = new KNN(5, checkedData.data, checkedData.labels)
  
  console.log("Sprawdzanie punktu 'zdecydowanie mężczyzna':")
  console.log(solver1.predict([90, 191]))
  console.log("\nSprawdzanie punktu 'prawdopodobnie mężczyzna':")
  console.log(solver1.predict([77, 178]))
  console.log("\nSprawdzanie punktu 'zupełnie nie wiadomo':")
  console.log(solver1.predict([63, 163]))
  console.log("\nSprawdzanie punktu 'prawdopodobnie kobieta':")
  console.log(solver1.predict([59, 160]))
  console.log("\nSprawdzanie punktu 'zdecydowanie kobieta':")
  console.log(solver1.predict([54, 152]))
};

testResults(weight_height);

const KNNComponent = () => {
  return (
    <>
      <div>
        <h3>Weight & Height</h3>
        <ScatterChart data={generateData(weight_height)}/>
      </div>
    </>
  );
}

export default KNNComponent;
