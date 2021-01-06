var express =require('express');
var router =express.Router();
//Controllers
var articleController =require('./controllers/ArticleController');
var categoryController = require('./controllers/CategoryController');
var adminController = require('./controllers/AdminController');

//Middlewares
var md_article_verificator =require('./middlewares/ArticleNullVerificator');
var md_admin_verificator =require('./middlewares/AdminNullVerificator');

//ArticlesRouter
router.get('/articles/:page?',articleController.getArticles);
router.get('/articles/:id',articleController.getArticle);
router.post('/articles',md_article_verificator,articleController.saveArticles);
router.put('/articles/:id',md_article_verificator,articleController.updateArticle);
router.delete('/articles/:id',articleController.deleteArticle);
//CategoryRouter
router.get('/category',categoryController.getCategoryes);
//AdminRouter
router.post('/createAdmin',md_admin_verificator,adminController.saveAdmin);
router.post('/login',adminController.login);

module.exports =router;