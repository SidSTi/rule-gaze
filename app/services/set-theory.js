import Service from '@ember/service';

/**
 * Service to perform Set operations.
 *
 * @public
 * @exports setTheory
 */
export default Service.extend({

  /**
   * Whether the give set is a super set.
   *
   * @public
   * @function isSuperSet
   * @param {Set} set
   * @param {Set} subset
   *
   * @return {boolean} - return true if superset
   */
  isSuperSet(set = new Set(), subset = new Set()) {
    for (let elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }

    return true;
  },

  /**
   * Calculate union of two sets.
   *
   * @public
   * @function union
   * @param {Set} setA
   * @param {Set} setB
   *
   * @return {Set} - union of two sets.
   */
  union(setA = new Set(), setB = new Set()) {
    let union = new Set(setA);

    for (let elem of setB) {
      union.add(elem);
    }

    return union;
  },

  /**
   * Calculate intersection of two sets.
   *
   * @public
   * @function intersection
   * @param {Set} setA
   * @param {Set} setB
   *
   * @return {Set} - intersection of two sets.
   */
  intersection(setA = new Set(), setB = new Set()) {
    let intersection = new Set();

    for (let elem of setB) {
      if (setA.has(elem)) {
        intersection.add(elem);
      }
    }

    return intersection;
  },

  /**
   * Calculate difference of two sets.
   *
   * @public
   * @function difference
   * @param {Set} setA
   * @param {Set} setB
   *
   * @return {Set} - difference of two sets.
   */
  difference(setA = new Set(), setB = new Set()) {
    let difference = new Set(setA);

    for (let elem of setB) {
      difference.delete(elem);
    }

    return difference;
  },

  /**
   * Sort a set.
   *
   * @public
   * @function sort
   * @param {Set} set
   *
   * @return {Set} - a sorted set.
   */
  sort(set) {
    let setArray = Array.from(set);

    return new Set(setArray.sort());
  },

  /**
   * Convert Set to string
   *
   * @public
   * @function toString
   * @param {Set} set
   *
   * @return {string} - resultant string from the set.
   */
  toString(set) {
    return `{${[...set]}}`;
  }
});