import Route from '@ember/routing/route';

export default Route.extend({

  /**
   * Ember hook called to resolve the model for this route.
   *
   * @private
   * @override
   * @function model
   *
   * @return {Object|Promise} The model for this route.
   */
  model() {
    return this.get('store')
      .peekAll('data-file')
      .filter(file => {
        return file.get('isSelected') && (file.get('isRuleset') || file.get('isDataset'));
      });
  },

  /**
   * Set defaults for this controller.
   *
   * @private
   * @override
   * @function setupController
   * @param controller
   * @param model
   */
  setupController(controller, model) {
    // Call default behavior
    this._super(...arguments);

    controller.setProperties({
      inputRuleset: model.findBy('isRuleset', true),
      inputDataset: model.findBy('isDataset', true)
    });

    controller.get('visualize').perform();
  }
});
