var BBS_HOME_URL = 'http://bbs.imagapp.com';
var DISCUZ_VERSION = 'X3';
        
Date.prototype.format = function(fmt) { //author: meizz 
    var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) 
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    for(var k in o) 
        if(new RegExp("("+ k +")").test(fmt)) 
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
    return fmt; 
}        

function cdata(text) {
    return '<![' + 'CDATA[' + text + ']]' + '>';
}

function checkSeccodeVerify() {
    var storage = $phone.localStorage();
    var loginPageUrl = BBS_HOME_URL + '/member.php?mod=logging&action=login&infloat=yes&handlekey=login&inajax=1';
    $http.get(loginPageUrl, function(data) {
        if (data.indexOf('idhash=') != -1) {
            var regex = /loginhash=(\S+)\&[\s\S]+?name="formhash"\s+id="formhash"\s+value=["'](\S+)["'][\s\S]+?idhash=(\S+)&/img;
            var group = regex.exec(data);
            if (group) {
                storage.setItem('login_seccodeon', 'yes');
                storage.setItem('login_loginhash', group[1]);
                storage.setItem('login_formhash', group[2]);
                storage.setItem('login_sechash', group[3]);                  
            } 
        } else {
            storage.setItem('login_seccodeon', 'no');
        }
    });
}