$(function () {
    var key= getSearch("search-list")
// console.log(key)
    $(".lt-search input").val(key)
    render()
    // 渲染产品模块



    function render(){
        key=$(".lt-search input").val()
        var datas={
            proName:key,
            page:1,
            pageSize:100
        }
        if($(".lt-sort a").hasClass("current")){
        var sortName=$(".lt-sort a.current").data("type")
        var sortValue=$(".lt-sort a.current i").hasClass("fa-angle-down")?2:1;
        datas[sortName]=sortValue;
    }
        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:datas,
            dataType:"json",
            success:function (info) {
                console.log(info)
                $(".lt-product").html(template("productTpl",info))
            }
        })

    }
  // 点击搜索按钮，渲染产品模块
    $(".lt-search .search-btn").click(function () {
        var txt=addHistory()
        if(txt===undefined){
            return;
        }
        render()
    })


    // 添加下拉菜单，高亮显示,并切换箭头指向
    $(".lt-sort a[data-type]").click(function () {
        if($(this).hasClass("current")) {
            $(this).find(".lt-sort a i").toggleClass("fa-angle-down").toggleClass("fa-angle-up")
        }
        else{
            $(this).addClass("current").siblings().removeClass("current")
        }
        render()
    })

})
