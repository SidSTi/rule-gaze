import Route from '@ember/routing/route';

export default Route.extend({

  /**
   * Ember Redirect hook called to redirect to a sub-state.
   *
   * @public
   * @override
   * @method redirect
   * @return {Object|undefined} An optional Promise.
   */
  redirect() {
    this.replaceWith('dashboard');
  }
});
