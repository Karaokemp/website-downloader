const fs = require('fs');
const ytdl = require('ytdl-core');

const db = require('./db');

const DIR_NAME = 'requests';
if (!fs.existsSync(DIR_NAME)){
    fs.mkdirSync(DIR_NAME);
}
const download = async function(song,cb){
    let fileName = `${DIR_NAME}/${slugify(song.title)}.mp4`;
    if(!fs.existsSync(fileName)){
        try {
            const videoUrl = `https://www.youtube.com/watch?v=${song.id}`;
            let info = await ytdl.getBasicInfo(videoUrl);
            console.log('Got info for ', song.title, '. ' + JSON.stringify(info));
            if (info) {
                let download = await ytdl(videoUrl,{quality: 'highest', filter: (format) => format.container === 'mp4'})
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
        } catch(error) {
            console.error('Failed to download', fileName, error);
        }
    }
   
    
    
    }

const downloadAll = async function(songs){
    for(let song of songs){
        await handleSong(song);
    }
}

async function handleSong(params) {
    if (song.title) {
        console.log(`downloading ${song.title}`);
        await download(song);
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
        downloadAll(requests);
    }
});
        
    