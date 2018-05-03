import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { task } from 'ember-concurrency';

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
   * Concurrency task to add items to the inventory.
   *
   * @private
   * @method uploadData
   * @param model
   * @param params
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
   * Actions for view based events.
   *
   * @public
   * @property actions
   * @type {Object}
   */
  actions: {

    /**
     * Call this action to upload files to inventory.
     *
     * @private
     * @method uploadData
     * @param {Object} file - the input file.
     */
    uploadData(file) {
      get(this, 'uploadData').perform(file);
    },

    /**
     * Call this action to delete file from inventory.
     *
     * @private
     * @method deleteFile
     * @param {string} fileId - the input file id.
     */
    deleteFile(fileId) {
      let dataFile = this.store.peekRecord('data-file', fileId);

      dataFile.deleteRecord();
    },

    /**
     * Call this action to select a file.
     *
     * @private
     * @method selectFile
     * @param {string} fileId - the input file id.
     */
    selectFile(fileId) {
      let dataFile = this.store.peekRecord('data-file', fileId);

      dataFile.toggleProperty('isSelected');
    }
  }
});