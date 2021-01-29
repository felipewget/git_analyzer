import mongoose, { mongo } from 'mongoose';

let usersSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Number, 
        required: true,
        default: Date.now
    },
    deleted_at: {
        type: Number, 
        required: false,
    }
});

let usersModal = mongoose.model( 'users', usersSchema );

export { usersModal }