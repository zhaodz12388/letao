$(function(){
    var currentPage=3;
    var pageSize=5
    render()
    function render(){
        // 用户数据{
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize :pageSize
            },
            dataType:"json",
            success:function (info) {
                console.log(info)
                var htmlStr = template('tpl',info)
                $("tbody").html(htmlStr)
                // 分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:info.page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    onPageClicked:function(event, originalEvent, type,page){
                        currentPage=page  //为按钮绑定点击事件 page:当前点击的按钮值
                        render()
                    }


                });
            }
        })

    }



})

