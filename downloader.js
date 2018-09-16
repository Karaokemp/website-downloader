const fs = require('fs');
const ytdl = require('ytdl-core');

const db = require('./db');

exports.download = function(song,cb){
    let fileName = `${slugify(song.title)}.mp4`;
    let download = ytdl(`https://www.youtube.com/watch?v=${song.id}`,{quality: 'highest', filter: (format) => format.container === 'mp4'})
    .pipe(fs.createWriteStream(fileName));

    download.on('error', function(err) {
        console.log("ERROR:" + err);
      });    
    
    download.on('finish', function(){
        console.log('downloaded!');
        const stats = fs.statSync(fileName);
        const fileSizeInBytes = stats.size;
        console.log(`got ${fileSizeInBytes} bytes.`);
        
    });
    
    
    }

    exports.downloadAll = function(songs){
        for(let song of songs){
            console.log(`downloading ${song.title}`);
            exports.download(song);
        }
    }


function slugify(s) {
    const _slugify_strip_re = /[^\w\s-]/g;
    const _slugify_hyphenate_re = /[-\s]+/g;
  s = s.replace(_slugify_strip_re, '').trim();
  s = s.replace(_slugify_hyphenate_re, ' ');
  return s;
}

    db.getSongRequests((err,requests)=>{
        if(err){
            console.error(err);
        }else{
             exports.downloadAll(requests);
            }

        });
        
    