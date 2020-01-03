/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Kedren
 * @Date: 2020-01-03 12:53:47
 * @LastEditors  : Kedren
 * @LastEditTime : 2020-01-03 15:39:00
 */
var ao = new Audio()
var playIcon = "glyphicon-play";
var pauseIcon = "glyphicon-pause";

function playByUrl(url) {
    ao.src = url;
    play();
}

function play() {
    if (getCurrentUrl() == "") {
        console.log("当前播放曲目为空");
        return;
    }
    ao.play();
    stateToggle(true);
}

function pause() {
    if (getCurrentUrl() == "") {
        console.log("当前播放曲目为空");
        return;
    }
    ao.pause();
    stateToggle(false);
}

function getCurrentUrl() {
    return ao.src;
}

function playBtnClick() {

    $(".player>div>button:nth-child(2)").click(function () {
        if (ao.paused) {
            play();
        } else {
            pause();
        }
    });
}

function backwardBtnClick() {
    $(".player>div>button:nth-child(1)").click(function () {
        var index = getIndex(currentSongid);
        if (index > 0) {
            index--;
            toggleAndSetSongid(index)
        }

    });
}

function forwardBtnClick() {
    $(".player>div>button:nth-child(3)").click(function () {
        var index = getIndex(currentSongid);
        if (index < dataList.length - 1) {
            index++;
            toggleAndSetSongid(index);
        }
    });
}

function toggleAndSetSongid(index) {
    playByUrl(dataList[index].url);
    currentSongid = dataList[index].songid;
}

function stateToggle(state) {
    var icon = $(".player>div>button:nth-child(2)>span");
    icon.removeClass(playIcon);
    icon.removeClass(pauseIcon);
    if (state) {

        icon.addClass(pauseIcon);
    } else {
        icon.addClass(playIcon);
    }
}