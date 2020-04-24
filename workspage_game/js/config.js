
    $(function() {
    //用于tets的写死数据 上线后删
    if(sessionStorage.getItem("user")!=undefined){
        sessionStorage.setItem("user","testman");
        sessionStorage.setItem("playnode","010A1");
    }
    if(sessionStorage.getItem("playnode")==undefined){
        sessionStorage.setItem("user","testman");
        sessionStorage.setItem("playnode","010A1");
    }

    //这里写登录注册
    })