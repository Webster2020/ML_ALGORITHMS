import { KNN } from './algorithm';
import { getCornerPoints } from '../../utils/utils';
import { weight_height } from './data';
import { ScatterChart, convertPoints } from '../../components/chartExample/ScatterChart';
// import decolorize from './features/decolorize';

console.log('Odbarwianie zdjęć');
console.log('==========================');

['landscape.jpeg', 'lily.jpeg', 'waterlilies.jpeg'].forEach((filename) => {
  console.log('Odbarwianie pliku ' + filename + '...');
  // tslint:disable-next-line: no-var-requires
  // decolorize(filename).then(() => console.log('Plik ' + filename + ' został odbarwiony.'));
});

const generateData = (checkedData: any) => {
  const LABELS = {
    WOMAN: 'Kobieta',
    MAN: 'Mężczyzna',
  };

  const chartData = {
    women: [checkedData.data[0]],
    men: [checkedData.data[checkedData.data.length - 1]],
    cornerPoints: [],
  };

  const selectDataByLabel = (data: number[][], labels: string[]) => {
    data.forEach((dataPoint: number[], index: number) => {
      if (labels[index] === LABELS.WOMAN) {
        chartData.women.push(dataPoint);
      }
      if (labels[index] === LABELS.MAN) {
        chartData.men.push(dataPoint);
      }
    });
  };

  selectDataByLabel(checkedData.data, checkedData.labels);
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
  console.log('Testowanie wzrostu i wagi dla k=5');
  console.log('==========================');

  const solver1 = new KNN(5, checkedData.data, checkedData.labels);
  const testData = [
    [90, 191],
    [77, 178],
    [63, 163],
    [59, 160],
    [54, 152],
  ];

  console.log("Sprawdzanie punktu 'zdecydowanie mężczyzna':");
  console.log(solver1.predict(testData[0]));
  console.log("\nSprawdzanie punktu 'prawdopodobnie mężczyzna':");
  console.log(solver1.predict(testData[1]));
  console.log("\nSprawdzanie punktu 'zupełnie nie wiadomo':");
  console.log(solver1.predict(testData[2]));
  console.log("\nSprawdzanie punktu 'prawdopodobnie kobieta':");
  console.log(solver1.predict(testData[3]));
  console.log("\nSprawdzanie punktu 'zdecydowanie kobieta':");
  console.log(solver1.predict(testData[4]));

  const results = testData.map((testCase) => solver1.predict(testCase).label);

  return {
    testData,
    results,
  };
};

testResults(weight_height);

const KNNComponent = () => {
  return (
    <>
      <div>
        <h3>Weight & Height</h3>
        <ScatterChart data={generateData(weight_height)} />
        <ul>
          {testResults(weight_height).testData.map((testCase, i) => (
            <li key={i}>{`W: ${testCase[0]} | H: ${testCase[1]} => ${testResults(weight_height).results[i]}`}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default KNNComponent;
