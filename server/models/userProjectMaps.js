const mongoose = requre('mongoose');

const UserProjectMapSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'project' },
    available: {
        type: {
            workingHour: [{ type: Date }],
            contributableDate: [{ type: Number }]
        }
    },
    message: { type: String, "default": "" },
    isOwner: { type: Boolean, requied: true }
});

const UserProjectMapModel = mongoose.model('projects', UserProjectMapSchema);

module.exports = UserProjectMapModel;