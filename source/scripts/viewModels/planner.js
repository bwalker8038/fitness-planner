/**
* @jsx React.DOM
*/

/*
 * Planner Controller
 * ******************
 * Controller for the
 * Planner Views.
 */

// View Components
// =============
var weekView = require('../components/weekComponent.jsx');
var dayView = require('../components/dayComponent.jsx');

// Models and Collections
// ======================
var Day = require('../models/day').Model;
var DayCollection = require('../models/day').Collection;

var days = new DayCollection([
  { name: 'mon' },
  { name: 'tue' },
  { name: 'wed' },
  { name: 'thu' },
  { name: 'fri' },
  { name: 'sat' },
  { name: 'sun' }
]);


// Hard set our Fitness Goal, since we're not using a server
days.fitnessGoal = 150;


/* Module Export Setup
 * ===================
 * Inits the controller
 * when imported by
 * another module
 *
 * @param {object} app the application object
 */
exports.setup = function ( app ) {
  var planner = new PlannerController();

  // create the Controllers Router
  var router = Backbone.Router.extend({

    routes: {
      '*default': 'indexAction'
    },

    indexAction: planner.indexHandler
  });

  app.router = new router();
};


// The Controller
function PlannerController () {
  console.log('Planner controller initialized');

  return this;
}

// Route Handlers
// ==============

/* Index Handler Method
 * ====================
 * Renders the root view of
 * the Applicaiton
 */
PlannerController.prototype.indexHandler = function () {
  // Render the entries
  React.renderComponent(
    <weekView days={days} />,
    $('.weekly-planner')[0]
  );
};
