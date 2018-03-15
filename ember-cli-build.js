/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

var isProduction = ['production', 'hosted-widget'].indexOf(process.env.EMBER_ENV) > -1;

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Enable ES2016 and beyond syntax.
    'ember-cli-babel': {
      includePolyfill: true
    },

    // Enable hinting in non-production environments.
    hinting: !isProduction,

    sassOptions: {
      includePaths: [
        'app/styles'
      ]
    },

    // Minify css in non-production environments (useful for hosted-widget).
    minifyCSS: {
      enabled: isProduction
    },

    // Minify js in non-production environments (useful for hosted-widget).
    minifyJS: {
      enabled: isProduction
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  if (!isProduction) {
    app.import('bower_components/d3/d3.js');
  }

  return app.toTree();
};
