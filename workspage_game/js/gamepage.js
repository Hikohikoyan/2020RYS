$(function() {
    $.ajax({
        url: "json/gamepage.json", //json文件位置
        type: "GET",
        dataType: "json", //返回数据格式为json
        success: function(data) {
            console.log(data);
            var html = "";
            console.log(data.name);
            $.each(data, function(i, item) {

                    if (item.name == "me") {
                        {
                            html += ' <li class="Item Item--right" id="Item--right">';
                            html += '<div class="Messages">';
                            html += '<div class="Message">';
                            html += ' <div class="Message-inner">' + item.contain + '</div>';
                            html += '</div>';
                            html += '</div>';
                        }
                    } else if (item.name == "aside") {

                        html += ' <li class="Item Item--middle" id="Item--middle">';
                        html += '<div class="Messages">';
                        html += '<div class="Message">';
                        html += ' <div class="Message-inner">' + item.contain + '</div>';
                        html += '</div>';
                        html += '</div>';
                    } else {
                        console.log(item.name);
                        html += ' <li class="Item Item--left" id="Item--left">';
                        html += '<div class="Avatar">';
                        html += '<img src="' + item.pic + '" class="Avatar-image"/>';
                        html += '</div>';
                        html += '<div class="Messages">';
                        html += '<div class="Message">';
                        html += ' <div class="Message-inner">' + item.contain + '</div>';
                        html += '</div>';
                        html += '</div>';
                    }
                })
                // $(".List").append($(html).hide());
            $(".List").append($(html).hide().fadeIn(1000));
            // var node = document.getElementsByTagName("li");
            // for (i = 0; i < node.length; i++) {
            //     $("li[i]").show();
            // }
        }
    })


})

// oTable.find("tr").each(function () {
//     var $this = $(this);
//     if($this.attr("id") == para)
//         $this.show();
//     else
//         $this.hide();
// });


// function orderly_show() {
//     var container_li = document.getElementById("container").getElementsByTagName("li");
//     if (i < container_li.length) {
//         container_li[i].style.display = "block";
//         if (j < container_li.length) {
//             container_li[j].className = "orderly-change";
//         }
//         i++;
//         j = i - 1;
//     } else if (i = container_li.length) {
//         container_li[j].className = "orderly-change";
//     }
//     setTimeout("orderly_show()", 500);
// }
// $(document).ready(function(){
//     $(".btn1").click(function(){
//     $("p").fadeOut(1000)
//     });
//     $(".btn2").click(function(){
//     $("p").fadeIn(1000);
//     });
// $(document).ready(function() {
//     $('div').fadeOut(1);
//     $('div').removeClass('hidden');
//     $('div').fadeIn(1000);
// });