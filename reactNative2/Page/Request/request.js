/**
 * Created by lanou on 16/10/24.
 */
let request={};
//发送get请求
request.get=function(url){
    return fetch(url)
        .then((response)=>response.json())
}

request.post=function (url,para) {
    return fetch(url,{
        method:'POST',
        header:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(para)
    }).then((response)=>response.json())
}
module.exports=request;