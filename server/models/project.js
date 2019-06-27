const mongoose = requre('mongoose');

const ProjectSchema = new mongoose.Schema({
    owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    posts: { type: String },
    lastUpdated: { type: Date },
    likes: { type: Number },
    description: { type: String },
    type: { type: String },
    title: { type: String },
    recruiting: { type: String },
    website: { type: String },
});

const ProjectModel = mongoose.model('projects', ProjectSchema);

module.exports = ProjectModel;