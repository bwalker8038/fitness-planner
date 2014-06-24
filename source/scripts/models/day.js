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

  url: '.json' + window.location.search,

  // Parses the Data Source
  parse: function (data) {
    return data.entries;
  },


  // Model Methods
  // -------------

  // Gets the order of the Entries in the Collection
  nextOrder: function () {
    if ( !this.length ) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  // Comparator, Sort collection by order
  comparator: 'order'
});


// Exports;
exports.Model = Day;
exports.Collection = DayCollection;
