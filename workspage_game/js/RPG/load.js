Story = [];
var NodeName = sessionStorage.getItem("playnode");
var isEnd = sessionStorage.getItem("isEnd");
if (isEnd == "undefined" || isEnd == null) { //故事结束了没
    sessionStorage.setItem("isEnd", "false");
}
if (isEnd == "false") { //将session里的字符转换为boolean
    isEnd = false;
} else if (isEnd == "true") {
    isEnd = true;
}

if (NodeName == "undefined" || NodeName == null) {
    console.log(NodeName);
    alert("章节内容丢失了！");
    NodeName = "N1N1";
    console.log(NodeName);
    sessionStorage.setItem("playnode",NodeName);
    window.reload();
}
var scrollToEnd = function () { //滚动到底部
    var h = $(document).height() - $(window).height();
    $(document).scrollTop(h);
}

//var clickNode = NodeName.replace(/[^0-9]/ig, ""); //从session里获取上一次的节点num
var clickNow = ""; //当前正在的节点id
var clickBt = 0; //是否点击了按钮
var clickNode = Number(NodeName.split("N")[2]); //从session里获取上一次的节点num [1]是章节号 【2】是节点号 [0]是空
console.log(clickNode);
const npc_image = "img/";

var SwitchEnd = function () {
    let endNode = NodeName.replace(/[^0-9]/ig, "").split("N")[1];
    switch (endNode) {
        case 7:
            isEnd = true;
            break;
        case 10:
            isEnd = true;
            break;
        case 11:
            isEnd = true;
            break;
            case 14:
            isEnd = true;
            break;
            case 23:
            isEnd = true;
            break;
            case 24:
            isEnd = true;
            break;
        default:
            isEnd = false;
            break;
    }
    sessionStorage.setItem("isEnd", isEnd);
    if(isEnd ==true){
        $(".Phone").on('click', function () {
            alert("故事结束~")
        })
    }
}
var addButton = function (id, text, num) { //添加按钮  id是按钮id text是按钮内容 num是要跳转的序号（story中  
    //这里可能有问题 文字组给的序号本来应该每一章是单独的，刚刚好能对应上数组的下标，但有些序号不是连续递增的 因此可能会跳转错

    let jumpType = 0;
    let button = "";
    button += "<div class = 'button' id='" + id + "'>";
    button += text + "</div>";
    if (id.indexOf('Z') >= 0) {
        //会跳到章节 要用button_show()
        jumpType = 1;
    } else {
        //不会跳到章节 要用show()
        jumpType = 0;
    }
    $(".List").append(button);
    $("#" + id).fadeIn(600);
    button_id = id.replace(/[^1-9]/ig, "");
    $("#" + id).on('click', function () {
        //console.log('点击');
        //show(num);
        $(".button").fadeOut(600);
        Player(text);
        scrollToEnd();
        $(".button").remove();
        clickBt = 1;
        setTimeout(() => {
            switch (jumpType) {
                case 1:
                    if(isEnd == true){
                        break;
                    }
                    button_show(num, 1);
                    break;
                default:
                    show(num);
                    break;
            }
        }, 800)
    });

}
/*
<class='B' id='ButtonText029J0'> 相信它只是一只猫
<class='B' id='ButtonText030J34'> 事情不只是这么简单

<class='A' id='StoryText031'> 走吧走吧，学业要紧。
<class='D' id='NormalText032'> 可我刚要走的时候，クサ紧紧地抓住的我的胳膊。
<class='A' id='StoryText033'> （事情肯定不只是这么简单。）

以上三句选第一个选项才会出现，选第二个跳过。*/

var Player = function (id,text) {
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
    b += " <div class='Item Item--middle' id='" + id + "'>";
    b += '<div class="Messages"> ';
    b += '<div class="Message">';
    b += ' <div class="Message-inner">' + text + '</div>';
    b += '</div>';
    b += '</div>';
    b += '</div>';
    $(".List").append(b);
    $("#" + id).fadeIn(2000);

    scrollToEnd();
    //$(".Item Item--middle#"+id).fadeIn(3000);
}
//var Npc = function (name, text) {
var Npc = function (id, name, text) {
    name = name.trim();
    text = text.replace(name + ":", "");
    text = text.replace(name + "：", "");
    var c = "";
    c += " <divclass='Item Item--left' id='" + id + "'>";
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
    $("#" + id).fadeIn(3000);

    scrollToEnd();
}
var button_show = function (session, num) {
    if (isEnd == false) {
        //跳转剧情
        sessionStorage.setItem("playnode", "N" + session + "N" + num);
        window.location.reload();
    } else {
        alert("故事结束，感谢游玩");
    }
}
var show = function (num) {
    //在这里写动画
    //console.log(num);
    //for (let i = 1; i < Story.length; i++) {
    if (num == Story.length) {
        alert("没了！");
        clickNow = Story[num - 1].id.replace(/[^0-9]/ig, "");
        return;
    }
    if (num == 0) {
        System(Story[0]); //章节title
        return;
    }
    let type = Story[num].type; //文本类型 ABCD
    let id = Story[num].id; //文本id 应该是可以和num对应上的
    let text = Story[num].text; //实际的text内容
    let jumpNode = 0; //B按钮类型要跳转的节点num 现在的情况似乎是跳到第n个章节 n.json ButtonText01Z6 以Z为分割 后为章节序号
    switch (type) {
        case "D":
            System(id, text);
            break;
        case "C":
            let name = text.split("：")[0];
            //alert(name);
            Npc(id, name, text);
            break;
        case "A":
            text.replace("你:", "");
            Player(id,text);
            break;
        case "B":
            //至于有一个特殊的要求 比如跳跃某几个剧情 那个的id 就是没有Z的 
            //直接获取J后面的数字就是要跳到的序号（要求文本id在本章连续无重复递增 如J0 0就是不跳  J21就是跳到story[21]
            if (id.indexOf('Z') < 0) {
                jumpNode = id.split("J")[1];
            } else {
                jumpNode = id.split("Z")[1];
            }
            addButton(id, text, jumpNode);
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
    if (NodeName == "undefined") {
        alert("章节内容丢失了！");
        return;
    }
    var fileURL = "json/" + $.trim(NodeName).split("N")[1] + ".json"; //第【1】个值就是章节值如 1.json中的1
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

$(".Phone").on('click', function () {
    SwitchEnd();
    if (clickNode == Story.length) {
        alert("本章结束");
        let a = clickNode - 1;
        clickNow = Story[a].id.replace(/[^0-9]/ig, "");
        var session = NodeName.split("N")[1].replace(/[^0-9]/ig, "");
        session++;
        button_show(session, 1);
        return;
    }
    //console.log('点击');

    console.log(clickNode);
    show(clickNode);
    clickNode++;
    if (clickNode >= Story.length) {
        alert("本章结束");
        let a = clickNode - 1;
        clickNow = Story[a].id.replace(/[^0-9]/ig, "");
        var session = NodeName.split("N")[1].replace(/[^0-9]/ig, "");
        session++;
        if(isEnd == true){
            return;
        }
        button_show(session, 1);
        return;
    }
    if (clickNode< Story.length){
        while (Story[clickNode].type == "B") {
            clickNode++;
            show(clickNode);
            if (clickNode == Story.length) {
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