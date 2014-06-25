/**
* @jsx React.DOM
*/

var headerComponent = require('./headerComponent.jsx');
var dayComponent = require('./dayComponent.jsx');

var WeekComponent = React.createClass({
  componentWillMount: function () {
    this.callback = (function () {
      this.forceUpdate();
    }).bind(this);
  },


  getInitialState: function () {
    var updateState = function () {
      this.setState({ days: _.clone(this.props.days) });
    };

    this.props.days.on('add', updateState, this);

    return { days: _.clone(this.props.days) };
  },

  componentDidMount: function () {
    var self = this;
  },


  render: function () {
    var router = this.props.router;
    var models = this.state.days.models;
    var self = this;

    var week = {};

    models.forEach(function (day) {
      week['day-' + day.get('name')] = <dayComponent day={day} />;
    });

    return (
      <div className="wrapper weekly-fitness-planner">
        <headerComponent days={this.props.days} />
        <div className='week-controls'>{week}</div>
      </div>
    );
  }
});


// Export the Module
module.exports = WeekComponent;
