var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CharacterSchema = new Schema({
    name       : {type: String, required: true, unique: true},                                // Rhaegar
    titles      : [String],                                                        // Prince of Dragonstone Ser
    male       : Boolean,                                                       // Male
    culture    : String,             // Valyrian
    age        : {type: Number, min: 1, max: 200},                              // ??
    dateOfBirth: Number,                                                        // 259 AC
    dateOfDeath: Number,  	                                                     // 283 AC
    actor      : String,
    mother: {type: String, ref: 'Character'},
    father: {type: String, ref: 'Character'},
    heir  : {type: String, ref: 'Character'},
    placeOfBirth: {type: String, ref: "Region"},                                                 // Summerhall
    placeOfDeath: {type: String, ref: "Region"},                                                 // Trident
    house       : {type: String, ref: "House"},                   // House Targaryen
    createdAt   : {type: Date, default: Date.now},
    updatedAt   : {type: Date, default: Date.now},
    spouse             : {type: String, ref: 'Character'},
    allegiance         : {type: String, ref: 'Character'},
    pageRank: Number,
    books              : [String],
    placeOfLastVisit   : {type: String, ref: "Region"}, 
    imageLink		: String,
    slug		: String,
    hasPath		: Boolean
});

module.exports = mongoose.model('Character', CharacterSchema);
