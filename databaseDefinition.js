var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("connected");
});

// schema, everything is derived from a schema
var articleSchema = mongoose.Schema({
    articleID: Number,
    articleTitle: String,
    content: String,
    publishTime: String
});

var homePageShellSchema = mongoose.Schema({
    title: String,
    blogName: String,
    motto: String,
    portriatUrl: String
});

var aboutPageShellSchema = mongoose.Schema({
    title: String,
    aboutPageName: String,
    fragments: String
});

var sidebarUrlSchema = mongoose.Schema({
    urlText: String,
    url: String
});

var loginInfoSchema = mongoose.Schema({
    account: String,
    password: String
});

//compiling schema into a model, a model is a class with which we construct documents.
// each document will be an article with properties and hehaviors as declared in our schema
exports.Article = mongoose.model("Article", articleSchema, "articles");
// exports.Article.prototype.getUrl = function () {
//     return '/article/' + this.id;
// };
exports.HomePageShell = mongoose.model("HomePageShell", homePageShellSchema, "homePageShell");
exports.AboutPageShell = mongoose.model("AboutPageShell", aboutPageShellSchema, "aboutPageShell");
exports.SidebarUrl = mongoose.model("SidebarUrl", sidebarUrlSchema, "sidebarUrl");
exports.LoginInfo = mongoose.model("LoginInfo", loginInfoSchema, "loginInfo");





