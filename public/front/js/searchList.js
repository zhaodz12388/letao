$(function () {
    // 1.获取地址栏参数，赋值给input
    var key= getSearch("search-list")
// console.log(key)
    $(".lt-search input").val(key)
       var currentPage=1
      var pageSize=2
    // 渲染产品模块 render（）
    function render(callback){
        // $(".lt-product").html('<div class="loop"></div>')
        key=$(".lt-search input").val()
        var datas={
            proName:key,
            page:currentPage,
            pageSize:pageSize
        }
        if($(".lt-sort a").hasClass("current")){
            var sortName=$(".lt-sort a.current").data("type")
            var sortValue=$(".lt-sort a.current i").hasClass("fa-angle-down")?2:1;
            datas[sortName]=sortValue;
        }
        setTimeout(function () {
            $.ajax({
                type:"get",
                url:"/product/queryProduct",
                data:datas,
                dataType:"json",
                success:function (info) {
                    callback&&callback(info)

                }
            })
        },500)


    }

//     render()
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function () {
                 render(function(info){
                     console.log(info)
                     $(".lt-product").html(template("productTpl",info))
                     mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                 })
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up : {
                callback :function () {
                    currentPage++
                    render(function(info){
                        console.log(info)
                        $(".lt-product").append(template("productTpl",info))
                        mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                    })
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });



    // 2.点击搜索按钮，渲染产品模块

    // $(".lt-search .search-btn").click(function () {
    //     var txt=addHistory()
    //     if(txt===undefined){
    //         return;
    //     }
    //     render()
    // })


    //3. 添加下拉菜单，高亮显示,并切换箭头指向
    // $(".lt-sort a[data-type]").click(function () {
    //     if($(this).hasClass("current")) {
    //         $(this).find(".lt-sort a i").toggleClass("fa-angle-down").toggleClass("fa-angle-up")
    //     }
    //     else{
    //         $(this).addClass("current").siblings().removeClass("current")
    //     }
    //     render()
    // })




})
