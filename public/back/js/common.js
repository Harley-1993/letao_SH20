/**
 * Created by Harley on 2018/05/10.
 */

//禁用进度环
NProgress.configure({showSpinner: false});

/*
 * 1.ajaxComplete  请求完成的时候调用（不管成功失败）
 *
 * 2.ajaxSuccess   请求成功时调用
 * 3.ajaxError     请求失败的时候调用
 *
 * 4.ajaxStart     ajax开始发送的时候调用（只会调用一次）
 *
 * 5.ajaxSend      请求发送的时候调用
 *
 *
 * 6.ajaxStop      ajax停止的时候调用
 *
 * */

$(document).ajaxStart(function () {
  //开启进度条
  NProgress.start();
})

$(document).ajaxStop(function () {
  setTimeout(function () {
    //结束进度条
    NProgress.done();
  }, 500);
});

$(function () {
  //二级菜单切换
  $('.category').click(function () {
    
    $('.lt_aside .child').stop().slideToggle();
  })
  
  //菜单切换
  $('.icon_menu').click(function () {
    
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
  });
  
  //模态框显示
  $('.icon_logout').click(function () {
    $('#logoutModal').modal('show')
  });
  
  //点击模态框退出按钮
  $('#logoutBtn').click(function () {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          location.href = "login.html";
        }
      }
    });
  });
  
  //登录拦截
  
  if (location.href.indexOf("login.html") === -1){//判断当前是否是登录页
    $.ajax({
      type: 'get',
      url: '/employee/checkRootLogin',
      dataType: 'json',
      success: function (info) {
        if (info.error === 400) {
          location.href = "login.html";
        }
      }
    });
  }
  
  
  
})







