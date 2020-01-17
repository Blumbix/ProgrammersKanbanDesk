const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeatureSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 1
    },
    description: {
        type: String,
        required: true,
        minlength: 1
    },
    date: {
        type: String
    },
    status: {
        type: String,
        required: true,
        enum: ["todo", "working", "testing", "done"],
        default: "todo"
    },
    storyId: {
        type: String
    }
});

FeatureSchema.methods = {
    view () {
        let fields = ['id', 'title', 'description', 'status'];
        let view = {};

        fields.forEach((field) => { view[field] = this[field] });
        return view
    },
};

module.exports = mongoose.model("Feature", FeatureSchema);
