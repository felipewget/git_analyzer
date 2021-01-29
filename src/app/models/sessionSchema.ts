import mongoose from 'mongoose';

let sessionSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: false,
    },
    type: {
        type: String, // api|user
        required: true,
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: false,
    },
    auth_token: {
        type: String, // api|user
        required: true,
    },
    created_at: {
        type: Number, 
        required: true,
        default: Date.now
    },
    deleted_at: {
        type: Number, 
        required: false
    },
});

let sessionsModel = mongoose.model('sessions', sessionSchema );

export { sessionsModel }