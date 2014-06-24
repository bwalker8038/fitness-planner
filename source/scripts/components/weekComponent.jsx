/**
* @jsx React.DOM
*/

var dayComponent = require('./dayComponent.jsx');

var EntriesComponent = React.createClass({
  componentWillMount: function () {
    this.callback = (function () {
      this.forceUpdate();
    }).bind(this);
  },


  getInitialState: function () {
    var updateState = function () {
      this.setState({ entries: _.clone(this.props.week) });
    };

    this.props.entries.on('add', updateState, this);

    return { week: _.clone(this.props.week) };
  },

  componentDidMount: function () {
    var self = this;
  },


  render: function () {
    var router = this.props.router;
    var models = this.state.week.models;
    var self = this;

    var week = {};

    models.forEach(function (entry) {
      week['day-' + entry.get('name')] = <dayComponent day={day} />;
    });

    return (
      <div className='week'>{week}</div>
    );
  }
});


// Export the Module
module.exports = EntriesComponent;
