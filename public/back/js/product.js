/**
 * Created by Harley on 2018/05/12.
 */


$(function () {
  
  var currentPage = 1;
  var pageSize = 2;
  
  var picArr = [];
  
  render();
  
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        var htmlStr = template("productTpl", info);
        
        $('.lt_content tbody').html(htmlStr);
        
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          },
          
          //控制按钮大小
          size: 'normal',
          
          //itemTexts  控制按钮文本 每个按钮都会调用这个方法 将返回值作为按钮的文本
          //type  标记按钮的功能类型  page  普通页码  current  当前页
          itemTexts: function (type, page, current) {
            switch (type) {
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
              case 'page':
                return page;
            }
          },
          //设置了tooltipTitles之后  每个按钮都会调用这个方法 将返回值作为提示信息
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
              case 'page':
                return '前往第' + page + '页';
            }
          },
          
          //使用bootstrap 提供的提示框组件
          useBootstrapTooltip: true
        });
      }
    })
  }
  
  //显示模态框
  $('#addBtn').click(function () {
    $('#addModal').modal('show');
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        $('.dropdown-menu').html(template('dropdownTpl', info));
      }
    })
  });
  
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    $('#dropdownText').text(txt);
    
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  });
  
  
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      var picUrl = data.result.picAddr;
      var picObj = data.result;
      $('#imgBox').prepend('<img src="' + picUrl + '" width="100" alt=""> ');
      //添加到数组的开头
      picArr.unshift(picObj);
      
      if (picArr.length > 3) {
        //删除数组的最后一项
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }
      
      if (picArr.length === 3) {
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }
  });
  
  //表单校验
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存要求,必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}/,
            message: '商品尺码要求,两位数字-两位数字,例如：32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入现价'
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      }
    }
  });
  
  
  //注册表单校验成功事件
  $('#form').on("success.form.bv", function (e) {
    e.preventDefault();
    var params = $('#form').serialize();
    
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
    
    
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: params,
      success: function (info) {
        if (info.success) {
          $('#addModal').modal('hide');
          $('#form').data("bootstrapValidator").resetForm(true);
          
          currentPage = 1;
          render();
          
          $('#dropdownText').text("请选择二级分类");
          $('#imgBox img').remove();
          
          picArr = [];
        }
      }
    })
    
    
  })
  
  
})