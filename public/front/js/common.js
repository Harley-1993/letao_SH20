/**
 * Created by Harley on 2018/05/12.
 */


$(function () {
  //区域滚动初始化
  mui('.mui-scroll-wrapper').scroll({
    //是否显示滚动条
    indicators: false
  });
  
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 1000//自动轮播周期  若为0则不自动播放
  });
  
})