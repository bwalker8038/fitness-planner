/**
* @jsx React.DOM
*/

var DayComponent = React.createClass({
  componentDidMount: function () {
    var node = this.getDOMNode();
  },

  // Render the view
  render: function () {
    var day = this.props.day;

    return (
      <div key={day.get('name')} className={'day ' + entry.get('name')} >
        <span className="hour-output">day.get('hoursAlloc')</span>
        <input type="range" />
        <h3>day.get('name')</h3>
      </div>
    );
  }
});


// Export the Module
module.exports = DayComponent;
