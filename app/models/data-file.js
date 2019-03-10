import DS from 'ember-data';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import { pruneData, hasValidRuleConditions, hasVariables, isVariableDefinition } from '../lers/parser';

export default DS.Model.extend({
  fileName  : attr('string'),
  fileSize  : attr('string'),
  content   : attr('string', { defaultValue: '' }),
  isSelected: attr('boolean', { defaultValue: false }),

  prunedData: computed('content', {
    get() {
      let prunedData = pruneData(this.get('content'));

      // remove any variable definitions
      if (isVariableDefinition(prunedData[0])) {
        prunedData.shift();
      }

      return prunedData;
    }
  }),

  isRuleset: computed('prunedData', {
    get() {
      let prunedData = this.get('prunedData');

      return prunedData.some(data => hasValidRuleConditions(data));
    }
  }),

  isDataset: computed('prunedData', {
    get() {
      let prunedData = this.get('prunedData');

      return prunedData.some(data => hasVariables(data));
    }
  }),

  isValidFile: computed('prunedData', {
    get() {
      return this.get('isDataset') || this.get('isRuleset');
    }
  })
});
