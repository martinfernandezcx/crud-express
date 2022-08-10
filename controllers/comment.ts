import { Request, Response } from "express";
import Comment from "../models/comment";
import Article from "../models/article";
import mongoose from "mongoose";

class CommentController {
  static async fetch(req: Request, res: Response) {
    res.send(
      await Comment.find(
        req.query.article ? { articleId: req.query.article } : {}
      )
    );
  }

  static async find(req: Request, res: Response) {
    res.send(await Comment.find({ _id: req.params.id }));
  }

  static async create(req: Request, res: Response) {
    const article = await Article.findOne({ _id: req.body.comment.articleId })
      .lean()
      .exec();

    if (!article) {
      res.status(400).send("Invalid Article Provided");
      return;
    }
    if (!req.body.comment.body) {
      res.status(400).send("Body field is mandatory");
      return;
    }

    const newComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      body: req.body.comment.body,
      articleId: article._id,
    });

    res.status(201).send(await newComment.save());
  }

  static async update(req: Request, res: Response) {
    res.send(await Comment.findByIdAndUpdate(req.params.id, req.body.comment));
  }

  static async remove(req: Request, res: Response) {
    res.send(await Comment.deleteOne({ _id: req.params.id }));
  }
}

export default CommentController;
