$(function () {
     var id;
    // 1.已进入页面发送ajax请求，返回一级分类数据
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function (info) {
            // console.log(info)
            $(".cate-left ul").html(template("lefttpl",info))
        }
    })

    // 2.封装函数，根据id数据获取二级分类

    function renderCategorySecond(id) {

        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:id,
            },
            dataType:"json",
            success:function (info) {
                // console.log(info)
                $(".cate-right ul").html(template("righttpl",info))
            }
        })

    }


    // 3.点击一级分类，增加current类 并获取data-id
    $(".cate-left").on('click',"li",function () {
        $(this).find("a").addClass("current")
        $(this).siblings().find("a").removeClass("current")
         id=$(this).find("a").data("id")
        // console.log(id)
        renderCategorySecond(id);
    })
})