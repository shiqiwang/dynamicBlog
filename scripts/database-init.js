var database = require("../databaseDefinition.js");
var homePageShell =  new database.HomePageShell({
    title: "home",
    blogName: "Blog Name",
    motto: "a sentence you like",
    portriatUrl: "portriat.png"
});
homePageShell.save();

var aboutPageShell = new database.AboutPageShell({
    title: "about",
    aboutPageName: "title for the fragment",
    fragments: "some fragments"
});
aboutPageShell.save();

// var firstArticle = new database.Article({ 
//     articleID: 1,
//     articleTitle: "article Title",
//     content: "some content",
//     publishTime: "1/11/2017"
// });
// firstArticle.save();

// var sidebarUrlAbout = new database.SidebarUrl({
//     urlText: "about",
//     url: "about.hbs"
// });
var articles =
[
    {
        articleID: 1,
        articleTitle: "Title 1",
        content: "content for 1",
        publishTime: "1/11/2017"
    },
    {
        articleID: 2,
        articleTitle: "Title 2",
        content: "content for 2",
        publishTime: "1/11/2017"
    },    
    {
        articleID: 3,
        articleTitle: "Title 2",
        content: "content for 2",
        publishTime: "1/11/2017"
    },
];

database.Article.insertMany(articles);

var sidebarUrl = 
[
    {urlText: "about", url: "about"},
    {urlText: "home", url: "/"}
];
 
database.SidebarUrl.insertMany(sidebarUrl);

var initLoginInfo = new database.LoginInfo({
    account: "0000",
    password: "0000"
});
initLoginInfo.save();