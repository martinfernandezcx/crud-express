import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Article from "../models/article";
import Comment from "../models/comment";
import ArticleService from "../services/articleService";

class ArticleController {
  static async fetch(req: Request, res: Response) {
    res.send(await ArticleService.fetch());
  }

  static async find(req: Request, res: Response) {
    res.send(await Article.find({ _id: req.params.id }).exec());
  }

  static async create(req: Request, res: Response) {
    let article = req.body.article;
    const newArticle = new Article({
      _id: new mongoose.Types.ObjectId(),
      title: article.title,
      body: article.body,
      author: article.author,
    });

    res.status(201).send(await newArticle.save());
  }

  static async update(req: Request, res: Response) {
    res.send(await Article.findByIdAndUpdate(req.params.id, req.body.article));
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    await Comment.deleteMany({ articleId: req.params.id });

    res.send(await Article.deleteOne({ _id: req.params.id }));
  }
}

export default ArticleController;
