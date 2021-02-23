function getCookie(name) {
    var dc = document.cookie;
    
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

$(document).ready(()=>{
        
    var myCookie = getCookie("x-auth-token");
    
    if (myCookie == null) {
        // do cookie doesn't exist stuff;
        console.log("cookie doesnt  exist");
        
        $( "#fetchPost" ).text("Login");
        $("#fetchPost").attr("href", '/users');
    }
    else {
        // do cookie exists stuff
        console.log("cookie exist");
        // alert("cookie exist");
        $( "#fetchPost" ).text( "My Post");
        $("#fetchPost").attr("href", "/posts");
    }
    
});