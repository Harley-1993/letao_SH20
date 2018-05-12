/**
 * Created by Harley on 2018/05/11.
 */


$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        var htmlStr = template("secondTpl", info);
        $('.lt_content tbody').html(htmlStr);
        
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }
  
  
  //显示模态框
  $('#addBtn').click(function () {
    $('#addModal').modal('show');
    
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      //模拟接口
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        var htmlStr = template("dropdownTpl", info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  });
  
  //通过事件委托  给下拉框的所有a绑定点击事件
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    $('#dropdownText').text(txt);
    
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);
    
    //插件不会对隐藏域的修改进行监听  所以我们需要手动设置隐藏域的校验状态
    //updateStatus
    // 参数1: 字段名
    // 参数2: 校验状态   VALID 成功  INVALID 失败
    // 参数3: 校验规则, 错误状态下的提示文本
    // $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    
  });
  
  //配置文件上传
  $('#fileupload').fileupload({
    //指定返回的数据格式
    dataType: 'json',
    //上传完成的回调函数
    done: function (e, data) {
      //上传完成得到的图片地址
      var picUrl = data.result.picAddr;
      //设置到图片src
      $('#imgBox img').attr("src", picUrl);
      //设置到input中
      $('[name="brandLogo"]').val(picUrl);
      //设置隐藏域的校验状态为VALID
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });
  
  
  //表单校验
  $('#form').bootstrapValidator({
    //默认对隐藏域不进行校验
    excluded: [],
    //指定校验时的图标显示
    feedbackIcon: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置校验的字段
    fields: {
      //所属分类ID
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      // 品牌名称
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      //图片地址
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传图片'
          }
        }
      }
      
    }
  });
  
  
  //注册表单校验成功事件  阻止默认提交 通过ajax进行提交
  $('#form').on("success.form.bv", function (e) {
    e.preventDefault();
    
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      success: function (info) {
        if (info.success) {
          $('#addModal').modal('hide');
          currentPage = 1;
          render();
          
          $("#form").data("bootstrapValidator").resetForm(true);
          
          $('#dropdownText').text("请选择一级分类");
          
          $('#imgBox img').attr("src", "./images/none.png");
        }
      }
    })
  })
  
})