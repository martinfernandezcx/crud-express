import { Request, Response } from "express";
import Comment, { IComment } from "../models/comment";
import Article, { IArticle } from "../models/article";
import mongoose from "mongoose";
import Comments from "../routes/api/comments";

class CommentController {
  static fetch(req: Request, res: Response) {
    Comment.find({})
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

  static create(req: Request, res: Response) {
    let articleIn;
    Article.findOne({ _id: req.body.comment.articleId })
      .exec()
      .then((results) => {
        articleIn = results as IArticle;
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.messag,
          err,
        });
      });

    if (!articleIn) {
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
    });

    return newComment
      .save()
      .then((result) => {
        return res.status(201).json({
          comment: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.messag,
          err,
        });
      });
  }

  static update(req: Request, res: Response) {
    Comment.findByIdAndUpdate(req.body.comment.articleId, req.body.comment)
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
    // const comment = comments.find((c) => c.id === req.params.id);
    // if (!comment) {
    //   return res.status(404).send("Comment not found");
    // }
    // comments.splice(comments.indexOf(comment), 1);
    // res.end();
  }
}

export default CommentController;
