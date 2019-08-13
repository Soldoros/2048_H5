




/*****
 *
 * 标签栏点击操作 首页 项目 中心 消息  我的
 *
 */
function tabBarClick() {

    var footer = document.getElementsByClassName("window_tabBar")[0];
    var list = footer.getElementsByTagName("li");

    for(var i=0;i<list.length;++i){

        var item = list[i];
        item.index = i;

        item.onclick = function () {

            if(this.index === 0){
                window.location.href = "index.html";
            }
            else if(this.index === 1){
                window.location.href = "project.html";
            }
            else if(this.index === 2){
                window.location.href = "center.html";
            }
            else if(this.index === 3){
                window.location.href = "message.html";
            }
            else{
                var login = isLogin();

                if(login === "yes"){
                    window.location.href = "mine.html";
                }else{
                    window.location.href = "account/login.html";
                }
            }

        }
    }
}


/*****
 *
 * 返回上一页 左侧按钮点击
 *
 */
function backPreviousPage() {

    var leftBtn1 = document.getElementsByClassName("left_btn1")[0];

    leftBtn1.onclick = function () {
        javascript:history.back(-1);
    }

}


/*****
 *
 * 右侧按钮 跳转到指定页面
 *
 */
function backToPage(page) {


    var rightBtn1 = document.getElementsByClassName("right_btn1")[0];

    rightBtn1.onclick = function () {
        window.location.href = page;
    }
}


/*****
 *
 * cookie操作用户数据
 *
 * cookie路径
 *
 * 是否登录   user-login
 *
 * 用户名     user-name
 * 密码       user-password
 * 请求头     user-tocken
 * 昵称       user-nickname
 *
 *
 */


/*设置保留时间为 days 天*/
function setCookiePath() {
    document.cookie = "path=/";
}


/*设置保留时间为 days 天*/
function setCookieTime(days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = "visited=yes; expires=" + date.toDateString() + ";";
}



/* 删除所有cookies*/
function clearCookie(){
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}


/*保存用是否登录 未登录no  已登录yes */
function setUserLogin(login) {
    document.cookie="user-login=" + login;
}

/*保存用户名*/
function setUserName(name) {
    document.cookie="user-name=" + name;
}

/*保存密码*/
function setUserPassword(password) {
    document.cookie="user-password=" + password;
}

/*保存请求头*/
function setUserTocken(tocken) {
    document.cookie="user-tocken=" + tocken;
}

/*保存用户昵称*/
function setUserNickname(nickname) {
    document.cookie="user-nickname=" + nickname;
}


/*返回用户是否登录*/
function isLogin() {


    //获取cookie字符串
    var strCookie=document.cookie;

    // alert(strCookie);


    //将多cookie切割为多个名/值对
    var arrCookie=strCookie.split(";");

    var login = "no";

    /*判断是否保存了用户名*/

    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=");

        if("user-login"==arr[0]){
            login = arr[1];
            break;
        }
    }

    return login;
}


