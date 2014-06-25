/**
* @jsx React.DOM
*/
var HourControl = React.createClass({
  onChange: function (e) {
    this.props.day.set('hoursAlloc', e.target.value);
  },

  render: function () {
    return (
      <input type="range" min="0" max="60" step="10" value={this.props.day.get('hoursAlloc')} onChange={this.onChange}/>
    );
  }

});

var HourOutput = React.createClass({
  componentDidMount: function () {
    var day = this.props.day;
    var el = this.getDOMNode();

     day.on('change', function() {
       this.forceUpdate();
     }.bind(this));

    isResultZero(el, day);
  },

  componentDidUpdate: function () {
    var day = this.props.day;
    var el = this.getDOMNode();
    var self = this;

    isResultZero(el, day);
  },

  render: function () {
    var day = this.props.day;

    return (<span className="hour-output">
            { day.get('hoursAlloc') === 0 ? "00" : day.get('hoursAlloc') }
            </span>)
  }
});


var DayComponent = React.createClass({
  getInitialState: function () {
    var updateState = function () {
      this.setState({ day: _.clone(this.props.day) });
    };

    this.props.day.on('add', updateState, this);

    return { day: _.clone(this.props.day) };
  },

  componentDidMount: function () {
    var day = this.state.day;
     day.on('change', function() {
       this.forceUpdate();
     }.bind(this));
  },


  // Render the view
  render: function () {
    var day = this.state.day;

    return (
      <div key={day.get('name')} className={'day ' + day.get('name')} >
        <div className="data-wrapper">
          <HourOutput day={day} />
          <HourControl day={day} />
        </div>
        <h3>{day.get('name').toUpperCase()}</h3>
      </div>
    );
  }
});

// Helpers
function isResultZero (el, model) {
  var result = model.get('hoursAlloc');
    if ( result === 0) {
      $(el).addClass('no-output');
    } else {
      $(el).removeClass('no-output');
    }
}

// Export the Module
module.exports = DayComponent;
