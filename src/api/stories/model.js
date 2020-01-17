const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 1
    },
    userId: {
        type: String
    }
});

StorySchema.methods = {
    view () {
        let fields = ['id', 'name'];
        let view = {};

        fields.forEach((field) => { view[field] = this[field] });
        return view
    },
};

module.exports = mongoose.model("Story", StorySchema);
