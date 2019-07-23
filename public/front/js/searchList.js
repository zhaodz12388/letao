$(function () {
    var key= getSearch("search-list")
// console.log(key)
    $(".lt-search input").val(key)
    render()
    // 渲染产品模块
    function render(){
        key=$(".lt-search input").val()
        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:{
                proName:key,
                page:1,
                pageSize :100
            },
            dataType:"json",
            success:function (info) {
                console.log(info)
                $(".lt-product").html(template("productTpl",info))
            }
        })

    }
  // 点击搜索按钮，渲染产品模块
    $(".lt-search .search-btn").click(function () {
    addHistory()
    })

})
