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
    // let lyricContent;

    fetch(jooxAPI)
        .then(res => res.json())
        .then(datas => {
            filePath = path.join("data", datas.name + ".mp3")
            songName = datas.name;
            singerName = datas.artist_list[0].name
            // For Lyric
            // datas.lrc_exist ? lyricContent = new Buffer(datas.lrc_content, 'base64').toString() : null;

            fetch(datas.play_url.low_play_url)
                .then(resp => {
                    const file = fs.createWriteStream(filePath);
                    resp.body.pipe(file);
                    file.on("finish", () => {
                        const audio = fs.createReadStream(filePath);
                        res.setHeader("Content-Type", "audio/mpeg");
                        res.setHeader("Content-Disposition", `attachment; filename=${encodeURI(songName)} - ${singerName}.mp3`)
                        audio.pipe(res);
                    })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}