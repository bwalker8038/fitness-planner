/*
 * The App
 */

// Dependencies
// ============
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');

var App = {};


App.controllers = {
  planner: require('./viewModels/planner')
};

_.extend(App, {
  router: null,

  start: function () {
    var controllerName = document.getElementsByTagName('body')[0].getAttribute('data-controller');

    if ( typeof controllerName !== 'undefined' ) {
      if ( typeof App.controllers[controllerName] !== 'undefined' ) {

        App.controllers[controllerName].setup(this);
      }
    }
    Backbone.history.start({
      pushState: true,
      root: '/'
    });
  }
});

// Start the App
$(function () {
  App.start();
});
