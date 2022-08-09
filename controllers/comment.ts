import { Request, Response } from "express";
import Comment, { IComment } from "../models/comment";
import Article, { IArticle } from "../models/article";
import mongoose from "mongoose";
import Comments from "../routes/api/comments";

class CommentController {
  static async fetch(req: Request, res: Response) {
    res.status(200).send(await Comment.find({}).exec());

    // Comment.find({})
    //   .exec()
    //   .then((results) => {
    //     return res.status(200).json({
    //       comments: results,
    //       length: results.length,
    //     });
    //   })
    //   .catch((err) => {
    //     return res.status(500).json({
    //       message: err.messag,
    //       err,
    //     });
    //   });
  }

  static fetchByArticle(req: Request, res: Response) {
    Comment.find({ article: req.params.articleId })
      .exec()
      .then((results) => {
        return res.status(200).json({
          comments: results,
          length: results.length,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.messag,
          err,
        });
      });
  }

  static find(req: Request, res: Response) {
    Comment.find({ _id: req.params.id })
      .exec()
      .then((results) => {
        return res.status(200).json({
          articles: results,
          length: results.length,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.messag,
          err,
        });
      });
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

  static update(req: Request, res: Response) {
    Comment.findByIdAndUpdate(req.params.id, req.body.comment)
      .exec()
      .then((results) => {
        return res.status(201).json({
          comment: results,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.messag,
          err,
        });
      });
  }

  static remove(req: Request, res: Response) {
    Comment.remove({ _id: req.params.id })
      .exec()
      .then((results) => {
        return res.status(202).json({});
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.messag,
          err,
        });
      });
  }
}

export default CommentController;
