import Variable from './variable';

/**
 * @class Rule
 */
export default class Rule {

  /**
   * Constructor for Rule.
   *
   * @private
   * @function constructor
   * @param {Object[]} variables
   * @param {Object} ruleFactors
   * @param {number} ruleFactors.strength
   * @param {number} ruleFactors.specificity
   * @param {number} ruleFactors.matchingCases
   */
  constructor(variables, { strength, specificity, matchingCases }) {
    let variablesCopy = variables.slice();
    this.action = Variable.toVariable(variablesCopy.pop());
    this.conditions = variablesCopy.map(condition => Variable.toVariable(condition));
    this.strength = strength;
    this.specificity = specificity;
    this.matchingCases = matchingCases;
  }
}