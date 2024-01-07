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

  getTokenCount(token: string, label: string | null = null) {
    if (label) {
      return (this.database.tokens[token] || {})[label] || 0;
    } else {
      return Object.values(this.database.tokens[token] || {}).reduce((sum: any, count) => sum + count, 0);
    }
  }
}