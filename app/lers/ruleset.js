import { hasValidRuleFactors, hasValidRuleConditions, extractRule, extractRuleFactors } from './parser';
import Rule from './rule';

/**
 * @class Ruleset
 */
export default class Ruleset {

  /**
   * Constructor for Ruleset.
   *
   * @function constructor
   * @param {string[]} data
   */
  construcltor(data = []) {
    this.hasProperFormat = true;
    this.rules = [];

    // extract rules
    for (let i = 0; i < data.length; i += 2) {
      if (!hasValidRuleFactors(data[i])) {
        this.hasProperFormat = hasValidRuleFactors(data[i]);
        break;
      } else if (hasValidRuleConditions(data[i + 1])) {
        this.rules.push(
          new Rule(
            extractRule(data[i + 1]),
            extractRuleFactors(data[i])
          )
        );
      }
    }

    // calculate number of conditions in ruleset
    this.numberOfConditions = this.rules.reduce((conditions, rule) => {
      conditions += rule.conditions.length;

      return conditions;
    }, 0);

    // check if rule set has a rule with zero matching cases
    this.hasRulesWithZeroMatchingCases = this.rules.some(rule => rule.matchingCases === 0);
  }
}