//登录验证
function validatorSignInForm() {
    var ret = true;
    if(!validator.isMobilePhone($("#login-tel").val(), "zh-CN"))
    {
        ret = false;
        alert("手机号码格式不正确！");
        $("#login-tel").focus();
        return false;
    }
    if(!validator.isLength($("#login-pwd").val(), {min: 6, max: 20}))
    {
        ret = false;
        alert("密码为6-20位");
        $("#login-pwd").focus();
        return false;
    }
    if(ret){
        signIn();
    }
}
function signIn(){
    var para = $("#signInForm").serialize();
    alert(para);
    $.ajax({
        url: "/user/signIn",
        async: true,
        type: "POST",
        data: para,
        success: function (response) {

        }
    });
}
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