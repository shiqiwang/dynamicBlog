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
    database.Article.find({articleID: articleID}, function (err, article) {
        res.json(article[0].content);
    });
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