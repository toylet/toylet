const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }],
    posts: { type: String },
    lastUpdated: { type: Date },
    likes: { type: Number },
    description: { type: String, required : false},
    type: { type: String },
    title: { type: String },
    recruiting: { type: String },
    repo: { type: String, "default": "" },
});

ProjectSchema.path('owners').validate((owners)=>{
    return owners.length;
}, 'have no owners');


const ProjectModel = mongoose.model('projects', ProjectSchema);

module.exports = ProjectModel;