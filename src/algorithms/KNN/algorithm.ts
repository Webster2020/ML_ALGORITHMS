// distance between two points
const distance = (a: number[], b: number[]): number => {
  return Math.sqrt(
    a
    .map((aPoint, i) => b[i] - aPoint)
    .reduce((sumOfSquares, diff) => sumOfSquares + (diff * diff), 0))
};

export class KNN {
  k: number;
  data: number[][];
  labels: string[];

  constructor(k = 1, data: number[][], labels: string[]) {
    this.k = k;
    this.data = data;
    this.labels = labels;
  }

  generateDistanceMap(point: [number, number]) {
    const map = [];
    let maxDistanceInMap;

    for (let index = 0, len = this.data.length; index < len; index++) {

        const otherPoint = this.data[index];
        const otherPointLabel = this.labels[index];
        const thisDistance = distance(point, otherPoint);

        /**
         * W mapie należy przechowywać co najwyżej k elementów.
         * To rozwiązanie jest znacznie efektywniejsze w przypadku 
         * dużych zbiorów danych, gdyż pozwala uniknąć tworzenia 
         * i sortowania map zawierających miliony elementów.
         * Rozwiązanie zwiększa liczbę operacji sortowania, lecz 
         * można mieć nadzieję, że wartość k jest niewielka.
         */
        if (!maxDistanceInMap || thisDistance < maxDistanceInMap) {

            // Punkt dodajemy tylko wtedy, gdy jest położony bliżej niż najdalszy
            // z punktów zapisanych w mapie.
            map.push({
                index,
                distance: thisDistance,
                label: otherPointLabel
            });

            // Sortujemy mapę rosnąco na podstawie odległości.
            map.sort((a, b) => a.distance < b.distance ? -1 : 1);

            // Jeśli mapa będzie zbyt duża, usuwamy z niej ostatni element.
            if (map.length > this.k) {
                map.pop();
            }

            // Aktualizujemy tę wartość na potrzeby następnego porównania.
            maxDistanceInMap = map[map.length - 1].distance;

        }
    }

    return map;
  }

//   predict(point: [number, number]) {

//     const map = this.generateDistanceMap(point);
//     const votes = map.slice(0, this.k);
//     const voteCounts = votes
//         // Redukujemy do obiektu o postaci {etykieta: liczbaGłosów}
//         .reduce((obj, vote) => Object.assign({}, obj, {[vote.label]: (obj[vote.label] || 0) + 1}), {})
//     ;
//     const sortedVotes = Object.keys(voteCounts)
//         .map(label => ({label, count: voteCounts[label]}))
//         .sort((a, b) => a.count > b.count ? -1 : 1)
//     ;

//     return {
//         label: sortedVotes[0].label,
//         voteCounts,
//         votes
//     };
//   }

}