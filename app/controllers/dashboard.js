import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { task } from 'ember-concurrency';
import Classifier from '../lers/classifier';
import { copy } from '@ember/object/internals';

export default Controller.extend({

  /**
   * Deteremine whether the app has the required files for visualization.
   *
   * @private
   * @property hasNecessarySelectedFiles
   * @type {boolean}
   */
  hasNecessarySelectedFiles: computed('model.@each.isSelected', {
    get() {
      let model = this.get('model');

      let hasNecessaryRuleFile = model.filter(file => {
        return file.get('isSelected') && file.get('isRuleset');
      }).length === 1;

      let hasNecessaryDataFile = model.filter(file => {
        return file.get('isSelected') && file.get('isDataset');
      }).length === 1;

      return hasNecessaryRuleFile && hasNecessaryDataFile;
    }
  }),

  /**
   * Stores the LERS classified data.
   *
   * @public
   * @property LERS
   * @type {LERS}
   */
  LERS: null,

  /**
   * Stores the setting for Matching Factor.
   *
   * @public
   * @property shouldUseMatchingFactor
   * @type {boolean}
   */
  shouldUseMatchingFactor: true,

  /**
   * Stores the setting for Strength Factor.
   *
   * @public
   * @property shouldUseConditionalProbability
   * @type {boolean}
   */
  shouldUseConditionalProbability: true,

  /**
   * Stores the setting for Specificity Factor.
   *
   * @public
   * @property shouldUseSpecificityReturnFactor
   * @type {boolean}
   */
  shouldUseSpecificityReturnFactor: true,

  /**
   * Stores the setting for Support from other rules.
   *
   * @public
   * @property shouldUseSupportFromOtherRules
   * @type {boolean}
   */
  shouldUseSupportFromOtherRules: true,

  /**
   * Determine if visualization mode is on.
   *
   * @public
   * @property visualizationModeOn
   * @type {boolean}
   */
  visualizationModeOn: false,

  /**
   * Concurrency task to add items to the inventory.
   *
   * @private
   * @function uploadData
   * @param file
   */
  uploadData: task(function * (file) {
    let dataFile = this.store.createRecord('data-file', {
      id: get(file, 'id'),
      fileName: get(file, 'name'),
      fileSize: get(file, 'size')
    });

    try {
      let content = yield file.readAsText();

      dataFile.set('content', content);

    } catch (e) {
      dataFile.rollback();
    }
  }).maxConcurrency(3).enqueue(),

  /**
   * Concurrency task to trigger visualization.
   *
   * @private
   * @function visualize
   */
  visualize: task(function * () {
    let ruleset = this.get('model').find(ruleset => {
      return ruleset.get('isRuleset', true) && ruleset.get('isSelected', true);
    });
    let dataset = this.get('model').find(dataset => {
      return dataset.get('isDataset', true) && dataset.get('isSelected', true);
    });
    let LERS = yield new Classifier (
      copy(ruleset.get('prunedData'), true),
      copy(dataset.get('prunedData'), true),
      this.get('shouldUseMatchingFactor'),
      this.get('shouldUseConditionalProbability'),
      this.get('shouldUseSpecificityReturnFactor'),
      this.get('shouldUseSupportFromOtherRules')
    );

    this.setProperties({
      LERS: LERS,
      visualizationModeOn: true
    });
  }).keepLatest(),

  /**
   * Actions for view based events.
   *
   * @public
   * @property actions
   * @type {Object}
   */
  actions: {

    /**
     * Call this action to delete file from inventory.
     *
     * @private
     * @function deleteFile
     * @param {string} fileId - the input file id.
     */
    deleteFile(fileId) {
      let dataFile = this.store.peekRecord('data-file', fileId);

      dataFile.deleteRecord();
    },

    /**
     * Call this action to reset dashboard.
     *
     * @private
     * @function resetDashboard
     */
    resetDashboard() {
      this.setProperties({
        shouldUseMatchingFactor: true,
        shouldUseConditionalProbability: true,
        shouldUseSpecificityReturnFactor: true,
        shouldUseSupportFromOtherRules: true,
        visualizationModeOn: false
      });
    },

    /**
     * Call this action to select a file.
     *
     * @private
     * @function selectFile
     * @param {string} fileId - the input file id.
     */
    selectFile(fileId) {
      let dataFile = this.store.peekRecord('data-file', fileId);

      dataFile.toggleProperty('isSelected');
    },

    /**
     * Call this action to toggle a classification switch.
     *
     * @private
     * @function toggleSwitch
     * @param {string} identifier - the switch variable.
     */
    toggleSwitch(identifier) {
      this.toggleProperty(identifier);
      this.get('visualize').perform();
    },

    /**
     * Call this action to upload files to inventory.
     *
     * @private
     * @function uploadData
     * @param {Object} file - the input file.
     */
    uploadData(file) {
      get(this, 'uploadData').perform(file);
    }
  }
});