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
  constructor(data = []) {
    this.hasProperFormat = true;
    this.rules = [];
    this.rulesByConcept = [];
    let cache = [];

    // extract rules
    for (let i = 0; i < data.length; i += 2) {
      if (!hasValidRuleFactors(data[i])) {
        this.hasProperFormat = hasValidRuleFactors(data[i]);
        break;
      } else if (hasValidRuleConditions(data[i + 1])) {
        let rule = new Rule(
          extractRule(data[i + 1]),
          extractRuleFactors(data[i])
        );
        let ruleActionValue = rule.action.value;
        this.rules.push(rule);

        // create new concept
        if (cache.indexOf(ruleActionValue) === -1) {
          // add the concept's decision value to the cache for tracking
          cache.push(ruleActionValue);
          // create a new concept and add it to the rules by concepts array
          this.rulesByConcept[cache.indexOf(ruleActionValue)] = {
            action: rule.action,
            rules: []
          };
        }

        // add case to its corresponding concept
        this.rulesByConcept[cache.indexOf(ruleActionValue)].rules.push(rule);
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