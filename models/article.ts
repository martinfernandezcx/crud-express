import mongoose, { Document, Schema } from "mongoose";

export interface IArticle extends Document {
  title: string;
  body: string;
  author: string;
}

const articleSchema: Schema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Article", articleSchema);
