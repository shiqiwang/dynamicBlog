$(document).ready(function () {
    //事件代理,加载文章数据
    $("#articleTitleBar").click(function (event) {
        loadArticleData(event);
    });

    //添加新文章
    $("#addArticleBtn").click(addNewArticle);
    //保存文章数据
    $("#save").click(function () {
        if($("#targetArticle").length) {
            saveData();
        } else {
            return;
        }
    });
    $("#delete").click(function () {
        if($("#targetArticle").length) {
            deleteArticle();
        } else {
            return;
        }
    });

    function deleteArticle() {
        var removedArticleId = $("#targetArticle").attr("data-articleid");
        $.get("/api/delete-article", {id: removedArticleId}, function (isRemoved) {
            if(isRemoved) {
                $("#targetArticle").remove();
            } else {
                return;
            }
        });
    }

    function loadArticleData(event) {
        var target = event.target;
        if(target && target.nodeName.toUpperCase() == "DIV") {
            var id = $(target).attr("data-articleID");
            $.get("/api/get-article-content", {id: id}, function (data) {
                if(data) {
                    $("#articleContent").html(data);
                } else {
                    $("#articleContent").html("");
                }
            });
            setTargetArticle(target);
            //如果某篇文章被选中后，用户点击了save按钮，默认该篇文章被修改，数据库数据更新
        }
    }

    function setTargetArticle(target) {
        $(".articleTitle").css("background-color", "#fff");
        $(".articleTitle").removeAttr("id");
        $(target).css("background-color", "rgb(247, 247, 247)");
        $(target).attr("id", "targetArticle");
        $("#targetArticle").attr("contenteditable", "true");
    }

    function addNewArticle() {
        $("#articleTitleBar").append('<div class="articleTitle"></div>'); 
        setTargetArticle(".articleTitle:last-child");
        $.post(
            "/api/append-new-article",
            {
                articleTitle: "",
                articleContent: "",
                publishTime: "2/16/2017"
            },
            function (data, status) {
                $("#targetArticle").attr("data-articleid", data);
                return;
            }
        );
    }

    function saveData() {    
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
    }
});