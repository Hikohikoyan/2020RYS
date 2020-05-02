Story = [];
var NodeName = sessionStorage.getItem("playnode");
console.log(NodeName);
if(NodeName == "undefined"||NodeName == "null"){
    alert("章节内容丢失了！");
    NodeName = "01A01";
}
var  scrollToEnd=function(){//滚动到底部
    var h = $(document).height()-$(window).height();
    $(document).scrollTop(h); 
}

var clickNode = NodeName.replace(/[^0-9]/ig,"");
var clickNow="";
var clickBt = 0;
clickNode = clickNode.split("0")[1];
console.log(clickNode);
const npc_image = "img/";

var addButton= function(id,text,num){
    let button = "";
    button += "<div class = 'button' id='"+id+"'>";
    button += text +"</div>";
    $(".List").append(button);
    $("#"+id).fadeIn(600);
    $("#"+id).on('click',function(){
        //console.log('点击');
        show(num);//应该要分类的 比如A D
        $(".button").fadeOut(600);
        Player(text);
        $(".button").remove();
        clickBt = 1;
        button_show(2,num);
    });
    scrollToEnd();
}
var Player = function (text) {
    //text是具体剧情文本
    let a = "";
    a += ' <div class="Item Item--right" id="Item--right">';
    a += '<div class="Messages">';
    a += '<div class="Message">';
    a += ' <div class="Message-inner">' + text + '</div>';
    a += '</div>';
    a += '</div>';
    a += '</div>';
    $(".List").append(a);
    $(".List").last().fadeIn(1000);
    scrollToEnd();
}
var System = function (id, text) {
    
    let b = "";
    //b += ' <li class="Item Item--middle" id="Item--middle">';
    b += " <div class='Item Item--middle' id='"+id+"'>";
    b += '<div class="Messages"> ';
    b += '<div class="Message">';
    b += ' <div class="Message-inner">' + text + '</div>';
    b += '</div>';
    b += '</div>';
    b += '</div>';
    $(".List").append(b);
        $("#"+id).fadeIn(2000);
        scrollToEnd();
    //$(".Item Item--middle#"+id).fadeIn(3000);
}
//var Npc = function (name, text) {
    var Npc = function (id,name,text) {
     name= name.trim();
     text = text.replace(name+":","");
     text = text.replace(name+"：","");
    var c = "";
    c += " <divclass='Item Item--left' id='"+id+"'>";
    c += '<div class="Avatar">';
    c += '<img src="' + npc_image + name + ".jpg" + '" class="Avatar-image"/>';
    c += '</div>';
    c += '<div class="Messages">';
    c += '<div class="Message">';
    c += ' <div class="Message-inner">' + text + '</div>';
    c += '</div>';
    c += '</div>';
    c += '</div>';
    $(".List").append(c);
    $("#"+id).fadeIn(3000);
    $("#"+id).focus();
}
var button_show = function(session,num){
    //跳转剧情
    sessionStorage.setItem("playnode","0"+session+"0"+num);
    window.location.reload();

}
var show = function (num) {
    //在这里写动画
    //console.log(num);
    //for (let i = 1; i < Story.length; i++) {
        if(num == Story.length){
            alert("没了！");
            clickNow =Story[num-1].id.replace(/[^0-9]/ig,"");
            return;
        }
        if(num==0){
            System(Story[0]);
            return;
        }
            let type = Story[num].type;
            let id = Story[num].id;
            let text = Story[num].text;
            let jumpNode = 0;
                switch (type) {
                    case "D":
                        System(id, text);
                        break;
                    case "C":
                        let name = text.split("：")[0];
                        //alert(name);
                        Npc(id,name,text);
                        break;
                    case "A":
                        text.replace("你:","");
                        Player( text);
                        break;
                    case "B":
                         if(id.indexOf("A") >= 0 ) { 
                            jumpNode =id.split("A")[1]
                        } 
                        if(id.indexOf("C") >= 0 ) { 
                            jumpNode =id.split("C")[1]
                        } 
                        if(id.indexOf("D") >= 0 ) { 
                            jumpNode =id.split("D")[1]
                        } 
                        addButton(id,text,jumpNode);
                        break;
               // }
    }

}
var Datafilter = function (str) {
    //在这里拼装html
    let type = String(str.split(">")[0].split("=")[1]);
    type = type.replace("id", "");
    type = type.replace(/\'/g, "").trim();
    let id = str.split(">")[0].split("=")[2].replace(/\'/g, "").trim();
    //let htmltext = str.split(">")[0].replace("<", "<div ") + ">";
    let contain = str.split(">")[1];
    let obj = new Object;
    //obj.html = htmltext;
    obj.id = id;
    obj.type = type;
    obj.text = contain;
    //console.log(obj);
    Story.push(obj);
}
var store_data = function (NodeName) {
    if(NodeName == "undefined"){
        alert("章节内容丢失了！");
        return;
    }
    var fileURL = "json/" + $.trim(NodeName).split("0")[1] + ".json"; //第二个值就是章节值如 1.json中的1
    console.log("load.js: Nodename+.json=\n" + fileURL);
    Story = [];
    $.ajax({
        url: fileURL, //json文件位置
        type: "GET",
        dataType: "json", //返回数据格式为json
        success: function (data) {
            //attention 提示网络错误
            Story[0] = data[0].title; //先存储章节名称
            //alert(Story[0]);
            for (let i = 1; i < data.length; i++) {
                Datafilter(data[i].text);
            }
            alert(Story[0]);
            //Datafilter(data[1].text);
            //console.log(Story[1]);
        }
    });
};

store_data(NodeName);

$(".Phone").on('click',function(){
    if(clickNode==Story.length){
        alert("本章结束");
        let a=clickNode-1;
        clickNow =Story[a].id.replace(/[^0-9]/ig,"");
        var session=NodeName.split(0)[1].replace(/[^0-9]/ig,"");
        session++;
        button_show(session,1);
        return;
    }
    //console.log('点击');
    
    console.log(clickNode);
    show(clickNode);
    clickNode++;
    if(clickNode==Story.length){
        //alert("没了！");
        return;
    }else{
        while(Story[clickNode].type == "B"){
            show(clickNode);
            clickNode++;
            if(clickNode==Story.length){
                //alert("没了！");
                return;
            }
        }
    }
})


 



//快速点击↓
/*var timer = setInterval(function () {
    $(".Phone").click();
},40);
setTimeout(() => {
    clearInterval(timer);
}, 1300);*/