$("#loading").show();
var id=parse_str(location.href).id;
$.ajax({
    type:"GET",
    url:"http://140.143.250.209/news/get?id="+id,
    dataType:"jsonp",
    timeout: 20000,
    success:function(res){
        $("#loading").hide();
        $("#info").show();
        console.log('成功了',res);
        if(res.data.create_time!=null && res.data.create_time!="" && res.data.create_time!=undefined){
            var nowDate = new Date();
            var createTime = new Date(res.data.create_time.replace(/-/g,'/'));
            var createMonth = createTime.getMonth()+1
            //$("#creatTime").append(createTime.getFullYear()+"-"+createMonth+"-"+createTime.getDate());
            //$("#creatTime").append(nowDate.getDate());
            var mistiming = nowDate.getTime()-createTime.getTime()
            if(mistiming<=60000){//如果时间差不足1分钟的话，显示刚刚
                $("#mistiming").append("刚刚");
            }else if(60000<mistiming&&mistiming<3600000){//如果时间差超过1分钟不足1小时的话，显示几分钟前
                $("#mistiming").append(Math.ceil(mistiming/1000/60)+"分钟前");
            }else if(3600000<=mistiming&&mistiming<86400000){//如果时间差超过1小时不足24小时的话，显示几小时前
                $("#mistiming").append(Math.ceil(mistiming/1000/60/60)+"小时前");
            }else{
                switch (createTime.getDay()) {
                    case 0:$("#mistiming").append("星期天");
                        break;
                    case 1:$("#mistiming").append("星期一");
                        break;
                    case 2:$("#mistiming").append("星期二");
                        break;
                    case 3:$("#mistiming").append("星期三");
                        break;
                    case 4:$("#mistiming").append("星期四");
                        break;
                    case 5:$("#mistiming").append("星期五");
                        break;
                    case 6:$("#mistiming").append("星期六");
                        break;  }
            }
        }
        $("#content").append(res.data.contents);
        $("#title").append(res.data.title);
        
        if(res.data.source!=""){
            $("#source").append("<span>文章来源于：</span>"+res.data.source);
            $("#sourceTitle").append(res.data.source);
        }else{
        	if(res.data.author!=""){
                $("#author").append("<span>作者：</span>"+res.data.author);
                $("#sourceTitle").append(res.data.author);
            }
        }
    },
    error:function(XMLHttpRequest){
        alert("访问出错，请重试");
        console.log("访问错误",XMLHttpRequest);
    },
    complete: function (XMLHttpRequest, status) {
        if (status == 'timeout') alert("网络拥堵，无法读取");
    }
});
function parse_str(url) {
    var qs = url.split('?').pop().split('&');
    var qso = {}
    for (var i = 0; i < qs.length; i++) {
        if (qs[i] == "") continue;
        var tmpa = qs[i].split("=");
        qso[tmpa[0]] = tmpa[1] ? tmpa[1] : "";
    }
    return qso;
}