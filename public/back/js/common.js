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
  
  $('.category').click(function () {
    
    $('.lt_aside .child').stop().slideToggle();
  })
  
  //
  $('.icon_menu').click(function () {
    
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
  })
})







