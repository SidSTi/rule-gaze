import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | set-theory', function(hooks) {
  setupTest(hooks);

  test('can calculate intersection of two sets', function(assert) {
    let service = this.owner.lookup('service:set-theory');

    let setA = new Set([1, 2, 3, 4, 5]);
    let setB = new Set([4, 5]);

    assert.deepEqual(service.intersection(setA, setB), new Set([4, 5]), 'can calculate correct intersection.');
  });

  test('can calculate difference of two sets', function(assert) {
    let service = this.owner.lookup('service:set-theory');

    let setA = new Set([1, 2, 3, 4, 5]);
    let setB = new Set([4, 5]);

    assert.deepEqual(service.difference(setA, setB), new Set([1, 2, 3]), 'can calculate correct difference.');
  });

  test('can calculate union of two sets', function(assert) {
    let service = this.owner.lookup('service:set-theory');

    let setA = new Set([1, 2, 3, 4, 5]);
    let setB = new Set([6, 7]);

    assert.deepEqual(service.union(setA, setB), new Set([1, 2, 3, 4, 5, 6, 7]), 'can calculate correct union.');
  });

  test('can determine if a set is a superset of a subset', function(assert) {
    let service = this.owner.lookup('service:set-theory');

    let setA = new Set([1, 2, 3, 4, 5]);
    let setB = new Set([4, 5]);

    assert.ok(service.isSuperSet(setA, setB), 'can determine if super set.');
  });

  test('can sort a set', function(assert) {
    let service = this.owner.lookup('service:set-theory');

    let set = new Set([3, 1, 2, 4, 5]);

    assert.deepEqual(service.sort(set), new Set([1, 2, 3, 4, 5]), 'can sort a set.');
  });

  test('can convert set to a string', function(assert) {
    let service = this.owner.lookup('service:set-theory');

    let set = new Set([1, 2, 3, 4, 5]);

    assert.deepEqual(service.toString(set), '{1,2,3,4,5}', 'can convert a set to a string.');
  });
});