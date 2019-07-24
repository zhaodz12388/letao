$(function(){
  var productId=getSearch("productId")
    // console.log(productId)
    // 1.发送ajax请求获取商品详情
    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{
            id:productId
        },
        dataType:"json",
        success:function (info) {
            console.log(info)
            $(".lt-main .mui-scroll").html(template("productTpl",info))
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:4000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            // mui在mui.init()中会自动初始化基本控件,但是 动态添加的Numbox组件需要手动初始化

            mui(".mui-numbox").numbox()

        }
    })

})