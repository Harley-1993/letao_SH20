/**
 * Created by Harley on 2018/05/11.
 */

$(function () {
  //当前页
  var currentPage = 1;
  //每页条数
  var pageSize = 5;
  
  render();
  
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        var htmlStr = template("tpl", info);
        
        $('.lt_content tbody').html(htmlStr);
        //配置分页插件
        $('#paginator').bootstrapPaginator({
          //配置版本
          bootstrapMajorVersion: 3,
          // 总共多少页
          totalPages: Math.ceil(info.total / info.size),
          //当前页
          currentPage: info.page,
          //页码点击事件
          //page  表示将要渲染的页码
          onPageClicked: function (a, b, c, page) {
            //更新当前页
            currentPage = page;
            render();
          }
        })
      }
    });
  }
  
  //通过事件委托 点击启用禁用按钮，显示模态框
  $('.lt_content tbody').on("click", ".btn", function () {
    $('#userModal').modal("show");
    var id = $(this).parent().data("id");
    //用户状态  根据当前按钮的类名  1 正常  0 禁用
    var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
    //off()  移除之前重复注册的事件
    $('#submitBtn').off().click(function () {
      $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
          id: id,
          isDelete: isDelete
        },
        success: function (info) {
          console.log(info);
          //关闭模态框
          $('#userModal').modal('hide');
          render();
        }
      })
    })
  });
  
  
});