import { Request, Response } from "express";
import mongoose from "mongoose";
import Article from "../models/article";

class ArticleController {
  static fetch(req: Request, res: Response) {
    Article.find({})
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

  static find(req: Request, res: Response) {
    Article.find({ _id: req.params.id })
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
    let article = req.body.article;
    const newArticle = new Article({
      _id: new mongoose.Types.ObjectId(),
      title: article.title,
      body: article.body,
      author: article.author,
    });

    return newArticle
      .save()
      .then((result) => {
        return res.status(201).json({
          article: result,
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
    // const article = articles.find((article) => article.id === req.params.id);
    // if (!article) {
    //   return res.status(404).send("Article not found");
    // }
    // const updatedArticle = {
    //   ...article,
    //   ...(req.body.article as Partial<Article>),
    // };
    // articles[articles.indexOf(article)] = updatedArticle;
    // res.send(updatedArticle);
  }

  static remove(req: Request, res: Response) {
    // const article = articles.find((article) => article.id === req.params.id);
    // if (!article) {
    //   return res.status(404).send("Article not found");
    // }
    // articles.splice(articles.indexOf(article), 1);
    // res.end();
  }
}

export default ArticleController;
