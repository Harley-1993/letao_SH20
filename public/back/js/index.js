/**
 * Created by Harley on 2018/05/11.
 */

$(function () {
  
  var echarts_1 = echarts.init(document.querySelector('.echarts_1'));
  var option1 = {
    //大标题
    title: {
      text: '2017年注册人数'
    },
    //提示框组件
    tooltip: {},
    //图例
    legend: {
      data: ['人数']
    },
    //X轴的数据
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    //y轴的数据
    yAxis: {},
    series: [{
      name: '人数',
      //bar 柱状图   line  折线图  pie  饼状图
      type: 'bar',
      data: [1000, 1500, 2000, 1800, 2500, 1300]
    }]
  };
  
  echarts_1.setOption(option1);
  
  
  var echarts_2 = echarts.init(document.querySelector('.echarts_2'));
  var option2 = {
    //大标题
    title: {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x: 'center'
    },
    //提示框组件
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    //图例
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克', '阿迪王', '新百伦', '李宁', '阿迪']
    },
    series: [{
      name: '品牌',
      //bar 柱状图   line  折线图  pie  饼状图
      type: 'pie',
      //圆的直径所占百分比
      radius: '70%',
      //圆心点的坐标
      center: ['50%', '60%'],
      
      data: [
        {value: 335, name: '耐克'},
        {value: 310, name: '阿迪王'},
        {value: 234, name: '新百伦'},
        {value: 135, name: '李宁'},
        {value: 1548, name: '阿迪'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 100,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
  
  echarts_2.setOption(option2);
})