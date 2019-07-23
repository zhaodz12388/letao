$(function () {
    // 1.封装函数，获取数据，渲染搜索历史模块


    // 1.渲染页面
    function render() {
        var  arr=getHistory()
        $(".lt-history").html(template("historyTpl", {arr: arr}))
    }
    render();
    
    

// 2.点击清空记录按钮，清空历史记录,重新渲染历史模块

    $(".lt-history").on("click",".clearBtn",function () {
        mui.confirm("您确认清除历史记录吗？","温馨提示",["取消","确认"],function (e) {
           if (e.index===1) {
               localStorage.removeItem("search-list")
               render();
           }

        })

    })
    // 3.点击删除单个历史记录
    $(".lt-history").on("click",".btnDel",function () {
        var index=$(this).data("index")
        mui.confirm("您确认清除历史记录吗？","温馨提示",["取消","确认"],function (e) {
            if (e.index===1) {
                var  arr=getHistory()
                arr.splice(index,1)
                var jsonSty=JSON.stringify(arr)
                localStorage.setItem("search-list",jsonSty)
                render()
            }

        })

    })

    // 4.添加历史记录


    $(".lt-search .search-btn").click(function () {

        var txt=addHistory()
        if(txt===undefined){
            return;
        }
        render();
       $(".lt-search input").val("")
       location.href="searchList.html?search-list="+txt

})






})


