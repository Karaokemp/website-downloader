const fs = require('fs');
const ytdl = require('ytdl-core');
const sanitize = require("sanitize-filename");


const db = require('./db');

const DIR_NAME = 'requests';
if (!fs.existsSync(DIR_NAME)){
    fs.mkdirSync(DIR_NAME);
}

 function download(song){
     return new Promise((resolve, reject)=>{

        if(!song.title){
            song.title =`TITLE-ME ${song.id}`;
        }
        if(!song.id){
            song.id = 'oVbXpK_BRbw' // bohemian raphsody
            song.title = 'ERASE-ME!';
            }

            let fileName = `${DIR_NAME}/${sanitize(song.title)}.mp4`;
        if(!fs.existsSync(fileName)){
            const videoUrl = `https://www.youtube.com/watch?v=${song.id}`;
            let download = ytdl(videoUrl,{quality: 'highest', filter: (format) => format.container === 'mp4'})
            .pipe(fs.createWriteStream(fileName));

            download.on('error', function(err) {
                console.log(`got error on file ${fileName}`);
                reject(fileName);
                });    
            
            download.on('finish', function(){
                resolve(fileName);
            });

        }else{
                resolve(fileName);            
                }

            



     });
 }

 function downloadAll(songs){
     const tasks = songs.map(download);
     return tasks.reduce((promiseChain, currentTask) => {
        return promiseChain.then(chainResults =>
            currentTask.then(currentResult =>
                [ ...chainResults, currentResult ]
            )
        ).catch(chainErrors =>
            currentError.catch(currentError =>
                [ ...chainErrors, currentError ]
            )
        );
    }, Promise.resolve([])).then(results => {

        for(let result of results){
            console.log(`downloaded ${fileName}`);
        }


        

    }).catch(issues=>{
        for(let issue of issues){
            console.error(issue);
        }
    });


 }


db.getSongRequests((err,songs)=>{
    if(err){
            console.error(err);
    }else{

        downloadAll(songs);

        

        
        
        
    }
});
        
    