var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SkillSchema   = new Schema({
    name: {type: String, required: true},
    character: [{type: Schema.Types.ObjectId, ref: "Character"}]   //  a particular skill can be obtained by many characters
});

module.exports = mongoose.model('Skill', SkillSchema);
