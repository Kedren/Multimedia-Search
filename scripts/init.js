/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Kedren
 * @Date: 2020-01-04 19:34:31
 * @LastEditors  : Kedren
 * @LastEditTime : 2020-01-04 20:12:40
 */

function init() {
	$.ajax({
		url: 'https://api.apiopen.top/musicRankings',
		type: "get",
		dataType: "json",
		success: res => {
			// 创建节点
			createChartsElement(res.result);
		},
		error: err => {
			console.error(err)
		}
	})
}

// 创建音乐排行版 元素
function createChartsElement(e) {
	// console.log(e);
	var str = ' <h3 id="music_charts">排行榜<span class="label label-danger">New</span></h3>';
	for (var i = 0; i < e.length; i++) {
		str += '<div id="charts_row" class="row"><div class="col-sm-12"><div class="media"><div class="media-left"><a href="#"><img class="media-object" data-src="holder.js/64x64" alt="64x64" src="' + e[i].pic_s192 + '" data-holder-rendered="true" style="width: 64px; height: 64px;"> </a></div><div class="media-body"><h4 class="media-heading">' + e[i].name + '</h4>' + e[i].comment + '</div></div><div class="row"><hr>';
		for (var j = 0; j < e[i].content.length; j++) {
			str += '<div class="col-md-3 col-sm-6 col-xs-12"> <div class = "infoItem text-center" ><div class="playItem img-responsive"><img src = "' + e[i].content[j].pic_big + '" class="pic" alt=""> </div><p class ="title"> <h2 class="title">NO.' + (j + 1) + '</h2>歌曲名：' + e[i].content[j].title + ' </p><p class = "author"> 歌手：' + e[i].content[j].author + '</p></div></div> '
		}
		str += "</div></div></div>"
	}
	$(".row").append($(str));

}