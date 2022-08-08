import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  body: string;
}

const commentSchema: Schema = new Schema<IComment>(
    {
      body: { type: String, required: true },
    },
    {
      timestamps: true,
    }
);

export default mongoose.model("Comment", commentSchema);
