/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Kedren
 * @Date: 2019-12-25 19:21:59
 * @LastEditors  : Kedren
 * @LastEditTime : 2020-01-03 15:25:38
 */

//音乐请求地址
var musicUrl = "https://api.apiopen.top/searchMusic?name=";
var flag = 0;
var dataList = [];
var currentPage = 1;
var pageSize = 6;
var currentSongid = 0;

searchType = {
    music: 0,
    video: 1,
    image: 2
}

window.onload = function () {
    $(".submit").click(this.onSubmit);
    $(".navbar-nav>li").click(function () {
        setFlag($(this));
    });
    playBtnClick();
    backwardBtnClick();
    forwardBtnClick();
    playerVisiable()
}
/**
 *设置搜索类型
 *
 * @param {*} obj 当前点击对象
 */
function setFlag(obj) {
    var list = $(".navbar-nav>li");
    for (var i = 0; i < list.length; i++) {
        $(list[i]).removeClass("active");
    }
    switch (obj.prop("type")) {
        case "music":
            flag = searchType.music;
            break;
        case "video":
            flag = searchType.video;
            break;
        case "image":
            flag = searchType.image;
            break;
    }
    obj.addClass("active");
}

function setCurrentPage(obj) {
    var list = $(".pagination>li");
    var text = $(obj).text();
    for (var i = 1; i < list.length - 1; i++) {
        $(list[i]).removeClass("active");
    }
    if (!isNaN(text)) {
        currentPage = text;
        var start = (currentPage - 1) * pageSize;
        var end = start + pageSize;
        end = end > dataList.length ? dataList.length : end;

        // console.log("起始页：" + start + "结束页:" + end);
        $(".row").html(musicList(dataList, start, end));

    } else {

    }
    generatePaging(dataList.length, pageSize);
}

function onSubmit() {
    var searchContent = $("#searchContent");
    var parameter = {
        name: searchContent.prop("value")
    };
    // console.log(parameter);
    // console.log(key);
    if (parameter != "") {
        $(".submit").click(refresh(musicUrl, parameter, 0, pageSize));
    }
}

/**
 *构造一首歌的Html代码
 *
 * @param {*} url 封面地址
 * @param {*} title 歌曲名
 * @param {*} author 歌手
 * @returns
 */
function song(url, songid, title, author) {
    var content = '<div class="col-md-4 col-sm-6 col-xs-12"> <div class = "infoItem text-center" ><div class="playItem img-responsive"><img src = "' + url + '" class="pic" alt=""> <div class = "playBtn img-responsive" data-songid = "' + songid + '" ><img src = "images/playBtn.png" alt = ""> </div></div><p class ="title"> 歌曲名：' + title + ' </p><p class = "author"> 歌手：' + author + '</p></div></div> '
    return content;
}
/**
 *生成分页导航
 *
 * @param {*} total 总页数
 * @param {*} pageSize 显示的记录数
 */
function generatePaging(total, pageSize) {
    if (total < 1) {
        return;
    }
    //分页Html内容
    var htmlContent = "";
    //分页页数
    var totalPage = parseInt((total + pageSize - 1) / pageSize);
    var state = currentPage == 1 ? "disabled" : "";
    var previous = '<li class="' + state + '"> <a aria-label="Previous"><span aria-hidden = "true"> &laquo; </span> </a> </li>';
    state = currentPage == totalPage ? "disabled" : "";
    var next = '<li class="' + state + '"><a aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
    htmlContent += previous;

    // console.log("总页数：" + total + "\n分页数：" + totalPage);
    for (var i = 1; i <= totalPage; i++) {
        state = currentPage == i ? "active" : "";
        htmlContent += '<li class="' + state + '"><a>' + i + '</a></li>';
    }
    htmlContent += next;
    $(".pagination").html(htmlContent);
    $(".pagination>li").click(function () {
        setCurrentPage($(this));
    });
    addClick();
}
/**
 *构造音乐列表
 *
 * @param {*} data
 */
function musicList(data, start, end) {
    if (data.length < 1) {
        return;
    }
    var content = '';
    for (var i = start; i < end; i++) {
        content += song(data[i].pic, data[i].songid, data[i].title, data[i].author);
    }
    return content;
}

function tempData(data, type) {
    dataList = [];
    if (type == searchType.music) {
        for (var i = 0; i < data.result.length; i++) {
            var song = music(data.result[i].author, data.result[i].link, data.result[i].pic, data.result[i].type, data.result[i].title, data.result[i].lrc, data.result[i].songid, data.result[i].url);
            dataList.push(song);
        }
    }

}

function addClick() {
    var playItems = $(".playBtn");
    playItems.click(function () {
        currentSongid = this.getAttribute("data-songid")
        playByUrl(getUrl(currentSongid));
    });
}

function getUrl(id) {
    return dataList[getIndex(id)].url;
}

function getIndex(id) {
    for (var i = 0; i < dataList.length; i++) {
        if (dataList[i].songid == id) {
            return i;
        }
    }
}

function playerVisiable() {
    var player = $('.player');
    playerAnim(player, "-" + player.css("height"));
    $(".player>button").click(function () {
        if (player.css("bottom") == "0px") {
            playerAnim(player, "-" + player.css("height"));
        } else {
            playerAnim(player, "0");
        }

    });
}

function playerAnim(player, value) {
    player.animate({
        bottom: value
    }, 500, function () {});
}

/**
 *执行Ajax刷新
 *
 * @param {*} url 数据请求地址
 * @param {*} key 搜索关键字
 * @param {*} start 从第几条数据开始
 * @param {*} end 到第几条数据结束
 */
function refresh(url, parameter, start, end) {
    $.ajax({
        url: url, //某大佬提供的api希望一直有效
        data: parameter,
        dataType: "json", //数据格式
        type: "get", //请求方式
        async: false, //是否异步请求
        success: function (data) { //如果请求成功，返回数据。
            currentPage = 1;
            tempData(data, flag);
            $(".row").html(musicList(dataList, start, end));
            generatePaging(dataList.length, pageSize);
        }
    })
}