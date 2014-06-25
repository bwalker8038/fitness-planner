// Day Model
var Day = Backbone.Model.extend({
  defaults: {
    hoursAlloc: 0
  }
});



// Day Collection
var DayCollection = Backbone.Collection.extend({

  // Collection Model
  model: Day,

  // Calculate total mins of workout for the week
  totalWorkout: function () {
    var total = 0;

    this.models.map(function ( model ) {
      dayWorkout = parseInt(model.get('hoursAlloc'), 10);
      total += dayWorkout;
    });

    return total;
  }

});


// Exports;
exports.Model = Day;
exports.Collection = DayCollection;
