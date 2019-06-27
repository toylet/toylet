const mongoose = require('mongoose');

const UserProjectMapSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'project' },
    available: {
        type: {
            workingHour: [{ type: Date, 'default' : '00:00' },],
            contributableDate: [{ type: Number },]
        }
    },
    message: { type: String, "default": "" },
    isOwner: { type: Boolean, requied: true }
});

const UserProjectMapModel = mongoose.model('maps', UserProjectMapSchema);

module.exports = UserProjectMapModel;