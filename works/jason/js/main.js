$(function() {
    // *************banner轮播 begin***************
    var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
    var len = $("#focus ul li").length; //获取焦点图个数
    var index = 0;
    var picTimer;
    var btn = "<div class='btnBg'></div><div class='btn'>";
    for(var i=0; i < len; i++) {
        btn += "<span></span>";
    }

    $("#focus").append(btn);
    $("#focus .btnBg").css("opacity",0.5);

    //为小按钮添加鼠标滑入事件，以显示相应的内容
    $("#focus .btn span").css("opacity",0.4).mouseenter(function() {
        index = $("#focus .btn span").index(this);
        showPics(index);
    }).eq(0).trigger("mouseenter");

    $("#focus ul").css("width",sWidth * (len));
    
    //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
    $("#focus").hover(function() {
        clearInterval(picTimer);
    },function() {
        picTimer = setInterval(function() {
            showPics(index);
            index++;
            if(index == len) {index = 0;}
        },3000);
    }).trigger("mouseleave");
    
    function showPics(index) { //普通切换 显示图片函数，根据接收的index值显示相应的内容
        var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
        $("#focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
        $("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
    }
    // *************banner轮播 end***************

    $('.newspaper li:nth-child(3n),.m_mainbg .packaging li img:nth-child(2n)').css({'margin-right': 0});
    $('.packaging li:last-child').css({'margin-bottom': 0});

    // 中式包装图片fadeIn
    $('.animated').css({'opacity':0});
    $(document).scroll(function(){
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if(scrollTop > 600){
            var $project = $('.animated'),projectlenght = $project.length;

            setTimeout( function(){         
                for (var i = 0; i <= projectlenght; i++) {
                    var projectb = $project[i];
                    $(projectb).delay(200 * i).animate({'opacity' : '1',top:'0'},200);
                }   
            },50);
        }
    });
});