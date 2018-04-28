import { extractVariable } from './parser';

/**
 * Example usage:
 *
 * ```js
 * let attribute = new Variable('temperature', '101..104');
 *
 * // properties
 * attribute.name // 'temperature'
 * attribute.value // '101..104'
 * attribute.isMissing // false
 * attribute.isLost // false
 * attribute.isDoNotCare // false
 * attribute.isAttributeConcept // false
 * attribute.isSymbolic // true
 *
 * // in-built methods
 * attribute.toString() // '(temperature, 101..104)'
 * attribute.belongsToInterval('102') // true
 *
 * // static methods
 * Variable.fromString('(temperature, 102)') // instantiates a class of type Variable
 * Variable.toVariable({ name: temperate, value: 102 }); // instantiates a class of type Variable
 * ```
 *
 * @class Variable
 */
export default class Variable {

  /**
   * Constructor for Variable.
   *
   * @private
   * @function constructor
   * @param {string} name
   * @param {string|number} value
   */
  constructor(name = '', value = '') {
    this.name = name;
    this.value = value;
  }

  /**
   * Determine whether an attribute value is "attribute-concept".
   *
   * @public
   * @property isAttributeConcept
   * @type {boolean}
   */
  get isAttributeConcept() {
    return this.value === '-';
  }

  /**
   * Determine whether an attribute value is "do not care".
   *
   * @public
   * @property isDoNotCare
   * @type {boolean}
   */
  get isDoNotCare() {
    return this.value === '*';
  }

  /**
   * Determine whether an attribute value is lost.
   *
   * @public
   * @property isLost
   * @type {boolean}
   */
  get isLost() {
    return this.value === '?';
  }

  /**
   * Determine whether an attribute value is missing.
   *
   * @public
   * @property isMissing
   * @type {boolean}
   */
  get isMissing() {
    return this.isLost || this.isDoNotCare || this.isAttributeConcept;
  }

  /**
   * Determine whether an attribute value is symbolic.
   *
   * @public
   * @property isSymbolic
   * @type {boolean}
   */
  get isSymbolic() {
    return this.value
      .match(/(\d.*\.\..*\d)+?/g) !== null;
  }

  /**
   * Check whether a value lies within this attribute's cutpoint interval.
   *
   * @public
   * @function belongsToInterval
   * @param {number|string} inputValue
   *
   * @return {boolean}
   */
  belongsToInterval(inputValue) {
    let isInputValueSymbolic = inputValue.match(/(\d.*\.\..*\d)+?/g) !== null;
    let interval = this.value.split('..');

    if (isInputValueSymbolic) {
      let inputValueInterval = inputValue.split('..');

      return +inputValueInterval[0] >= +interval[0] && +inputValueInterval[1] <= +interval[1];
    }

    return +inputValue >= +interval[0] && +inputValue <= +interval[1];
  }

  /**
   * Print the variable.
   *
   * Example output: (temperature, 98..101)
   *
   * @public
   * @function toString
   *
   * @return {string} - attribute-value of format `(name, variable)`.
   */
  toString() {
    return `(${this.name}, ${this.value})`;
  }

  /**
   * Get a an instance of class Variable from string
   *
   * @public
   * @static
   * @function fromString
   * @param {string} variableString
   *
   * @return {Variable}
   */
  static fromString(variableString) {
    let variable = extractVariable(variableString);

    return new Variable(variable[0], variable[1]);
  }

  /**
   * Convert object to variable.
   *
   * @public
   * @static
   * @function toVariable
   * @param {Object} variableObject
   * @param {string} variableObject.name
   * @param {string} variableObject.value
   *
   * @return {Variable}
   */
  static toVariable({ name, value }) {
    return new Variable(name, value);
  }
}