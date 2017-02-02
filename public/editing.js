$(document).ready(function () {
    //事件代理
    $("#articleTitleBar").click(function (event) {
        var target = event.target;
        if(target && target.nodeName.toUpperCase() == "DIV") {
            var id = $(target).attr("data-articleID");
            $.get("/api/get-article-content", {id: id}, function (data) {
                $("#articleContent").html(data);
            });
        }
    });
    $("#addArticleBtn").click(function () {
        
    });
});