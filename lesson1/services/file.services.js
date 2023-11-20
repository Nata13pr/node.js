const fs=require('fs');

fs.readdir('./boys',(err,files)=>{
    if(err){
        console.log(err);
        return;
    }
 for(const file of files){
     fs.stat(`boys/${file}`,(err1,stats)=>{
         if(err1){
             console.log(err1);
             return;
         }

if(stats.isFile()){
    fs.readFile(`./boys/${file}`,(err2,dates)=>{
        if(err2){
            console.log(err2);
            return;
        }

        const parseDates=JSON.parse(dates);

        if(parseDates.gender==='female'){
            fs.rename(`./boys/${file}`,`./girls/${file}`,err=>{
                err && console.log(err)
            })
        }
    })
}

     })
 }
    console.log(files)
})

fs.readdir('./girls',(err,files)=>{
    if(err){
        console.log(err);
        return;
    }

    for (const file of files){
        fs.stat(`girls/${file}`,(err1,stats)=>{
            if(err1){
                console.log(err1);
                return;
            }

            if(stats.isFile()){
                fs.readFile(`./girls/${file}`,(err3,date)=>{
                    if(err3){
                        console.log(err3);
                        return;
                    }
                    const parseDate=JSON.parse(date);
                    if(parseDate.gender==='male'){
                        fs.rename(`./girls/${file}`,`./boys/${file}`,err=>{
                            err && console.log(err);
                        })
                    }
                })
            }
        })
    }
})