//注册验证输入
function validatorSignUpForm(){
    var ret = true;
    if(!validator.isMobilePhone($("#phone").val(), "zh-CN"))
    {
        ret = false;
        alert("手机格式不正确");
        $("#phone").focus();
        return false;
    }
    if(!validator.isLength($("#register_pwd").val(), {min: 6, max: 20}))
    {
        ret = false;
        alert("密码长度为6到20位！");
        $("register_pwd").focus();
        return false;
    }
    if(($("#register_repwd").val()) !== ($("#register_pwd").val()))
    {
        ret = false;
        alert("两次密码输入不一致！");
        $("register_repwd").focus();
        return false;
    }
    if(ret)
    {
        signUp();
    }
}
function signUp() {
    var para = $("#signUpform").serialize();
    alert(para);
    $.ajax({
        url: "/users/signup",
        type: "POST",
        async: true,
        data: para,
        success: function (response) {

        }
    });
}