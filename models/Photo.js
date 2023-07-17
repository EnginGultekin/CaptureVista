import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model('Photo', PhotoSchema);
