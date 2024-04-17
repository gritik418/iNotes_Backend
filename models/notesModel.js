const { Schema, models, model } = require("mongoose");

const NotesSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        trim: true
    },
    label: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
}, {timestamps: true});

const Notes = models.Notes || model("Notes", NotesSchema);

module.exports = Notes;