import Route from '@ember/routing/route';

export default Route.extend({

  /**
   * Actions for view based events.
   *
   * @public
   * @property actions
   * @type {Object}
   */
  actions: {

    /**
     * Ember hook called when a promise is rejected.
     *
     * @public
     * @override
     * @function error
     * @param {Object} error The error object.
     * @param {Object} transition The current transition attempt.
     */
    error(error, transition) {
      // log error
      console.error('Error handling logic.', error, transition);

      if (error.errors instanceof Array && error.errors.length === 1) {
        // set in error controller
        this.controllerFor('error').set('error', error.errors[0]);
      }

      this.replaceWith('error');
    },

    /**
     * An action fired on the route when a route's model hook
     * returns a promise that is not already resolved.
     *
     * @public
     * @override
     * @function loading
     */
    loading(transition) {
      let controller = this.controllerFor('application');
      controller.set('isLoading', true);

      transition.promise.finally(() => {
        controller.set('isLoading', false);
      });
    }
  }
});
