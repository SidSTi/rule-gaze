import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({

  /**
   * The error controller.
   *
   * @private
   * @property error
   * @type {Object}
   */
  error: controller(),

  /**
   * Determine whether the application is loading.
   *
   * @private
   * @property isLoading
   * @type {boolean}
   */
  isLoading: false
});
