import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';
import { get } from '@ember/object';

export default Route.extend({

  model() {
    return this.get('store').peekAll('data-file');
  },

  uploadData: task(function * (file) {
    let dataFile = this.store.createRecord('data-file', {
      id: get(file, 'id'),
      url: get(file, 'url'),
      filename: get(file, 'name'),
      filesize: get(file, 'size')
    });

    try {
      let content = yield file.readAsText();

      dataFile.set('content', content);

    } catch (e) {
      dataFile.rollback();
    }
  }).maxConcurrency(3).enqueue(),

  actions: {
    uploadData(file) {
      get(this, 'uploadData').perform(file);
    }
  }
});