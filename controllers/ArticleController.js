"use strict";

var Article = require("../models/Article");

var ArticleController = {
  //Get 1 article
  getArticle: function (req, res) {
    var paramsId = req.params.id;

    Article.findById(paramsId, (err, article) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error,the id could be wrong",
          err,
        });
      }
      if (!article) {
        return res.status(404).send({
          message: "Article not found",
        });
      } else {
        return res.status(200).send({
          article,
        });
      }
    });
  },

  //Get articles
  getArticles: function (req, res) {
    var page = req.params.page;

    var options = {
      sort: { creationDate: -1 },
      page: page,
      limit: 3,
    };

    Article.paginate({}, options, (err, articles) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          err,
        });
      } else {
        return res.status(200).send({
          articles: articles.docs,
          totalArticles: articles.totalDocs,
          pages: articles.totalPages,
        });
      }
    });
  },

  //Create new article
  saveArticles: function (req, res) {
    var params = req.body;

    var article = new Article();
    article.title = params.title;
    article.content = params.content;
    article.imageMain = params.imageMain;
    article.category = params.category;

    Article.findOne({ title: article.title }, (err, articleFounded) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          err,
        });
      }
      if (!articleFounded) {
        article.save((err, articleStored) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              err,
            });
          }
          if (!articleStored) {
            return res.status(400).send({
              message: "The article could not be saved",
            });
          }
          return res.status(200).send({
            message: "Article saved successfully",
            articleStored,
          });
        });
      } else {
        return res.status(200).send({
          message: "Article already exist in Db",
        });
      }
    });
  },

  //Update article
  updateArticle(req, res) {
    var articleId = req.params.id;
    var article= req.body;

    Article.findByIdAndUpdate(
      articleId,
      article,
      { new: true },
      (err, articleUpdated) => {
        if (err) {
          return res.status(500).send({
            status:"error",
            err
          });
        }
        if (!articleUpdated) {
          return res.status(404).send({
            message: "The file could not be updated",
          });
        }
        return res.status(200).send({
          message: "Article updated",
          articleUpdated,
        });
      }
    );
  },

  //Delate article
  deleteArticle(req, res) {
    var articleId = req.params.id;
    Article.findByIdAndRemove(articleId, (err, articleDeleted) => {
      if (err) {
        return res.status(500).send({
          status:"error",
          err
        });
      }
      if (!articleDeleted) {
        return res.status(404).send({
          message: "The article could not be deleted",
        });
      }
      return res.status(200).send({
        message: "Article deleted",
        articleDeleted,
      });
    });
  },
};

module.exports = ArticleController;
