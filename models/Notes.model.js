const { Schema, model } = require("mongoose");
const notesSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true
    },
    title: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      lowercase: false,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Notes = model("Notes", notesSchema);

module.exports = Notes;
