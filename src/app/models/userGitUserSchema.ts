import mongoose from 'mongoose'

let dbUserGitUserSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        required: false,
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: false,
    },
    git_id: {
        type: Number,
        required: false,
    },
    created_at: {
        type: Number, 
        required: true,
        default: Date.now
    },
});

let dbUserGitUserModel = mongoose.model('user_git_user', dbUserGitUserSchema );

export { dbUserGitUserModel };