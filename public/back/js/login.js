/**
 * Created by Harley on 2018/05/09.
 */


$(function () {
  //表单校验
  $('#form').bootstrapValidator({
    fields: {
      username: {
        //配置校验规则
        validators: {
          //非空校验
          notEmpty: {
            message: "用户名不能为空"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须在6-12位之间"
          }
        }
        
      }
    },
    //校验时的图标显示
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
  });
  
  //基本登录功能
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      dataType: "json",
      data: $('#form').serialize(),
      success: function (info) {
        if (info.success) {
          location.href = "index.html";
        }
        
        if (info.error === 1001) {
          alert("密码错误");
        }
        if (info.error === 1000) {
          alert("用户名不存在");
        }
        // if (info.error) {
        //   alert("用户名或密码错误");
        // }
      }
    })
  })
  
  //实现重置功能
  $('[type="reset"]').click(function () {
    //不传 true  只重置校验状态  传true 会重置内容
    $('#form').data("bootstrapValidator").resetForm(true);
  })
  
});
