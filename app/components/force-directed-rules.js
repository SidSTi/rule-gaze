import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
/*
import { get } from '@ember/object';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { scaleLinear } from 'd3-scale'; */

export default Component.extend({

  tagName: 'svg',
  classNames: ['awesome-d3-widget'],

  width: 720,
  height: 400,

  attributeBindings: ['width', 'height'],

  init() {
    this._super();
    this.data = [];
  },

  didReceiveAttrs() {
    scheduleOnce('render', this, this.drawCircles);
  },

  draw() {

  }

});
