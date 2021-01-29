import mongoose from 'mongoose';

let gitUserScheema = new mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        required: false,
    },
    git_id: {
        type: Number,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
    created_at: {
        type: Number, 
        required: true,
        default: Date.now
    },
});

let gitUserModel = mongoose.model('git_user', gitUserScheema );

export { gitUserModel };