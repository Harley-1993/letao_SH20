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
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        var htmlStr = template("firstTpl", info);
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
  });
  
  //表单校验
  $('#form').bootstrapValidator({
    //指定校验时的图标显示
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类"
          }
        }
      }
    }
  });
  
  $('#form').on("success.form.bv", function (e) {
    e.preventDefault();
    
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      success: function (info) {
        if (info.success) {
          $('#addModal').modal('hide');
          
          currentPage = 1;
          render();
          $('#form').data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })
  
  
})