import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import Classifier from '../lers/classifier';

export default Controller.extend({

  shouldUseMatchingFactor: true,

  shouldUseConditionalProbability: true,

  shouldUseSpecificityReturnFactor: true,

  shouldUseSupportFromOtherRules: true,

  inputRuleset: null,

  inputDataset: null,

  LERS: null,

  visualize: task(function * () {
    let ruleset = this.get('inputRuleset.prunedData');
    let dataset = this.get('inputDataset.prunedData');

    let LERS = yield new Classifier (
      ruleset,
      dataset,
      this.get('shouldUseMatchingFactor'),
      this.get('shouldUseConditionalProbability'),
      this.get('shouldUseSpecificityReturnFactor'),
      this.get('shouldUseSupportFromOtherRules')
    );

    this.set('LERS', LERS);
  }).keepLatest(),

  actions: {
    toggleSwitch(identifier) {
      this.toggleProperty(identifier);
    }
  }
});
