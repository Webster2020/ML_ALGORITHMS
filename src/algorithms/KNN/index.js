import KNN from './algorithm.js'
import {
  // colors_16,
  weight_height,
} from './data'
// import decolorize from './decolorize.js';

console.log('Testowanie wzrostu i wagi dla k=5')
console.log('==========================')

const solver1 = new KNN(5, weight_height.data, weight_height.labels)

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

// console.log("Odbarwianie zdjęć");
// console.log("==========================");

// ['landscape.jpeg', 'lily.jpeg', 'waterlilies.jpeg'].forEach(filename => {
//     console.log("Odbarwianie pliku " + filename + '...');
//     decolorize('./files/' + filename)
//         .then(() => console.log("Plik " + filename + " został odbarwiony."));
// });
