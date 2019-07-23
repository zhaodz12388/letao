
// 区域滚动
mui('.mui-scroll-wrapper').scroll({
    indicators: false, //是否显示滚动条
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

// 图片轮播
var gallery = mui('.mui-slider');
gallery.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});


// 解析地址栏参数的方法
function getSearch(k) {
    var search=(decodeURI (location.search)).slice(1);
    var arr=search.split("&")

    var obj={};
    arr.forEach(function (v,i) {
        var key =  v.split("=")[0]
        var value =  v.split("=")[1]
        obj[key];
        obj[key]=value;
    })
    return  obj[k];
}


// 获取历史记录
function getHistory() {
    var searchStr = localStorage.getItem("search-list")
    var  arr=  JSON.parse (searchStr)||[];
    // console.log(arr)
    return arr;
}


// 添加历史记录
function addHistory() {

    var txt=  $(".lt-search input").val().trim()
    if(txt===""){
        mui.toast("请输入搜索关键字",{duration:1500})
        return;
    }
    var arr=getHistory();
    var index=arr.indexOf(txt)
    // 如果有重复项，删除
    if(index!=-1){
        arr.splice(index,1)
    }
    arr.splice(0,0,txt);
    // 如果arr的长度大于10，删除最后一项
    if(arr.length>10){
        arr.splice(arr.length-1,1)
    }
    var jsonSty=JSON.stringify(arr)
    localStorage.setItem("search-list",jsonSty)
    return txt;
}

