

const fs = require('fs');

function writeonjason(data){
    fs.writeFile ("input.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('Write complete');
        }
    );
}

// add read, put form DB

module.exports.writeonjason= writeonjason;                                                                                                                                                              