import mongoose from 'mongoose';

let GitRepositoriesSchema = new mongoose.Schema( {
    _id:{
        type: mongoose.Types.ObjectId,
        required: false,
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: false,
    },
    git_user_id: {
        type: Number,
        required: true,
    },
    repository_id: {
        type: Number,
        required: true,
    }, 
    repository_name: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: false,
    },
    html_url: {
        type: String,
        required: false,
    },
    language: {
        type: String,
        required: false,
    },
    fork: {
        type: Boolean,
        required: true,
    },
    size: {
        type: Number,
        required: false,
    },
    stargazers_count: {
        type: Number,
        required: false,
    },
    watchers_count: {
        type: Number,
        required: false,
    },
    repository_created_at: {
        type: String,
        required: false,
    },
    repository_updated_at: {
        type: String,
        required: false,
    },
    created_at: {
        type: Number, 
        required: true,
        default: Date.now
    },
});

let gitRepositoriesModel = mongoose.model('git_repositories', GitRepositoriesSchema );

export { gitRepositoriesModel, GitRepositoriesSchema };