//无论引用的模块文件是否与被引用的文件在同一个文件夹下，都应用"."开头
//node.js的规则，自定义的包需要加，不然会默认去找node包
var database = require("./databaseDefinition.js");

var express = require("express");
//引用cookie模块
//var cookieParser = require("cookie-parser");
var session = require("express-session");
//引用 express 和 express-han dlebars 模板引擎
var hbs = require("express-handlebars").create({
    defaultLayout: "main", //默认布局模板为main.hbs
    extname: ".hbs" //设置文件后缀名为.hbs
});

//使用post方法需要一些中间件，和get方法有区别
var bodyParser = require("body-parser");

var app = express();

app.set("port", process.env.PORT || 3000); //设置端口

//设置模板引擎为express-handlebars
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

//使用static中间件 制定public目录为静态资源目录 其中资源不会经过任何处理
app.use(express.static(__dirname + "/public"));
//使用cookieParser(secret, options)中间件, secret用于加密，options是可选参数 
app.use(session({
    secret: "for dynamic blog"
}));

//post方法的中间件应用
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// home 页路由
app.get( "/", function (req, res) {
    getHomePageData(function (data) {
        res.render("home", data);
    });
});

// about 页路由
app.get("/about", function (req, res) {
    getAboutPageData(function (data) {
        res.render("about", data);
    });
});

app.get("/editing", function (req, res) {
    if (!req.session.isVisit) {
        res.redirect('/');
        return;
    }
    getEditingPageData(function (data) {
        res.render("editing", data);
    });
});

//editing 页路由
app.get("/api/login", function (req, res) {
    var inputAccout = req.query.account;
    var inputPassword = req.query.password;
    database.LoginInfo.findOne({account: inputAccout, password: inputPassword}, function (err, loginInfo) {
        if(err || !loginInfo) {
            res.json(false);
            return;
        }
        if(req.session.isVisit) {
            req.session.isVisit++;
        } else {
            req.session.isVisit = 1;
        }
        res.json(true);
    });
});

//为editing page获取文章内容
app.get("/api/get-article-content", function (req, res) {
    var articleID = req.query.id;
    database.Article.findOne({articleID: articleID}, function (err, article) {
        res.json(article.content);
    });
});

//保存文章数据
app.post("/api/save-data", function (req, res) {
    var errors = false;
    var data = req.body;
    database.Article.findOne({articleID: data.articleID}, function(err, article) {
        article.articleTitle = data.articleTitle;
        article.content = data.articleContent;
        article.save(function (err) {
            if(err) {
                errors = true; 
            }
        });
    });
    database.HomePageShell.findOne({}, function(err, homePageData) {
        homePageData.blogName = data.blogName;
        homePageData.motto = data.motto;
        homePageData.save(function(err){
            if(err) {
                errors = true;
            }
        });
    });
    res.json(errors);
});

//添加新文章
app.post("/api/append-new-article", function (req, res) {
    var data = req.body;
    database.Article.find({}, function(err, articleArr) {
        var newArticleId = articleArr[articleArr.length -1].articleID + 1;
        var newArticle = new database.Article();
        newArticle.articleID = newArticleId;
        newArticle.articleTitle = data.articleTitle;
        newArticle.content = data.articleContent;
        newArticle.publishTime = data.publishTime;
        newArticle.save(function(err) {
            if(err) {
                return;
            }
        });
        res.json(newArticleId);
    });
});

//删除文章
app.get("/api/delete-article", function(req, res) {
    var removedArticleId = req.query.id;
    database.Article.remove({articleID: removedArticleId}, function (err) {
        if(err) {
            return;
        }
        res.json(true);
    })
});

app.listen(app.get("port"), function () {
    console.log("服务器启动完成，端口为：" + app.get("port"));
});

function getHomePageData(callback) {
    database.HomePageShell.findOne({}, function (err, homePageData) {
        database.Article.find({}, function (err, articles) {
            database.SidebarUrl.find({}, function (err, sidebarUrls) {
                callback({
                    title: homePageData.title,
                    blogName: homePageData.blogName,
                    motto: homePageData.motto,
                    portriatUrl: homePageData.portriatUrl,
                    articles: articles,
                    sidebarUrls: sidebarUrls
                });
            });
        });
    });
}

function getAboutPageData(callback) {
    database.SidebarUrl.find({}, function (err, sidebarUrls) {
        callback({
            sidebarUrls
        });
    });
}

function getEditingPageData(callback) {
    database.HomePageShell.findOne({}, function (err, homePageData) {
        database.Article.find({}, function (err, articles) {
            callback({
                blogName: homePageData.blogName,
                motto: homePageData.motto,
                articles
            });
        });
    });
}