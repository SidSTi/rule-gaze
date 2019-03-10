import { extractVariables, extractDataMatrix } from './parser';
import Case from './case';
import Concept from './concept';

/**
 * @class Dataset
 */
export default class Dataset {

  /**
   * Constructor for Dataset.
   *
   * @function constructor
   * @param {string[]} data
   */
  constructor(data = []) {
    // extract key artifacts
    let variableNames = extractVariables(data.shift());
    let dataMatrix = extractDataMatrix(data);
    let cache = [];

    // initialize model
    this.concepts = [];
    this.cases = [];

    // populate model
    dataMatrix.forEach((dataRow, index) => {
      let newCase = new Case(index + 1, variableNames, dataRow);
      let decisionValue = newCase.decision.value;

      // push case to cases array
      this.cases.push(newCase);

      // create new concept
      if (cache.indexOf(decisionValue) === -1) {
        // add the concept's decision value to the cache for tracking
        cache.push(decisionValue);
        // create a new concept and add it to the dataset's concepts array
        this.concepts[cache.indexOf(decisionValue)] = new Concept(newCase.decision);
      }

      // add case to its corresponding concept
      this.concepts[cache.indexOf(decisionValue)].addCase(newCase);
    });
  }
}