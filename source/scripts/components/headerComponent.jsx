/**
* @jsx React.DOM
*/

var totalOutput = React.createClass({
  getInitialState: function () {
    var updateState = function () {
      this.setState({ days: _.clone(this.props.days) });
    };

    this.props.days.on('add', updateState, this);

    return { days: _.clone(this.props.days) };
  },

  componentDidMount: function () {
    var days = this.state.days;
     days.on('change', function() {
       this.forceUpdate();
     }.bind(this));
  },

  // Render the view
  render: function () {
    var days = this.state.days;

    return (
      <div className="total-display">
        <span className="total">{days.totalWorkout()}</span>
        <span className="label"> min</span>
      </div>
    );
  }
});


var DayComponent = React.createClass({
  getInitialState: function () {
    var updateState = function () {
      this.setState({ days: _.clone(this.props.days) });
    };

    this.props.days.on('add', updateState, this);

    return { days: _.clone(this.props.days) };
  },

  componentDidMount: function () {
    var days = this.state.days;
     days.on('change', function() {
       this.forceUpdate();
     }.bind(this));
  },


  // Render the view
  render: function () {
    var days = this.state.days;

    return (
      <header className='fitness-header' >
        <h1>Weekly Fitness Goal: { days.fitnessGoal } Min</h1>
        <totalOutput days={days} />
      </header>
    );
  }
});


// Export the Module
module.exports = DayComponent;
