export const simpleTokenizer = (str: string) => {
  str.toLowerCase().replace(/[^\w\d]/g, ' ').split(' ').filter((word) => word.length > 3).filter((word, index, arr) => arr.indexOf(word, index + 1) === -1);
}

export class BayesClassifier {
  database: {
    labels: any;
    tokens: any;
  };
  tokenizer: Function;

  constructor(tokenizer = null) {
    this.database = {
      labels: {},
      tokens: {},
    };
    this.tokenizer = (tokenizer !== null) ? tokenizer : simpleTokenizer;
  }

  // learning base on document and label
  train(label: string, text: string) {
    this.incrementLabelDocumentCount(label);
    this.tokenizer(text).forEach((token: string) => this.incrementTokenCount(token, label));
  }

  // increase amount of documents in specific category/label
  incrementLabelDocumentCount(label: string) {
    this.database.labels[label] = this.getLabelDocumentCount(label) + 1;
  }

  // return amount of documents registered for specific category/label
  // if label == null it returns total number of documents used to learning
  getLabelDocumentCount(label: string | null = null) {
    if (label) {
      return this.database.labels[label] || 0;
    } else {
      return Object.values(this.database.labels).reduce((sum: any, count: any) => sum + count, 0)
    }
  }

  // increase amount of tokens for specific category
  incrementTokenCount(token: string, label: string) {
    if (typeof this.database.tokens[token] === 'undefined') {
      this.database.tokens[token] = {};
    }
    this.database.tokens[token][label] = this.getTokenCount(token, label) + 1;
  }

  // returns amount of tokens for specific category/label; if no label passed, it returns total number of tokens w all learning set
  getTokenCount(token: string, label: string | null = null) {
    if (label) {
      return (this.database.tokens[token] || {})[label] || 0;
    } else {
      return Object.values(this.database.tokens[token] || {}).reduce((sum: any, count) => sum + count, 0);
    }
  }

  // for passed document it predict category, to which it belongs
  predict(text: string) {
    const probabilities = this.calculateAllLabelProbabilities(text);
    const best = probabilities[0];

    return {
      label: best.label,
      probability: best.probability,
      probabilities
    };
  }

  // for passed document it calculate its probability for each label/category occur in learning set; first element of returned table is label/caegory best fit to current document
  calculateAllLabelProbabilities(text: string) {
    const tokens = this.tokenizer(text);
    return this.getAllLabels().map((label) => ({
      label,
      probability: this.calculateLabelProbability(label, tokens)
    })).sort((a, b) => a.probability > b.probability ? -1 : 1);
  }

  // returns all labels collected during learning process
  getAllLabels() {
    return Object.keys(this.database.labels);
  }

  // base on tokens stream (document splits to tokens); method calculate probabilitiy of having label by current document
  calculateLabelProbability(label: string, tokens: string[]) {
    // assumption - probability of occur all labels are equal; or probability can be calculate base on frequency occure individual labels
    const probLabel = 1 / this.getAllLabels().length;
    // how important must be token to be included; tokens result must be bigger than epsilon from default token
    // this solution makes increase accuracy from 78% to 87,8% (for e=0.17)
    const epsilon = 0.15;
    // for each token we have to calculate "token result" - probability of situation where current token belong to category, assuming that current token exists in it
    const tokenScores = tokens.map((token) => this.calculateTokenScore(token, label)).filter((score) => Math.abs(probLabel - score) > epsilon);
    // to avoid floating point underflow during operating on really small numbers, sum probability individual tokens w logarithm space; this solution  is used only because of floating point operations - it should not affect on global algorithm workflow
    const logSum = tokenScores.reduce((sum, score) => sum + (Math.log(1 - score) - Math.log(score)), 0);

    const probability = 1 / (1 + Math.exp(logSum));

    return probability;
  }

  // Based on passed token and label it calculate probability of having given label by document (with assumption that inside it occurs given token). We use simpler version of Bayes clasificator: calculation of probability of token occurs, in condition that we are talking about given category (frequency of words in category occur). This method makes some operations on tokens which occur rare. 
  calculateTokenScore(token: string, label: string) {
    const rareTokenWieght = 3;

    const totalDocumentCount = this.getLabelDocumentCount();
    const labelDocumentCount = this.getLabelDocumentCount(label);
    const notLabelDocumentCOunt = totalDocumentCount - labelDocumentCount;

    // assume equal probability give 1% accuracy, we use frequency of individual labels
    const probLabel = 1 / this.getAllLabels().length;
    const probNotLabel = 1 - probLabel;

    const tokenLabelCount = this.getTokenCount(token, label);
    const tokenTotalCount = this.getTokenCount(token);
    const tokenNotLabelCount = tokenTotalCount - tokenLabelCount;

    const probTokenGivenLabel = tokenLabelCount / labelDocumentCount;
    const probTokenGivenNotLabel = tokenNotLabelCount / notLabelDocumentCOunt;
    const probTokenLabelSupport = probTokenGivenLabel * probLabel;
    const probTokenNotLabelSupport = probTokenGivenNotLabel * probNotLabel;

    const rawWordScore = probTokenLabelSupport / (probTokenLabelSupport + probTokenNotLabelSupport);
    
    // rare occur tokens - set weighted average (s - weight, n - total number of individual token occur)
    const s = rareTokenWieght;
    const n = tokenTotalCount;
    const adjustedTokenScore = ((s * probLabel) + (n * (rawWordScore || probLabel))) / (s + n);

    return adjustedTokenScore;
  }
}