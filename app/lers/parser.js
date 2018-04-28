/**
 * Extract data matrix from raw data.
 *
 * @public
 * @function extractDataMatrix
 * @param {string[]} data
 * @return {Object}
 */
export function extractDataMatrix(data = []) {
  return data.reduce((dataMatrix, dataMatrixRow) => {
    let prunedDataMatrixRow = dataMatrixRow
      .replace(/(\s|\t){2,}/g, ' ')
      .trim()
      .split(' ');

    dataMatrix.push(prunedDataMatrixRow);

    return dataMatrix;
  }, []);
}

/**
 * Extract conditions out of a rule.
 *
 * @public
 * @function extractRule
 * @param {string} inputString
 *
 * @return {string[]}
 */
export function extractRule(inputString = '') {
  let regex = /(\(.+?,.+?\))+/g;

  return inputString
    .match(regex)
    .reduce((ruleCondition, item) => {
      let variable = item
        .replace(/\(|\)|\s|\t/g, '')
        .split(',');

      ruleCondition.push({
        name: variable[0],
        value: variable[1]
      });

      return ruleCondition;
    }, []);
}

/**
 * Extract rule factors from string.
 *
 * @public
 * @function extractRuleFactors
 * @param {string} inputString
 *
 * @return {Object}
 */
export function extractRuleFactors(inputString = '') {
  let ruleFactors = inputString
    .trim()
    .split(/\s*,\s*/);

  return {
    strength: +ruleFactors[0],
    specificity: +ruleFactors[1],
    matchingCases: +ruleFactors[2]
  };
}

/**
 * Extract variable from string.
 *
 * @public
 * @function extractVariable
 * @param {string} inputString
 *
 * @return {string}
 */
export function extractVariable(inputString = '') {
  return inputString
    .replace(/(\s|\t)+/g, '')
    .replace(/\(|\)|\s|\t/g, '')
    .split(',');
}

/**
 * Extract variables from string.
 *
 * @public
 * @function extractVariables
 * @param {string} inputString
 *
 * @return {string}
 */
export function extractVariables(inputString = '') {
  return inputString
    .replace(/(\s|\t){2,}/g, ' ')
    .replace(/((\[)(\t|\s)*)|((\t|\s)*(\]))/g, '')
    .trim()
    .split(' ');
}

/**
 * Determine whether a string has valid rule condition.
 *
 * @public
 * @function hasValidRuleConditions
 * @param {string} inputString
 *
 * @return {boolean}
 */
export function hasValidRuleConditions(inputString = '') {
  return inputString
    .trim()
    .split(/(\(.+?,.+?\))+/g)
    .length >= 2;
}

/**
 * Determine whether a string has valid rule factors.
 *
 * @public
 * @function hasValidRuleFactors
 * @param {string} inputString
 *
 * @return {boolean}
 */
export function hasValidRuleFactors(inputString = '') {
  return inputString
    .trim()
    .split(/,\s+/)
    .length === 3;
}

/**
 * Check whether a string is a variable definition.
 *
 * @public
 * @function isVariableDefinition
 * @param {string} inputString
 *
 * @return {boolean}
 */
export function isVariableDefinition(inputString = '') {
  return inputString.match(/(<.*?>)+/g) !== null;
}

/**
 * Prune line breaks in file.
 *
 * @public
 * @function pruneData
 * @param {string} data
 *
 * @return {string} - pruned file
 */
export function pruneData(data = '') {
  return data
    .replace(/(\n){2,}/g, '\n')
    .split(/\n/)
    .filter(item => {
      let prunedItem = item.trim();

      return prunedItem.length > 0 && prunedItem.indexOf('!') === -1;
    });
}