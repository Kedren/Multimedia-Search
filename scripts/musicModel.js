/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Kedren
 * @Date: 2019-12-26 15:08:19
 * @LastEditors  : Kedren
 * @LastEditTime : 2019-12-26 15:10:38
 */
function music(author, link, pic, type, title, lrc, songid, url) {
    musicModel = {
        author: "",
        link: "",
        pic: "",
        type: "",
        title: "",
        lrc: "",
        songid: "",
        url: ""
    }
    musicModel.author = author;
    musicModel.link = link;
    musicModel.pic = pic;
    musicModel.type = type;
    musicModel.title = title;
    musicModel.lrc = lrc;
    musicModel.songid = songid;
    musicModel.url = url;
    return musicModel;
}