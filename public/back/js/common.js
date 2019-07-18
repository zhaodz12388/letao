
$( document ).ajaxStart(function() {
    NProgress.start() ;
});
$( document ).ajaxStop(function() {

        NProgress.done()

});

if ( location.href.indexOf("login.html") === -1 ){
$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success:function (info) {
      if( info.error === 400 ) {
    location.href="login.html"
      }
    }
})
}



$(function () {

// 1.二类分类切换功能
$(".nav .category").click(function () {
    $(this).next().stop().slideToggle();

})

    // 2.顶部菜单切换显示功能
$(".icon-menu").click(function () {
    $(".lt-aside").toggleClass("hidemenu")
    $(".lt-main").toggleClass("hidemenu")
    $(".lt-topbar").toggleClass("hidemenu")


})
// 3.模态框

    $('#myModal').click( function () {
        $('#logoutModal').modal("show");
    })
    
    // 4.模态框退出功能
    $("#logoutBtn").click(function () {
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType: "json",
            success:function (info) {
                if ( info.success ) {
                    location.href = "login.html"
                }
            }
        })
    })
})