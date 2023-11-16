/**
 * 登录与注册功能
 */
// dom
var login_btn = document.getElementById("login_btn");
var captcha_btn = document.getElementById("captcha_btn");
var register_btn = document.getElementById("register_btn");

var login_form = document.getElementsByClassName("login-box")[0];
var register_form = document.getElementsByClassName("register-box")[0];

var error = document.getElementsByClassName("")


const regex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

// listener
/**
 * 登录按钮监听
 */
login_btn.addEventListener('click', () => {
    // 输入参数校验
    let username = login_form.querySelector('[name=username]').value;
    let password = login_form.querySelector('[name=password]').value;
    if (username.length == 0 | password.length == 0) {
        errorMsg("login_err", "用户名或密码不能为空");
    } else {
        clearErr("login_err");
        /**
         * 进行请求
         */
        console.log("login_req")
    }
})

/**
 * 获取验证码按钮监听
 */
captcha_btn.addEventListener('click', () => {
    // 邮箱参数校验
    let email = register_form.querySelector('[name=email]').value;
    if (email.length == 0) {
        errorMsg("register_err", "邮箱不能为空");
    } else if(!regex.test(email)){
        errorMsg("register_err", "邮箱格式错误");
    }
     else {
        // 通过 发送验证码
        clearErr("register_err")
        setButton();
        /**
         * 进行请求
         */
        console.log("captcha_req")
    }
})

/**
 * 注册按钮监听
 */
register_btn.addEventListener('click', () => {
    // 参数校验
    let email = register_form.querySelector('[name=email]').value;
    let password = register_form.querySelector('[name=password]').value;
    let confirm = register_form.querySelector('[name=confirm]').value;
    let captcha = register_form.querySelector('[name=captcha]').value;

    let validation = true;
    if (!regex.test(email)) {
        errorMsg("register_err", "邮箱格式错误");
        validation = false;
    }
    if (!/^[a-z0-9]{4}$/.test(captcha)) {
        errorMsg("register_err", "验证码格式错误")
        validation = false;
    }
    if (email.length * password.length * confirm.length * captcha.length == 0) {
        errorMsg("register_err", "输入的数据不能为空");
        validation = false;
    }

    // 校验通过
    if (validation) {
        clearErr("register_err")
        /**
         * 注册请求
         */
        console.log("register success");
    }
})

/**
 * confirm修改事件监听
 */
register_form.querySelector('[name=confirm]').addEventListener('change', ()=>{
    let password = register_form.querySelector('[name=password]').value;
    let confirm = register_form.querySelector('[name=confirm]').value;

    if(password != confirm) {
        errorMsg("register_err", "两次输入的数据不一致");
    }else {
        clearErr("register_err");
    }
})


// function
/**
 * 显示错误信息
 * @param {string} id 错误id
 * @param {string} message 错误信息
 */
function errorMsg(id, message) {
    let err = document.getElementById(id);
    let text = err.children[1];
    text.textContent = message;
    err.classList.remove("hidden");
}
/**
 * 清除错误信息
 * @param {string} id 错误id
 */
function clearErr(id) {
    let err = document.getElementById(id);
    err.classList.add("hidden");
}
/**
 * 验证码倒计时格式
 */
var TIME = 60 // 60s
var intervalId;
var flag = true; // 这个flag是为了标识interval的状态
function setButton() {
    captcha_btn.classList.add("disabled");
    let time = TIME;
    let intervalId = setInterval(() => {
        captcha_btn.textContent = "验证码已发送(" + time + "s)";
        time--;

        if (time === -1 || flag === false) {
            clearInterval(intervalId);
            captcha_btn.classList.remove("disabled");
            captcha_btn.textContent = "发送验证码";
        }
    }, 1000);
}