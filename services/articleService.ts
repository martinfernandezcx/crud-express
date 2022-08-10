import Article from "../models/article";
import mongoose from "mongoose";

export default class ArticleService {
  static async fetch() {
    return await Article.find({},{ createdAt: 0, updatedAt: 0, __v: 0 }).exec();
  }
}

export async function connectDb(mongoUrl: string) {
  return await mongoose.connect(mongoUrl);
}
