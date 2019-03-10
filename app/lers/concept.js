import Variable from './variable';

/**
 * @class Concept
 */
export default class Concept {

  /**
   * Constructor for Concept.
   *
   * @private
   * @function constructor
   * @param {Variable} decision
   * @param {Case[]} cases
   */
  constructor(decision = new Variable(), cases = []) {
    this.decision = decision;
    this.cases = cases;
  }

  /**
   * Add a case to this concept.
   *
   * @public
   * @function addCase
   * @param {Case} caseForConcept
   */
  addCase(caseForConcept) {
    this.cases.push(caseForConcept);
  }

  /**
   * Get the length of the concept.
   *
   * @property length
   * @type {number}
   */
  get length() {
    return this.cases.length;
  }
}