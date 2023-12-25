import { KNN } from '../algorithm';
import { colors_16 } from '../data';
import Jimp from 'jimp';

const decolorize = (filename) => {
  console.log(filename);
  return Jimp.read(filename)
    .then((image) => {
      // Tworzymy instancję klasy KNN używając palety kolorów jako danych uczących. Następnie używamy jej z k = 1, by odnaleźć najbliższy kolor. Zastosowanie k > 1 nie zdałoby ezgaminu gdyż z każdy punkt danych uczących ma tylko jedną etykietę.
      const mapper = new KNN(1, colors_16.data, colors_16.labels);
      const { width, height } = image.bitmap;
      // Dla każdego piksela obrazka...
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          // Pobieramy wartość RGB w formie tablicy [R,G,B].
          const originalColorHex = image.getPixelColor(x, y);
          const originalColorRgb = Jimp.intToRGBA(originalColorHex);
          const pixelPoint = [originalColorRgb.r, originalColorRgb.g, originalColorRgb.b];
          // Używając algorytmu KNN określamy najbliższy kolor z palety docelowej.
          const closestColor = mapper.predict(pixelPoint);
          // Odczytujemy wartość szesnastkową koloru i używamy jej do zmodyfikowania piksela.
          const newColor = colors_16.data[colors_16.labels.indexOf(closestColor.label)];
          const newColorHex = Jimp.rgbaToInt(newColor[0], newColor[1], newColor[2], 255);
          image.setPixelColor(newColorHex, x, y);
        }
      }

      const ext = image.getExtension();
      image.write(filename.replace('.' + ext, '') + '_16.' + ext);
    })
    .catch((err) => {
      console.log('Błąd odczytu pliku:');
      console.log(err);
    });
};

export default decolorize;
