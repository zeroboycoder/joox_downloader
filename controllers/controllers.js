const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

exports.getIndex = (req, res, next) => {
    res.render("index");
}

exports.postDownload = (req, res, next) => {
    const songUrl = req.body.songUrl.split('/');
    const songId = songUrl[songUrl.length - 1];
    const jooxAPI = `https://api.joox.co.th/openjoox/v1/track/${songId}?country=mm&lang=en&lyric=1`;
    let filePath;
    let songName;
    let singerName;

    fetch(jooxAPI)
        .then(res => res.json())
        .then(datas => {
            res.send("Done")
        })
        .catch(err => console.log(err))
}