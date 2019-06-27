const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }],
    posts: [{ type: String },],
    lastUpdated: {type: Date, index : {unique : false}, 'default' : Date.now},
    likes: { type: Number, 'default' : 0 },
    description: { type: String, required : false},
    type: { type: String , 'default' : ""},
    title: { type: String },
    recruiting: { type: String },
    repo: { type: String, "default": "" },
    connection: {type:String}
});

ProjectSchema.path('owners').validate((owners)=>{
    return owners.length;
}, 'have no owners');


const ProjectModel = mongoose.model('projects', ProjectSchema);

module.exports = ProjectModel;