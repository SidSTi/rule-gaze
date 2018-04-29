import DS from 'ember-data';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import { pruneData, hasValidRuleConditions, hasValidRuleFactors, hasVariables, isVariableDefinition } from '../lers/parser';

export default DS.Model.extend({
  fileName  : attr('string'),
  fileSize  : attr('string'),
  content   : attr('string', { defaultValue: ' '}),
  isSelected: attr('boolean', { defaultValue: false }),

  prunedData: computed('content', {
    get() {
      return pruneData(this.get('content'));
    }
  }),

  isRuleFile: computed('prunedData', {
    get() {
      let prunedData = this.get('prunedData');

      return prunedData.some(data => hasValidRuleConditions(data)) && prunedData.some(data => hasValidRuleFactors(data));
    }
  }),

  isDataFile: computed('prunedData', {
    get() {
      let prunedData = this.get('prunedData');

      return prunedData.some(data => hasVariables(data)) && prunedData.some(data => isVariableDefinition(data));
    }
  }),

  isValidFile: computed('prunedData', {
    get() {
      return this.get('isDataFile') || this.get('isRuleFile');
    }
  })
});
