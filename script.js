'use strict'
const fs = require('fs');
var paths = [];
// function readDir(path) {
//   fs.readdir(path, function(err, dirs) {
//     if (err) {return console.error(err)}
//     // console.log(dirs);
//   })
// } // a mistake occured because of asynchronous operation, had to rewrite it in synchronous way

// Structure of directories:
// volume/chapter/pngs
// script is in the same dir, as volumes
function readDir(path) {
  var arr = []
  try {
    fs.readdirSync(path).map(filename => {
      arr.push(filename);
    })
    return arr;
  } catch (err) {
    console.error(err);
  }
}
const volume = 'Vol14';
paths = readDir(volume);
// console.log(paths);

for (let path of paths) {
  path = volume + '/' + path;
  renameFiles(path);
}

function cutOff(name) {
  // makes file names shorter, removing symbols from beginning of a name
  while (name.length > 7) {
    let arr = name.split('');
    arr.shift();
    name = arr.join('');
    }
  return name;
}

function renameFiles(path) {
fs.readdir(path, function(err, files) {
  if (err) {
    return console.log(err);
  }
  // console.log("Asynchronous read:" + files);
  files.forEach(function (file) {
      console.log(file);
      fs.rename(path + '/' + file, path + '/' + cutOff(file), (err) => {
        if (err) {
          console.log('rename unsuccessful');
          console.error(err);
        };
        console.log('rename completed!')
      })
    })
  })
}
