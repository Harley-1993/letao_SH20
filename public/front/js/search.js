/**
 * Created by Harley on 2018/05/14.
 */


$(function () {
  
  render();
  
  function getHistory() {
    var history = localStorage.getItem("search_list") || "[]";
    
    var arr = JSON.parse(history);
    return arr;
  }
  
  function render() {
    var arr = getHistory();
    
    $('.lt_history').html(template("historyTpl", {arr: arr}));
    
    
  }
  
  $('.lt_history').on('click', '.btn_empty', function () {
    
    //确认框  confirm (提示框显示的内容，提示框标题，按钮文本的数组，回调函数)
    mui.confirm("你确认要清空所有历史记录吗？", "温馨提示", ["取消", "确认"], function (e) {
      if (e.index === 1) {
        localStorage.removeItem("search_list");
        render();
      }
    })
  });
  
  $('.lt_history').on('click', '.btn_delete', function () {
    var that = this;
    
    mui.confirm("你确认要删除这条信息吗？", "温馨提示", ["确认", "取消"], function (e) {
      if (e.index === 0) {
        var index = $(that).data("index");
        var arr = getHistory();
        arr.splice(index, 1);
        localStorage.setItem("search_list", JSON.stringify(arr));
        render();
      }
    })
  });
  
  
  $('.lt_search button').click(function () {
    var key = $('.lt_search input').val().trim();
    
    if (key === "") {
      mui.toast("请输入搜索关键字");
      return;
    }
    
    var arr = getHistory();
    var index = arr.indexOf(key);
    if (index > -1) {
      arr.splice(index, 1);
    }
    
    if (arr.length >= 10) {
      arr.pop();
    }
    
    arr.unshift(key);
    
    localStorage.setItem("search_list", JSON.stringify(arr));
    render();
    
    $('.lt_search input').val("");
    
    location.href = "searchList.html?key=" + key;
  })
  
  
})