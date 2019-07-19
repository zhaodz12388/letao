$(function(){

    var currentpage=1;
    var pageSize=5;

    render() ;
   function render() {

       $.ajax({
           type:"get",
           url:"/category/queryTopCategoryPaging",
           data:{
               page:currentpage,
               pageSize :pageSize,
           },
           dataType:"json",
           success:function (info) {
               console.log(info)
               $("tbody").html(template("tpl",info))
               $("#paginator").bootstrapPaginator({
                   bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                   currentPage:info.page,//当前页
                   totalPages:Math.ceil(info.total/info.size),//总页数
                   onPageClicked:function(event, originalEvent, type,page){
                       //为按钮绑定点击事件 page:当前点击的按钮值
                       currentpage=page;
                       render();
                   }
               });
           }
       })
   }

$(".addCate").click(function () {
    $("#addModal").modal("show")

})


    //使用表单校验插件
    $("#form").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '一级分类不能为空'
                    },
                    //长度校验
                    // stringLength: {
                    //     min: 2,
                    //     max: 8,
                    //     message: '一级分类长度必须在2到8之间'
                    // },
                    //正则校验
                    // regexp: {
                    //     regexp:
                    //     message: '用户名由数字字母下划线和.组成'
                    // }
                }
            },
        }

    });

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
    });





    $("#addBtn").click(function () {

        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$("#form").serialize(),

            dataType:"json",
            success:function (info) {
                console.log(info)
                if(info.success){
                    currentpage=1;
                    render() ;
                    $("#form").data('bootstrapValidator').resetForm(true)
                    $("#addModal").modal("hide")
                }
            }
        })

    })

})