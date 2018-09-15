const fs = require('fs');
const ytdl = require('ytdl-core');

exports.download = function(song,cb){
    fileName = `${song.title}.mp4`;
    let download = ytdl(`https://www.youtube.com/watch?v=${song.id}`,{quality: 'highest', filter: (format) => format.container === 'mp4'})
    .pipe(fs.createWriteStream(fileName));
    
    download.on('finish', function(){
        console.log('downloaded!');
        const stats = fs.statSync(fileName);
        const fileSizeInBytes = stats.size;
        console.log(`got ${fileSizeInBytes} bytes.`);
        
    });
    
    
    }

    let song = {title:'Karaoke The Bad Touch',id:'AUjmpbd-U2Q'};
exports.download(song);