$(document).ready(function () {
    //事件代理,加载文章数据
    $("#articleTitleBar").click(function (event) {
        var target = event.target;
        if(target && target.nodeName.toUpperCase() == "DIV") {
            var id = $(target).attr("data-articleID");
            $.get("/api/get-article-content", {id: id}, function (data) {
                $("#articleContent").html(data);
            });
            $(".articleTitle").css("background-color", "#fff");
            $(".articleTitle").removeAttr("id");
            $(target).css("background-color", "rgb(247, 247, 247)");
            $(target).attr("id", "targetArticle");
            //如果某篇文章被选中后，用户点击了save按钮，默认该篇文章被修改，数据库数据更新
        }
    });

    //添加新文章
    $("#addArticleBtn").click(function () {
    });

    //保存文章数据
    $("#save").click(function () {
        var blogName = $("#blogName").val();
        var motto = $("#motto").val(); 
        var articleTitle = $("#targetArticle").html();
        var articleID = $("#targetArticle").attr("data-articleid");
        var articleContent = $("#articleContent").html();
        $.post(
            "/api/save-data",
            {
                blogName: blogName,
                motto: motto,
                articleTitle: articleTitle,
                articleID: articleID,
                articleContent: articleContent
            },
            function (data, status) {
                return;
            }   
        );
    });
});