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
    return this.get('store').peekAll('data-file');
  }
});