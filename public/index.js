
//alert('hahaha');

//document.getElementById('tb').addEventListener('click', function () {
//    alert('click')
//})

$(document).ready(function() {
    var sideBarVisible = false; 
    $("#menuBtn").click(function(event) {
        if(sideBarVisible) {
            return;
        }
        $("#container, #sideMenuBar").removeClass("moveRight");
        $("#container, #sideMenuBar").addClass("moveLeft");
        sideBarVisible = true;
        event.stopPropagation();
    });
    $("#container").click(function(event) {
        if(!sideBarVisible) {
            return;
        }
        $("#container, #sideMenuBar").removeClass("moveLeft");
        $("#container, #sideMenuBar").addClass("moveRight");
        sideBarVisible = false;
        event.stopPropagation();
    });
    $("#loginBtn").click(function() {
        var account = $("#emailAddress").val(),
            password = $("#keywords").val();
            $.get("/api/login", {account: account, password: password}, function (data) {
                if(data) {
                    window.open("editing");
                } else {
                    alert("hey buddy, it's for emi.");
                }
            });
        // var xhr = new XMLHttpRequest();
        // xhr.open("get", "/api/login?account=" + encodeURIComponent(account) + "&password=" + encodeURIComponent(password));
        // xhr.onreadystatechange = function() {
        //     if(xhr.readyState === 4 && xhr.status === 200) {
        //         if(JSON.parse(xhr.responseText)) {

        //         }
        //     }
        // }
        // xhr.send();
    });
}
);