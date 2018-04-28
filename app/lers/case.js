import Variable from './variable';

/**
 * @class Case
 */
export default class Case {

  /**
   * Constructor for Case.
   *
   * @function constructor
   * @param {number} index
   * @param {string[]} variableNames
   * @param {string[]} variableValues
   */
  constructor(index, variableNames = [], variableValues = []) {
    // copy the variableNames and variableValues to avoid mutation
    let variableNamesCopy = variableNames.slice();
    let variableValuesCopy = variableValues.slice();

    // instantiate Case artifacts
    this.index = index;
    this.attributes = [];
    this.decision = new Variable(variableNamesCopy.pop(), variableValuesCopy.pop());

    for (let i = 0; i < variableNamesCopy.length; i++) {
      this.attributes.push(new Variable(variableNamesCopy[i], variableValuesCopy[i]));
    }

    // instantiate case classification artifacts;
    this.isClassified = false;
    this.isCorrectlyClassified = false;
    this.isIncorrectlyClassified = false;
    this.isCompletelyMatched = false;
    this.isPartiallyMatched = false;
  }

  /**
   * Whether the case has a lost value.
   *
   * @public
   * @property hasLostValue
   * @type {boolean}
   */
  get hasLostValue() {
    return this.attributes.some(attribute => attribute.isLost);
  }

  /**
   * Whether the case has any symbolic values.
   *
   * @public
   * @property hasSymbolicValues
   * @type {boolean}
   */
  get hasSymbolicValues() {
    return this.attributes.some(attribute => attribute.isSymbolic);
  }

  /**
   * Print the Case.
   *
   * Example output: [98..101, yes, yes]
   *
   * @public
   * @function toString
   * @param {string} format
   */
  toString() {
    return `[${this.attributes.map(attribute => attribute.value).join(', ')}, ${this.decision.value}]`;
  }
}