$(function(){

    var currentpage=1;
    var pageSize=5;

    render() ;
    function render() {

        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentpage,
                pageSize :pageSize,
            },
            dataType:"json",
            success:function (info) {
                // console.log(info)
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

        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize :100
            },
            dataType:"json",
            success:function (info) {
                // console.log(info)
                $("#dropdown-menu").html(template("model-tpl",info))
            }
        })


        $("#dropdown-menu").on("click","a",function () {
          var txt=$(this).text();
          $("#dropdownText").text(txt);
          var cateId=$(this).data("id");
          // console.log(cateId)
        $('[name="categoryId"]').val(cateId)
            $("#form").data('bootstrapValidator').updateStatus("categoryId", "VALID", )

        })







    })


    //使用表单校验插件
    $("#form").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入二级分类名称'
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
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择一级分类'
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
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传图片'
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
            url:"/category/addSecondCategory",
            data:$("#form").serialize(),


            dataType:"json",
            success:function (info) {
                // console.log(info)
                if(info.success){
                    currentpage=1;
                    render() ;
                    $("#form").data('bootstrapValidator').resetForm(true)
                    $("#addModal").modal("hide")
                    $("#dropdownText").text("请输入一级分类")
                    $("#imgfile").attr("src","./images/none.png")
                }
            }
        })

    })

    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            console.log(data.result.picAddr);
            var imgurl=data.result.picAddr
            $("#imgfile").attr("src",imgurl)
            $('[name="brandLogo"]').val(imgurl)
            $("#form").data('bootstrapValidator').updateStatus("brandLogo", "VALID", )
        }
    });




})